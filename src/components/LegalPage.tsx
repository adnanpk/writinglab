"use client";
import { useApp } from "./Providers";
export default function LegalPage({ kind }: { kind: "terms" | "privacy" | "refund" }) {
  const { t } = useApp();
  const doc = t.legal[kind];
  return (
    <main id="main" className="container-x max-w-3xl py-12 sm:py-16">
      <a href="/" className="text-sm font-semibold text-cobalt-fg hover:underline">← {t.legal.back}</a>
      <h1 className="mt-4 text-3xl font-extrabold">{doc.title}</h1>
      <p className="mt-1 text-xs text-muted">{t.legal.updated}</p>
      <div className="mt-8 space-y-6">
        {doc.body.map((s) => (<section key={s.h}><h2 className="text-lg font-bold">{s.h}</h2><p className="mt-1.5 leading-relaxed text-muted">{s.p}</p></section>))}
      </div>
    </main>
  );
}
