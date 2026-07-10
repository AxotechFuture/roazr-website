"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Particles } from "@/components/hero/Particles";
import { MagneticLink } from "@/components/ui/MagneticLink";

function Enter({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.85, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-36 sm:pb-24 sm:pt-44">
      {/* backdrop layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="grid-bg absolute inset-x-0 top-0 h-[720px]"
          style={{
            maskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 60% at 50% 0%, black 20%, transparent 70%)",
          }}
        />
        <div className="aurora absolute -top-[280px] left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.13] blur-[140px]" />
        <div className="aurora absolute -left-[200px] top-[180px] h-[420px] w-[560px] rounded-full bg-[var(--aurora-2)] blur-[140px]" style={{ animationDelay: "-8s" }} />
        <div className="aurora absolute -right-[180px] top-[60px] h-[380px] w-[520px] rounded-full bg-accent/[0.07] blur-[120px]" style={{ animationDelay: "-16s" }} />
        <Particles className="absolute inset-x-0 top-0 h-[85%] w-full" />
      </div>

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Enter delay={0}>
            <p className="kicker justify-center">
              Revenue attribution for WhatsApp commerce
            </p>
          </Enter>

          <Enter delay={0.08}>
            <h1 className="mt-5 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
              Every WhatsApp sale,
              <br />
              <span className="glow-text bg-gradient-to-r from-accent-strong via-accent to-[var(--grad-tail)] bg-clip-text text-transparent">
                fed back to your ads.
              </span>
            </h1>
          </Enter>

          <Enter delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Roazr connects WhatsApp, website, and payment data to Meta,
              Google, and TikTok — so their algorithms optimize for real
              buyers, not clicks. Built for businesses that close where their
              customers actually are.
            </p>
          </Enter>

          <Enter delay={0.24} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <MagneticLink href="/demo" className="btn btn-primary btn-lg w-full sm:w-auto">
              Book a demo
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticLink>
            <Link href="/#how-it-works" className="btn btn-ghost btn-lg w-full sm:w-auto">
              See how it works
            </Link>
          </Enter>

          <Enter delay={0.32}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              {["10-minute setup", "No developer required", "Human onboarding"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </Enter>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">
          <HeroVisual />
        </div>
      </div>

      {/* fade into page body */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />
    </section>
  );
}
