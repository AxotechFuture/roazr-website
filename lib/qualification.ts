/**
 * Lead qualification rules.
 *
 * Spend is captured in bands whose edges align with the qualification
 * thresholds, per currency:
 *
 *   band 0: below base threshold            → never qualifies
 *   band 1: base → non-advertiser threshold → qualifies IF running ads
 *   band 2+: at/above non-advertiser bar    → always qualifies
 *
 * Base threshold ("running ads" bar):   NGN ₦100,000 / others $200-equiv.
 * Non-advertiser bar (planned budget):  $500-equiv (NGN ₦750,000).
 *
 * Rates are intentionally coarse — they only shape band labels, and the
 * thresholds themselves were set per-currency by the founder.
 */

export type CurrencyCode =
  | "NGN"
  | "USD"
  | "GHS"
  | "KES"
  | "ZAR"
  | "GBP"
  | "EUR";

export interface CurrencyDef {
  code: CurrencyCode;
  label: string;
  symbol: string;
  /** Band edges: [base, nonAdvertiser, mid, high] in local currency. */
  edges: [number, number, number, number];
}

export const CURRENCIES: CurrencyDef[] = [
  { code: "NGN", label: "Nigerian Naira", symbol: "₦", edges: [100_000, 750_000, 3_000_000, 15_000_000] },
  { code: "USD", label: "US Dollar", symbol: "$", edges: [200, 500, 2_000, 10_000] },
  { code: "GHS", label: "Ghanaian Cedi", symbol: "GH₵", edges: [3_000, 8_000, 30_000, 150_000] },
  { code: "KES", label: "Kenyan Shilling", symbol: "KSh", edges: [25_000, 65_000, 260_000, 1_300_000] },
  { code: "ZAR", label: "South African Rand", symbol: "R", edges: [3_500, 9_000, 36_000, 180_000] },
  { code: "GBP", label: "British Pound", symbol: "£", edges: [160, 400, 1_600, 8_000] },
  { code: "EUR", label: "Euro", symbol: "€", edges: [200, 500, 2_000, 10_000] },
];

export const CURRENCY_CODES = CURRENCIES.map((c) => c.code);

export function getCurrency(code: string): CurrencyDef {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[1];
}

function fmt(symbol: string, n: number): string {
  return `${symbol}${n.toLocaleString("en-US")}`;
}

/** Human-readable labels for the 5 spend bands of a currency. */
export function bandLabels(code: string): string[] {
  const { symbol, edges } = getCurrency(code);
  const [a, b, c, d] = edges;
  return [
    `Under ${fmt(symbol, a)}`,
    `${fmt(symbol, a)} – ${fmt(symbol, b)}`,
    `${fmt(symbol, b)} – ${fmt(symbol, c)}`,
    `${fmt(symbol, c)} – ${fmt(symbol, d)}`,
    `${fmt(symbol, d)}+`,
  ];
}

export const PLATFORMS = ["Meta", "Google", "TikTok", "Other"] as const;
export type Platform = (typeof PLATFORMS)[number];

export const COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United States",
  "United Kingdom",
  "Other",
] as const;

export const DEFAULT_CURRENCY_BY_COUNTRY: Record<string, CurrencyCode> = {
  Nigeria: "NGN",
  Ghana: "GHS",
  Kenya: "KES",
  "South Africa": "ZAR",
  "United States": "USD",
  "United Kingdom": "GBP",
};

export interface LeadInput {
  name: string;
  email: string;
  company: string;
  website?: string;
  country: string;
  whatsapp: string;
  platforms: Platform[];
  runningAds: boolean;
  currency: CurrencyCode;
  spendBand: number; // 0..4
}

export type LeadStatus = "Qualified" | "Unqualified";

/**
 * The qualification decision. Deliberately duplicated nowhere else —
 * the server action is the only caller that matters (client never
 * sees the verdict before the server does).
 */
export function qualify(input: Pick<LeadInput, "runningAds" | "spendBand">): LeadStatus {
  const threshold = input.runningAds ? 1 : 2;
  return input.spendBand >= threshold ? "Qualified" : "Unqualified";
}
