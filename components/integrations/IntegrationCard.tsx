import { SpotlightCard } from "@/components/ui/SpotlightCard";
import type { Integration } from "@/components/integrations/data";

/**
 * Monogram tile — the PlatformChip tile recipe (color-mix 12% bg, 20%
 * border, brand-colored letter) at card scale. The letter color routes
 * through --tile-ink so the light theme can darken bright brand hexes
 * (Snapchat yellow, Shopify green…) that vanish on white; the raw hex
 * is used as-is on the dark theme, matching the hero chips.
 */
function MonogramTile({
  monogram,
  color,
}: {
  monogram: string;
  color: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-[15px] font-bold text-(color:--tile-ink) [--tile-ink:var(--brand)] [html[data-theme=light]_&]:[--tile-ink:color-mix(in_srgb,var(--brand)_58%,#12211b)]"
      style={
        {
          "--brand": color,
          backgroundColor: `color-mix(in srgb, ${color} 12%, transparent)`,
          borderColor: `color-mix(in srgb, ${color} 20%, transparent)`,
        } as React.CSSProperties
      }
    >
      {monogram}
    </span>
  );
}

function StatusBadge({ live }: { live: boolean }) {
  if (live) {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-line bg-wash px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
      Coming soon
    </span>
  );
}

export function IntegrationCard({ item }: { item: Integration }) {
  const live = item.status === "live";

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        {/* Only the tile dims on a planned card. Dimming the whole card
            drags the body copy under 4.5:1 — the badge plus the inert,
            hover-free card already carry the "not yet" signal. */}
        <span className={live ? undefined : "opacity-50 saturate-50"}>
          <MonogramTile monogram={item.monogram} color={item.color} />
        </span>
        <StatusBadge live={live} />
      </div>
      <h3
        className={`mt-4 text-[15px] font-medium ${
          live ? "text-foreground" : "text-muted-strong"
        }`}
      >
        {item.name}
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
        {item.blurb}
      </p>
      <p className="mt-4 border-t border-line pt-3 font-mono text-[10.5px] tracking-wide text-muted">
        {item.path}
      </p>
    </>
  );

  /* Live cards get the hover lift + cursor spotlight; coming-soon cards
     sit dimmed and inert so they can never be mistaken for shipped. */
  return live ? (
    <SpotlightCard className="panel-hover flex h-full flex-col p-6">
      {body}
    </SpotlightCard>
  ) : (
    <div className="panel flex h-full flex-col p-6">{body}</div>
  );
}
