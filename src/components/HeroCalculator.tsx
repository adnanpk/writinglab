"use client";
import { useApp } from "./Providers";
import { TIERS, TURNAROUNDS, computeQuote, money, saveBadge, type Currency, type TierId, type TurnId } from "@/lib/pricing";

export default function HeroCalculator() {
  const { t, lang, quote, setQuote, openModal } = useApp();
  const c = t.calc;
  const r = computeQuote(quote);
  const promoTyped = quote.promo.trim().length > 0;
  const days = r.hours >= 72 ? `${r.hours / 24} ${c.days}` : `${r.hours} ${c.hours}`;
  const fmt = (n: number) => money(n, quote.currency, lang);

  return (
    <section id="pricing" aria-labelledby="hero-h1" className="bg-navy text-white">
      <div className="container-x grid gap-10 py-12 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-brand/15 px-3 py-1 text-xs font-semibold text-sky-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-brand" aria-hidden="true" />{t.hero.badge}
          </p>
          <h1 id="hero-h1" className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{t.hero.h1}</h1>
          <p className="mt-4 max-w-xl text-base text-slate-300">{t.hero.sub}</p>
          <ul className="mt-6 space-y-2.5">
            {t.hero.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-200">
                <svg className="mt-0.5 shrink-0 text-emerald-brand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>{p}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => openModal("sample")} className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">{t.hero.sampleCta}</button>
        </div>

        <div className="rounded-2xl bg-surface p-5 text-ink shadow-2xl sm:p-6" role="group" aria-labelledby="calc-title">
          <div className="flex items-center justify-between gap-3">
            <h2 id="calc-title" className="text-lg font-bold">{c.title}</h2>
            <div className="flex rounded-full bg-mist p-1" role="group" aria-label={c.currency}>
              {(["SAR", "USD"] as Currency[]).map((cu) => (
                <button key={cu} type="button" aria-pressed={quote.currency === cu} onClick={() => setQuote({ currency: cu })}
                  className={`rounded-full px-3 py-1 text-xs font-bold ${quote.currency === cu ? "bg-cobalt text-white" : "text-muted"}`}>{cu}</button>
              ))}
            </div>
          </div>

          <fieldset className="mt-4">
            <legend className="mb-2 text-xs font-semibold text-muted">{c.tier}</legend>
            <div className="grid grid-cols-3 gap-2">
              {TIERS.map((tier) => {
                const active = quote.tier === tier.id;
                return (
                  <label key={tier.id} className={`relative cursor-pointer rounded-xl border p-2.5 text-center transition-colors ${active ? "border-cobalt bg-cobalt/10" : "border-line hover:border-cobalt/50"}`}>
                    <input type="radio" name="tier" className="sr-only" checked={active} onChange={() => setQuote({ tier: tier.id as TierId })} />
                    {tier.popular && <span className="absolute -top-2.5 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-sky-brand px-2 py-0.5 text-[10px] font-bold text-navy rtl:translate-x-1/2">{c.popular}</span>}
                    <span className="block text-xs font-bold leading-tight">{t.tiers[tier.id].name}</span>
                    <span className="mt-1 block text-[11px] text-muted">{c.from} {money(quote.currency === "USD" ? tier.baseSAR / 3.75 : tier.baseSAR, quote.currency, lang)}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4">
            <label htmlFor="words" className="mb-1.5 block text-xs font-semibold text-muted">{c.words}</label>
            <input id="words" type="number" inputMode="numeric" min={0} step={100} className="field" value={quote.words || ""}
              onChange={(e) => setQuote({ words: Math.max(0, Number(e.target.value) || 0) })} aria-describedby="words-hint" />
            <p id="words-hint" className="mt-1 text-[11px] text-muted">{c.wordsHint}</p>
          </div>

          <fieldset className="mt-4">
            <legend className="mb-2 text-xs font-semibold text-muted">{c.turn}</legend>
            <div className="grid grid-cols-4 gap-2">
              {TURNAROUNDS.map((tu) => {
                const active = quote.turn === tu.id; const sv = saveBadge(tu.id);
                return (
                  <label key={tu.id} className={`cursor-pointer rounded-xl border px-1 py-2 text-center ${active ? "border-cobalt bg-cobalt/10" : "border-line hover:border-cobalt/50"}`}>
                    <input type="radio" name="turn" className="sr-only" checked={active} onChange={() => setQuote({ turn: tu.id as TurnId })} />
                    <span className="block text-xs font-bold">{c.turnLabels[tu.id]}</span>
                    <span className={`mt-1 block text-[10px] font-semibold ${sv ? "text-emerald-brand" : "text-muted"}`}>{sv ? `${c.save} ${sv}%` : " "}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-4">
            <label htmlFor="promo" className="mb-1.5 block text-xs font-semibold text-muted">{c.promo}</label>
            <input id="promo" className="field uppercase" value={quote.promo} onChange={(e) => setQuote({ promo: e.target.value })} autoComplete="off" />
            {promoTyped && <p className={`mt-1 text-[11px] font-semibold ${r.promoValid ? "text-emerald-brand" : "text-muted"}`} role="status">{r.promoValid ? `✓ ${c.promoApply} (−${Math.round(r.promoPct * 100)}%)` : c.promoBad}</p>}
          </div>

          <dl className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm" aria-live="polite">
            <div className="flex justify-between"><dt className="text-muted">{fmt(r.perWord)} / {c.perWord}</dt><dd>{fmt(r.subtotal)}</dd></div>
            {r.volumePct > 0 && <div className="flex justify-between text-emerald-brand"><dt>{c.volume}</dt><dd>−{Math.round(r.volumePct * 100)}%</dd></div>}
            {r.promoValid && <div className="flex justify-between text-emerald-brand"><dt>{c.promoLine}</dt><dd>−{Math.round(r.promoPct * 100)}%</dd></div>}
            <div className="flex items-end justify-between pt-1">
              <dt className="font-semibold">{c.total}</dt>
              <dd className="font-heading text-3xl font-extrabold" dir="ltr">{fmt(r.total)}</dd>
            </div>
            <p className="text-xs text-muted">{c.delivery} {days}</p>
          </dl>
          <button type="button" onClick={() => openModal("quote")} disabled={r.words === 0} className="btn-primary mt-4 w-full disabled:opacity-50">{c.cta}</button>
          <p className="mt-2 text-center text-[11px] text-muted">{c.note}</p>
        </div>
      </div>
    </section>
  );
}
