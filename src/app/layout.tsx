import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, Newsreader, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadUploadModal from "@/components/LeadUploadModal";
import JsonLd from "@/components/JsonLd";
import { organizationLd } from "@/lib/schema";
import { SITE } from "@/lib/site";

const heading = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", display: "swap" });

const TITLE = "Writing Lab | English Editing & Academic Writing by PhD-Qualified Editors";
const DESC = "Publication-ready English editing for research papers and theses. Native-speaker, PhD-qualified subject specialists, instant price calculator, tracked changes, NDA and a free sample edit.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s | Writing Lab" },
  description: DESC,
  applicationName: "Writing Lab",
  keywords: ["English editing", "academic editing", "manuscript editing", "thesis editing", "proofreading", "research paper writing", "تحرير لغوي", "تدقيق لغوي"],
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }, { url: "/icon-512.png", sizes: "512x512", type: "image/png" }], shortcut: "/favicon.svg", apple: "/apple-icon.png" },
  openGraph: { type: "website", siteName: "Writing Lab", title: TITLE, description: DESC, url: "/", locale: "en_US", alternateLocale: ["ar_SA"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = {
  width: "device-width", initialScale: 1,
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#FFFFFF" }, { media: "(prefers-color-scheme: dark)", color: "#080D1A" }],
};

// Runs before paint: applies saved (or device-derived) theme, text size, accent and language - no flash.
const INIT = `(function(){try{var p=JSON.parse(localStorage.getItem('wl-prefs')||'{}');var d=document.documentElement;var th=p.theme||'auto';if(th==='auto')th=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.setAttribute('data-theme',th);d.setAttribute('data-fs',p.fs||'md');d.setAttribute('data-accent',p.accent||'cobalt');var l=p.lang;if(!l){var ls=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];l=ls.some(function(x){return /^ar/i.test(x)})?'ar':'en'}d.lang=l;d.dir=l==='ar'?'rtl':'ltr'}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="light" suppressHydrationWarning className={`${heading.variable} ${body.variable} ${serif.variable} ${arabic.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: INIT }} /></head>
      <body>
        <JsonLd data={organizationLd()} />
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <LeadUploadModal />
        </Providers>
      </body>
    </html>
  );
}
