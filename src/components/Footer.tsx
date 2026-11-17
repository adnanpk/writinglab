"use client";
import Logo from "./Logo";
import { useApp } from "./Providers";
import { SITE } from "@/lib/site";

export default function Footer() {
  const { t, openModal } = useApp();
  const f = t.footer;
  const row = (label: string, val: string, href?: string) => (
    <li className="text-sm"><span className="text-muted">{label}: </span>
      {val ? (href ? <a className="hover:underline" href={href}><bdi>{val}</bdi></a> : <bdi>{val}</bdi>) : <span className="text-muted/60">{f.soon}</span>}
    </li>
  );
  const socials = Object.entries(SITE.social).filter(([, u]) => u);
  return (
    <footer data-surface="dark" className="overflow-hidden bg-page text-ink">
      <div className="container-x grid gap-10 pb-10 pt-16 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-sm text-muted">{f.tag}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Trust">
            {t.trust.items.slice(0, 2).map((x) => (<li key={x.t} className="rounded-full border border-line px-3 py-1 text-[11px] font-semibold text-muted">{x.t}</li>))}
          </ul>
        </div>
        <nav aria-label={f.services}>
          <h2 className="mb-3 text-sm font-bold">{f.services}</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="#pricing" className="hover:text-ink hover:underline">{t.nav.pricing}</a></li>
            <li><a href="#compare" className="hover:text-ink hover:underline">{t.nav.compare}</a></li>
            <li><a href="#writing" className="hover:text-ink hover:underline">{t.nav.writing}</a></li>
            <li><button type="button" onClick={() => openModal("sample")} className="hover:text-ink hover:underline">{t.hero.sampleCta}</button></li>
          </ul>
        </nav>
        <nav aria-label={f.legal}>
          <h2 className="mb-3 text-sm font-bold">{f.legal}</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li><a href="/terms" className="hover:text-ink hover:underline">{f.terms}</a></li>
            <li><a href="/privacy" className="hover:text-ink hover:underline">{f.privacy}</a></li>
            <li><a href="/refund" className="hover:text-ink hover:underline">{f.refund}</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="mb-3 text-sm font-bold">{f.contact}</h2>
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
      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-line py-5 text-xs text-muted sm:flex-row">
        <span>© {new Date().getFullYear()} Writing Lab. {f.rights}</span>
      </div>
      {/* Oversized wordmark, decorative */}
      <p aria-hidden="true" dir="ltr" className="pointer-events-none -mb-[3vw] select-none whitespace-nowrap text-center font-heading text-[17vw] font-extrabold leading-[0.9] tracking-tight" style={{ backgroundImage: "linear-gradient(to bottom, rgb(var(--accent) / 0.45), transparent 85%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
        Writing Lab
      </p>
    </footer>
  );
}
