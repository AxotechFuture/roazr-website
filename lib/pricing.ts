/**
 * Pricing — mirrors the product's own catalog.
 *
 * SOURCE OF TRUTH is `lib/plans.mjs` in the app repo (etin-media-reporting),
 * where prices are "locked 2026-07-10; annual added by founder decision
 * 2026-07-11". The app charges from that file; this file only *displays* the
 * same numbers. If a price changes there, change it here in the same PR —
 * a marketing page that quotes a number checkout won't honour is worse than
 * one that quotes nothing.
 *
 * Until `promoEndsAt` exactly two SKUs are purchasable: founding monthly and
 * founding annual. Both carry every feature and are grandfathered for life
 * while the subscription stays continuous.
 */

export type Currency = "NGN" | "USD";
export type Interval = "month" | "year";

/** Founding promo end — after this the catalog flips to the list price. */
export const PROMO_ENDS_AT = new Date("2027-01-13T00:00:00Z");

/** Full-app trial granted at signup. No card required to start it. */
export const TRIAL_DAYS = 14;

export const plans = {
  /** Founding — Monthly. Rate locked for life while continuously subscribed. */
  foundingMonthly: { usd: 19, ngn: 19_000, interval: "month" as Interval },
  /** Founding — Annual. ~12 months for the price of 10.5. */
  foundingAnnual: { usd: 200, ngn: 200_000, interval: "year" as Interval },
  /** The list price the founding rate is discounted from, and reverts to. */
  list: { usd: 99, ngn: 99_000, interval: "month" as Interval },
} as const;

/**
 * Nigerian visitors are billed in naira by the NG entity, everyone else in
 * dollars by the US entity. Mirrors the app's checkout split so the currency
 * a visitor sees here is the one they are actually charged in.
 */
export const seller = {
  NGN: "Sold by Etin Consult Ltd (Nigeria) · Secure payment via Paystack",
  USD: "Sold by Etin Media, Inc. (US) · Secure payment via Stripe",
} as const;

export const currencySymbol = { NGN: "₦", USD: "$" } as const;

/** Format a plan amount for display, e.g. "₦19,000" / "$19". */
export function price(amount: number, currency: Currency): string {
  return `${currencySymbol[currency]}${amount.toLocaleString("en-US")}`;
}

/** What a year costs at the monthly rate — the annual saving is the gap. */
export function annualSaving(currency: Currency): string {
  const monthly = currency === "NGN" ? plans.foundingMonthly.ngn : plans.foundingMonthly.usd;
  const annual = currency === "NGN" ? plans.foundingAnnual.ngn : plans.foundingAnnual.usd;
  return price(monthly * 12 - annual, currency);
}

/**
 * Everything in the founding plan. Deliberately limited to capabilities that
 * ship today — Google Ads and TikTok sync are on the roadmap, not in the
 * product, and are listed separately as such.
 */
export const included = [
  {
    title: "Meta & Snapchat ad sync",
    body: "Real purchase events sent server-side the moment a sale lands: no browser, no ad blockers, no signal loss.",
  },
  {
    title: "WhatsApp sales attribution",
    body: "Every chat traced to the ad that started it, and every closed sale credited to the right campaign.",
  },
  {
    title: "Full-journey attribution",
    body: "Every touchpoint recorded for every lead, from first click to payment, across a 730-day window fixed from the click.",
  },
  {
    title: "ROAS down to the ad",
    body: "True return by source, campaign, ad set, and individual ad, including the revenue your pixel never saw.",
  },
  {
    title: "Lead CRM & journey timeline",
    body: "Every touchpoint per lead on one timeline, from first click to the payment that closed it.",
  },
  {
    title: "Payments reconciled automatically",
    body: "Paystack, Flutterwave, and Stripe webhooks log the sale and fire the conversion instantly. Selar and Shopify are next.",
  },
  {
    title: "Manual sale logging",
    body: "Close a deal by bank transfer or cash on delivery? Log it and the conversion still reaches Meta, backdated correctly.",
  },
  {
    title: "Unlimited funnels",
    body: "Build any funnel from step blocks (landing, WhatsApp, checkout, call booking) with auto-generated tracking scripts, and no cap on how many you run.",
  },
  {
    title: "AI agent on WhatsApp",
    body: "Ask your numbers in chat, log a sale by text, and work your pipeline. Every change waits for your one-tap confirm.",
  },
  {
    title: "Multi-currency reporting",
    body: "₦, GH₵, KSh, R, $: spend and revenue in the currencies your business actually runs on.",
  },
  {
    title: "Priority WhatsApp support",
    body: "A real person on WhatsApp who connects your accounts with you. No tickets, no bots.",
  },
] as const;

/** Named honestly as roadmap, never mixed into the shipped list above. */
export const roadmap = ["Google Ads sync", "TikTok Events sync", "Pinterest sync"] as const;
