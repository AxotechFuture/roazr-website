"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Mark } from "@/components/Wordmark";

/* ================================================================== */
/* Live data pieces                                                    */
/* ================================================================== */

function RoasStat() {
  const [roas, setRoas] = useState(4.82);

  useEffect(() => {
    const id = setInterval(() => {
      setRoas((v) => {
        const next = v + (Math.random() - 0.45) * 0.05;
        return Math.min(5.12, Math.max(4.61, next));
      });
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Blended ROAS
      </p>
      <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-foreground">
        {roas.toFixed(2)}
        <span className="text-base text-muted-strong">x</span>
      </p>
      <p className="mt-0.5 font-mono text-[11px] text-accent">↑ 38% vs last 7d</p>
    </div>
  );
}

function EventsStat() {
  const [count, setCount] = useState(128_441);

  useEffect(() => {
    const id = setInterval(
      () => setCount((c) => c + 1 + Math.floor(Math.random() * 3)),
      1900,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-w-0">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
        Events delivered
      </p>
      <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-foreground">
        {count.toLocaleString("en-US")}
      </p>
      <p className="mt-0.5 font-mono text-[11px] text-muted">server-side · CAPI</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const FEED = [
  { amount: "₦68,500", label: "WhatsApp sale matched", target: "Meta CAPI", dot: "#25d366" },
  { amount: "₦124,000", label: "Paystack payment", target: "Google Ads", dot: "#17e88f" },
  { amount: "₦41,200", label: "Website checkout", target: "Meta CAPI", dot: "#17e88f" },
  { amount: "GH₵2,400", label: "WhatsApp sale matched", target: "TikTok Events", dot: "#25d366" },
  { amount: "₦86,000", label: "Bank transfer matched", target: "Meta CAPI", dot: "#17e88f" },
  { amount: "₦230,500", label: "WhatsApp sale matched", target: "Meta CAPI", dot: "#25d366" },
  { amount: "KSh 18,400", label: "Paystack payment", target: "Google Ads", dot: "#17e88f" },
  { amount: "₦57,900", label: "WhatsApp sale matched", target: "TikTok Events", dot: "#25d366" },
] as const;

const AGE_LABELS = ["now", "4s", "11s", "19s", "26s"];

function LiveFeed({ rows = 5 }: { rows?: number }) {
  const reduced = useReducedMotion();
  // Deterministic first render (SSR-safe), rotates client-side after mount.
  const [head, setHead] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setHead((h) => (h + 1) % FEED.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduced]);

  const visible = Array.from(
    { length: rows },
    (_, i) => FEED[(head - i + FEED.length * 8) % FEED.length],
  );

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden">
      {visible.map((e, i) => (
          <motion.div
            key={`${e.amount}-${head - i}`}
            layout
            initial={reduced ? false : { opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: i === rows - 1 ? 0.4 : 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-2.5 py-2"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: e.dot }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-[11px] font-medium text-foreground">
                {e.amount}
                <span className="ml-1.5 font-sans font-normal text-muted-strong">
                  {e.label}
                </span>
              </p>
              <p className="truncate font-mono text-[9.5px] text-muted">
                → {e.target} <span className="text-accent">✓</span>
              </p>
            </div>
            <span className="shrink-0 font-mono text-[9px] text-muted">
              {AGE_LABELS[i] ?? ""}
            </span>
          </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

const CHART = {
  w: 460,
  h: 130,
  revenue: "M0 112 C 40 106, 62 96, 92 92 S 150 84, 184 72 S 250 58, 288 48 S 368 30, 404 22 S 444 14, 460 10",
  spend: "M0 118 C 60 116, 120 112, 184 110 S 320 104, 460 98",
};

function RevenueChart() {
  const reduced = useReducedMotion();
  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${CHART.w} ${CHART.h}`}
        className="block h-auto w-full"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#17e88f" stopOpacity="0.22" />
            <stop offset="1" stopColor="#17e88f" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1="0"
            x2={CHART.w}
            y1={CHART.h * f}
            y2={CHART.h * f}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="3 5"
          />
        ))}

        {/* area fill under revenue */}
        <motion.path
          d={`${CHART.revenue} L ${CHART.w} ${CHART.h} L 0 ${CHART.h} Z`}
          fill="url(#rev-fill)"
          initial={reduced ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.1 }}
        />

        {/* spend line (dim) */}
        <motion.path
          d={CHART.spend}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5, ease: "easeOut" }}
        />

        {/* revenue line */}
        <motion.path
          d={CHART.revenue}
          stroke="#17e88f"
          strokeWidth="2.25"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
        />

        {/* live endpoint */}
        <circle cx="460" cy="10" r="9" fill="rgba(23,232,143,0.15)">
          <animate attributeName="r" values="5;11;5" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="460" cy="10" r="3.5" fill="#17e88f" />
      </svg>

      <div className="mt-1 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="absolute right-2 top-1 flex flex-col gap-1 font-mono text-[9.5px]">
        <span className="flex items-center gap-1.5 text-muted-strong">
          <span className="h-[2px] w-4 rounded bg-accent" /> Attributed revenue
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="h-[2px] w-4 rounded bg-white/25" /> Ad spend
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const CAMPAIGNS = [
  { name: "UGC Video — Lagos broad", spend: "₦1.24M", roas: "5.1x", pct: 86 },
  { name: "Search — buy iphone 14", spend: "₦680K", roas: "3.8x", pct: 62 },
  { name: "Spark Ads — Creator mix", spend: "₦410K", roas: "2.9x", pct: 44 },
] as const;

function CampaignRows() {
  return (
    <div className="flex flex-col gap-1">
      {CAMPAIGNS.map((c) => (
        <div
          key={c.name}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg px-2.5 py-1.5 hover:bg-white/[0.03]"
        >
          <div className="min-w-0">
            <p className="truncate text-[11.5px] text-muted-strong">{c.name}</p>
            <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-accent/70"
                initial={{ width: 0 }}
                whileInView={{ width: `${c.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </div>
          </div>
          <span className="font-mono text-[11px] text-muted">{c.spend}</span>
          <span className="rounded-md border border-accent/25 bg-accent/10 px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-accent">
            {c.roas}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ================================================================== */
/* Dashboard window                                                    */
/* ================================================================== */

function SidebarIcon({ active = false }: { active?: boolean }) {
  return (
    <span
      className={`block h-7 w-7 rounded-lg border ${
        active
          ? "border-accent/30 bg-accent/10"
          : "border-transparent bg-white/[0.04]"
      }`}
    />
  );
}

function Dashboard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#081014]/90 shadow-[0_40px_120px_-32px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md border border-line bg-white/[0.03] px-3 py-1 font-mono text-[10px] text-muted">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <rect x="1" y="4.5" width="8" height="5" rx="1.5" stroke="currentColor" />
            <path d="M3 4.5V3a2 2 0 014 0v1.5" stroke="currentColor" />
          </svg>
          app.roazr.com/overview
        </span>
        <span className="flex items-center gap-1.5 rounded-md border border-accent/25 bg-accent/[0.08] px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Live
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* sidebar */}
        {!compact && (
          <div className="flex flex-col items-center gap-2.5 border-r border-line px-3 py-4">
            <Mark size={26} />
            <div className="mt-2 flex flex-col gap-2">
              <SidebarIcon active />
              <SidebarIcon />
              <SidebarIcon />
              <SidebarIcon />
            </div>
          </div>
        )}

        {/* main */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-foreground">Overview</p>
            <div className="flex overflow-hidden rounded-lg border border-line font-mono text-[10px]">
              {["7D", "30D", "90D"].map((t, i) => (
                <span
                  key={t}
                  className={`px-2.5 py-1 ${
                    i === 0
                      ? "bg-accent/10 text-accent"
                      : "text-muted"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <RoasStat />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Revenue attributed
              </p>
              <p className="mt-1 font-mono text-2xl font-semibold tracking-tight text-foreground">
                ₦48.2M
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-accent">↑ 24% vs last 7d</p>
            </div>
            <EventsStat />
          </div>

          <RevenueChart />

          {!compact && (
            <div className="mt-auto">
              <p className="mb-1.5 font-mono text-[9.5px] uppercase tracking-widest text-muted">
                Top campaigns · true ROAS
              </p>
              <CampaignRows />
            </div>
          )}
        </div>

        {/* live feed column */}
        <div className="hidden w-[218px] flex-col gap-2 border-l border-line p-3 lg:flex">
          <p className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-widest text-muted">
            Live events
            <span className="text-accent">●</span>
          </p>
          <LiveFeed />
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Satellites                                                          */
/* ================================================================== */

const chatDelay = (delay: number) =>
  ({ "--chat-delay": `${delay}s` }) as React.CSSProperties;

function WhatsAppCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line-strong bg-raised/95 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25d366]/15">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3z"
              stroke="#25d366"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[12.5px] font-medium text-foreground">Adaeze O.</p>
          <p className="truncate font-mono text-[9.5px] text-muted">
            via Meta ad · click ID captured
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-3.5 py-3 text-[12px] leading-snug">
        <p
          style={chatDelay(0.4)}
          className="chat-msg max-w-[88%] self-start rounded-xl rounded-bl-sm bg-white/[0.07] px-2.5 py-1.5 text-muted-strong"
        >
          Is the black one still available?
        </p>
        <p
          style={chatDelay(1.8)}
          className="chat-msg max-w-[88%] self-end rounded-xl rounded-br-sm border border-[#25d366]/20 bg-[#25d366]/10 px-2.5 py-1.5 text-muted-strong"
        >
          Yes! ₦68,500 — free delivery tomorrow.
        </p>
        <p
          style={chatDelay(3.4)}
          className="chat-msg max-w-[88%] self-start rounded-xl rounded-bl-sm bg-white/[0.07] px-2.5 py-1.5 text-muted-strong"
        >
          Just sent the transfer ✅
        </p>
        <div
          style={chatDelay(5)}
          className="chat-msg mt-1 flex items-center gap-2 self-stretch rounded-lg border border-accent/25 bg-accent/[0.08] px-2.5 py-1.5"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="#17e88f" strokeWidth="1.5" />
            <path
              d="M4.5 7.2l1.8 1.8 3.2-3.8"
              stroke="#17e88f"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-mono text-[10.5px] font-medium text-accent">
            ₦68,500 · Payment confirmed → attributed
          </span>
        </div>
      </div>
    </div>
  );
}

const PLATFORMS = [
  { key: "meta", monogram: "M", color: "var(--meta)", name: "Meta CAPI", status: "Purchase · ₦68,500" },
  { key: "google", monogram: "G", color: "var(--google)", name: "Google Ads", status: "Conversion imported" },
  { key: "tiktok", monogram: "T", color: "var(--tiktok)", name: "TikTok Events", status: "Event received" },
] as const;

function PlatformChip({ p }: { p: (typeof PLATFORMS)[number] }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-line-strong bg-raised/95 px-3 py-2.5 shadow-[0_24px_64px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl">
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold"
        style={{
          color: p.color,
          backgroundColor: `color-mix(in srgb, ${p.color} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${p.color} 20%, transparent)`,
        }}
      >
        {p.monogram}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-medium text-foreground">{p.name}</p>
        <p className="truncate font-mono text-[10px] text-muted">{p.status}</p>
      </div>
      <span className="ml-auto font-mono text-[10px] text-accent">✓</span>
    </div>
  );
}

/* ================================================================== */
/* Beams                                                               */
/* ================================================================== */

const BEAMS = [
  "M756 190 C 800 186, 820 158, 868 150",
  "M756 310 C 800 310, 820 310, 868 310",
  "M756 430 C 800 434, 820 462, 868 470",
];

function Pulse({ path, begin, dur = 2.2 }: { path: string; begin: number; dur?: number }) {
  return (
    <>
      <circle r="6" fill="rgba(23,232,143,0.22)">
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      </circle>
      <circle r="2.4" fill="#17e88f">
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} />
      </circle>
    </>
  );
}

function Beams() {
  return (
    <svg
      viewBox="0 0 1120 620"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      {BEAMS.map((d) => (
        <g key={d}>
          <path d={d} stroke="rgba(23,232,143,0.12)" strokeWidth="1.5" />
          <path d={d} stroke="rgba(23,232,143,0.45)" strokeWidth="1.5" className="beam" />
        </g>
      ))}
      <Pulse path={BEAMS[0]} begin={0.2} />
      <Pulse path={BEAMS[1]} begin={0.9} />
      <Pulse path={BEAMS[2]} begin={1.6} />
    </svg>
  );
}

/* ================================================================== */
/* Main export                                                         */
/* ================================================================== */

export function HeroVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollTilt = useTransform(scrollY, [0, 480], [11, 0]);
  const y = useTransform(scrollY, [0, 480], [0, -24]);

  // pointer tilt layered on top of the scroll flatten
  const px = useSpring(0, { stiffness: 55, damping: 14 });
  const py = useSpring(0, { stiffness: 55, damping: 14 });
  const rotateX = useTransform<number, number>(
    [scrollTilt, py],
    ([s, p]) => s + p * -2.5,
  );
  const rotateY = useTransform(px, (p) => p * 3.5);

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== "mouse") return;
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={wrapRef}
      className="theme-dark-pin"
      style={{ perspective: 1400 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        style={
          reduced
            ? undefined
            : { rotateX, rotateY, y, transformStyle: "preserve-3d" }
        }
        initial={reduced ? false : { opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* ---------- desktop composition ---------- */}
        <div className="relative hidden aspect-[1120/620] md:block">
          <Beams />

          <div className="absolute bottom-[1.5%] left-[5%] top-[1.5%] w-[62.5%]">
            <Dashboard />
          </div>

          <div className="absolute bottom-[10%] right-[0%] top-[10%] flex w-[22.5%] flex-col justify-between">
            {PLATFORMS.map((p, i) => (
              <div key={p.key} className={i === 1 ? "" : i === 0 ? "float-slow" : "float-slower"}>
                <PlatformChip p={p} />
              </div>
            ))}
          </div>

          <div className="float-slower absolute bottom-[-4%] left-0 z-10 w-[26%]">
            <WhatsAppCard />
          </div>

          {/* glow under dashboard */}
          <div
            className="absolute left-[10%] right-[20%] top-[30%] -z-10 h-[50%] rounded-full bg-accent/20 blur-[120px]"
            aria-hidden="true"
          />
        </div>

        {/* ---------- mobile composition ---------- */}
        <div className="flex flex-col gap-4 md:hidden">
          <div className="h-[420px]">
            <Dashboard compact />
          </div>
          <WhatsAppCard />
          <div className="flex flex-col gap-2.5">
            {PLATFORMS.map((p) => (
              <PlatformChip key={p.key} p={p} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
