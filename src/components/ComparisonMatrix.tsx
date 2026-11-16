"use client";
import { useApp } from "./Providers";
import { TIERS, money } from "@/lib/pricing";

export default function ComparisonMatrix() {
  const { t, lang, quote, setQuote, openModal } = useApp();
  const m = t.matrix;
  return (
    <section id="compare" aria-labelledby="compare-h" className="bg-page py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="compare-h" className="text-2xl font-extrabold sm:text-3xl">{m.title}</h2>
          <p className="mt-3 text-muted">{m.sub}</p>
        </div>
        <div className="relative mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <caption className="sr-only">{m.title}</caption>
            <thead>
              <tr>
                <th scope="col" className="w-2/5 bg-mist p-4 text-start font-semibold text-muted">{m.feature}</th>
                {TIERS.map((tier) => (
                  <th key={tier.id} scope="col" className={`p-4 text-center align-bottom ${tier.popular ? "bg-cobalt/10" : "bg-mist"}`}>
                    {tier.popular && <span className="mb-1 inline-block rounded-full bg-sky-brand px-2.5 py-0.5 text-[10px] font-bold text-navy">{t.calc.popular}</span>}
                    <span className="block font-heading text-base font-bold">{t.tiers[tier.id].name}</span>
                    <span className="mt-0.5 block text-xs font-normal text-muted">{t.tiers[tier.id].tag}</span>
                    <span className="mt-1 block text-xs font-semibold text-cobalt-fg">{t.calc.from} {money(quote.currency === "USD" ? tier.baseSAR / 3.75 : tier.baseSAR, quote.currency, lang)} / {t.calc.perWord}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m.rows.map((row) => (
                <tr key={row.f} className="border-t border-line">
                  <th scope="row" className="p-4 text-start font-medium">{row.f}</th>
                  {row.v.map((v, i) => (
                    <td key={i} className={`p-4 text-center ${TIERS[i].popular ? "bg-cobalt/5" : ""}`}>
                      {typeof v === "string" ? <span className="text-xs font-semibold">{v}</span>
                        : v ? (<><svg className="mx-auto text-emerald-brand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg><span className="sr-only">{m.yes}</span></>)
                        : (<><span className="text-muted/60" aria-hidden="true">—</span><span className="sr-only">{m.no}</span></>)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-line">
                <td className="p-4" />
                {TIERS.map((tier) => (
                  <td key={tier.id} className={`p-4 text-center ${tier.popular ? "bg-cobalt/5" : ""}`}>
                    <button type="button" className={tier.popular ? "btn-primary" : "btn-ghost"} onClick={() => { setQuote({ tier: tier.id }); openModal("quote"); }}>{m.cta}</button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
