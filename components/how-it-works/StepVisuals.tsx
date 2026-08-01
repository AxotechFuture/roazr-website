import {
  Dashboard,
  PlatformChip,
  type PlatformChipData,
} from "@/components/hero/HeroVisual";

/* ================================================================== */
/* Step 1 — funnel assembled from step blocks                          */
/* ================================================================== */

const FUNNEL_BLOCKS = [
  { n: "01", name: "Landing · VSL page", tag: "page" },
  { n: "02", name: "WhatsApp conversation", tag: "chat" },
  { n: "03", name: "Checkout · Paystack", tag: "payment" },
  { n: "04", name: "Call booking · Calendly", tag: "booking" },
  { n: "05", name: "Thank you", tag: "page" },
] as const;

export function FunnelStackVisual() {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
        <span className="truncate">Funnel · Coaching offer</span>
        <span className="shrink-0 text-accent">5 steps</span>
      </div>
      <div className="relative mt-4 flex flex-col gap-2">
        <span
          className="absolute bottom-5 left-[15.5px] top-5 w-px bg-gradient-to-b from-accent/60 via-accent/30 to-accent/60"
          aria-hidden="true"
        />
        {FUNNEL_BLOCKS.map((b) => (
          <div
            key={b.n}
            className="relative flex items-center gap-3 rounded-lg border border-line bg-wash px-3 py-2"
          >
            <span
              className="relative z-10 h-2 w-2 shrink-0 rounded-full border border-accent bg-background"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] text-muted">{b.n}</span>
            <span className="min-w-0 truncate text-[12px] text-muted-strong">
              {b.name}
            </span>
            <span className="ml-auto shrink-0 rounded border border-line bg-wash-strong px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted">
              {b.tag}
            </span>
            <span className="shrink-0 font-mono text-[10px] text-accent">✓</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Step 2 — per-page tracking script                                   */
/* ================================================================== */

export function ScriptVisual() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
        </span>
        <span className="min-w-0 truncate font-mono text-[10px] text-muted">
          vsl-page · {"<head>"}
        </span>
        <span className="ml-auto shrink-0 rounded-md border border-accent/25 bg-accent/[0.08] px-2 py-1 font-mono text-[9.5px] uppercase tracking-widest text-accent">
          Copied ✓
        </span>
      </div>
      <div className="overflow-x-auto p-4 sm:p-5">
        <pre className="font-mono text-[11.5px] leading-relaxed">
          <code>
            <span className="text-muted">{"<script"}</span>
            {"\n  "}
            <span className="text-muted-strong">src</span>
            <span className="text-muted">=</span>
            <span className="text-accent">
              &quot;https://app.roazr.com/r.js&quot;
            </span>
            {"\n  "}
            <span className="text-muted-strong">data-funnel</span>
            <span className="text-muted">=</span>
            <span className="text-accent">&quot;fnl_2k49xq&quot;</span>
            <span className="text-muted">{"></script>"}</span>
          </code>
        </pre>
      </div>
      <div className="border-t border-line px-4 py-2.5 font-mono text-[10px] text-muted">
        Click ID captured on page load{" "}
        <span className="text-accent">fb.1.7291…a4 ✓</span>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Step 3 — payments logged as sales                                   */
/* ================================================================== */

const PAYMENT_ROWS = [
  { src: "Paystack", via: "webhook", result: "₦68,500 logged" },
  { src: "Flutterwave", via: "webhook", result: "₦124,000 logged" },
  { src: "Stripe", via: "webhook", result: "$86 logged" },
  { src: "Manual entry", via: "one tap", result: "backdated 3 days" },
] as const;

export function PaymentsVisual() {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
        <span>Sales log</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Today
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {PAYMENT_ROWS.map((r) => (
          <div
            key={r.src}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-wash px-3 py-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="shrink-0"
            >
              <path
                d="M2 8h9M8 4.5L11.5 8 8 11.5"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="min-w-0 truncate text-[12px] text-muted-strong">
              {r.src}
              <span className="ml-1.5 font-mono text-[10px] text-muted">
                {r.via}
              </span>
            </span>
            <span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted">
              {r.result} <span className="text-accent">✓</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/* Step 4 — server-side delivery to Meta CAPI + Snapchat               */
/* ================================================================== */

/* Only the two destinations that ship today. Google Ads and TikTok
   are roadmap and deliberately absent — this mock must not imply a
   sync that does not exist yet. */
/* These chips sit on a themed page rather than inside a dark-pinned
   mock, so they pass the `ink` token — Snapchat's yellow is unreadable
   on the light theme's white panels. */
const DESTINATIONS: PlatformChipData[] = [
  {
    icon: "meta",
    color: "var(--meta)",
    ink: "var(--meta-ink)",
    name: "Meta CAPI",
    status: "Purchase · ₦68,500",
  },
  {
    icon: "snapchat",
    color: "var(--snapchat)",
    ink: "var(--snapchat-ink)",
    name: "Snapchat",
    status: "Conversion sent",
  },
];

export function ServerSideVisual() {
  return (
    <div className="panel p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted">
        <span>Conversion delivery</span>
        <span className="shrink-0 text-accent">Server-side</span>
      </div>

      {/* source event */}
      <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-accent/25 bg-accent/[0.08] px-3 py-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="var(--accent)" strokeWidth="1.5" />
            <path
              d="M4.5 7.2l1.8 1.8 3.2-3.8"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12px] font-medium text-foreground">
            Sale logged
          </p>
          <p className="truncate font-mono text-[10px] text-muted">
            ₦68,500 · transfer · click ID fb.1.7291…a4
          </p>
        </div>
      </div>

      {/* fan-out: one trunk, an elbow tick into each destination */}
      <div className="relative mt-2.5 flex flex-col gap-2.5 pl-8">
        <span
          className="absolute -top-2.5 bottom-[26px] left-[19px] w-px bg-gradient-to-b from-accent/50 to-accent/30"
          aria-hidden="true"
        />
        {DESTINATIONS.map((p) => (
          <div key={p.name} className="relative">
            <span
              className="absolute -left-[13px] top-1/2 h-px w-[13px] bg-accent/40"
              aria-hidden="true"
            />
            <PlatformChip p={p} />
          </div>
        ))}
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted">
        No browser pixel · click held up to 730 days
      </p>
    </div>
  );
}

/* ================================================================== */
/* Step 5 — the dashboard itself                                       */
/* ================================================================== */

export function DashboardVisual() {
  return (
    <div className="relative">
      {/* soft glow behind the window — .orb only, never filter:blur */}
      <div
        className="orb orb-strong absolute -inset-x-6 top-8 -z-10 h-[85%]"
        aria-hidden="true"
      />
      {/* the mock hard-codes dark surfaces, so pin it dark in both themes */}
      <div className="theme-dark-pin">
        <div className="h-[400px]">
          <Dashboard compact />
        </div>
      </div>
    </div>
  );
}
