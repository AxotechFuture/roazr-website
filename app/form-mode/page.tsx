import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Form Mode: WhatsApp lead capture settings",
  description:
    "Form Mode decides when Roazr asks a visitor for their details before sending them to WhatsApp. Compare Auto, Form always, and Skip always, and see which leads you keep.",
};

const toc = [
  { href: "#the-popup", label: "What the popup actually does" },
  { href: "#auto", label: "Auto (the default)" },
  { href: "#form-always", label: "Form always" },
  { href: "#skip-always", label: "Skip always" },
  { href: "#compare", label: "The three modes, side by side" },
  { href: "#which", label: "Which one should you pick?" },
  { href: "#faq", label: "Common questions" },
  { href: "#change", label: "Where to change it" },
];

/* ---------- small building blocks ---------- */

const tones = {
  accent: {
    ring: "border-accent/25",
    chip: "border-accent/25 bg-accent/[0.08] text-accent",
    dot: "bg-accent",
  },
  neutral: {
    ring: "border-line",
    chip: "border-line-strong bg-wash-strong text-muted-strong",
    dot: "bg-muted",
  },
  danger: {
    ring: "border-danger-dim/25",
    chip: "border-danger-dim/25 bg-danger-dim/[0.07] text-danger",
    dot: "bg-danger",
  },
} as const;

type Tone = keyof typeof tones;

function SectionHeading({
  n,
  title,
}: {
  n: number;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[11px] tracking-widest text-accent">
        {String(n).padStart(2, "0")}
      </span>
      <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-[1.7rem]">
        {title}
      </h2>
    </div>
  );
}

/** A labelled "if this, then that" row — used for Auto's three cases. */
function CaseRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-1.5 rounded-xl border border-line bg-wash px-4 py-3.5 sm:flex-row sm:gap-5">
      <span className="shrink-0 font-mono text-[10.5px] uppercase leading-5 tracking-widest text-muted sm:w-44">
        {label}
      </span>
      <span className="text-[13.5px] leading-relaxed text-muted-strong">
        {children}
      </span>
    </li>
  );
}

/** A titled point — used for the reasons behind each mode. */
function Point({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="rounded-xl border border-line bg-wash px-4 py-3.5">
      <p className="text-[13.5px] font-medium text-foreground">{title}</p>
      <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{children}</p>
    </li>
  );
}

function Example({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 border-l-2 border-accent/45 pl-4">
      <p className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
        Example
      </p>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
        {children}
      </p>
    </div>
  );
}

function Trade({
  choose,
  cost,
}: {
  choose: React.ReactNode;
  cost: React.ReactNode;
}) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-line bg-wash p-4">
        <p className="font-mono text-[10.5px] uppercase tracking-widest text-accent">
          Choose it when
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{choose}</p>
      </div>
      <div className="rounded-xl border border-line bg-wash p-4">
        <p className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
          What you trade
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{cost}</p>
      </div>
    </div>
  );
}

function ModeCard({
  id,
  n,
  name,
  tag,
  tone,
  lede,
  children,
}: {
  id: string;
  n: number;
  name: string;
  tag: string;
  tone: Tone;
  lede: string;
  children: React.ReactNode;
}) {
  const t = tones[tone];
  return (
    <section id={id} className="mt-8 scroll-mt-24">
      <div className={`panel p-6 sm:p-8 ${t.ring}`}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[11px] tracking-widest text-accent">
            {String(n).padStart(2, "0")}
          </span>
          <h2 className="text-2xl font-semibold tracking-[-0.02em]">{name}</h2>
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${t.chip}`}
          >
            {tag}
          </span>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-strong">
          {lede}
        </p>
        {children}
      </div>
    </section>
  );
}

/* ---------- page content ---------- */

const summary = [
  {
    mode: "Auto",
    tone: "accent" as Tone,
    tag: "Default",
    line: "Asks only when it has to. No popup if your page already collected the details.",
  },
  {
    mode: "Form always",
    tone: "neutral" as Tone,
    tag: "Optional",
    line: "Asks every time. You get confirmed details, even from people who never message you.",
  },
  {
    mode: "Skip always",
    tone: "danger" as Tone,
    tag: "Risky",
    line: "Never asks. Fastest for the visitor, and the only mode where a lead can vanish completely.",
  },
];

const journey = [
  { step: "Taps your ad", detail: "From Instagram, Facebook, TikTok, wherever you run it." },
  { step: "Lands on your page", detail: "Roazr's snippet is already watching that visit." },
  { step: "Taps WhatsApp", detail: "This is the moment Form Mode decides what happens." },
  { step: "Chat opens", detail: "Your message is prefilled, with a reference code inside." },
];

const table = [
  {
    mode: "Auto",
    tone: "accent" as Tone,
    experience:
      "Straight through when Roazr already has what it needs. A short popup when it doesn't.",
    saved:
      "Name (plus the number if your funnel asks for one), taken from your page, the popup, or both.",
    risk: "Low. Nobody reaches WhatsApp without you knowing who they are.",
  },
  {
    mode: "Form always",
    tone: "neutral" as Tone,
    experience: "One extra step, every single time. They type and confirm their details.",
    saved: "Details the visitor confirmed herself, saved the moment she submits the popup.",
    risk: "Low. Some visitors will stop at the popup instead of messaging you.",
  },
  {
    mode: "Skip always",
    tone: "danger" as Tone,
    experience: "Fastest possible. One tap and the chat is open.",
    saved:
      "Only what your own page collected. Sometimes that is nothing but a reference code.",
    risk: "High. If your page collected nothing and she never messages, she is unreachable.",
  },
];

const picks = [
  {
    who: "Almost every seller",
    mode: "Auto",
    tone: "accent" as Tone,
    why: "It never asks twice, and it never lets someone through unidentified. If you are not sure, this is your answer.",
  },
  {
    who: "You want confirmed details and fewer time-wasters",
    mode: "Form always",
    tone: "neutral" as Tone,
    why: "Worth the extra step when every real conversation is valuable and your WhatsApp is already busy with people who never buy.",
  },
  {
    who: "Your page already collects everything itself",
    mode: "Skip always",
    tone: "danger" as Tone,
    why: "Only if your own form reliably captures a name and number before anyone reaches the WhatsApp button. Or you have decided you can live with losing the people who tap and never message.",
  },
];

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Will my visitors see the popup twice?",
    a: "No. On Auto, if your page already collected a detail, Roazr will not ask for it again, and if only part is missing, the popup asks for that part only. On Form always the popup shows once per WhatsApp click, which is the whole point of that mode.",
  },
  {
    q: "What happens if someone taps WhatsApp but never sends the message?",
    a: "On Auto and Form always, their details were already saved, so you can reach out yourself. On Skip always, if your page collected nothing, there is nothing to reach out with. That visitor is gone.",
  },
  {
    q: "Does the reference code still work in every mode?",
    a: "Yes. The code is added to the prefilled WhatsApp message in all three modes. Matching a chat back to the right lead, ad, and campaign never depends on Form Mode.",
  },
  {
    q: "What if my page has no form at all?",
    a: "Then Auto behaves like Form always: the full popup shows on every click, because there is nothing to carry through. You get the details either way, without having to think about it.",
  },
  {
    q: "Can I change my mind later?",
    a: "Yes. Switch mode in your funnel settings any time. It applies to clicks from that moment on, and leads already in your CRM stay exactly as they are.",
  },
];

export default function FormModePage() {
  return (
    <>
      <Nav />
      <main className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="orb orb-soft aurora absolute -top-[400px] left-1/2 h-[700px] w-[1000px] -translate-x-1/2" />
          <div
            className="grid-bg absolute inset-x-0 top-0 h-[520px]"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 20%, transparent 70%)",
            }}
          />
        </div>

        <div className="container-x relative pb-24 pt-32 sm:pt-36">
          <div className="mx-auto max-w-3xl">
            <header>
              <p className="kicker">Product guide</p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                Form Mode: how Roazr decides when to ask your visitors for their
                details
              </h1>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-widest text-muted">
                Last updated: July 21, 2026
              </p>
              <div className="article-body mt-7 border-b border-line pb-8">
                <p>
                  When someone taps your WhatsApp button, Roazr can show a small
                  popup that asks for their name (and their WhatsApp number, if
                  you have turned that on). <strong>Form Mode</strong> is the
                  setting that decides when that popup shows up.
                </p>
                <p>
                  There are three options: <strong>Auto</strong>,{" "}
                  <strong>Form always</strong> and <strong>Skip always</strong>.
                  Auto is the default, and it is the right choice for almost
                  every seller. This page explains what each one does, and what
                  you give up when you turn the popup off completely.
                </p>
              </div>
            </header>

            {/* the short version */}
            <div className="panel mt-8 p-6 sm:p-7">
              <p className="font-mono text-[10.5px] uppercase tracking-widest text-muted">
                The short version
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {summary.map((s) => (
                  <li key={s.mode} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                    <span className="flex shrink-0 items-center gap-2 sm:w-36">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${tones[s.tone].dot}`}
                        aria-hidden="true"
                      />
                      <span className="text-[14px] font-medium text-foreground">
                        {s.mode}
                      </span>
                    </span>
                    <span className="text-[13.5px] leading-relaxed text-muted">
                      {s.line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* table of contents */}
            <nav className="panel mt-4 p-6" aria-label="Table of contents">
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-widest text-muted">
                On this page
              </p>
              <ol className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
                {toc.map((t, i) => (
                  <li key={t.href} className="flex gap-2 text-[13.5px]">
                    <span className="font-mono text-[11px] leading-6 text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={t.href}
                      className="text-muted-strong transition-colors hover:text-accent"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* 01 — what the popup does */}
            <section id="the-popup" className="mt-16 scroll-mt-24">
              <SectionHeading n={1} title="What the popup actually does" />
              <div className="article-body mt-5">
                <p>
                  Say Ada sees your ad. Here is her whole journey, from the ad to
                  your WhatsApp inbox.
                </p>
              </div>

              <ol className="mt-5 grid gap-3 sm:grid-cols-2">
                {journey.map((j, i) => (
                  <li
                    key={j.step}
                    className="flex gap-3 rounded-xl border border-line bg-wash px-4 py-3.5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/[0.08] font-mono text-[11px] text-accent">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[13.5px] font-medium text-foreground">
                        {j.step}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">
                        {j.detail}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="article-body mt-6">
                <p>
                  That reference code is the important part. When Ada sends the
                  message, the code tells Roazr that this chat belongs to her:
                  the visitor who came from that ad, in that campaign, on that
                  click. It is how a WhatsApp sale gets matched back to the ad
                  that paid for it.
                </p>
                <p>
                  The reference code is included in{" "}
                  <strong>all three Form Modes</strong>. Form Mode changes one
                  thing only: whether Ada is asked for her details on the way
                  through, and therefore whether you know who she is before she
                  types a word.
                </p>
              </div>
            </section>

            {/* 02 — auto */}
            <ModeCard
              id="auto"
              n={2}
              name="Auto"
              tag="Default · Recommended"
              tone="accent"
              lede="Auto looks at what your own page already knows about the visitor, then asks only for what is missing."
            >
              <ul className="mt-6 flex flex-col gap-2.5">
                <CaseRow label="Page got everything">
                  No popup at all. The visitor goes straight into WhatsApp, and
                  the details your page collected go with her.
                </CaseRow>
                <CaseRow label="Page got part of it">
                  The popup appears and asks only for the missing piece, often
                  just the number.
                </CaseRow>
                <CaseRow label="Page got nothing">
                  The full popup appears, so you still find out who she is.
                </CaseRow>
              </ul>

              <Example>
                Ada types her name into the order form on your page, then taps
                your WhatsApp button. She sees no popup: Roazr already has
                &ldquo;Ada&rdquo; and carries it through. If your funnel also
                asks for a number and your page never collected one, she sees a
                popup with a single field: her number. Nothing she already gave
                you is asked for twice.
              </Example>

              <Trade
                choose="You are not sure which to pick. Auto works whether your pages have forms or not, and it never asks the same question twice."
                cost="Very little. Auto trusts what the visitor typed on your page, so a typo there follows her into your CRM."
              />
            </ModeCard>

            {/* 03 — form always */}
            <ModeCard
              id="form-always"
              n={3}
              name="Form always"
              tag="For confirmed details"
              tone="neutral"
              lede="The popup shows on every WhatsApp click, even when your page already collected the same details."
            >
              <ul className="mt-6 flex flex-col gap-2.5">
                <Point title="Details you can trust">
                  The visitor types and confirms them herself, seconds before the
                  chat opens. Fewer typos, fewer half-names, fewer numbers that
                  do not ring.
                </Point>
                <Point title="You keep the number either way">
                  Details are saved the moment she submits the popup, not when
                  she sends the WhatsApp message. So even if she never messages,
                  you can still call her.
                </Point>
                <Point title="A filter before your inbox">
                  One small step is often enough to stop idle clickers from
                  landing in your WhatsApp, so your replies go to people who
                  actually want to buy.
                </Point>
              </ul>

              <Example>
                Chinedu runs ads for a ₦450,000 machine. Every chat he answers
                costs him real time, so he wants a number he can call back and a
                name he can trust. He turns on Form always: everyone who taps
                confirms their details first, and the tyre-kickers quietly drop
                off.
              </Example>

              <Trade
                choose="Every real conversation is worth your time, or your team is buried in chats that go nowhere. Also good when you must be able to call back."
                cost="One extra step for everyone, including people who already filled in your form. Some visitors will stop there instead of messaging you."
              />
            </ModeCard>

            {/* 04 — skip always */}
            <ModeCard
              id="skip-always"
              n={4}
              name="Skip always"
              tag="Handle with care"
              tone="danger"
              lede="No popup, ever. Every tap goes straight into WhatsApp, the fastest path there is."
            >
              <div className="mt-6 rounded-xl border border-danger-dim/25 bg-danger-dim/[0.07] p-4 sm:p-5">
                <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-widest text-danger">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M8 2.5l6 11H2l6-11z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6.6v3.1M8 11.7v.2"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                  What you give up
                </p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted-strong">
                  Roazr can only save what it has been given. If your page did
                  not collect Ada&rsquo;s details, and she taps through but never
                  actually sends the message, you have nothing. No name, no
                  number, no way to reach her. She is gone.
                </p>
              </div>

              <ul className="mt-3 flex flex-col gap-2.5">
                <Point title="Opening WhatsApp is not the same as messaging you">
                  People tap, get distracted, and close the app before typing
                  anything. In the other modes you would still have their
                  details. Here you do not.
                </Point>
                <Point title="Leads can arrive with no name">
                  Until she actually messages, that lead can sit in your CRM as a
                  reference code and little else.
                </Point>
              </ul>

              <Example>
                Ada taps your ad at night, lands on your page, taps WhatsApp, and
                the chat opens. Then her data finishes, or her baby cries, and
                she closes the app without sending. On Auto you would have her
                name. On Skip always, all you have is a click.
              </Example>

              <Trade
                choose="Your own page reliably collects a name (and a number, if your funnel asks for one) before anyone reaches the WhatsApp button. Or you have decided speed is worth the people you lose."
                cost="Every visitor your page did not identify. That is why the app warns you when you pick this one."
              />

              <p className="mt-6 text-[13.5px] leading-relaxed text-muted">
                If you picked Skip always for speed, it is worth knowing that
                Auto is just as fast for anyone who already filled in your form.
                It only steps in for the visitors you would otherwise lose.
              </p>
            </ModeCard>

            {/* 05 — comparison */}
            <section id="compare" className="mt-16 scroll-mt-24">
              <SectionHeading n={5} title="The three modes, side by side" />
              <div className="panel mt-6 overflow-x-auto">
                <table className="w-full min-w-[44rem] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-line">
                      {["Mode", "Visitor experience", "What gets saved", "Risk of losing a lead"].map(
                        (h) => (
                          <th
                            key={h}
                            scope="col"
                            className="px-5 py-4 font-mono text-[10.5px] font-medium uppercase tracking-widest text-muted"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {table.map((r) => (
                      <tr key={r.mode} className="border-b border-line last:border-b-0">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-5 py-4 align-top text-[13.5px] font-medium text-foreground"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full ${tones[r.tone].dot}`}
                              aria-hidden="true"
                            />
                            {r.mode}
                          </span>
                        </th>
                        <td className="px-5 py-4 align-top text-[13px] leading-relaxed text-muted">
                          {r.experience}
                        </td>
                        <td className="px-5 py-4 align-top text-[13px] leading-relaxed text-muted">
                          {r.saved}
                        </td>
                        <td className="px-5 py-4 align-top text-[13px] leading-relaxed text-muted">
                          {r.risk}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                In every row, the reference code still goes into the prefilled
                WhatsApp message, so a chat always matches back to the right
                lead, ad and campaign. Form Mode only changes what you know about
                the visitor before that chat starts.
              </p>
            </section>

            {/* 06 — recommendation */}
            <section id="which" className="mt-16 scroll-mt-24">
              <SectionHeading n={6} title="Which one should you pick?" />
              <ul className="mt-6 flex flex-col gap-3">
                {picks.map((p) => (
                  <li
                    key={p.mode}
                    className={`panel p-5 sm:p-6 ${tones[p.tone].ring}`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="text-[15px] font-medium text-foreground">
                        {p.who}
                      </span>
                      <span
                        className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${tones[p.tone].chip}`}
                      >
                        {p.mode}
                      </span>
                    </div>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                      {p.why}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] leading-relaxed text-muted-strong">
                Not sure? Leave it on <strong className="text-foreground">Auto</strong>.
                It asks only when it has to, and it never lets a visitor reach
                WhatsApp as a stranger.
              </p>
            </section>

            {/* 07 — faq */}
            <section id="faq" className="mt-16 scroll-mt-24">
              <SectionHeading n={7} title="Common questions" />
              <div className="panel mt-6 px-6 sm:px-8">
                {faqs.map((f) => (
                  <div key={f.q} className="border-b border-line py-6 last:border-b-0">
                    <h3 className="text-[15.5px] font-medium text-foreground">
                      {f.q}
                    </h3>
                    <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 08 — where to change it */}
            <section id="change" className="mt-16 scroll-mt-24">
              <SectionHeading n={8} title="Where to change it" />
              <div className="article-body mt-5">
                <p>
                  Form Mode lives in your funnel settings in the Roazr app. Pick
                  the mode you want, save, and it applies to every click from
                  that moment on. Nothing already in your CRM changes.
                </p>
                <p>
                  If you are switching to Skip always, check one thing first:
                  does your own page collect a name (and a number, if your
                  funnel asks for one) before the visitor reaches your WhatsApp
                  button? If the answer is no, Auto will serve you better, and it
                  will not slow anybody down who has already filled in your form.
                </p>
              </div>

              <div className="panel mt-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="text-[15px] font-medium text-foreground">
                    Still not sure which mode fits your funnel?
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">
                    Tell us how your page collects details and we will tell you
                    which one to use.
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-3">
                  <a
                    href={site.appUrl}
                    rel="noopener"
                    className="btn btn-primary btn-md min-h-11"
                  >
                    Open the Roazr app
                  </a>
                  <a
                    href={`mailto:${site.emails.hello}`}
                    className="btn btn-ghost btn-md min-h-11"
                  >
                    Ask us
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
