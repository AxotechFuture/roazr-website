import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FactStrip } from "@/components/sections/FactStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { IntegrationCard } from "@/components/integrations/IntegrationCard";
import {
  categories,
  type IntegrationCategory,
} from "@/components/integrations/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Meta CAPI, Snapchat, Paystack, Flutterwave, Stripe, WhatsApp Business, and Calendly: connect once and every sale reports back to the ad that caused it.",
};

/** "2 live · 3 planned" — computed from the catalogue, never hand-typed. */
function countLine(cat: IntegrationCategory): string {
  const live = cat.items.filter((i) => i.status === "live").length;
  const soon = cat.items.length - live;
  return soon > 0 ? `${live} live · ${soon} planned` : `${live} live`;
}

function CategorySection({ cat }: { cat: IntegrationCategory }) {
  return (
    <section id={cat.id} aria-labelledby={`${cat.id}-title`} className="scroll-mt-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="max-w-xl">
          <h2
            id={`${cat.id}-title`}
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {cat.title}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">{cat.sub}</p>
        </div>
        <p className="hidden font-mono text-[11px] uppercase tracking-widest text-muted md:block">
          {countLine(cat)}
        </p>
      </Reveal>

      <RevealGroup
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        stagger={0.06}
      >
        {cat.items.map((item) => (
          <RevealItem key={item.name} className="h-full">
            <IntegrationCard item={item} />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

function MissingStackBand() {
  return (
    <Reveal>
      <div className="panel flex flex-col items-start justify-between gap-6 p-6 sm:p-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Don&rsquo;t see your stack?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            We build integrations in the order founders ask for them. Tell us
            what&rsquo;s missing from your stack and it moves up the queue.
          </p>
        </div>
        <a
          href={`mailto:${site.emails.hello}`}
          className="btn btn-ghost btn-md min-h-11 shrink-0"
        >
          Tell us what you sell with
        </a>
      </div>
    </Reveal>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <Nav />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="orb orb-strong aurora absolute -top-[380px] left-1/2 h-[760px] w-[1040px] -translate-x-1/2" />
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

        {/* ---------- hero ---------- */}
        <div className="container-x relative pt-32 sm:pt-40">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="kicker justify-center">Integrations</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-6xl">
              Plugged into{" "}
              <span className="glow-text bg-gradient-to-r from-accent-strong via-accent to-[var(--grad-tail)] bg-clip-text text-transparent">
                how you actually sell.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Connect the stack once. Every sale (card, bank transfer, or
              WhatsApp) reports back to the ad that caused it.
            </p>

            {/* jump links: the reference's category sidebar, folded into
                the hero because our sections are grouped, not filtered */}
            <nav
              aria-label="Integration categories"
              className="mt-8 flex flex-wrap items-center justify-center gap-2"
            >
              {categories.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-line bg-wash px-4 text-sm text-muted-strong transition-colors hover:border-line-strong hover:text-foreground"
                >
                  {cat.title}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>

        {/* ---------- category sections ---------- */}
        <div className="container-x relative flex flex-col gap-16 pb-24 pt-16 sm:gap-20 sm:pt-20">
          {categories.map((cat) => (
            <CategorySection key={cat.id} cat={cat} />
          ))}
          <MissingStackBand />
        </div>

        <FinalCta />
        <FactStrip />
      </main>
      <Footer />
    </>
  );
}
