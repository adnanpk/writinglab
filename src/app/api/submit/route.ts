import { NextResponse } from "next/server";
import { Readable } from "node:stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = 25 * 1024 * 1024;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const hits = new Map<string, number[]>(); // simple in-memory rate limit (per server process)

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const str = (fd: FormData, k: string, max = 2000) => String(fd.get(k) ?? "").trim().slice(0, max);

function limited(ip: string) {
  const now = Date.now(); const arr = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  arr.push(now); hits.set(ip, arr);
  return arr.length > 6;
}

async function saveToDrive(ref: string, details: string, file: File | null) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, key = process.env.GOOGLE_PRIVATE_KEY, parent = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!email || !key || !parent) return null;
  const { google } = await import("googleapis");
  const auth = new google.auth.JWT({ email, key: key.replace(/\\n/g, "\n"), scopes: ["https://www.googleapis.com/auth/drive"] });
  const drive = google.drive({ version: "v3", auth });
  const folder = await drive.files.create({ requestBody: { name: ref, mimeType: "application/vnd.google-apps.folder", parents: [parent] }, fields: "id,webViewLink", supportsAllDrives: true });
  const folderId = folder.data.id!;
  // Google Doc with the submission details (plain text is converted to a Doc)
  await drive.files.create({
    requestBody: { name: `${ref} - Request details`, mimeType: "application/vnd.google-apps.document", parents: [folderId] },
    media: { mimeType: "text/plain", body: Readable.from([details]) }, supportsAllDrives: true,
  });
  if (file) {
    await drive.files.create({
      requestBody: { name: file.name, parents: [folderId] },
      media: { mimeType: file.type || "application/octet-stream", body: Readable.from(Buffer.from(await file.arrayBuffer())) }, supportsAllDrives: true,
    });
  }
  return folder.data.webViewLink ?? null;
}

async function sendEmails(ref: string, d: Record<string, string>, details: string, driveLink: string | null) {
  const key = process.env.RESEND_API_KEY, to = process.env.LEADS_TO_EMAIL, from = process.env.LEADS_FROM_EMAIL;
  if (!key || !to || !from) return false;
  const { Resend } = await import("resend");
  const resend = new Resend(key);
  const html = `<h2>New ${esc(d.type)} request: ${esc(ref)}</h2><pre style="font:14px/1.5 monospace;white-space:pre-wrap">${esc(details)}</pre>${driveLink ? `<p><a href="${esc(driveLink)}">Open Drive folder</a></p>` : "<p>(No Drive folder configured)</p>"}`;
  const r1 = await resend.emails.send({ from, to, replyTo: d.email, subject: `[Writing Lab] ${d.type} ${ref} from ${d.name}`, html });
  if (r1.error) throw new Error(r1.error.message);
  // acknowledgement to the customer (best-effort)
  const ar = d.lang === "ar";
  await resend.emails.send({
    from, to: d.email,
    subject: ar ? `استلمنا طلبك ${ref}` : `We received your request ${ref}`,
    html: ar ? `<div dir="rtl"><p>شكرًا ${esc(d.name)}، استلمنا طلبك. رقمك المرجعي: <b>${esc(ref)}</b>. سنراسلك قريبًا.</p><p>Writing Lab</p></div>`
             : `<p>Thanks ${esc(d.name)}, we've received your request. Your reference is <b>${esc(ref)}</b>. We'll be in touch shortly.</p><p>Writing Lab</p>`,
  }).catch(() => {});
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  let fd: FormData;
  try { fd = await req.formData(); } catch { return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 }); }

  const d = {
    type: str(fd, "type", 20), name: str(fd, "name", 120), email: str(fd, "email", 200), whatsapp: str(fd, "whatsapp", 40),
    field: str(fd, "field", 200), journal: str(fd, "journal", 200), deadline: str(fd, "deadline", 20), notes: str(fd, "notes", 4000), lang: str(fd, "lang", 2),
  };
  if (!["quote", "sample", "writing"].includes(d.type) || !d.name || !EMAIL.test(d.email)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const f = fd.get("file");
  const file = f instanceof File && f.size > 0 ? f : null;
  if (file && (!/\.(docx?|pdf)$/i.test(file.name) || file.size > MAX)) return NextResponse.json({ ok: false, error: "bad_file" }, { status: 400 });
  if (!file && d.type !== "writing") return NextResponse.json({ ok: false, error: "file_required" }, { status: 400 });
  let quoteLabel = "";
  try { quoteLabel = JSON.parse(str(fd, "quote", 4000) || "{}").label ?? ""; } catch {}

  const ref = `WL-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  const details = [
    `Reference: ${ref}`, `Type: ${d.type}`, `Name: ${d.name}`, `Email: ${d.email}`, `WhatsApp: ${d.whatsapp || "-"}`,
    `Field: ${d.field || "-"}`, `Target journal: ${d.journal || "-"}`, `Deadline: ${d.deadline || "-"}`, `Language: ${d.lang}`,
    quoteLabel ? `Quote: ${quoteLabel}` : "", `File: ${file ? `${file.name} (${(file.size / 1024).toFixed(0)} KB)` : "-"}`, `Notes: ${d.notes || "-"}`,
  ].filter(Boolean).join("\n");

  const configured = !!(process.env.RESEND_API_KEY || process.env.GOOGLE_DRIVE_FOLDER_ID);
  if (!configured) {
    if (process.env.NODE_ENV === "production") return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
    console.log("[submit:dev]\n" + details); // dev only: nothing configured yet
    return NextResponse.json({ ok: true, ref, dev: true });
  }
  try {
    const link = await saveToDrive(ref, details, file);
    const mailed = await sendEmails(ref, d, details, link);
    if (!link && !mailed) throw new Error("nothing delivered");
    return NextResponse.json({ ok: true, ref });
  } catch (e) {
    console.error("[submit] failed", e);
    return NextResponse.json({ ok: false, error: "server" }, { status: 502 });
  }
}
