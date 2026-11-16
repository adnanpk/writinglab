"use client";
import { useState } from "react";
import { useApp } from "./Providers";
export default function FaqAccordion() {
  const { t } = useApp();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-h" className="bg-page py-16 sm:py-20">
      <div className="container-x max-w-3xl">
        <h2 id="faq-h" className="text-center text-2xl font-extrabold sm:text-3xl">{t.faq.title}</h2>
        <div className="mt-8 divide-y divide-line rounded-2xl border border-line">
          {t.faq.items.map((it, i) => {
            const on = open === i;
            return (
              <div key={it.q}>
                <h3>
                  <button type="button" id={`faq-b-${i}`} aria-expanded={on} aria-controls={`faq-p-${i}`} onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-start text-sm font-semibold sm:p-5 sm:text-base">
                    {it.q}
                    <svg className={`shrink-0 transition-transform ${on ? "rotate-180" : ""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                  </button>
                </h3>
                <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} hidden={!on} className="px-4 pb-5 text-sm leading-relaxed text-muted sm:px-5">{it.a}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
