import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3z"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.5h8M8 14h5"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="var(--accent)" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.5" stroke="var(--accent)" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="1" fill="var(--accent)" />
    </svg>
  );
}

function RewindClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4.5 12a7.5 7.5 0 107.5-7.5c-2.9 0-5.4 1.6-6.7 4"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 4.5v4h4"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8.5V12l2.5 2"
        stroke="var(--accent)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CARDS = [
  {
    title: "Off-page sales get counted",
    body: "A pixel can’t see a WhatsApp chat, a bank transfer, or a USSD payment. Roazr logs the sale where it actually happens and reports it like any on-site purchase.",
    Icon: ChatIcon,
  },
  {
    title: "The exact ad gets the credit",
    body: "Every event carries the original click ID, held for up to 730 days. Meta and Snapchat credit the precise ad that started the journey, even when the sale closes weeks later.",
    Icon: TargetIcon,
  },
  {
    title: "Late entries still count",
    body: "Some sales are logged after the fact: a transfer confirmed the next morning, a deal closed offline. Manual entries backdate up to 7 days on Meta’s Conversions API, so the algorithm still learns from them.",
    Icon: RewindClockIcon,
  },
] as const;

export function WhyServerSide() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          kicker="Why server-side"
          title="Count the sales your pixel can’t see"
          sub="A browser pixel only reports what happens on the page. Server-side events report what happens in your business."
        />

        <RevealGroup
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
          stagger={0.12}
        >
          {CARDS.map(({ title, body, Icon }) => (
            <RevealItem key={title}>
              <SpotlightCard className="panel-hover flex h-full flex-col p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.08]">
                  <Icon />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {body}
                </p>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
