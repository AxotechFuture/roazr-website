"use client";

import { useState } from "react";
import {
  type Currency,
  type Interval,
  annualSaving,
  plans,
  price,
  seller,
  TRIAL_DAYS,
} from "@/lib/pricing";
import { site } from "@/lib/site";

/** Segmented control. One row of buttons behaving as a radio group. */
function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string }[];
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-full border border-line bg-wash p-1"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={`flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
              active
                ? "bg-accent text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {o.label}
            {o.hint && (
              <span
                className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                  active
                    ? "bg-background/20 text-background"
                    : "bg-accent/10 text-accent"
                }`}
              >
                {o.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function PricingPlans({
  initialCurrency,
  promoEnds,
  promoEndsShort,
}: {
  initialCurrency: Currency;
  promoEnds: string;
  /** Abbreviated form — the badge is too narrow for the long date on mobile. */
  promoEndsShort: string;
}) {
  const [currency, setCurrency] = useState<Currency>(initialCurrency);
  const [interval, setInterval] = useState<Interval>("month");

  const annual = interval === "year";
  const plan = annual ? plans.foundingAnnual : plans.foundingMonthly;
  const amount = currency === "NGN" ? plan.ngn : plan.usd;

  // The struck price must be the same interval as the live one, or the
  // comparison lies. Monthly strikes the monthly list price; annual strikes a
  // year bought month-by-month at the founding rate, which is exactly what the
  // stated saving is measured against.
  const monthly = currency === "NGN" ? plans.foundingMonthly.ngn : plans.foundingMonthly.usd;
  const list = currency === "NGN" ? plans.list.ngn : plans.list.usd;
  const struck = annual ? monthly * 12 : list;

  return (
    <>
      {/* controls */}
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Segmented<Currency>
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={[
            { value: "NGN", label: "₦ Naira" },
            { value: "USD", label: "$ Dollar" },
          ]}
        />
        <Segmented<Interval>
          label="Billing period"
          value={interval}
          onChange={setInterval}
          options={[
            { value: "month", label: "Monthly" },
            { value: "year", label: "Annual", hint: "save 12%" },
          ]}
        />
      </div>

      {/* founding plan */}
      <div className="relative mx-auto mt-10 max-w-xl">
        <div
          className="orb orb-strong pointer-events-none absolute -inset-24 -z-10"
          aria-hidden="true"
        />
        <div className="panel relative overflow-hidden border-accent/25 p-7 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="kicker">Founding</p>
            <span className="shrink-0 whitespace-nowrap rounded-full border border-accent/25 bg-accent/[0.08] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent">
              Until {promoEndsShort}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span
              className="font-mono text-xl text-muted line-through decoration-danger/70"
              aria-label={
                annual
                  ? `${price(struck, currency)} if paid monthly for a year`
                  : `List price ${price(struck, currency)} per month`
              }
            >
              {price(struck, currency)}
            </span>
            <span className="font-mono text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {price(amount, currency)}
            </span>
            <span className="pb-1.5 text-muted">
              / {annual ? "year" : "month"}
            </span>
          </div>

          <p className="mt-3 text-[15px] leading-relaxed text-muted">
            {annual ? (
              <>
                Twelve months for the price of about ten and a half: you keep{" "}
                <span className="text-foreground">
                  {annualSaving(currency)}
                </span>{" "}
                versus paying monthly.
              </>
            ) : (
              <>
                The full product, at the founding rate. Everyone who subscribes
                before {promoEnds} keeps this price for life.
              </>
            )}
          </p>

          <a
            href={site.signupUrl}
            rel="noopener"
            className="btn btn-primary btn-lg mt-7 w-full"
          >
            Start your {TRIAL_DAYS}-day free trial
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {[
              "No card to start",
              "Cancel anytime",
              "Price locked for life",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-muted">
          {seller[currency]}
          {currency === "NGN" && " · Prices exclude VAT where applicable"}
        </p>
      </div>
    </>
  );
}
