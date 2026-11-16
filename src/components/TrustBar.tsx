"use client";
import { useApp } from "./Providers";
const ICONS = [
  "M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z M9 12l2 2 4-4",
  "M6 11V8a6 6 0 0 1 12 0v3 M5 11h14v10H5z",
  "M4 4h12l4 4v12H4z M8 13h8 M8 17h5",
  "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6",
];
export default function TrustBar() {
  const { t } = useApp();
  return (
    <section aria-label="Trust" className="border-b border-line bg-mist">
      <div className="container-x grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {t.trust.items.map((it, i) => (
          <div key={it.t} className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-brand/10 text-emerald-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={ICONS[i]} /></svg>
            </span>
            <div><p className="text-sm font-bold">{it.t}</p><p className="text-xs text-muted">{it.d}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
