/**
 * All landing-page copy lives here so it can be edited without touching
 * components.
 *
 * ── PLACEHOLDER CONTENT (replace before launch) ────────────────────
 *  - `metrics`: swap for real aggregate numbers you can honestly claim.
 *  - `testimonials`: ILLUSTRATIVE — the quotes are representative
 *    samples and the names are invented (founder's display decision,
 *    Aug 2026). They are not real customers. Swap in real, permissioned
 *    testimonials as soon as they exist — fake endorsements are an ad-
 *    account and ARCON/FTC liability if challenged.
 * ───────────────────────────────────────────────────────────────────
 */

export const metrics = [
  { value: 2.1, suffix: "B+", prefix: "₦", label: "Revenue attributed", decimals: 1 },
  { value: 4.3, suffix: "x", prefix: "", label: "Average ROAS after 60 days", decimals: 1 },
  { value: 12, suffix: "M+", prefix: "", label: "Conversion events delivered", decimals: 0 },
  { value: 10, suffix: " min", prefix: "", label: "Average setup time", decimals: 0 },
] as const;

export const testimonials = [
  {
    quote:
      "We were flying blind on ₦4M a month in ad spend. Two weeks after connecting Roazr, we cut two dead campaigns and our cost per real customer dropped by a third.",
    name: "Adaora Nwachukwu",
    role: "Founder, fashion e-commerce brand · Lagos",
  },
  {
    quote:
      "Meta finally optimizes for people who actually pay us on WhatsApp, not people who click and disappear. It's the difference between guessing and knowing.",
    name: "Ifeanyi Okeke",
    role: "Performance lead, electronics retailer · Port Harcourt",
  },
  {
    quote:
      "Setup took one call. Now every bank transfer and Paystack payment shows up against the exact ad that brought the customer in.",
    name: "Aisha Bello",
    role: "Managing director, beauty & wellness brand · Abuja",
  },
] as const;

export const faqs = [
  {
    q: "What exactly does Roazr do?",
    a: "Roazr is a revenue attribution platform. It matches the sales you close — on WhatsApp, your website, or by bank transfer and Paystack — back to the exact ad that brought each customer in, then sends those real purchase events to Meta and Snapchat server-side. Their algorithms learn who actually buys from you and optimize toward more of them. Google Ads, TikTok, and Pinterest sync are on the roadmap.",
  },
  {
    q: "Do I need a developer to set it up?",
    a: "No. You connect your ad accounts and payment tools through guided, official integrations — most businesses are live in about ten minutes, and a real human from our team walks you through onboarding.",
  },
  {
    q: "Which platforms does Roazr integrate with?",
    a: "Conversions sync to Meta — Facebook and Instagram, through the Conversions API — and to Snapchat. On the way in, Roazr connects the WhatsApp Business API, your website and funnels, Calendly booking pages, and payments through Paystack, Flutterwave, and Stripe — plus one-tap manual logging for transfers and cash. Google Ads, TikTok, and Pinterest sync are on the roadmap, with Selar and Shopify next on the payments side — all included at no extra cost when they land.",
  },
  {
    q: "How does WhatsApp attribution actually work?",
    a: "When a customer clicks your ad and starts a WhatsApp conversation, Roazr captures the click identifier and conversation metadata. When that conversation turns into a payment, Roazr matches the transaction to the originating ad and reports the conversion — with real revenue — back to the ad platform.",
  },
  {
    q: "Is my data safe? What do you access?",
    a: "Roazr only reads the data needed for attribution — campaign performance, conversation metadata, and transaction references. We never create, modify, or delete your ads or budgets, and we never message your customers. See our Privacy Policy for the full picture.",
  },
  {
    q: "How is this different from just installing a pixel?",
    a: "A pixel only sees what happens in the browser. Your sales happen in chats and bank apps, where pixels are blind. Roazr closes that loop server-side: it connects the click to the conversation to the payment, then feeds the complete picture back to the algorithm.",
  },
  {
    q: "How much does it cost?",
    a: "One plan with every feature: ₦19,000 a month for Nigerian businesses, or $19 a month everywhere else — down from a $99 list price while the founding window is open, and locked for life if you subscribe before it closes. Annual is ₦200,000 / $200. Start with a 14-day free trial; we only ask for a card when you decide to stay. Full breakdown on the pricing page.",
  },
] as const;

export const features = [
  {
    title: "Know which ads actually make money",
    body: "True ROAS per campaign — including the WhatsApp and transfer sales your pixel never saw. Cut dead campaigns with certainty, scale the winners.",
    key: "roas",
  },
  {
    title: "No more signal loss",
    body: "Purchases reach Meta and Snapchat server-side, with the original click ID attached. No browser pixel in the path — nothing for ad blockers to eat.",
    key: "capi",
  },
  {
    title: "Sales that close in chat still count",
    body: "Each conversation is traced to the ad that started it, and the payment that ends it is credited to that exact campaign.",
    key: "whatsapp",
  },
  {
    title: "Every payment finds its ad",
    body: "Paystack, Flutterwave, and Stripe webhooks log sales the second they're paid. Transfers and cash on delivery take one tap — backdated up to 7 days.",
    key: "payments",
  },
  {
    title: "Sell in any currency, report in one",
    body: "₦, GH₵, KSh, R, $ — revenue converts automatically, so ROAS reads clean in the one currency you actually run the business in.",
    key: "currency",
  },
  {
    title: "A human sets it up with you",
    body: "A real person connects your accounts with you and stays on WhatsApp. No tickets, no bots.",
    key: "human",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Connect",
    body: "Link Meta, Snapchat, WhatsApp Business, and your payment stack through official integrations. Under ten minutes, no developer.",
  },
  {
    n: "02",
    title: "Track",
    body: "Roazr matches every conversation, checkout, and transfer back to the exact ad and campaign that started it — automatically.",
  },
  {
    n: "03",
    title: "Feed the algorithm",
    body: "Real purchase events flow back to Meta and Snapchat the moment they happen. Their algorithms learn who actually buys — and go to find you more of them.",
  },
] as const;
