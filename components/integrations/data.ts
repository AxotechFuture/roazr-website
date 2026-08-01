/**
 * Integration catalogue for /integrations.
 *
 * STATUS TRUTH — verified against the app repo (etin-media-reporting),
 * 2026-08-01. Only shipped integrations appear here at all: the founder
 * removed the coming-soon cards (Aug 2026), so Google Ads, TikTok,
 * Pinterest, Selar and Shopify must NOT be added back until the app
 * actually ships them. Re-verify before adding any card:
 *   LIVE: Meta CAPI, Snapchat, Paystack, Flutterwave, Stripe,
 *         Manual sale logging, WhatsApp Business Cloud API, Calendly
 */

export type IntegrationStatus = "live" | "soon";

import type { BrandKey } from "@/components/brand/BrandIcon";

export type Integration = {
  name: string;
  /** Real brand glyph from components/brand/BrandIcon. */
  icon?: BrandKey;
  /** Fallback tile character for non-brand entries (manual logging). */
  monogram?: string;
  /** CSS custom property from globals.css, e.g. "var(--meta)". */
  color: string;
  status: IntegrationStatus;
  blurb: string;
  /** Mono micro-line describing the data path. */
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
    sub: "Conversions delivered server-side, original click ID attached. Not a pixel praying the browser cooperates.",
    items: [
      {
        name: "Meta Conversions API",
        icon: "meta",
        color: "var(--meta)",
        status: "live",
        blurb:
          "Purchases land server-side with the original click ID, WhatsApp and bank-transfer sales included.",
        path: "sale + click ID → Meta CAPI",
      },
      {
        name: "Snapchat",
        icon: "snapchat",
        color: "var(--snapchat)",
        status: "live",
        blurb:
          "Snap Conversions API, same server-side delivery. Snap's algorithm learns from paid sales, not clicks.",
        path: "sale + click ID → Snap CAPI",
      },
    ],
  },
  {
    id: "payments-stores",
    title: "Payments & stores",
    sub: "Webhooks log the sale the moment it's paid, no thank-you page required.",
    items: [
      {
        name: "Paystack",
        icon: "paystack",
        color: "var(--paystack)",
        status: "live",
        blurb:
          "The webhook logs every successful charge as a sale and fires the conversion instantly: naira in, attribution out.",
        path: "payment → sale logged → CAPI",
      },
      {
        name: "Flutterwave",
        icon: "flutterwave",
        color: "var(--flutterwave)",
        status: "live",
        blurb:
          "Same webhook flow: the charge succeeds, the sale is logged, and the ad gets its credit in seconds.",
        path: "payment → sale logged → CAPI",
      },
      {
        name: "Stripe",
        icon: "stripe",
        color: "var(--stripe)",
        status: "live",
        blurb:
          "Same webhook flow for card payments, ready the day you start selling beyond the continent.",
        path: "payment → sale logged → CAPI",
      },
      {
        name: "Manual sale logging",
        monogram: "＋",
        color: "var(--accent)",
        status: "live",
        blurb:
          "No webhook? Log the sale in one tap. Conversions backdate up to 7 days on Meta's CAPI, so cash and COD still count.",
        path: "one tap → sale logged → CAPI",
      },
    ],
  },
  {
    /* WhatsApp and bookings share a section: as one-card categories they
       each left two thirds of a three-column row empty. */
    id: "conversations",
    title: "WhatsApp & bookings",
    sub: "Sales that close on WhatsApp, and calls booked off an ad, still credit what started them.",
    items: [
      {
        name: "WhatsApp Business Cloud API",
        icon: "whatsapp",
        color: "var(--whatsapp)",
        status: "live",
        blurb:
          "Conversations become attributable leads: a sale closed on WhatsApp still credits the ad that opened it.",
        path: "whatsapp → lead → journey",
      },
      {
        name: "Calendly",
        icon: "calendly",
        color: "var(--calendly)",
        status: "live",
        blurb:
          "Booking pages carry the tracking script, so every booked call becomes an attributed event on the lead's timeline.",
        path: "booking → event → timeline",
      },
    ],
  },
];
