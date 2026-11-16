"use client";
import { useApp } from "./Providers";
export default function Testimonials() {
  const { t } = useApp();
  return (
    <section aria-labelledby="testi-h" className="bg-mist py-16 sm:py-20">
      <div className="container-x">
        <h2 id="testi-h" className="text-center text-2xl font-extrabold sm:text-3xl">{t.testi.title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-xs font-semibold text-amber-700 dark:text-amber-400">{t.testi.placeholder}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.testi.items.map((x) => (
            <figure key={x.n} className="rounded-2xl border border-line bg-surface p-5">
              <blockquote className="text-sm leading-relaxed">“{x.q}”</blockquote>
              <figcaption className="mt-4 text-xs"><span className="font-bold">{x.n}</span><span className="block text-muted">{x.r}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
