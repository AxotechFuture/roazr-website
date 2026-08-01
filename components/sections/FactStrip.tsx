import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * The closing spec row — the reference's 5-tile stats band, but every
 * tile is a product fact rather than an achievement metric, because we
 * have no aggregate numbers we can honestly claim yet. Each value is
 * verified against the app repo: 730-day attribution window
 * (src/trackers/identity.js), TRIAL_DAYS = 14 with no card, 7-day CAPI
 * backdating clamp (api/_capi.mjs), unlimited funnels on every founding
 * plan (lib/plans.mjs).
 */
const facts = [
  { value: "730 days", label: "Click window remembered" },
  { value: "14 days", label: "Free trial, no card" },
  { value: "7 days", label: "Backdating on Meta CAPI" },
  { value: "Unlimited", label: "Funnels on every plan" },
  { value: "~10 min", label: "Typical setup time" },
] as const;

export function FactStrip() {
  return (
    <section
      aria-label="Roazr at a glance"
      className="border-t border-line bg-wash"
    >
      <div className="container-x py-14">
        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3 lg:grid-cols-5"
          stagger={0.06}
        >
          {facts.map((f) => (
            <RevealItem key={f.label} className="text-center">
              <p className="font-mono text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
                {f.value}
              </p>
              <p className="mx-auto mt-2 max-w-[11rem] text-xs leading-relaxed text-muted">
                {f.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
