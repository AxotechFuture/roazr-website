export function Mark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="#0A1214" />
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="8.5"
        stroke="white"
        strokeOpacity="0.12"
      />
      {/* signal arcs radiating from the dot — attribution "ping" */}
      <path
        d="M12 21.5c0-4.14 3.36-7.5 7.5-7.5"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M12 16c0-2.9 2.35-5.25 5.25-5.25"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="12" cy="21.5" r="3.1" fill="#FFFFFF" />
    </svg>
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
