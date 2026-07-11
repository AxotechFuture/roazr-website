import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[130px]" />
        <div
          className="grid-bg absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 70%)",
          }}
        />
      </div>

      <div className="container-x relative">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="kicker justify-center">Get started</p>
          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-6xl">
            Stop paying for clicks.
            <br />
            <span className="glow-text bg-gradient-to-r from-accent-strong via-accent to-[var(--grad-tail)] bg-clip-text text-transparent">
              Start paying for customers.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
            See your real ROAS — every WhatsApp sale included. Set it up
            yourself in about 10 minutes, or book a walkthrough and we&rsquo;ll
            do it with you.
          </p>
          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <MagneticLink href={site.signupUrl} className="btn btn-primary btn-lg w-full sm:w-auto">
              {site.cta.signup}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticLink>
            <Link href="/demo" className="btn btn-ghost btn-lg w-full sm:w-auto">
              {site.cta.demo}
            </Link>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">
            10-minute setup · no developer required · a human whenever you want one
          </p>
        </Reveal>
      </div>
    </section>
  );
}
