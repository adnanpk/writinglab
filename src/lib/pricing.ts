// Single source of truth for rates. Base rates copied from the reference page's "From ... /word" prices (SAR).
// Turnaround multipliers are ASSUMPTIONS (the reference page does not show them) - edit freely.
export type TierId = "standard" | "premium" | "pro";
export type TurnId = "24h" | "7d" | "15d";
export type Currency = "SAR" | "USD";

export const TIERS: { id: TierId; baseSAR: number; popular?: boolean }[] = [
  { id: "standard", baseSAR: 0.16 },
  { id: "premium", baseSAR: 0.24, popular: true },
  { id: "pro", baseSAR: 0.75 },
];
// "From" price = slowest turnaround (15 days). Faster delivery costs more.
export const TURNAROUNDS: { id: TurnId; mult: number; hours: number }[] = [
  { id: "24h", mult: 1.5, hours: 24 },
  { id: "7d", mult: 1.2, hours: 168 },
  { id: "15d", mult: 1.0, hours: 360 },
];
export const SAR_PER_USD = 3.75;
export const VOLUME_TIERS = [ // words >= min -> discount
  { min: 50000, pct: 0.15 }, { min: 25000, pct: 0.1 }, { min: 10000, pct: 0.05 },
];
export const PROMOS: Record<string, number> = { WELCOME10: 0.1, LAB15: 0.15 }; // edit/add codes here

export interface QuoteInput { tier: TierId; words: number; turn: TurnId; currency: Currency; promo: string }
export const DEFAULT_QUOTE: QuoteInput = { tier: "premium", words: 5000, turn: "7d", currency: "SAR", promo: "" };

const conv = (sar: number, c: Currency) => (c === "USD" ? sar / SAR_PER_USD : sar);
export const money = (n: number, c: Currency, lang: string) =>
  new Intl.NumberFormat(lang === "ar" ? "ar-SA-u-nu-latn" : "en-US", { style: "currency", currency: c, maximumFractionDigits: 2 }).format(n);

export function computeQuote(q: QuoteInput) {
  const tier = TIERS.find((t) => t.id === q.tier)!;
  const turn = TURNAROUNDS.find((t) => t.id === q.turn)!;
  const words = Math.max(0, Math.floor(q.words || 0));
  const perWordSAR = tier.baseSAR * turn.mult;
  const subtotalSAR = perWordSAR * words;
  const vol = VOLUME_TIERS.find((v) => words >= v.min)?.pct ?? 0;
  const promoPct = PROMOS[q.promo.trim().toUpperCase()] ?? 0;
  const totalSAR = subtotalSAR * (1 - vol) * (1 - promoPct);
  return {
    words, perWord: conv(perWordSAR, q.currency), subtotal: conv(subtotalSAR, q.currency),
    total: conv(totalSAR, q.currency), volumePct: vol, promoPct, promoValid: promoPct > 0,
    hours: turn.hours,
  };
}
/** "Save X%" badge: how much cheaper than the fastest option */
export const saveBadge = (turn: TurnId) => {
  const max = Math.max(...TURNAROUNDS.map((t) => t.mult));
  const m = TURNAROUNDS.find((t) => t.id === turn)!.mult;
  return Math.round((1 - m / max) * 100);
};
