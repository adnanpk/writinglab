"use client";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import DisplaySettings from "./DisplaySettings";
import { useApp } from "./Providers";

export default function Navbar() {
  const { t, lang, setPref, openModal } = useApp();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef<HTMLDivElement>(null);
  const links = [
    ["#pricing", t.nav.pricing], ["#compare", t.nav.compare], ["#sample", t.nav.sample],
    ["#process", t.nav.process], ["#writing", t.nav.writing], ["#faq", t.nav.faq],
  ];

  // Scroll progress line + header shadow (rAF-throttled, passive)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${pct})`;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const other = lang === "en" ? { code: "ar" as const, label: "العربية" } : { code: "en" as const, label: "English" };

  return (
    <header className={`sticky top-0 z-40 border-b bg-page/80 backdrop-blur-md transition-shadow duration-300 ${scrolled ? "border-line shadow-md shadow-black/5" : "border-transparent"}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded focus:bg-cobalt focus:px-3 focus:py-2 focus:text-white">{t.nav.skip}</a>
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <a href="/" aria-label="Writing Lab" className="shrink-0 whitespace-nowrap"><Logo /></a>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {links.map(([h, l]) => (<a key={h} href={h} className="text-sm font-medium text-muted transition-colors hover:text-ink">{l}</a>))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Visible language switch (not inside the display settings) */}
          <button type="button" onClick={() => setPref("lang", other.code)} lang={other.code} aria-label={`${t.settings.lang}: ${other.label}`}
            className="inline-flex h-[40px] items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-surface px-[10px] text-sm font-semibold text-ink transition-colors hover:border-cobalt sm:px-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>
            <span className="sm:hidden">{other.code.toUpperCase()}</span><span className="hidden sm:inline">{other.label}</span>
          </button>
          <DisplaySettings />
          <button type="button" onClick={() => openModal("quote")} className="btn-primary hidden whitespace-nowrap !py-2.5 md:inline-flex">{t.nav.quote}</button>
          <button type="button" className="grid h-[40px] w-[40px] place-items-center rounded-full border border-line lg:hidden" aria-expanded={open} aria-label={t.nav.menu} onClick={() => setOpen((o) => !o)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">{open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-line bg-page lg:hidden">
          <div className="container-x flex flex-col py-2">
            {links.map(([h, l]) => (<a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-sm font-medium">{l}</a>))}
            <button type="button" className="btn-primary my-2" onClick={() => { setOpen(false); openModal("quote"); }}>{t.nav.quote}</button>
          </div>
        </nav>
      )}
      <div ref={bar} aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-cobalt rtl:origin-right" style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }} />
    </header>
  );
}
