"use client";
import { useApp } from "./Providers";
export default function FreeSample() {
  const { t, openModal } = useApp();
  const s = t.sample;
  return (
    <section aria-labelledby="free-h" className="bg-navy py-14 text-white sm:py-16">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 id="free-h" className="text-2xl font-extrabold sm:text-3xl">{s.title}</h2>
          <p className="mt-3 max-w-xl text-slate-300">{s.sub}</p>
          <button type="button" className="btn-primary mt-6" onClick={() => openModal("sample")}>{s.cta}</button>
        </div>
        <ul className="space-y-3">
          {s.perks.map((p) => (
            <li key={p} className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-sm">
              <svg className="shrink-0 text-emerald-brand" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>{p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
