// Single source of truth for brand + contact details. Fill the NEXT_PUBLIC_* env vars when ready.
export const SITE = {
  name: "Writing Lab",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
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
