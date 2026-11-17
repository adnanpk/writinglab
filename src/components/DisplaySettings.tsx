"use client";
import { useEffect, useRef, useState } from "react";
import { useApp, type Accent, type FontSize, type ThemePref } from "./Providers";

const ACCENTS: { id: Accent; hex: string }[] = [
  { id: "violet", hex: "#6954F5" }, { id: "cobalt", hex: "#2563EB" }, { id: "teal", hex: "#0D9488" },
  { id: "rose", hex: "#E11D48" }, { id: "amber", hex: "#B45309" }, { id: "slate", hex: "#334155" },
];
const SIZES: FontSize[] = ["sm", "md", "lg", "xl"];
const THEMES: ThemePref[] = ["auto", "light", "dark"];

export default function DisplaySettings() {
  const { t, lang, prefs, setPref, resetPrefs } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const s = t.settings;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey); document.addEventListener("mousedown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onDown); };
  }, [open]);

  const seg = (active: boolean) =>
    `flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors ${active ? "bg-cobalt text-white" : "text-ink hover:bg-mist"}`;

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="dialog" aria-label={s.open} title={s.open}
        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-ink hover:border-cobalt">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
        </svg>
      </button>
      {open && (
        <div role="dialog" aria-label={s.title} className="fixed inset-x-3 top-[4.5rem] z-50 max-h-[80vh] overflow-y-auto rounded-2xl sm:absolute sm:inset-x-auto sm:end-0 sm:top-12 sm:w-72 border border-line bg-surface p-4 shadow-xl animate-fadeUp">
          <p className="mb-3 font-heading text-sm font-bold">{s.title}</p>

          <p className="mb-1.5 text-xs font-semibold text-muted">{s.lang}</p>
          <div className="mb-4 flex gap-1 rounded-lg bg-mist p-1" role="group" aria-label={s.lang}>
            <button type="button" className={seg(lang === "en")} aria-pressed={lang === "en"} onClick={() => setPref("lang", "en")}>English</button>
            <button type="button" className={seg(lang === "ar")} aria-pressed={lang === "ar"} onClick={() => setPref("lang", "ar")}>العربية</button>
          </div>

          <p className="mb-1.5 text-xs font-semibold text-muted">{s.theme}</p>
          <div className="mb-4 flex gap-1 rounded-lg bg-mist p-1" role="group" aria-label={s.theme}>
            {THEMES.map((m) => (
              <button key={m} type="button" className={seg(prefs.theme === m)} aria-pressed={prefs.theme === m} onClick={() => setPref("theme", m)}>{s[m]}</button>
            ))}
          </div>

          <p className="mb-1.5 text-xs font-semibold text-muted">{s.fontSize}</p>
          <div className="mb-4 flex items-end gap-1 rounded-lg bg-mist p-1" role="group" aria-label={s.fontSize}>
            {SIZES.map((z, i) => (
              <button key={z} type="button" className={seg(prefs.fs === z)} aria-pressed={prefs.fs === z} aria-label={s.sizes[z]} title={s.sizes[z]} onClick={() => setPref("fs", z)}>
                <span style={{ fontSize: 11 + i * 3 }} aria-hidden="true">A</span>
              </button>
            ))}
          </div>

          <p className="mb-1.5 text-xs font-semibold text-muted">{s.accent}</p>
          <div className="mb-4 flex justify-between" role="group" aria-label={s.accent}>
            {ACCENTS.map((a) => (
              <button key={a.id} type="button" onClick={() => setPref("accent", a.id)} aria-pressed={prefs.accent === a.id} aria-label={s.colors[a.id]} title={s.colors[a.id]}
                className={`h-8 w-8 rounded-full border-2 transition-transform ${prefs.accent === a.id ? "scale-110 border-ink" : "border-transparent"}`} style={{ background: a.hex }} />
            ))}
          </div>
          <button type="button" onClick={resetPrefs} className="text-xs font-semibold text-cobalt-fg hover:underline">{s.reset}</button>
        </div>
      )}
    </div>
  );
}
