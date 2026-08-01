import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import {
  type Currency,
  included,
  plans,
  price,
  PROMO_ENDS_AT,
  roadmap,
  TRIAL_DAYS,
} from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "One plan, every feature. Founding rate locked for life. Start with a 14-day free trial, no card required.",
};

const promoEnds = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(PROMO_ENDS_AT);

const promoEndsShort = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(PROMO_ENDS_AT);

const pricingFaqs = [
  {
    q: "What happens when the trial ends?",
    a: `You get the full product for ${TRIAL_DAYS} days without entering a card. When the trial ends you pick a plan to keep going. Nothing is charged automatically, and your data is still there when you subscribe.`,
  },
  {
    q: "What does “locked for life” actually mean?",
    a: `Subscribe before ${promoEnds} and you keep the founding rate for as long as your subscription stays continuous, even after the price goes back to list. Cancel and resubscribe later and you rejoin at whatever the price is then.`,
  },
  {
    q: "Why is the naira price different from the dollar price?",
    a: "Nigerian businesses are billed in naira by our Nigerian entity through Paystack, and everyone else in dollars through Stripe. The prices are set for each market rather than converted, so you are never exposed to an exchange rate we picked.",
  },
  {
    q: "Are there usage limits?",
    a: "No. Unlimited funnels, unlimited tracked events, unlimited ad spend and revenue. The plan is the whole product: we do not meter the thing you are paying us to measure.",
  },
  {
    q: "Can I pay by bank transfer?",
    a: "Yes. Card payment through Paystack or Stripe is the fastest route, but if your business pays by transfer, get in touch and we will set it up manually.",
  },
];

export default async function PricingPage() {
  // Vercel resolves the visitor's country at the edge. Nigerian visitors are
  // billed in naira by the NG entity, so they should see naira first; the
  // in-page toggle overrides this for anyone travelling or using a VPN.
  // Absent header (local dev, direct origin hit) falls back to USD.
  const country = (await headers()).get("x-vercel-ip-country");
  const initialCurrency: Currency = country === "NG" ? "NGN" : "USD";

  return (
    <>
      <Nav />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="orb orb-soft aurora absolute -top-[400px] left-1/2 h-[700px] w-[1000px] -translate-x-1/2" />
          <div
            className="grid-bg absolute inset-x-0 top-0 h-[560px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 70%)",
            }}
          />
        </div>

        {/* ── hero ── */}
        <section className="container-x relative pt-32 sm:pt-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="kicker justify-center">Pricing</p>
            <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl">
              One plan.
              <br />
              <span className="glow-text bg-gradient-to-r from-accent-strong via-accent to-[var(--grad-tail)] bg-clip-text text-transparent">
                Every feature.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              No tiers, no seat counts, no metering the revenue you asked us to
              measure. Start free for {TRIAL_DAYS} days. We only ask for a card
              when you decide to stay.
            </p>
          </div>

          <PricingPlans
            initialCurrency={initialCurrency}
            promoEnds={promoEnds}
            promoEndsShort={promoEndsShort}
          />
        </section>

        {/* ── what's included ── */}
        <section className="container-x relative py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <p className="kicker justify-center">What you get</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
              Everything, on every plan
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted">
              There is no feature behind a higher tier, because there is no
              higher tier.
            </p>
          </div>

          <ul className="mx-auto mt-14 grid max-w-5xl gap-x-10 gap-y-7 sm:grid-cols-2">
            {included.map((f) => (
              <li key={f.title} className="flex gap-3.5">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-accent"
                >
                  <path
                    d="M3 8.5l3.2 3.2L13 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p className="text-[15px] font-medium text-foreground">
                    {f.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {f.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* roadmap — named as roadmap, never mixed into the shipped list */}
          <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-line bg-wash px-6 py-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              On the roadmap, not available yet
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              <span className="text-muted-strong">{roadmap.join(" · ")}</span>.
              Today Roazr syncs conversions to Meta. When these land, they are
              included at no extra cost. That is what buying the whole product
              means.
            </p>
          </div>
        </section>

        {/* ── after the promo ── */}
        <section className="container-x relative pb-24 sm:pb-32">
          <div className="mx-auto max-w-xl rounded-2xl border border-line bg-wash/50 p-7 text-center">
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              After {promoEnds}
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-muted-strong">
              {price(plans.list.usd, "USD")} / {price(plans.list.ngn, "NGN")} per
              month
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              That is the real list price, and where this goes when the founding
              window closes. Subscribe before then and it never applies to you.
            </p>
          </div>
        </section>

        {/* ── pricing FAQ ── */}
        <section className="container-x relative pb-24 sm:pb-32">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="kicker justify-center">Questions</p>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-[2.6rem]">
                Before you subscribe
              </h2>
            </div>
            <dl className="mt-12 divide-y divide-line border-y border-line">
              {pricingFaqs.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-[15px] font-medium text-foreground">
                    {f.q}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── final CTA ── */}
        <section className="container-x relative pb-28 sm:pb-36">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <h2 className="text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-5xl">
              See your real ROAS first.
              <br />
              <span className="glow-text bg-gradient-to-r from-accent-strong via-accent to-[var(--grad-tail)] bg-clip-text text-transparent">
                Then decide.
              </span>
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted">
              {TRIAL_DAYS} days of the full product, no card. If it does not
              show you something your pixel missed, you have lost nothing.
            </p>
            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <a
                href={site.signupUrl}
                rel="noopener"
                className="btn btn-primary btn-lg w-full sm:w-auto"
              >
                {site.cta.signup}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <Link href="/demo" className="btn btn-ghost btn-lg w-full sm:w-auto">
                {site.cta.demo}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
