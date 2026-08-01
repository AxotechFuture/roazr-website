/**
 * Integration catalogue for /integrations.
 *
 * STATUS TRUTH — verified against the app repo (etin-media-reporting),
 * 2026-08-01. Do not promote a card to "live" without re-verifying:
 *   LIVE:        Meta CAPI, Snapchat, Paystack, Flutterwave, Stripe,
 *                Manual sale logging, WhatsApp Business Cloud API, Calendly
 *   COMING SOON: Google Ads, TikTok, Pinterest, Selar, Shopify
 *
 * Coming-soon copy must stay future-tense — a dimmed card must never
 * read as shipped. Monogram letter tiles only; no third-party logos.
 */

export type IntegrationStatus = "live" | "soon";

export type Integration = {
  name: string;
  monogram: string;
  /** CSS custom property from globals.css, e.g. "var(--meta)". */
  color: string;
  status: IntegrationStatus;
  blurb: string;
  /** Mono micro-line describing the data path (or roadmap state). */
  path: string;
};

export type IntegrationCategory = {
  id: string;
  title: string;
  sub: string;
  items: Integration[];
};

export const categories: IntegrationCategory[] = [
  {
    id: "ad-platforms",
    title: "Ad platforms",
    sub: "Conversions delivered server-side, original click ID attached — not a pixel praying the browser cooperates.",
    items: [
      {
        name: "Meta Conversions API",
        monogram: "M",
        color: "var(--meta)",
        status: "live",
        blurb:
          "Purchases land server-side with the original click ID — WhatsApp and bank-transfer sales included.",
        path: "sale + click ID → Meta CAPI",
      },
      {
        name: "Snapchat",
        monogram: "S",
        color: "var(--snapchat)",
        status: "live",
        blurb:
          "Snap Conversions API, same server-side delivery — Snap's algorithm learns from paid sales, not clicks.",
        path: "sale + click ID → Snap CAPI",
      },
      {
        name: "Google Ads",
        monogram: "G",
        color: "var(--googleads)",
        status: "soon",
        blurb:
          "On the roadmap — nothing syncs today. When it ships, offline conversions will follow the same server-side path.",
        path: "on the roadmap",
      },
      {
        name: "TikTok",
        monogram: "T",
        color: "var(--tiktok)",
        status: "soon",
        blurb:
          "Planned. TikTok's Events API will get the same server-side treatment once this ships.",
        path: "on the roadmap",
      },
      {
        name: "Pinterest",
        monogram: "P",
        color: "var(--pinterest)",
        status: "soon",
        blurb:
          "Planned. Pinterest conversions will ride the same server-side rail when this lands.",
        path: "on the roadmap",
      },
    ],
  },
  {
    id: "payments-stores",
    title: "Payments & stores",
    sub: "Webhooks log the sale the moment it's paid — no thank-you page required.",
    items: [
      {
        name: "Paystack",
        monogram: "P",
        color: "var(--paystack)",
        status: "live",
        blurb:
          "The webhook logs every successful charge as a sale and fires the conversion instantly — naira in, attribution out.",
        path: "payment → sale logged → CAPI",
      },
      {
        name: "Flutterwave",
        monogram: "F",
        color: "var(--flutterwave)",
        status: "live",
        blurb:
          "Same webhook flow: the charge succeeds, the sale is logged, and the ad gets its credit in seconds.",
        path: "payment → sale logged → CAPI",
      },
      {
        name: "Stripe",
        monogram: "S",
        color: "var(--stripe)",
        status: "live",
        blurb:
          "Same webhook flow for card payments — ready the day you start selling beyond the continent.",
        path: "payment → sale logged → CAPI",
      },
      {
        name: "Manual sale logging",
        monogram: "＋",
        color: "var(--accent)",
        status: "live",
        blurb:
          "No webhook? Log the sale in one tap — conversions backdate up to 7 days on Meta's CAPI, so cash and COD still count.",
        path: "one tap → sale logged → CAPI",
      },
      {
        name: "Selar",
        monogram: "S",
        color: "var(--selar)",
        status: "soon",
        blurb:
          "Planned. Selar orders will log as sales automatically once this integration ships.",
        path: "on the roadmap",
      },
      {
        name: "Shopify",
        monogram: "S",
        color: "var(--shopify)",
        status: "soon",
        blurb:
          "Planned. Shopify orders will arrive through the same webhook path as Paystack.",
        path: "on the roadmap",
      },
    ],
  },
  {
    id: "messaging",
    title: "Messaging",
    sub: "Sales that close in a chat still credit the ad that started the conversation.",
    items: [
      {
        name: "WhatsApp Business Cloud API",
        monogram: "W",
        color: "var(--whatsapp)",
        status: "live",
        blurb:
          "Conversations become attributable leads — a sale closed in chat still credits the ad that opened it.",
        path: "chat → lead → journey",
      },
    ],
  },
  {
    id: "scheduling",
    title: "Scheduling",
    sub: "Booked calls land on the lead's timeline, tied to the ad that got them there.",
    items: [
      {
        name: "Calendly",
        monogram: "C",
        color: "var(--calendly)",
        status: "live",
        blurb:
          "Booking pages carry the tracking script, so every booked call becomes an attributed event on the lead's timeline.",
        path: "booking → event → timeline",
      },
    ],
  },
];
