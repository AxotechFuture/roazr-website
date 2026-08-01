import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CtaBand } from "@/components/sections/CtaBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { JourneyStrip } from "@/components/how-it-works/JourneyStrip";
import { StepSection } from "@/components/how-it-works/StepSection";
import {
  DashboardVisual,
  FunnelStackVisual,
  PaymentsVisual,
  ScriptVisual,
  ServerSideVisual,
} from "@/components/how-it-works/StepVisuals";
import { WhyServerSide } from "@/components/how-it-works/WhyServerSide";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Roazr tracks WhatsApp and bank-transfer sales back to the exact ad — server-side conversions to Meta and Snapchat, from first click to credited sale.",
};

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main className="relative flex-1 overflow-hidden">
        {/* hero backdrop */}
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

        {/* hero + journey strip */}
        <section className="container-x relative pb-8 pt-32 sm:pt-40">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <p className="kicker justify-center">How it works</p>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-6xl">
              From first click to{" "}
              <span className="glow-text bg-gradient-to-r from-accent-strong via-accent to-[var(--grad-tail)] bg-clip-text text-transparent">
                fed algorithm.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              This is the full path a sale takes through Roazr — the click, the
              chat, the payment, and the conversion sent back to Meta and
              Snapchat. Five steps, about ten minutes of setup, no developer.
            </p>
          </Reveal>

          <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
            <JourneyStrip />
          </div>
        </section>

        {/* the five steps */}
        <section className="container-x relative flex flex-col gap-24 py-24 sm:gap-32 sm:py-32">
          <StepSection
            n="01"
            title="Build your funnel from blocks"
            proof="Unlimited funnels · every founding plan"
            body={
              <>
                Every funnel is assembled from step blocks: landing pages —
                sales, VSL, opt-in, webinar, home — a WhatsApp conversation,
                checkout, call booking, qualification, thank-you. Stack them in
                whatever order your sale actually follows — a VSL into a
                WhatsApp chat, an opt-in into a booked call, a sales page
                straight into checkout.
              </>
            }
          >
            <FunnelStackVisual />
          </StepSection>

          <StepSection
            n="02"
            title="Paste the scripts"
            proof="One script per page · Calendly included"
            flip
            body={
              <>
                Each page in your funnel gets an auto-generated script. Paste
                it once, and it captures the ad&rsquo;s click ID the moment
                someone lands — before they chat, pay, or book anything.
                Calendly booking pages are tracked the same way — no developer
                needed.
              </>
            }
          >
            <ScriptVisual />
          </StepSection>

          <StepSection
            n="03"
            title="Sales land, however you close"
            proof="Paystack · Flutterwave · Stripe · manual"
            body={
              <>
                Paystack, Flutterwave and Stripe webhooks log every successful
                payment as a sale the second it happens. Closed in chat or paid
                by bank transfer? One tap logs it manually — and Meta&rsquo;s
                Conversions API accepts conversions backdated up to 7 days, so
                a sale you enter on Friday still counts against
                Tuesday&rsquo;s ad.
              </>
            }
          >
            <PaymentsVisual />
          </StepSection>

          <StepSection
            n="04"
            title="Conversions fire server-side"
            proof="Click ID held up to 730 days"
            flip
            body={
              <>
                Every sale goes to Meta&rsquo;s Conversions API and Snapchat
                with the original click ID attached. There&rsquo;s no browser
                pixel in the path, so WhatsApp and transfer sales aren&rsquo;t
                lost. The click is remembered for up to 730 days, and every
                touchpoint on the lead&rsquo;s journey is recorded along the
                way.
              </>
            }
          >
            <ServerSideVisual />
          </StepSection>

          <StepSection
            n="05"
            title="Read the results in one place"
            body={
              <>
                True ROAS per campaign sits next to what you spent — including
                the sales a pixel never sees. Behind it, a lead CRM holds each
                contact&rsquo;s full journey timeline, from first click to
                payment. Sell in any currency, report in one.
              </>
            }
          >
            <DashboardVisual />
          </StepSection>
        </section>

        <WhyServerSide />

        <CtaBand
          title="Five steps. About ten minutes."
          sub="Create an account, build your first funnel, and paste the scripts — the first events arrive while you’re still on the page."
        />

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
