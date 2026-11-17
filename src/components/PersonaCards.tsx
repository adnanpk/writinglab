"use client";
import { useApp } from "./Providers";
import Reveal from "./Reveal";

const ICONS = [
  // graduation cap
  "M3 9l9-5 9 5-9 5-9-5z M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5 M21 9v6",
  // document with pen
  "M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h4",
  // building
  "M4 21V8l8-5 8 5v13 M9 21v-6h6v6 M8 11h.01 M12 11h.01 M16 11h.01",
];

export default function PersonaCards() {
  const { t, openModal } = useApp();
  const ps = t.personas;
  return (
    <section aria-labelledby="persona-h" className="bg-page pb-20 sm:pb-24">
      <div className="container-x">
        <Reveal><div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-cobalt-fg">{ps.eyebrow}</p>
          <h2 id="persona-h" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">{ps.title}</h2>
        </div></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ps.items.map((it, i) => (
            <Reveal key={it.role} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                <div className="grid h-44 place-items-center" style={{ background: "linear-gradient(135deg, rgb(var(--accent) / 0.16), rgb(var(--accent) / 0.04))" }} aria-hidden="true">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-surface text-cobalt-fg shadow-lg shadow-cobalt/20">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={ICONS[i]} /></svg>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-cobalt-fg">{it.role}</p>
                  <h3 className="mt-1.5 text-lg font-bold">{it.t}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted">{it.d}</p>
                  <button type="button" onClick={() => openModal("sample")} className="mt-4 self-start text-sm font-semibold text-cobalt-fg hover:underline">{it.cta} →</button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
