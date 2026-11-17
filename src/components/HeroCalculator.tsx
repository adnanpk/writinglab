"use client";
import { useApp } from "./Providers";
import { TIERS, TURNAROUNDS, computeQuote, money, saveBadge, type Currency, type TierId, type TurnId } from "@/lib/pricing";

const Check = () => (
  <svg className="mt-0.5 shrink-0 text-emerald-brand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
);

export default function HeroCalculator() {
  const { t, lang, quote, setQuote, openModal } = useApp();
  const c = t.calc; const p = t.pricing; const pf = t.planFeatures;
  const fmt = (n: number) => money(n, quote.currency, lang);
  const promoTyped = quote.promo.trim().length > 0;
  const base = computeQuote(quote);
  const days = base.hours >= 72 ? `${base.hours / 24} ${c.days}` : `${base.hours} ${c.hours}`;

  return (
    <section id="pricing" aria-labelledby="hero-h1" className="relative overflow-hidden bg-page" style={{ backgroundImage: "radial-gradient(60% 45% at 50% 0%, rgb(var(--accent) / 0.14), transparent 70%)" }}>
      <div className="container-x pb-16 pt-12 sm:pt-16 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-cobalt-fg">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt" aria-hidden="true" />{t.hero.badge}
          </p>
          <h1 id="hero-h1" className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">{t.hero.h1}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">{t.hero.sub}</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
            {t.hero.points.map((x) => (<li key={x} className="flex items-center gap-2"><Check />{x}</li>))}
          </ul>
        </div>

        {/* Price controls: shared by all three plans */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5" role="group" aria-label={p.controls}>
          <div className="grid gap-4 md:grid-cols-[1fr_1.6fr]">
            <div>
              <label htmlFor="words" className="mb-1.5 block text-xs font-semibold text-muted">{c.words}</label>
              <input id="words" type="number" inputMode="numeric" min={0} step={100} className="field" value={quote.words || ""}
                onChange={(e) => setQuote({ words: Math.max(0, Number(e.target.value) || 0) })} aria-describedby="words-hint" />
              <p id="words-hint" className="mt-1 text-[11px] text-muted">{c.wordsHint}</p>
            </div>
            <fieldset>
              <legend className="mb-1.5 text-xs font-semibold text-muted">{c.turn}</legend>
              <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-mist p-1">
                {TURNAROUNDS.map((tu) => {
                  const active = quote.turn === tu.id; const sv = saveBadge(tu.id);
                  return (
                    <label key={tu.id} className={`cursor-pointer rounded-lg px-1 py-2 text-center transition-colors ${active ? "bg-surface shadow ring-1 ring-cobalt" : "hover:bg-surface/60"}`}>
                      <input type="radio" name="turn" className="sr-only" checked={active} onChange={() => setQuote({ turn: tu.id as TurnId })} />
                      <span className="block text-xs font-bold">{c.turnLabels[tu.id]}</span>
                      <span className={`mt-0.5 block text-[10px] font-semibold ${sv ? "text-emerald-brand" : "text-transparent"}`}>{sv ? `${c.save} ${sv}%` : "–"}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
            <div className="min-w-[10rem] flex-1 sm:max-w-xs">
              <label htmlFor="promo" className="mb-1.5 block text-xs font-semibold text-muted">{c.promo}</label>
              <input id="promo" className="field uppercase" value={quote.promo} onChange={(e) => setQuote({ promo: e.target.value })} autoComplete="off" />
              {promoTyped && <p className={`mt-1 text-[11px] font-semibold ${base.promoValid ? "text-emerald-brand" : "text-muted"}`} role="status">{base.promoValid ? `✓ ${c.promoApply} (−${Math.round(base.promoPct * 100)}%)` : c.promoBad}</p>}
            </div>
            <div className="flex rounded-full bg-mist p-1" role="group" aria-label={c.currency}>
              {(["SAR", "USD"] as Currency[]).map((cu) => (
                <button key={cu} type="button" aria-pressed={quote.currency === cu} onClick={() => setQuote({ currency: cu })}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold ${quote.currency === cu ? "bg-cobalt text-white" : "text-muted"}`}>{cu}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Three plans */}
        <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:items-start">
          {TIERS.map((tier) => {
            const r = computeQuote({ ...quote, tier: tier.id });
            const pop = !!tier.popular; const id = tier.id as TierId;
            const feats = pf[id]; const info = t.tiers[id];
            return (
              <article key={id} aria-labelledby={`plan-${id}`} className={`relative flex flex-col rounded-2xl bg-surface p-6 ${pop ? "border-2 border-cobalt shadow-xl shadow-cobalt/10 lg:-mt-3 lg:pb-8" : "border border-line"}`}>
                {pop && <span className="absolute inset-x-0 -top-px mx-auto w-max -translate-y-1/2 rounded-full bg-cobalt px-3.5 py-1 text-[11px] font-bold text-white">{c.popular}</span>}
                <h2 id={`plan-${id}`} className="text-lg font-bold">{info.name}</h2>
                <p className="mt-1 min-h-[2.5rem] text-sm text-muted">{info.tag}</p>
                <p className="mt-5 flex items-baseline gap-1.5" dir="ltr">
                  <span className="font-heading text-4xl font-extrabold tracking-tight">{fmt(r.total)}</span>
                </p>
                <p className="mt-1 text-xs text-muted">{fmt(r.perWord)} / {c.perWord} · {r.words.toLocaleString("en-US")} {p.wordsUnit} · {days}</p>
                <p className="mt-1 min-h-[1rem] text-xs font-semibold text-emerald-brand">
                  {[r.volumePct > 0 && `${c.volume} −${Math.round(r.volumePct * 100)}%`, r.promoValid && `${c.promoLine} −${Math.round(r.promoPct * 100)}%`].filter(Boolean).join(" · ")}
                </p>
                <button type="button" disabled={r.words === 0} onClick={() => { setQuote({ tier: id }); openModal("quote"); }} className={`mt-5 w-full disabled:opacity-50 ${pop ? "btn-primary" : "btn-ghost"}`}>{t.matrix.cta}</button>
                <hr className="my-5 border-line" />
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-muted">{pf.includes[id]}</p>
                <ul className="space-y-2.5 text-sm">
                  {feats.map((f) => (<li key={f} className="flex items-start gap-2.5"><Check />{f}</li>))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs text-muted">{c.note}</p>

        {/* Secondary offers */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {([
            ["sample", p.strip.sample, () => openModal("sample")],
            ["writing", p.strip.writing, () => document.getElementById("writing")?.scrollIntoView({ behavior: "smooth" })],
            ["inst", p.strip.inst, () => openModal("quote")],
          ] as const).map(([k, it, fn]) => (
            <div key={k} className="flex flex-col rounded-2xl border border-line bg-surface p-5">
              <span className="w-max rounded-md bg-mist px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-cobalt-fg">{it.k}</span>
              <h3 className="mt-3 text-base font-bold">{it.t}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{it.d}</p>
              <button type="button" onClick={fn} className="mt-4 self-start text-sm font-semibold text-cobalt-fg hover:underline">{it.cta} →</button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center"><a href="#compare" className="text-sm font-semibold text-cobalt-fg hover:underline">{p.compare} ↓</a></p>
      </div>
    </section>
  );
}
