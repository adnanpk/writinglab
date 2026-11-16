"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DICT, type Dict, type Lang } from "@/lib/i18n";
import { DEFAULT_QUOTE, type QuoteInput } from "@/lib/pricing";

export type ThemePref = "auto" | "light" | "dark";
export type FontSize = "sm" | "md" | "lg" | "xl";
export type Accent = "cobalt" | "violet" | "teal" | "rose" | "amber" | "slate";
export interface Prefs { lang: Lang; theme: ThemePref; fs: FontSize; accent: Accent }
const DEFAULT_PREFS: Prefs = { lang: "en", theme: "auto", fs: "md", accent: "cobalt" };
export const STORAGE_KEY = "wl-prefs";

interface Ctx {
  t: Dict; lang: Lang; prefs: Prefs; setPref: <K extends keyof Prefs>(k: K, v: Prefs[K]) => void; resetPrefs: () => void;
  quote: QuoteInput; setQuote: (q: Partial<QuoteInput>) => void;
  modal: null | "quote" | "sample"; openModal: (m: "quote" | "sample") => void; closeModal: () => void;
}
const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => { const c = useContext(AppCtx); if (!c) throw new Error("useApp outside provider"); return c; };

function resolveTheme(p: ThemePref) {
  if (p !== "auto") return p;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Providers({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
  const [quote, setQuoteState] = useState<QuoteInput>(DEFAULT_QUOTE);
  const [modal, setModal] = useState<null | "quote" | "sample">(null);
  const [ready, setReady] = useState(false);

  // Load saved prefs; otherwise detect language from the device
  useEffect(() => {
    let saved: Partial<Prefs> = {};
    try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch {}
    const deviceAr = (navigator.languages?.length ? navigator.languages : [navigator.language]).some((l) => l?.toLowerCase().startsWith("ar"));
    setPrefs({ ...DEFAULT_PREFS, lang: deviceAr ? "ar" : "en", ...saved });
    setReady(true);
  }, []);

  // Apply to <html>; "auto" theme follows the device and updates live
  useEffect(() => {
    if (!ready) return;
    const root = document.documentElement;
    const apply = () => root.setAttribute("data-theme", resolveTheme(prefs.theme));
    apply();
    root.setAttribute("data-fs", prefs.fs);
    root.setAttribute("data-accent", prefs.accent);
    root.lang = prefs.lang; root.dir = DICT[prefs.lang].dir;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch {}
    if (prefs.theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [prefs, ready]);

  const setPref = useCallback(<K extends keyof Prefs>(k: K, v: Prefs[K]) => setPrefs((p) => ({ ...p, [k]: v })), []);
  const resetPrefs = useCallback(() => setPrefs((p) => ({ ...DEFAULT_PREFS, lang: p.lang })), []);
  const setQuote = useCallback((q: Partial<QuoteInput>) => setQuoteState((s) => ({ ...s, ...q })), []);
  const value = useMemo<Ctx>(() => ({
    t: DICT[prefs.lang], lang: prefs.lang, prefs, setPref, resetPrefs, quote, setQuote,
    modal, openModal: setModal, closeModal: () => setModal(null),
  }), [prefs, quote, modal, setPref, resetPrefs, setQuote]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
