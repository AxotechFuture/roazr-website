/**
 * Central site configuration.
 *
 * ── PLACEHOLDERS TO FILL IN (waiting on real info) ─────────────────
 *  - SCHEDULER_URL: Calendly/Cal.com booking link shown to qualified
 *    leads. While empty, qualified leads see the "we'll reach out on
 *    WhatsApp within 24 hours" variant instead.
 *  - WHATSAPP_NUMBER: E.164 digits only (e.g. "2348012345678"). While
 *    empty, WhatsApp CTAs fall back to email.
 * ───────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Roazr",
  url: "https://roazr.com",
  company: "Etin Media, Inc.",
  tagline: "Every WhatsApp sale, fed back to your ads.",
  description:
    "Roazr connects WhatsApp, website, and payment data to Meta, Google, and TikTok — so ad algorithms optimize for real buyers, not clicks.",
  emails: {
    hello: "hello@roazr.com",
    privacy: "privacy@roazr.com",
  },
  appUrl: "https://app.roazr.com",
  /** PLACEHOLDER — booking link for qualified demo leads. */
  schedulerUrl: "",
  /** PLACEHOLDER — WhatsApp business number, digits only. */
  whatsappNumber: "",
} as const;

export function whatsappLink(text?: string): string | null {
  if (!site.whatsappNumber) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsappNumber}${q}`;
}
