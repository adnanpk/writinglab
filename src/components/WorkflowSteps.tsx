"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

const FIRST_MS = 350;   // delay before step 1 lights up
const STEP_MS = 850;    // time between steps (the connector line grows in sync)
const HOLD_MS = 3200;   // pause on the completed process, then it replays while visible

/** Process animation: a line travels along the steps, lighting each one in order.
 *  Follows the reading direction (left-to-right in English, right-to-left in Arabic). */
export default function WorkflowSteps() {
  const { t } = useApp();
  const steps = t.flow.steps; const n = steps.length;
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(n);       // number of lit steps; all lit before hydration / no-JS
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (!mq.matches) setActive(0); // start unlit; the replay lights steps as the section scrolls into view
    const h = () => setReduced(mq.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (reduced) { setActive(n); return; }
    if (!visible) return;
    let stop = false; const timers: number[] = [];
    const run = () => {
      setActive(0);
      for (let i = 1; i <= n; i++) timers.push(window.setTimeout(() => !stop && setActive(i), FIRST_MS + (i - 1) * STEP_MS));
      timers.push(window.setTimeout(() => !stop && run(), FIRST_MS + (n - 1) * STEP_MS + HOLD_MS));
    };
    run();
    return () => { stop = true; timers.forEach(clearTimeout); };
  }, [visible, reduced, n]);

  const pct = active <= 1 ? 0 : ((active - 1) / (n - 1)) * 100;
  const dur = active === 0 ? "0ms" : `${STEP_MS}ms`;
  const Dot = () => <span className="absolute end-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-cobalt shadow-[0_0_0_5px_rgb(var(--accent)/0.25)] rtl:-translate-x-1/2" />;

  return (
    <section id="process" aria-labelledby="flow-h" className="bg-mist py-16 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="flow-h" className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t.flow.title}</h2>
            <p className="mt-3 text-muted">{t.flow.sub}</p>
          </div>
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* Horizontal track (desktop): runs from the first to the last step in reading order */}
          <div aria-hidden="true" className="absolute top-[21px] hidden h-[3px] rounded-full bg-line lg:block" style={{ insetInlineStart: "12.5%", insetInlineEnd: "12.5%" }}>
            <div className="relative h-full rounded-full bg-cobalt ease-linear" style={{ width: `${pct}%`, transition: `width ${dur} linear` }}>{pct > 0 && <Dot />}</div>
          </div>
          {/* Vertical track (phones and tablets) */}
          <div aria-hidden="true" className="absolute bottom-6 top-6 w-[3px] rounded-full bg-line lg:hidden" style={{ insetInlineStart: "calc(1.375rem - 1.5px)" }}>
            <div className="relative w-full rounded-full bg-cobalt" style={{ height: `${pct}%`, transition: `height ${dur} linear` }}>
              {pct > 0 && <span className="absolute bottom-0 left-1/2 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-cobalt shadow-[0_0_0_5px_rgb(var(--accent)/0.25)]" />}
            </div>
          </div>

          <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => {
              const on = i < active;
              return (
                <li key={s.t} className="flex gap-4 lg:flex-col lg:items-center lg:text-center" aria-current={i === active - 1 ? "step" : undefined}>
                  <span className={`relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 font-heading text-sm font-bold transition-all duration-500 ${on ? "scale-110 border-cobalt bg-cobalt text-white shadow-lg shadow-cobalt/30" : "border-line bg-surface text-muted"}`}>{i + 1}</span>
                  <div className={`flex-1 rounded-2xl border bg-surface p-5 text-start transition-all duration-700 lg:w-full lg:text-center ${on ? "translate-y-0 border-cobalt/40 opacity-100 shadow-md shadow-cobalt/10" : "translate-y-1.5 border-line opacity-55"}`}>
                    <h3 className="text-base font-bold">{s.t}</h3>
                    <p className="mt-1.5 text-sm text-muted">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
