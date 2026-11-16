"use client";
import Logo from "./Logo";
import { useApp } from "./Providers";
import { SITE } from "@/lib/site";

export default function Footer() {
  const { t, openModal } = useApp();
  const f = t.footer;
  const row = (label: string, val: string, href?: string) => (
    <li className="text-sm"><span className="text-slate-400">{label}: </span>
      {val ? (href ? <a className="hover:underline" href={href}><bdi>{val}</bdi></a> : <bdi>{val}</bdi>) : <span className="text-slate-500">{f.soon}</span>}
    </li>
  );
  const socials = Object.entries(SITE.social).filter(([, u]) => u);
  return (
    <footer className="bg-navy text-slate-200">
      <div className="container-x grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm text-slate-400">{f.tag}</p>
        </div>
        <nav aria-label={f.services}>
          <h2 className="mb-3 text-sm font-bold text-white">{f.services}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#pricing" className="hover:underline">{t.nav.pricing}</a></li>
            <li><a href="#compare" className="hover:underline">{t.nav.compare}</a></li>
            <li><a href="#writing" className="hover:underline">{t.nav.writing}</a></li>
            <li><button type="button" onClick={() => openModal("sample")} className="hover:underline">{t.hero.sampleCta}</button></li>
          </ul>
        </nav>
        <nav aria-label={f.legal}>
          <h2 className="mb-3 text-sm font-bold text-white">{f.legal}</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/terms" className="hover:underline">{f.terms}</a></li>
            <li><a href="/privacy" className="hover:underline">{f.privacy}</a></li>
            <li><a href="/refund" className="hover:underline">{f.refund}</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-bold text-white">{f.contact}</h2>
          <ul className="space-y-2">
            {row(f.email, SITE.email, SITE.email ? `mailto:${SITE.email}` : undefined)}
            {row(f.whatsapp, SITE.whatsapp ? `+${SITE.whatsapp}` : "", SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}` : undefined)}
            {row(f.phone, SITE.phone, SITE.phone ? `tel:${SITE.phone}` : undefined)}
            {row(f.address, SITE.address)}
          </ul>
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm" aria-label={f.follow}>
              {socials.map(([k, u]) => (<li key={k}><a className="capitalize hover:underline" href={u} rel="noopener noreferrer" target="_blank">{k}</a></li>))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">© {new Date().getFullYear()} Writing Lab. {f.rights}</div>
    </footer>
  );
}
