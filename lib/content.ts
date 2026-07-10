/**
 * All landing-page copy lives here so it can be edited without touching
 * components.
 *
 * ── PLACEHOLDER CONTENT (replace before launch) ────────────────────
 *  - `metrics`: swap for real aggregate numbers you can honestly claim.
 *  - `testimonials`: swap for real customers (with permission). The
 *    current entries are representative samples, not real people.
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
    name: "Placeholder — Customer 1",
    role: "Founder, fashion e-commerce brand · Lagos",
  },
  {
    quote:
      "Meta finally optimizes for people who actually pay us on WhatsApp, not people who click and disappear. It's the difference between guessing and knowing.",
    name: "Placeholder — Customer 2",
    role: "Performance lead, electronics retailer · Accra",
  },
  {
    quote:
      "Setup took one call. Now every bank transfer and Paystack payment shows up against the exact ad that brought the customer in.",
    name: "Placeholder — Customer 3",
    role: "Managing director, beauty & wellness brand · Nairobi",
  },
] as const;

export const faqs = [
  {
    q: "What exactly does Roazr do?",
    a: "Roazr is a revenue attribution platform. It matches the sales you close — on WhatsApp, your website, or by bank transfer and Paystack — back to the exact ad that brought each customer in, then sends those real purchase events to Meta, Google, and TikTok through their server-side APIs. The ad platforms' algorithms learn who actually buys from you and optimize toward more of them.",
  },
  {
    q: "Do I need a developer to set it up?",
    a: "No. You connect your ad accounts and payment tools through guided, official integrations — most businesses are live in about ten minutes, and a real human from our team walks you through onboarding.",
  },
  {
    q: "Which platforms does Roazr integrate with?",
    a: "Meta (Facebook & Instagram), Google Ads, TikTok, the WhatsApp Business API, and payment processors such as Paystack. Website and funnel events can be routed in as well.",
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
    a: "Pricing depends on your ad spend and volume. Book a demo and we'll give you an exact number on the call — no surprises.",
  },
] as const;

export const features = [
  {
    title: "Live ROAS, per campaign",
    body: "One dashboard that shows true return on ad spend — including the sales your pixel never saw.",
    key: "roas",
  },
  {
    title: "Server-side event streaming",
    body: "Purchase events delivered straight to Meta CAPI, Google, and TikTok — no browser, no ad blockers, no signal loss.",
    key: "capi",
  },
  {
    title: "WhatsApp conversation attribution",
    body: "Every chat traced to the ad that started it. Every closed sale credited to the right campaign.",
    key: "whatsapp",
  },
  {
    title: "Payment matching",
    body: "Paystack, bank transfer, cash on delivery — revenue reconciled to campaigns automatically.",
    key: "payments",
  },
  {
    title: "Multi-currency reporting",
    body: "₦, GH₵, KSh, R, $ — spend and revenue in the currencies your business actually runs on.",
    key: "currency",
  },
  {
    title: "Human onboarding",
    body: "A real person connects your accounts with you and stays on WhatsApp. No tickets, no bots.",
    key: "human",
  },
] as const;

export const steps = [
  {
    n: "01",
    title: "Connect",
    body: "Link Meta, Google, TikTok, WhatsApp Business, and your payment stack through official integrations. Under ten minutes, no developer.",
  },
  {
    n: "02",
    title: "Track",
    body: "Roazr matches every conversation, checkout, and transfer back to the exact ad and campaign that started it — automatically.",
  },
  {
    n: "03",
    title: "Feed the algorithm",
    body: "Real purchase events flow back to each ad platform. The algorithm learns who actually buys — and goes to find you more of them.",
  },
] as const;
