import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DemoForm } from "@/components/demo/DemoForm";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "A 20-minute walkthrough of your real ROAS — including every WhatsApp sale your pixel can't see.",
};

const agenda = [
  {
    title: "Your numbers, live",
    body: "We walk through the dashboard with campaigns like yours — real spend, real WhatsApp revenue.",
  },
  {
    title: "Integration walkthrough",
    body: "Exactly how Meta, Google, TikTok, and your payment stack connect. Spoiler: about ten minutes.",
  },
  {
    title: "Exact pricing",
    body: "A number, on the call, based on your spend. No 'contact sales' runaround.",
  },
];

export default function DemoPage() {
  return (
    <>
      <Nav />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="aurora absolute -top-[240px] left-1/3 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-accent/[0.1] blur-[140px]" />
          <div
            className="grid-bg absolute inset-x-0 top-0 h-[560px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 70%)",
            }}
          />
        </div>

        <div className="container-x relative pb-24 pt-32 sm:pt-36">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="max-w-lg">
              <p className="kicker">Book a demo</p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                See your{" "}
                <span className="bg-gradient-to-r from-accent-strong to-accent bg-clip-text text-transparent">
                  real ROAS
                </span>{" "}
                in 20 minutes.
              </h1>
              <p className="mt-5 text-pretty text-base leading-relaxed text-muted">
                A few quick questions so we can tailor the walkthrough to your
                business — then you pick a time.
              </p>

              <ul className="mt-10 flex flex-col gap-6">
                {agenda.map((a, i) => (
                  <li key={a.title} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.08] font-mono text-[12px] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[15px] font-medium text-foreground">
                        {a.title}
                      </p>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                        {a.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-muted">
                No commitment · No card · Human on the other end
              </p>
            </div>

            <div>
              <DemoForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
