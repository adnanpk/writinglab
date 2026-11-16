import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["", "/terms", "/privacy", "/refund"].map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, changeFrequency: p ? "yearly" : "weekly", priority: p ? 0.3 : 1 }));
}
