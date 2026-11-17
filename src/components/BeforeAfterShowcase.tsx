"use client";
import { useState } from "react";
import { useApp } from "./Providers";
import Reveal from "./Reveal";
import { COMMENTS, ORIGINAL, SEGMENTS } from "@/lib/data";

type Mode = "original" | "tracked" | "clean";
export default function BeforeAfterShowcase() {
  const { t } = useApp();
  const s = t.show;
  const [mode, setMode] = useState<Mode>("tracked");
  const [active, setActive] = useState<number | null>(0);
  const modes: [Mode, string][] = [["original", s.original], ["tracked", s.tracked], ["clean", s.clean]];
  const clean = SEGMENTS.filter((g) => g.k !== "del").map((g) => g.t).join("");

  return (
    <section id="sample" aria-labelledby="show-h" className="bg-mist py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="show-h" className="text-2xl font-extrabold sm:text-3xl">{s.title}</h2>
          <p className="mt-3 text-muted">{s.sub}</p>
        </div>
        </Reveal>
        <Reveal><div className="mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-line bg-surface">
            <div className="flex items-center justify-between gap-2 border-b border-line p-3">
              <div className="flex rounded-full bg-mist p-1" role="tablist" aria-label="View">
                {modes.map(([m, l]) => (
                  <button key={m} role="tab" aria-selected={mode === m} type="button" onClick={() => setMode(m)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ${mode === m ? "bg-cobalt text-white" : "text-muted"}`}>{l}</button>
                ))}
              </div>
              <span className="hidden text-xs text-muted sm:block">manuscript.docx</span>
            </div>
            <div dir="ltr" lang="en" className="p-6 font-serif text-lg leading-relaxed sm:p-10 sm:text-xl">
              {mode === "original" && <p>{ORIGINAL}</p>}
              {mode === "clean" && <p>{clean}</p>}
              {mode === "tracked" && (
                <p>
                  {SEGMENTS.map((g, i) => {
                    if (g.k === "same") return <span key={i}>{g.t}</span>;
                    if (g.k === "del") return <del key={i} className="text-rose-600 decoration-rose-600 dark:text-rose-400">{g.t}</del>;
                    const on = active === g.c;
                    return (
                      <button key={i} type="button" onClick={() => setActive(g.c!)} aria-pressed={on} aria-label={`Change ${g.c! + 1}`}
                        className={`rounded px-0.5 font-serif underline decoration-2 underline-offset-2 ${on ? "bg-emerald-brand/25" : "bg-emerald-brand/10"} text-emerald-700 decoration-emerald-brand dark:text-emerald-300`}>
                        {g.t}<sup className="ms-0.5 text-[10px] font-bold">{g.c! + 1}</sup>
                      </button>
                    );
                  })}
                </p>
              )}
            </div>
            <p className="border-t border-line p-3 text-xs text-muted">{s.hint}</p>
          </div>
          <aside aria-label={s.comments} className="rounded-2xl border border-line bg-surface p-4">
            <h3 className="mb-3 text-sm font-bold">{s.comments}</h3>
            {mode !== "tracked" ? <p className="text-xs text-muted">{s.none}</p> : (
              <ol className="space-y-2">
                {COMMENTS.map((c, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => setActive(i)} className={`w-full rounded-lg border p-3 text-start text-xs leading-relaxed ${active === i ? "border-cobalt bg-cobalt/10" : "border-line"}`}>
                      <span className="mb-1 block font-bold text-cobalt-fg">{s.noteLabel} {i + 1}</span><span dir="ltr" lang="en" className="block text-start">{c}</span>
                    </button>
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </div></Reveal>
      </div>
    </section>
  );
}
