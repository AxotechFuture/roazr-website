"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Product" },
  { href: "/#testimonials", label: "Customers" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* mobile menu scrim — outside <header> because its backdrop-filter
          creates a containing block that would trap fixed positioning */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/45 md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-line bg-background/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link href="/" aria-label="Roazr home" onClick={() => setOpen(false)}>
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href="/demo" className="btn btn-primary btn-sm">
            Book a demo
          </Link>
        </div>

        {/* mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line text-foreground after:absolute after:-inset-0.5 after:content-['']"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            ) : (
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
        </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="border-b border-line bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-3 text-[15px] text-muted-strong hover:bg-wash-strong"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/demo"
              className="btn btn-primary btn-md mt-3"
              onClick={() => setOpen(false)}
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
