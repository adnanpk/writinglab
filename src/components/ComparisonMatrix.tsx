"use client";
import { useState } from "react";
import { useApp } from "./Providers";
import Reveal from "./Reveal";
import { TIERS } from "@/lib/pricing";

export default function ComparisonMatrix() {
  const { t, setQuote, openModal } = useApp();
  const m = t.matrix;
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const toggle = (i: number) => setOpen((o) => ({ ...o, [i]: !o[i] }));
  return (
    <section id="compare" aria-labelledby="compare-h" className="bg-page py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="compare-h" className="text-3xl font-extrabold tracking-tight sm:text-4xl">{m.title}</h2>
          <p className="mt-3 text-muted">{m.sub}</p>
        </div>
        </Reveal>
        <Reveal><div className="relative mt-10 overflow-x-auto rounded-2xl border border-line bg-surface">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <caption className="sr-only">{m.title}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-[40%] p-5 text-start align-bottom text-base font-bold">{m.feature}</th>
                {TIERS.map((tier) => (
                  <th key={tier.id} scope="col" className="p-5 text-center align-bottom">
                    <span className="block font-heading text-sm font-bold">{t.tiers[tier.id].name}</span>
                    {tier.popular && <span className="mt-1 inline-block rounded-full bg-cobalt/15 px-2.5 py-0.5 text-[10px] font-bold text-cobalt-fg">{t.calc.popular}</span>}
                    <button type="button" className={`mt-3 !px-4 !py-2 !text-xs ${tier.popular ? "btn-primary" : "btn-ghost"}`} onClick={() => { setQuote({ tier: tier.id }); openModal("quote"); }}>{m.cta}</button>
                  </th>
                ))}
              </tr>
            </thead>
            {m.groups.map((grp, gi) => (
              <tbody key={grp.g} className="border-t border-line">
                <tr>
                  <th colSpan={4} scope="colgroup" className="p-0 text-start">
                    <button type="button" aria-expanded={!!open[gi]} aria-controls={`grp-${gi}`} onClick={() => toggle(gi)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-start font-semibold hover:bg-mist">
                      {grp.g}
                      <svg className={`shrink-0 transition-transform ${open[gi] ? "rotate-180" : ""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
                    </button>
                  </th>
                </tr>
                {grp.rows.map((row, ri) => (
                  <tr key={row.f} id={ri === 0 ? `grp-${gi}` : undefined} hidden={!open[gi]} className="border-t border-line/60">
                    <th scope="row" className="px-5 py-3.5 text-start font-medium text-muted">{row.f}</th>
                    {row.v.map((v, i) => (
                      <td key={i} className="px-5 py-3.5 text-center">
                        {typeof v === "string" ? <span className="text-xs font-semibold">{v}</span>
                          : v ? (<><svg className="mx-auto text-emerald-brand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg><span className="sr-only">{m.yes}</span></>)
                          : (<><span className="text-muted/50" aria-hidden="true">—</span><span className="sr-only">{m.no}</span></>)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div></Reveal>
      </div>
    </section>
  );
}
