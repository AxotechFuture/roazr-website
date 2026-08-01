import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * One alternating two-column walkthrough row: numbered copy on one
 * side, a mock visual on the other. Text always stacks first on
 * mobile; `flip` swaps the columns from lg up.
 */
export function StepSection({
  n,
  title,
  body,
  proof,
  flip = false,
  children,
}: {
  n: string;
  title: string;
  body: ReactNode;
  proof?: string;
  flip?: boolean;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className={flip ? "lg:order-2" : undefined}>
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Step {n}
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-muted">
            {body}
          </p>
          {proof && (
            <p className="mt-5 font-mono text-[11px] uppercase tracking-widest text-muted">
              {proof}
            </p>
          )}
        </div>
        <div className={flip ? "min-w-0 lg:order-1" : "min-w-0"}>{children}</div>
      </div>
    </Reveal>
  );
}
