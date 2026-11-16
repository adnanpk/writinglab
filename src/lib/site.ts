// Single source of truth for brand + contact details. Fill the NEXT_PUBLIC_* env vars when ready.
// Accepts "example.com", "https://example.com/" etc.; falls back safely so a typo can never break the build.
function normalizeUrl(raw?: string) {
  const v = (raw || "").trim().replace(/\/+$/, "");
  if (!v) return process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000";
  const withProto = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try { return new URL(withProto).origin; } catch { return "http://localhost:3000"; }
}
export const SITE = {
  name: "Writing Lab",
  url: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL),
  email: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/\D/g, ""),
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  social: {
    // add URLs later, e.g. linkedin: "https://linkedin.com/company/..."
    linkedin: "", x: "", instagram: "", facebook: "", youtube: "",
  } as Record<string, string>,
};
export const waLink = (text: string) =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}` : "";
