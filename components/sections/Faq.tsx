"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { faqs } from "@/lib/content";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";

function Item({
  q,
  a,
  open,
  onToggle,
  id,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="border-b border-line last:border-b-0">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
      >
        <span className="text-[15.5px] font-medium text-foreground sm:text-base">
          {q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-accent/40 bg-accent/10 text-accent"
              : "border-line text-muted"
          }`}
          aria-hidden="true"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <motion.div
        id={`${id}-panel`}
        role="region"
        aria-hidden={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }
        }
        className="overflow-hidden"
      >
        <p className="max-w-2xl pb-6 text-[14.5px] leading-relaxed text-muted">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <SectionHead
              align="left"
              kicker="FAQ"
              title="Questions, answered"
              sub="Everything else is a 20-minute call away."
            />
          </div>
          <Reveal delay={0.1}>
            <div className="panel px-6 sm:px-8">
              {faqs.map((f, i) => (
                <Item
                  key={f.q}
                  id={`faq-${i}`}
                  q={f.q}
                  a={f.a}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
