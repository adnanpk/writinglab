"use client";
import { useApp } from "./Providers";
export default function WritingServices() {
  const { t, openModal } = useApp();
  const w = t.writing;
  return (
    <section id="writing" aria-labelledby="writing-h" className="bg-page py-16 sm:py-20">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="writing-h" className="text-2xl font-extrabold sm:text-3xl">{w.title}</h2>
          <p className="mt-3 text-muted">{w.sub}</p>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {w.items.map((it) => (
            <li key={it.t} className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-base font-bold">{it.t}</h3>
              <p className="mt-1.5 text-sm text-muted">{it.d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 text-center">
          <button type="button" className="btn-primary" onClick={() => openModal("quote")}>{w.cta}</button>
          <p className="mt-3 text-xs text-muted">{w.note}</p>
        </div>
      </div>
    </section>
  );
}
