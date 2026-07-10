import { steps } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

/* mini-visuals for each step */

function ConnectVisual() {
  const items = [
    { name: "Meta Ads", on: true },
    { name: "Google Ads", on: true },
    { name: "WhatsApp Business", on: true },
    { name: "Paystack", on: false },
  ];
  return (
    <div className="flex flex-col gap-2">
      {items.map((i) => (
        <div
          key={i.name}
          className="flex items-center justify-between rounded-lg border border-line bg-wash px-3 py-2"
        >
          <span className="text-[12px] text-muted-strong">{i.name}</span>
          {i.on ? (
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Connected
            </span>
          ) : (
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
              <span className="h-3.5 w-6 rounded-full border border-line bg-wash-strong p-[2px]">
                <span className="block h-full w-2 rounded-full bg-foreground/30" />
              </span>
              Connecting…
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function TrackVisual() {
  const links = [
    { k: "Click", v: "fb.1.7291…a4" },
    { k: "Conversation", v: "wa · Adaeze O." },
    { k: "Payment", v: "₦68,500 · transfer" },
  ];
  return (
    <div className="relative flex flex-col gap-2">
      <span
        className="absolute bottom-5 left-[13px] top-5 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-accent/60"
        aria-hidden="true"
      />
      {links.map((l) => (
        <div
          key={l.k}
          className="relative flex items-center gap-3 rounded-lg border border-line bg-wash px-3 py-2"
        >
          <span className="relative z-10 flex h-2 w-2 shrink-0 items-center justify-center">
            <span className="h-2 w-2 rounded-full border border-accent bg-background" />
          </span>
          <span className="w-24 font-mono text-[10px] uppercase tracking-wider text-muted">
            {l.k}
          </span>
          <span className="truncate font-mono text-[11px] text-muted-strong">{l.v}</span>
          <span className="ml-auto font-mono text-[10px] text-accent">✓</span>
        </div>
      ))}
    </div>
  );
}

function FeedVisual() {
  const rows = [
    { p: "Meta CAPI", e: "Purchase · ₦68,500" },
    { p: "Google Ads", e: "Offline conversion" },
    { p: "TikTok Events", e: "CompletePayment" },
  ];
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r) => (
        <div
          key={r.p}
          className="flex items-center gap-2.5 rounded-lg border border-line bg-wash px-3 py-2"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8h9M8 4.5L11.5 8 8 11.5"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[12px] text-muted-strong">{r.p}</span>
          <span className="ml-auto truncate font-mono text-[10.5px] text-muted">
            {r.e}
          </span>
        </div>
      ))}
    </div>
  );
}

const visuals = [ConnectVisual, TrackVisual, FeedVisual];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          kicker="How it works"
          title="From first click to fed algorithm, in three steps"
          sub="No pixels to debug, no spreadsheets to reconcile, no developer on payroll."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.12}>
          {steps.map((s, i) => {
            const Visual = visuals[i];
            return (
              <RevealItem key={s.n}>
                <SpotlightCard className="panel-hover flex h-full flex-col p-6">
                  <p className="font-mono text-[11px] tracking-widest text-accent">
                    {s.n}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mb-6 mt-2.5 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                  <div className="mt-auto">
                    <Visual />
                  </div>
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
