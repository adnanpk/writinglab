"use client";
import { useState } from "react";
import Logo from "./Logo";
import DisplaySettings from "./DisplaySettings";
import { useApp } from "./Providers";

export default function Navbar() {
  const { t, openModal } = useApp();
  const [open, setOpen] = useState(false);
  const links = [
    ["#pricing", t.nav.pricing], ["#compare", t.nav.compare], ["#sample", t.nav.sample],
    ["#process", t.nav.process], ["#writing", t.nav.writing], ["#faq", t.nav.faq],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/80 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-2 focus:top-2 focus:z-50 focus:rounded focus:bg-cobalt focus:px-3 focus:py-2 focus:text-white">{t.nav.skip}</a>
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <a href="/" aria-label="Writing Lab" className="shrink-0 whitespace-nowrap"><Logo /></a>
        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {links.map(([h, l]) => (<a key={h} href={h} className="text-sm font-medium text-muted hover:text-ink">{l}</a>))}
        </nav>
        <div className="flex items-center gap-2">
          <DisplaySettings />
          <button type="button" onClick={() => openModal("quote")} className="btn-primary hidden whitespace-nowrap !py-2.5 md:inline-flex">{t.nav.quote}</button>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden" aria-expanded={open} aria-label={t.nav.menu} onClick={() => setOpen((o) => !o)}>
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
    </header>
  );
}
