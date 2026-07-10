"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const light = useSyncExternalStore(
    subscribe,
    () => document.documentElement.dataset.theme === "light",
    () => false,
  );

  const toggle = () => {
    if (light) {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = "light";
    }
    try {
      localStorage.setItem("roazr-theme", light ? "dark" : "light");
    } catch {
      /* private browsing */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      title={light ? "Dark mode" : "Light mode"}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-colors after:absolute after:-inset-0.5 after:content-[''] hover:bg-wash hover:text-foreground ${className}`}
    >
      {light ? (
        // moon — offer dark
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // sun — offer light
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
