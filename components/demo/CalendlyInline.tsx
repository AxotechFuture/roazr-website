"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Calendly's widget.js only auto-scans for `.calendly-inline-widget` when the
 * document itself loads. This screen mounts long after that (the lead has to
 * finish four form steps first), so we always initialise imperatively via
 * `Calendly.initInlineWidget` instead of relying on the auto-scan, and guard
 * against the script already being present from an earlier mount.
 */
interface CalendlyGlobal {
  initInlineWidget(opts: {
    url: string;
    parentElement: HTMLElement;
    prefill?: Record<string, string>;
  }): void;
}

declare global {
  interface Window {
    Calendly?: CalendlyGlobal;
  }
}

export interface CalendlyPrefill {
  name?: string;
  email?: string;
}

export function CalendlyInline({
  url,
  prefill,
  className = "",
}: {
  url: string;
  prefill?: CalendlyPrefill;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const booted = useRef(false);
  const [failed, setFailed] = useState(false);

  const boot = useCallback(() => {
    if (booted.current || !host.current || !window.Calendly) return;
    booted.current = true;
    setFailed(false);
    window.Calendly.initInlineWidget({
      url,
      parentElement: host.current,
      // Calendly ignores empty strings, so only pass what we actually have.
      prefill: {
        ...(prefill?.name ? { name: prefill.name } : {}),
        ...(prefill?.email ? { email: prefill.email } : {}),
      },
    });
  }, [url, prefill?.name, prefill?.email]);

  // The script may already be loaded (remount, or bfcache restore), in which
  // case next/script fires no onLoad and we boot on mount instead.
  useEffect(() => {
    boot();
  }, [boot]);

  // If the embed never comes up — blocked by an extension, offline, CSP —
  // fall back to a plain link rather than leaving a 700px hole on the page.
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (!host.current?.querySelector("iframe")) setFailed(true);
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className={className}>
      <Script src={WIDGET_SRC} strategy="afterInteractive" onLoad={boot} onError={() => setFailed(true)} />
      <div
        ref={host}
        className="calendly-inline-widget overflow-hidden rounded-2xl border border-line bg-white"
        style={{ minWidth: 320, height: 700 }}
        role="region"
        aria-label="Booking calendar"
      />
      {failed && (
        <p className="mt-3 text-center text-[13.5px] text-muted">
          Calendar not loading?{" "}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline underline-offset-4"
          >
            Open the booking page in a new tab
          </a>
          .
        </p>
      )}
    </div>
  );
}
