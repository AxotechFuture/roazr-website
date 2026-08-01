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
  tagline: "Every sale, fed back to your ads.",
  description:
    "Roazr is a full revenue attribution platform. It matches website, payment, call, and WhatsApp sales to the exact ad that caused them, so Meta and Snapchat optimize for real buyers, not clicks.",
  emails: {
    hello: "hello@roazr.com",
    privacy: "privacy@roazr.com",
  },
  appUrl: "https://app.roazr.com",
  /**
   * Self-serve signup entry (create an account in the product).
   *
   * The app is a hash-router SPA (see src/router.jsx in etin-media-reporting),
   * so routes live behind `#/`. The path form `/signup` 404s — verified live.
   * Keep the `#/` in these URLs unless the app gains real server-side routes.
   */
  signupUrl: "https://app.roazr.com/#/signup",
  /** Returning-user sign in. */
  signinUrl: "https://app.roazr.com/#/login",
  /** PLACEHOLDER — booking link for qualified demo leads. */
  schedulerUrl: "",
  /** PLACEHOLDER — WhatsApp business number, digits only. */
  whatsappNumber: "",
  /**
   * Canonical CTA labels. Signup is the primary path, demo the secondary.
   * The trial claim is verified against the app repo (lib/plans.mjs:
   * TRIAL_DAYS = 14, full-app access, no card required) — safe to state.
   */
  cta: {
    signup: "Start 14-day free trial",
    demo: "Book a demo",
    signin: "Sign in",
  },
} as const;

export function whatsappLink(text?: string): string | null {
  if (!site.whatsappNumber) return null;
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/${site.whatsappNumber}${q}`;
}
