"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useApp } from "./Providers";
import { computeQuote, money } from "@/lib/pricing";
import { SITE, waLink } from "@/lib/site";

type Svc = "edit" | "write";
const MAX = 25 * 1024 * 1024;
const okExt = (n: string) => /\.(docx?|pdf)$/i.test(n);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function LeadUploadModal() {
  const { t, lang, modal, closeModal, quote } = useApp();
  const m = t.modal;
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [svc, setSvc] = useState<Svc>("edit");
  const [v, setV] = useState({ name: "", email: "", whatsapp: "", field: "", journal: "", deadline: "", notes: "" });
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ref, setRef] = useState("");

  const isSample = modal === "sample";
  const fileRequired = isSample || svc === "edit";

  // reset on open, restore focus on close
  useEffect(() => {
    if (!modal) return;
    opener.current = document.activeElement as HTMLElement;
    setStatus("idle"); setTouched({}); setSvc("edit");
    document.body.style.overflow = "hidden";
    setTimeout(() => panel.current?.querySelector<HTMLElement>("input,select,textarea,button")?.focus(), 30);
    return () => { document.body.style.overflow = ""; opener.current?.focus?.(); };
  }, [modal]);

  // Esc + focus trap
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeModal();
      if (e.key !== "Tab" || !panel.current) return;
      const f = panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [modal, closeModal]);

  if (!modal) return null;

  const errors: Record<string, string> = {};
  if (!v.name.trim()) errors.name = m.errName;
  if (!EMAIL.test(v.email.trim())) errors.email = m.errEmail;
  if (file ? (!okExt(file.name) || file.size > MAX) : fileRequired) errors.file = m.errFile;
  if (!consent) errors.consent = m.errConsent;
  const touch = (k: string) => setTouched((s) => ({ ...s, [k]: true }));
  const err = (k: string) => (touched[k] ? errors[k] : undefined);
  const set = (k: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value }));

  const q = computeQuote(quote);
  const summary = `${t.tiers[quote.tier].name} · ${q.words.toLocaleString("en-US")} · ${t.calc.turnLabels[quote.turn]} · ${money(q.total, quote.currency, lang)}`;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, file: true, consent: true });
    if (Object.keys(errors).length) {
      panel.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    setStatus("sending");
    const fd = new FormData();
    fd.set("type", isSample ? "sample" : svc === "write" ? "writing" : "quote");
    Object.entries(v).forEach(([k, val]) => fd.set(k, val));
    fd.set("lang", lang);
    if (!isSample) fd.set("quote", JSON.stringify({ ...quote, ...q, label: summary }));
    if (file) fd.set("file", file);
    try {
      const res = await fetch("/api/submit", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("fail");
      setRef(data.ref); setStatus("done");
    } catch { setStatus("error"); }
  }

  const label = "mb-1.5 block text-xs font-semibold";
  const errCls = "mt-1 text-xs font-medium text-rose-600 dark:text-rose-400";
  const wa = waLink(`Hi Writing Lab, my reference is ${ref}`);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="presentation">
      <div className="absolute inset-0 bg-slate-950/60" onClick={closeModal} aria-hidden="true" />
      <div ref={panel} role="dialog" aria-modal="true" aria-labelledby="modal-title"
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-2xl animate-fadeUp sm:max-w-xl sm:rounded-2xl sm:p-7">
        <button type="button" onClick={closeModal} aria-label={m.close} className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full hover:bg-mist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>

        {status === "done" ? (
          <div className="py-6 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-brand/15 text-emerald-brand">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
            </span>
            <h2 id="modal-title" className="mt-4 text-xl font-extrabold" tabIndex={-1}>{m.thanksTitle}</h2>
            <p className="mt-2 text-sm text-muted">{m.thanksBody}</p>
            <p className="mt-4 text-xs text-muted">{m.ref}</p>
            <p className="font-heading text-lg font-bold" dir="ltr">{ref}</p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
              {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-ghost">{m.whatsappCta}</a>}
              <button type="button" className="btn-primary" onClick={closeModal}>{m.done}</button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="modal-title" className="pe-10 text-xl font-extrabold">{isSample ? m.sampleTitle : m.quoteTitle}</h2>
            <p className="mt-1 text-sm text-muted">{isSample ? m.sampleSub : m.quoteSub}</p>

            {!isSample && (
              <>
                <div className="mt-4 rounded-xl bg-mist p-3 text-xs"><span className="font-bold">{m.summary}: </span><bdi>{svc === "edit" ? summary : "—"}</bdi></div>
                <fieldset className="mt-4">
                  <legend className={label}>{m.service}</legend>
                  <div className="flex gap-2">
                    {(["edit", "write"] as Svc[]).map((s) => (
                      <label key={s} className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 text-center text-xs font-semibold ${svc === s ? "border-cobalt bg-cobalt/10" : "border-line"}`}>
                        <input type="radio" name="svc" className="sr-only" checked={svc === s} onChange={() => setSvc(s)} />{s === "edit" ? m.svcEdit : m.svcWrite}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className={label}>{m.name}</label>
                <input id="f-name" className="field" autoComplete="name" value={v.name} onChange={set("name")} onBlur={() => touch("name")} aria-invalid={!!err("name")} aria-describedby={err("name") ? "e-name" : undefined} />
                {err("name") && <p id="e-name" className={errCls}>{err("name")}</p>}
              </div>
              <div>
                <label htmlFor="f-email" className={label}>{m.email}</label>
                <input id="f-email" type="email" className="field" autoComplete="email" dir="ltr" value={v.email} onChange={set("email")} onBlur={() => touch("email")} aria-invalid={!!err("email")} aria-describedby={err("email") ? "e-email" : undefined} />
                {err("email") && <p id="e-email" className={errCls}>{err("email")}</p>}
              </div>
              <div>
                <label htmlFor="f-wa" className={label}>{m.whatsapp}</label>
                <input id="f-wa" type="tel" className="field" autoComplete="tel" dir="ltr" placeholder="+966…" value={v.whatsapp} onChange={set("whatsapp")} />
              </div>
              <div>
                <label htmlFor="f-field" className={label}>{m.field}</label>
                <input id="f-field" className="field" value={v.field} onChange={set("field")} />
              </div>
              <div>
                <label htmlFor="f-journal" className={label}>{m.journal}</label>
                <input id="f-journal" className="field" value={v.journal} onChange={set("journal")} />
              </div>
              <div>
                <label htmlFor="f-deadline" className={label}>{m.deadline}</label>
                <input id="f-deadline" type="date" className="field" value={v.deadline} onChange={set("deadline")} />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="f-file" className={label}>{m.file}</label>
              <input id="f-file" type="file" accept=".doc,.docx,.pdf" className="field file:me-3 file:rounded-md file:border-0 file:bg-cobalt file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white"
                onChange={(e) => { setFile(e.target.files?.[0] ?? null); touch("file"); }} aria-invalid={!!err("file")} aria-describedby="f-file-h" />
              <p id="f-file-h" className={err("file") ? errCls : "mt-1 text-xs text-muted"}>{err("file") || m.fileHint}</p>
            </div>
            <div className="mt-4">
              <label htmlFor="f-notes" className={label}>{m.notes}</label>
              <textarea id="f-notes" rows={3} className="field" value={v.notes} onChange={set("notes")} />
            </div>
            <div className="mt-4">
              <label className="flex items-start gap-2 text-xs">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[rgb(var(--accent))]" checked={consent} onChange={(e) => { setConsent(e.target.checked); touch("consent"); }} aria-invalid={!!err("consent")} />
                <span>{m.consent} (<a className="text-cobalt-fg underline" href="/terms" target="_blank">{t.footer.terms}</a> · <a className="text-cobalt-fg underline" href="/privacy" target="_blank">{t.footer.privacy}</a>)</span>
              </label>
              {err("consent") && <p className={errCls}>{err("consent")}</p>}
            </div>

            {status === "error" && (
              <p role="alert" className="mt-4 rounded-lg bg-rose-500/10 p-3 text-xs font-medium text-rose-700 dark:text-rose-300">
                {m.errServer} {SITE.whatsapp && <a className="underline" href={waLink("Hi Writing Lab")}>WhatsApp</a>}
              </p>
            )}
            <button type="submit" disabled={status === "sending"} className="btn-primary mt-5 w-full disabled:opacity-60">{status === "sending" ? m.sending : m.submit}</button>
          </form>
        )}
      </div>
    </div>
  );
}
