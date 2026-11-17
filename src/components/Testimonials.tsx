"use client";
import { useApp } from "./Providers";
export default function Testimonials() {
  const { t } = useApp();
  return (
    <section aria-labelledby="testi-h" className="bg-mist py-16 sm:py-24">
      <div className="container-x">
        <h2 id="testi-h" className="mx-auto max-w-2xl text-center text-3xl font-extrabold tracking-tight sm:text-4xl">{t.testi.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-xs font-semibold text-amber-400">{t.testi.placeholder}</p>
      </div>
      <div className="mx-auto mt-10 max-w-6xl">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6" aria-label={t.testi.title}>
          {t.testi.items.map((x) => (
            <li key={x.n} className="w-[85%] shrink-0 snap-start sm:w-[22rem]">
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <div className="flex gap-0.5 text-amber-400" aria-hidden="true">{"★★★★★"}</div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed">“{x.q}”</blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-xs"><span className="font-bold">{x.n}</span><span className="block text-muted">{x.r}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
