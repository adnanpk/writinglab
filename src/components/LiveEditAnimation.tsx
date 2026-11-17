"use client";
import { useEffect, useState } from "react";
import { useApp } from "./Providers";
import Reveal from "./Reveal";
import { SEGMENTS } from "@/lib/data";

// Loops: errors get struck through, corrections appear one by one, then the cycle restarts.
const CHANGES = SEGMENTS.filter((g) => g.k === "ins").length;
const HOLD = 4;
export default function LiveEditAnimation() {
  const { t } = useApp();
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (CHANGES + 1 + HOLD)), 1000);
    return () => clearInterval(id);
  }, [reduced]);

  const applied = reduced ? CHANGES : step; // number of corrections applied so far
  let idx = -1;
  const done = applied >= CHANGES;
  return (
    <section aria-labelledby="live-h" className="bg-page py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="live-h" className="text-2xl font-extrabold sm:text-3xl">{t.live.title}</h2>
          <p className="mt-3 text-muted">{t.live.sub}</p>
        </div>
        </Reveal>
        <Reveal><div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-sm" role="img" aria-label={t.live.replay}>
          <div className="flex items-center gap-2 border-b border-line bg-mist px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /><span className="h-2.5 w-2.5 rounded-full bg-amber-400" /><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ms-3 text-xs font-semibold text-muted">{t.live.replay}</span>
            <span className={`ms-auto rounded-full px-2.5 py-0.5 text-[10px] font-bold ${done ? "bg-emerald-brand/15 text-emerald-brand" : "bg-cobalt/15 text-cobalt-fg"}`}>{done ? t.live.after : t.live.before}</span>
          </div>
          <p dir="ltr" lang="en" aria-hidden="true" className="min-h-[9rem] p-6 font-serif text-lg leading-relaxed sm:p-8 sm:text-xl">
            {SEGMENTS.map((g, i) => {
              if (g.k === "ins") idx += 1;
              if (g.k === "same") return <span key={i}>{g.t}</span>;
              if (g.k === "del") {
                // a deletion is struck through together with the next insertion
                const owner = idx + 1;
                const hit = owner < applied;
                return <span key={i} className={`transition-all duration-500 ${hit ? "bg-rose-500/10 text-rose-600 line-through decoration-2 dark:text-rose-400" : owner === applied && !done ? "bg-amber-400/25" : ""}`}>{g.t}</span>;
              }
              const shown = idx < applied;
              return shown ? <span key={i} className="animate-fadeUp rounded bg-emerald-brand/15 px-0.5 text-emerald-700 dark:text-emerald-300">{g.t}</span> : null;
            })}
          </p>
          <div className="h-1 bg-line"><div className="h-full bg-cobalt transition-all duration-700" style={{ width: `${(applied / CHANGES) * 100}%` }} /></div>
        </div></Reveal>
      </div>
    </section>
  );
}
