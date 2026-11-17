"use client";
import { useApp } from "./Providers";
import Reveal from "./Reveal";
export default function WorkflowSteps() {
  const { t } = useApp();
  return (
    <section id="process" aria-labelledby="flow-h" className="bg-mist py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="flow-h" className="text-2xl font-extrabold sm:text-3xl">{t.flow.title}</h2>
          <p className="mt-3 text-muted">{t.flow.sub}</p>
        </div>
        </Reveal>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.flow.steps.map((s, i) => (
            <Reveal as="li" key={s.t} delay={i * 90} className="rounded-2xl border border-line bg-surface p-5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-cobalt font-heading text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 text-base font-bold">{s.t}</h3>
              <p className="mt-1.5 text-sm text-muted">{s.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
