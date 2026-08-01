import Image from "next/image";

/**
 * The real Roazr brand mark — a forest-green rounded tile with a mint
 * wave. Canonical asset lives in the app repo (rendered on the app's
 * sidebar and auth screen from ucarecdn); this is a local copy at
 * public/brand/roazr-mark.png. The rounded corners and hairline keyline
 * are baked into the PNG — no extra styling needed.
 */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <Image
      src="/brand/roazr-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
    />
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 select-none">
      <Mark />
      {!compact && (
        <span className="text-[1.15rem] font-semibold tracking-tight text-foreground">
          roazr
        </span>
      )}
    </span>
  );
}
