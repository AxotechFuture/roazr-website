"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { submitLead } from "@/app/actions/lead";
import {
  bandLabels,
  COUNTRIES,
  CURRENCIES,
  DEFAULT_CURRENCY_BY_COUNTRY,
  PLATFORMS,
  type CurrencyCode,
  type Platform,
} from "@/lib/qualification";
import { site, whatsappLink } from "@/lib/site";

/* ================================================================== */
/* Field primitives                                                    */
/* ================================================================== */

const inputCls =
  "w-full rounded-xl border border-line bg-wash px-4 py-3 text-[15px] text-foreground placeholder:text-muted/60 outline-none transition-colors focus:border-accent/50 focus:bg-wash-strong";

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between font-mono text-[10.5px] uppercase tracking-widest text-muted">
        {label}
        {optional && <span className="text-muted/60">optional</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-[12.5px] text-danger">{error}</span>}
    </label>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-xl border px-4 py-2.5 text-[14px] font-medium transition-all ${
        selected
          ? "border-accent/50 bg-accent/10 text-accent shadow-[0_0_20px_-6px_rgba(23,232,143,0.4)]"
          : "border-line bg-wash text-muted-strong hover:border-line-strong hover:bg-wash-strong"
      }`}
    >
      {children}
    </button>
  );
}

/* ================================================================== */
/* Result screens                                                      */
/* ================================================================== */

function CheckMark() {
  const reduced = useReducedMotion();
  return (
    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-accent/30 bg-accent/10 shadow-[0_0_60px_-10px_rgba(23,232,143,0.5)]">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <motion.path
          d="M8 17.5l6.5 6.5L26 11"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? undefined : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}

function QualifiedScreen({ email }: { email: string }) {
  const wa = whatsappLink(
    "Hi! I just booked a Roazr demo — looking forward to it.",
  );
  return (
    <div className="text-center">
      <CheckMark />
      <h2 className="mt-7 text-3xl font-semibold tracking-tight">
        You&rsquo;re a fit.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
        Based on your numbers, Roazr can move your ROAS meaningfully. Lock in
        your walkthrough — it takes 20 minutes and we&rsquo;ll use your real
        campaigns.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3">
        {site.schedulerUrl ? (
          <a
            href={site.schedulerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
          >
            Pick a time now
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        ) : (
          <div className="panel w-full max-w-md p-5 text-left">
            <p className="text-[14.5px] leading-relaxed text-muted-strong">
              Our team will reach out{" "}
              <span className="text-foreground">within 24 hours</span> on
              WhatsApp and at <span className="text-foreground">{email}</span>{" "}
              to schedule your walkthrough.
            </p>
          </div>
        )}
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-md"
          >
            Chat with us on WhatsApp now
          </a>
        )}
        <Link href="/" className="mt-2 text-[13px] text-muted hover:text-foreground">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function UnqualifiedScreen() {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-line-strong bg-wash-strong">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
          <path
            d="M15 8v8M15 20v.5"
            stroke="var(--foreground)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="15" cy="15" r="12" stroke="color-mix(in srgb, var(--foreground) 25%, transparent)" strokeWidth="1.5" />
        </svg>
      </div>
      <h2 className="mt-7 text-3xl font-semibold tracking-tight">
        You&rsquo;re on the early-access list.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
        Honest answer: Roazr delivers the most value once ad spend passes a
        certain level, and we&rsquo;d rather tell you that now than waste your
        time on a call. Your details are saved — as your ads scale, our team
        will be the first to reach out.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3">
        <Link href="/" className="btn btn-primary btn-md">
          Back to home
        </Link>
        <a
          href={`mailto:${site.emails.hello}`}
          className="text-[13px] text-muted hover:text-foreground"
        >
          Questions? {site.emails.hello}
        </a>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Main form                                                           */
/* ================================================================== */

const STEPS = ["About you", "Contact", "Your ads", "Budget"] as const;

interface FormData {
  name: string;
  email: string;
  company: string;
  website: string;
  country: (typeof COUNTRIES)[number];
  whatsapp: string;
  platforms: Platform[];
  notRunning: boolean;
  currency: CurrencyCode;
  currencyTouched: boolean;
  spendBand: number | null;
  fax: string; // honeypot
}

const initial: FormData = {
  name: "",
  email: "",
  company: "",
  website: "",
  country: "Nigeria",
  whatsapp: "",
  platforms: [],
  notRunning: false,
  currency: "NGN",
  currencyTouched: false,
  spendBand: null,
  fax: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function DemoForm() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | "qualified" | "unqualified">(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (data.name.trim().length < 2) e.name = "Please enter your name.";
      if (!EMAIL_RE.test(data.email.trim())) e.email = "That email doesn't look right.";
      if (!data.company.trim()) e.company = "Please enter your business name.";
    }
    if (step === 1) {
      if (data.whatsapp.trim().replace(/\D/g, "").length < 7)
        e.whatsapp = "Please enter a valid WhatsApp number.";
    }
    if (step === 2) {
      if (!data.notRunning && data.platforms.length === 0)
        e.platforms = "Pick your platforms — or choose “Not running ads yet”.";
    }
    if (step === 3) {
      if (data.spendBand === null) e.spendBand = "Please pick a range.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, 3));
  };

  const back = () => {
    setErrors({});
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const submit = async () => {
    if (!validateStep() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitLead({
        name: data.name,
        email: data.email.trim(),
        company: data.company,
        website: data.website,
        country: data.country,
        whatsapp: data.whatsapp,
        platforms: data.notRunning ? [] : data.platforms,
        runningAds: !data.notRunning && data.platforms.length > 0,
        currency: data.currency,
        spendBand: data.spendBand ?? 0,
        fax: data.fax,
      });
      if (res.ok) {
        setResult(res.status);
      } else {
        setSubmitError(res.error);
      }
    } catch {
      setSubmitError("Something went wrong on our side. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (result === "qualified") return <QualifiedScreen email={data.email.trim()} />;
  if (result === "unqualified") return <UnqualifiedScreen />;

  const selectCurrency = (code: CurrencyCode) =>
    setData((d) => ({ ...d, currency: code, currencyTouched: true, spendBand: null }));

  const slide = reduced
    ? {}
    : {
        initial: { opacity: 0, x: 46 * dir },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] as const },
      };

  return (
    <div className="panel relative overflow-hidden p-6 sm:p-8">
      {/* progress */}
      <div className="mb-8">
        <div className="mb-2.5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-widest text-muted">
          <span>{STEPS[step]}</span>
          <span>
            {step + 1} / {STEPS.length}
          </span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-wash-strong">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-accent-dim to-accent"
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>
      </div>

      {/* honeypot — invisible to humans */}
      <div className="absolute left-[-9999px] top-0" aria-hidden="true">
        <label>
          Fax number
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={data.fax}
            onChange={(e) => set("fax", e.target.value)}
          />
        </label>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (step < 3) next();
          else void submit();
        }}
      >
        <motion.div key={step} {...slide}>
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <Field label="Your name" error={errors.name}>
                <input
                  className={inputCls}
                  placeholder="Ada Obi"
                  value={data.name}
                  autoComplete="name"
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>
              <Field label="Work email" error={errors.email}>
                <input
                  className={inputCls}
                  type="email"
                  placeholder="ada@yourbusiness.com"
                  value={data.email}
                  autoComplete="email"
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="Business name" error={errors.company}>
                <input
                  className={inputCls}
                  placeholder="Your business"
                  autoComplete="organization"
                  value={data.company}
                  onChange={(e) => set("company", e.target.value)}
                />
              </Field>
              <Field label="Website or Instagram" optional>
                <input
                  className={inputCls}
                  placeholder="yourbusiness.com or @handle"
                  value={data.website}
                  onChange={(e) => set("website", e.target.value)}
                />
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <Field label="Country">
                <select
                  className={`${inputCls} appearance-none`}
                  value={data.country}
                  onChange={(e) => {
                    const country = e.target.value as FormData["country"];
                    setData((d) => ({
                      ...d,
                      country,
                      ...(d.currencyTouched
                        ? {}
                        : {
                            currency:
                              DEFAULT_CURRENCY_BY_COUNTRY[country] ?? "USD",
                            spendBand: null,
                          }),
                    }));
                  }}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="WhatsApp number" error={errors.whatsapp}>
                <input
                  className={inputCls}
                  type="tel"
                  placeholder="+234 801 234 5678"
                  autoComplete="tel"
                  value={data.whatsapp}
                  onChange={(e) => set("whatsapp", e.target.value)}
                />
              </Field>
              <p className="text-[12.5px] leading-relaxed text-muted">
                We&rsquo;ll only use this to coordinate your demo — never for
                marketing blasts.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-widest text-muted">
                  Where are you running paid ads today?
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {PLATFORMS.map((p) => (
                    <Chip
                      key={p}
                      selected={!data.notRunning && data.platforms.includes(p)}
                      onClick={() =>
                        setData((d) => ({
                          ...d,
                          notRunning: false,
                          platforms: d.platforms.includes(p)
                            ? d.platforms.filter((x) => x !== p)
                            : [...d.platforms, p],
                        }))
                      }
                    >
                      {p === "Meta" ? "Meta (FB & IG)" : p === "Google" ? "Google Ads" : p}
                    </Chip>
                  ))}
                  <Chip
                    selected={data.notRunning}
                    onClick={() =>
                      setData((d) => ({
                        ...d,
                        notRunning: !d.notRunning,
                        platforms: [],
                      }))
                    }
                  >
                    Not running ads yet
                  </Chip>
                </div>
                {errors.platforms && (
                  <p className="mt-2 text-[12.5px] text-danger">{errors.platforms}</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-widest text-muted">
                  Your currency
                </p>
                <div className="flex flex-wrap gap-2">
                  {CURRENCIES.map((c) => (
                    <Chip
                      key={c.code}
                      selected={data.currency === c.code}
                      onClick={() => selectCurrency(c.code)}
                    >
                      <span className="font-mono">{c.symbol}</span>
                      <span className="ml-1.5 text-[12px] text-muted">{c.code}</span>
                    </Chip>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 font-mono text-[10.5px] uppercase tracking-widest text-muted">
                  {data.notRunning
                    ? "Planned monthly ad budget"
                    : "Current monthly ad spend"}
                </p>
                <div className="flex flex-col gap-2">
                  {bandLabels(data.currency).map((label, i) => (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={data.spendBand === i}
                      onClick={() => set("spendBand", i)}
                      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-[14.5px] transition-all ${
                        data.spendBand === i
                          ? "border-accent/50 bg-accent/[0.08] text-foreground"
                          : "border-line bg-wash text-muted-strong hover:border-line-strong hover:bg-wash-strong"
                      }`}
                    >
                      <span className="font-mono">{label}</span>
                      <span
                        className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border ${
                          data.spendBand === i
                            ? "border-accent bg-accent"
                            : "border-line-strong"
                        }`}
                        aria-hidden="true"
                      >
                        {data.spendBand === i && (
                          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5.2l2 2 4-4.5" stroke="#03110a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                {errors.spendBand && (
                  <p className="mt-2 text-[12.5px] text-danger">{errors.spendBand}</p>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {submitError && (
          <p className="mt-5 rounded-xl border border-danger-dim/25 bg-danger-dim/[0.07] px-4 py-3 text-[13.5px] text-danger">
            {submitError}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={back} className="btn btn-ghost btn-md">
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-md min-w-[130px] disabled:opacity-70"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                Submitting…
              </span>
            ) : step < 3 ? (
              "Continue →"
            ) : (
              "Get my demo →"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
