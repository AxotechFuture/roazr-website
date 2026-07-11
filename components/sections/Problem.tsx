import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

function FlowChip({
  label,
  tone = "neutral",
}: {
  label: string;
  tone?: "neutral" | "good" | "bad";
}) {
  const tones = {
    neutral: "border-line bg-wash text-muted-strong",
    good: "signal-live border-accent/30 bg-accent/[0.08] text-accent",
    bad: "signal-lost border-danger-dim/30 bg-danger-dim/[0.07] text-danger",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[11px] ${tones[tone]}`}
    >
      {label}
    </span>
  );
}

/* Arrow + following chip wrap as one unit so a line-break never strands
   a connector pointing at nothing. */
function FlowStep({ children }: { children: React.ReactNode }) {
  return <span className="flex shrink-0 items-center gap-2.5">{children}</span>;
}

function Arrow({
  broken = false,
  flow = false,
}: {
  broken?: boolean;
  flow?: boolean;
}) {
  return (
    <svg
      width="34"
      height="10"
      viewBox="0 0 34 10"
      fill="none"
      className={`shrink-0 ${broken ? "signal-lost" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M1 5h26"
        stroke={
          broken
            ? "color-mix(in srgb, var(--danger-dim) 55%, transparent)"
            : flow
              ? "color-mix(in srgb, var(--accent) 50%, transparent)"
              : "color-mix(in srgb, var(--foreground) 25%, transparent)"
        }
        strokeWidth="1.5"
        strokeDasharray={broken ? "3 4" : undefined}
        className={flow ? "arrow-flow" : undefined}
      />
      <path
        d="M27 1.5L32 5l-5 3.5"
        stroke={
          broken
            ? "color-mix(in srgb, var(--danger-dim) 55%, transparent)"
            : flow
              ? "color-mix(in srgb, var(--accent) 50%, transparent)"
              : "color-mix(in srgb, var(--foreground) 25%, transparent)"
        }
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Problem() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          kicker="The problem"
          title={
            <>
              Your ads optimize for clicks.
              <br />
              Your sales happen in{" "}
              <span className="text-[var(--whatsapp)]">WhatsApp</span>.
            </>
          }
          sub="A pixel only sees the browser. The moment your buyer moves to chat — or pays by transfer — the ad platform goes blind. So the algorithm keeps hunting for people who click and ghost, while your real customers stay invisible."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 lg:grid-cols-1">
          <Reveal delay={0.05}>
            <div className="panel relative overflow-hidden p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-widest text-danger">
                  What Meta sees today
                </p>
                <span className="rounded-md border border-danger-dim/25 bg-danger-dim/[0.07] px-2 py-1 font-mono text-[10px] text-danger">
                  0 conversions reported
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <FlowChip label="Ad shown" />
                <FlowStep>
                  <Arrow />
                  <FlowChip label="Click" />
                </FlowStep>
                <FlowStep>
                  <Arrow broken />
                  <FlowChip label="…silence" tone="bad" />
                </FlowStep>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                The customer clicked, chatted, negotiated, and paid ₦68,500 by
                bank transfer. Meta recorded a click that &ldquo;never
                converted&rdquo; — and will now go find more people just like
                the ones who don&rsquo;t buy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="panel relative overflow-hidden border-accent/20 p-6 sm:p-8">
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-[80px]"
                aria-hidden="true"
              />
              <div className="mb-5 flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
                  What actually happened — reported by Roazr
                </p>
                <span className="rounded-md border border-accent/25 bg-accent/[0.08] px-2 py-1 font-mono text-[10px] text-accent">
                  Purchase · ₦68,500 ✓
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <FlowChip label="Ad shown" />
                <FlowStep>
                  <Arrow flow />
                  <FlowChip label="Click" />
                </FlowStep>
                <FlowStep>
                  <Arrow flow />
                  <FlowChip label="WhatsApp chat" />
                </FlowStep>
                <FlowStep>
                  <Arrow flow />
                  <FlowChip label="Transfer received" />
                </FlowStep>
                <FlowStep>
                  <Arrow flow />
                  <FlowChip label="Fed to Meta CAPI" tone="good" />
                </FlowStep>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Roazr connects the click to the conversation to the payment —
                then hands the complete picture back to the algorithm. Now it
                optimizes for buyers, and every naira of ad spend gets smarter.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
