"use client";
import { useApp } from "./Providers";
import { SEGMENTS } from "@/lib/data";
import Reveal from "./Reveal";

export default function FinalCta() {
  const { t, openModal } = useApp();
  const c = t.cta;
  return (
    <section aria-labelledby="cta-h" className="relative overflow-hidden bg-mist pt-20 sm:pt-28" style={{ backgroundImage: "radial-gradient(50% 60% at 50% 100%, rgb(var(--accent) / 0.35), transparent 70%)" }}>
      <Reveal className="container-x text-center">
        <h2 id="cta-h" className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">{c.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">{c.sub}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button type="button" className="btn-primary" onClick={() => openModal("sample")}>{c.primary}</button>
          <button type="button" className="btn-ghost" onClick={() => openModal("quote")}>{c.secondary}</button>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label={t.sample.title}>
          {t.sample.perks.map((x) => (
            <li key={x} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-muted">
              <svg className="text-emerald-brand" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>{x}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">{c.note}</p>
      </Reveal>
      {/* Product-style preview: a tracked-changes document window */}
      <Reveal className="container-x mt-14">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-t-2xl border border-b-0 border-line bg-surface shadow-2xl shadow-cobalt/20" aria-hidden="true">
          <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ms-3 text-xs font-semibold text-muted" dir="ltr">manuscript.docx · Track Changes</span>
          </div>
          <p dir="ltr" lang="en" className="p-6 font-serif text-base leading-relaxed sm:p-8 sm:text-lg">
            {SEGMENTS.map((g, i) => g.k === "same" ? <span key={i}>{g.t}</span>
              : g.k === "del" ? <del key={i} className="text-rose-600 decoration-rose-600 dark:text-rose-400 dark:decoration-rose-400">{g.t}</del>
              : <span key={i} className="rounded bg-emerald-brand/15 px-0.5 text-emerald-700 underline dark:text-emerald-300 decoration-emerald-brand decoration-2 underline-offset-2">{g.t}</span>)}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
