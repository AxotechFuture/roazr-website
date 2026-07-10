import { features } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

/* ---------- mini-visuals ---------- */

function RoasVisual() {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="font-mono text-4xl font-semibold tracking-tight text-foreground">
          4.82<span className="text-xl text-muted-strong">x</span>
        </p>
        <p className="mt-1 font-mono text-[11px] text-accent">
          ↑ 38% since connecting Roazr
        </p>
      </div>
      <svg viewBox="0 0 220 64" className="h-16 w-full max-w-[220px]" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="feat-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 54 C 30 50, 45 44, 70 40 S 120 30, 150 22 S 200 10, 220 6 L220 64 L0 64 Z"
          fill="url(#feat-fill)"
        />
        <path
          d="M0 54 C 30 50, 45 44, 70 40 S 120 30, 150 22 S 200 10, 220 6"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="220" cy="6" r="3" fill="var(--accent)" />
      </svg>
    </div>
  );
}

function CapiVisual() {
  const rows = [
    { t: "Purchase · ₦68,500", s: "delivered · 0.4s" },
    { t: "Purchase · ₦124,000", s: "delivered · 0.3s" },
    { t: "InitiateCheckout", s: "delivered · 0.6s" },
  ];
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((r) => (
        <div
          key={r.t}
          className="flex items-center justify-between rounded-lg border border-line bg-wash px-2.5 py-1.5 font-mono text-[10.5px]"
        >
          <span className="text-muted-strong">{r.t}</span>
          <span className="text-accent">✓ {r.s}</span>
        </div>
      ))}
    </div>
  );
}

function WhatsappVisual() {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2 self-start rounded-xl rounded-bl-sm bg-wash-strong px-3 py-2 text-[12px] text-muted-strong">
        I want the one from your ad 🛍️
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-whatsapp/25 bg-whatsapp/[0.07] px-2.5 py-1.5">
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path
            d="M4.5 7.5l3-3M5 3.5h3.5V7"
            stroke="var(--whatsapp)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-[10px] text-accent">
          linked → UGC Video — Lagos broad
        </span>
      </div>
    </div>
  );
}

function PaymentsVisual() {
  const rows = ["Paystack", "Bank transfer", "Cash on delivery"];
  return (
    <div className="flex flex-wrap gap-1.5">
      {rows.map((r) => (
        <span
          key={r}
          className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-wash px-2.5 py-1.5 font-mono text-[10.5px] text-muted-strong"
        >
          <span className="text-accent">✓</span>
          {r}
        </span>
      ))}
    </div>
  );
}

function CurrencyVisual() {
  const symbols = ["₦", "GH₵", "KSh", "R", "$"];
  return (
    <div className="flex items-center gap-2">
      {symbols.map((s, i) => (
        <span
          key={s}
          className={`flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 font-mono text-[13px] font-medium ${
            i === 0
              ? "border-accent/30 bg-accent/10 text-accent"
              : "border-line bg-wash text-muted"
          }`}
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function HumanVisual() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex -space-x-2.5">
        {["E", "K", "T"].map((c, i) => (
          <span
            key={c}
            className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-[12px] font-semibold text-background"
            style={{
              backgroundColor: ["var(--accent)", "var(--whatsapp)", "var(--accent-strong)"][i],
            }}
          >
            {c}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-2 rounded-lg border border-whatsapp/25 bg-whatsapp/[0.07] px-3 py-1.5 font-mono text-[11px] text-accent">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3z"
            stroke="var(--whatsapp)"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
        Your onboarding team, on WhatsApp · replies in minutes
      </span>
    </div>
  );
}

const visualByKey: Record<string, () => React.ReactNode> = {
  roas: RoasVisual,
  capi: CapiVisual,
  whatsapp: WhatsappVisual,
  payments: PaymentsVisual,
  currency: CurrencyVisual,
  human: HumanVisual,
};

const spanByKey: Record<string, string> = {
  roas: "md:col-span-2",
  capi: "",
  whatsapp: "",
  payments: "",
  currency: "",
  human: "md:col-span-3",
};

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          kicker="Product"
          title="Attribution infrastructure, not another dashboard"
          sub="Everything Roazr does exists to answer one question precisely: which ad made you money — and to make sure the algorithm knows it too."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.08}>
          {features.map((f) => {
            const Visual = visualByKey[f.key];
            return (
              <RevealItem key={f.key} className={spanByKey[f.key]}>
                <SpotlightCard className="panel-hover flex h-full flex-col justify-between gap-6 p-6">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {f.body}
                    </p>
                  </div>
                  <Visual />
                </SpotlightCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
