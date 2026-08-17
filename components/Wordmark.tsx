import Image from "next/image";

/** Theme-aware Roazr brand mark. */
export function Mark({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex shrink-0">
      <Image
        src="/brand/roazr-mark-dark.png"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="roazr-mark-dark"
      />
      <Image
        src="/brand/roazr-mark-light.png"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="roazr-mark-light"
      />
    </span>
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
