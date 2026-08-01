import { Reveal } from "@/components/ui/Reveal";

/**
 * Compact click-to-credited-sale timeline. Five nodes on a single
 * accent rail (horizontal on desktop, left spine on mobile). Pure
 * server markup — the Reveal wrapper is the only animation.
 */

const NODES = [
  { n: "01", label: "Customer taps your ad" },
  { n: "02", label: "They chat on WhatsApp or land on your funnel" },
  { n: "03", label: "They pay: card, transfer, or USSD" },
  { n: "04", label: "Roazr matches the payment to the click" },
  { n: "05", label: "The purchase appears in Ads Manager" },
] as const;

function NodeDot({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-background ${className}`}
      aria-hidden="true"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
    </span>
  );
}

export function JourneyStrip() {
  return (
    <Reveal delay={0.1}>
      <div className="panel px-5 py-7 sm:px-8 sm:py-8">
        <p className="text-center font-mono text-[11px] uppercase tracking-widest text-muted">
          What happens when a customer taps your ad
        </p>

        {/* desktop: horizontal rail */}
        <div className="relative mt-8 hidden md:block">
          <span
            className="absolute left-[9%] right-[9%] top-[7.5px] h-px bg-gradient-to-r from-accent/60 via-accent/25 to-accent/60"
            aria-hidden="true"
          />
          <ol className="grid grid-cols-5 gap-5">
            {NODES.map((node) => (
              <li
                key={node.n}
                className="flex flex-col items-center px-1 text-center"
              >
                <NodeDot />
                <span className="mt-3 font-mono text-[10px] tracking-widest text-accent">
                  {node.n}
                </span>
                <span className="mt-1 text-[13px] leading-snug text-muted-strong">
                  {node.label}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* mobile: vertical spine */}
        <div className="relative mt-7 md:hidden">
          <span
            className="absolute bottom-4 left-[7.5px] top-2 w-px bg-gradient-to-b from-accent/60 via-accent/25 to-accent/60"
            aria-hidden="true"
          />
          <ol className="flex flex-col gap-5">
            {NODES.map((node) => (
              <li key={node.n} className="relative flex gap-4">
                <NodeDot className="mt-0.5" />
                <div className="min-w-0">
                  <p className="font-mono text-[10px] tracking-widest text-accent">
                    {node.n}
                  </p>
                  <p className="mt-0.5 text-[13.5px] leading-snug text-muted-strong">
                    {node.label}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Reveal>
  );
}
