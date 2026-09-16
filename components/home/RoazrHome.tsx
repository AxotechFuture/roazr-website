"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./RoazrHome.module.css";
import { site } from "@/lib/site";

const systemCards = [
  {
    title: "Click Identity",
    eyebrow: "Know where the buyer started",
    body: "Roazr preserves campaign, ad, click and UTM data from the first visit.",
    action: "See tracking",
    href: "/how-it-works",
    color: "#66D7EE",
    visual: "click",
  },
  {
    title: "WhatsApp Attribution",
    eyebrow: "Chats stop being a blind spot",
    body: "Connect the conversation to the campaign that created it.",
    action: "See WhatsApp flow",
    href: "/how-it-works",
    color: "#C7FF9E",
    visual: "chat",
  },
  {
    title: "Payment Matching",
    eyebrow: "The sale completes the journey",
    body: "Record payments and match revenue back to the lead and source.",
    action: "See integrations",
    href: "/integrations",
    color: "#F5DADA",
    visual: "payment",
  },
  {
    title: "Revenue Dashboard",
    eyebrow: "Read performance in money",
    body: "See attributed revenue, ROAS and conversion performance without stitching spreadsheets together.",
    action: "Open Roazr",
    href: site.signupUrl,
    color: "#5665E7",
    ink: "#FFFFFF",
    visual: "dashboard",
  },
  {
    title: "Funnel Tracking",
    eyebrow: "Every step stays visible",
    body: "Track visitors, leads and sales across the funnel instead of judging ads by clicks alone.",
    action: "See the journey",
    href: "/how-it-works",
    color: "#FF9A6E",
    visual: "funnel",
  },
  {
    title: "Conversions API",
    eyebrow: "Send better signals back",
    body: "Feed real conversion events to Meta with the identifiers needed for stronger matching.",
    action: "See feedback loop",
    href: "/how-it-works",
    color: "#ECE6FA",
    visual: "signal",
  },
  {
    title: "Lead Pipeline",
    eyebrow: "Keep every opportunity moving",
    body: "See lead status, next actions and the source that created each opportunity.",
    action: "See product",
    href: "#system",
    color: "#E5E3A2",
    visual: "pipeline",
  },
  {
    title: "Attribution Reports",
    eyebrow: "Know what to scale",
    body: "Compare campaigns by the sales and revenue they produced, not the attention they rented.",
    action: "Start free",
    href: site.signupUrl,
    color: "#B9CEF0",
    visual: "report",
  },
  {
    title: "Growth Map",
    eyebrow: "Find where revenue leaks",
    body: "See the full path from ad click to closed sale and fix the stage losing buyers.",
    action: "Book a demo",
    href: "/demo",
    color: "#F2B5DC",
    visual: "map",
  },
  {
    title: "Campaign Decisions",
    eyebrow: "Move budget with evidence",
    body: "Stop, fix or scale campaigns based on attributed sales instead of surface-level metrics.",
    action: "Start free",
    href: site.signupUrl,
    color: "#FFCA00",
    visual: "dashboard",
  },
];

const principles = [
  ["Capture", "Keep the source attached from the first click."],
  ["Connect", "Join the visit, lead, conversation and payment."],
  ["Attribute", "Credit the campaign and ad that created the sale."],
  ["Improve", "Use revenue data to decide what gets more budget."],
] as const;

const statements = [
  ["A click is not a customer.", "Roazr follows the journey until money changes hands."],
  ["WhatsApp sales should still count.", "If the conversation began from an ad, the ad should get the credit."],
  ["Your ad platform needs better evidence.", "Feed it purchases, not just page views and form fills."],
] as const;

function ProductVisual({ type }: { type: string }) {
  if (type === "chat") {
    return (
      <div className={`${styles.visualPanel} ${styles.phone}`}>
        <div className={styles.phoneNotch} />
        <div className={styles.chatIncoming}>Hi, I came from your ad.</div>
        <div className={styles.chatOutgoing}>Perfect. What do you need?</div>
        <div className={styles.chatIncoming}>I just paid ₦120,000.</div>
        <div className={styles.matchTag}>Matched to Campaign 04</div>
      </div>
    );
  }

  if (type === "payment") {
    return (
      <div className={`${styles.visualPanel} ${styles.receipt}`}>
        <span>PAYMENT RECEIVED</span>
        <strong>₦120,000</strong>
        <div><b>Lead</b><em>Ada E.</em></div>
        <div><b>Source</b><em>Meta · Creative 07</em></div>
        <div><b>Status</b><em>Attributed</em></div>
      </div>
    );
  }

  if (type === "funnel") {
    return (
      <div className={`${styles.visualPanel} ${styles.funnel}`}>
        <div><b>2,840</b><span>VISITORS</span></div>
        <div><b>386</b><span>LEADS</span></div>
        <div><b>74</b><span>SALES</span></div>
      </div>
    );
  }

  if (type === "pipeline") {
    return (
      <div className={`${styles.visualPanel} ${styles.pipeline}`}>
        {[
          ["New", "12"],
          ["Qualified", "7"],
          ["Won", "4"],
        ].map(([name, value]) => (
          <div key={name}><small>{name}</small><b>{value}</b><i /></div>
        ))}
      </div>
    );
  }

  if (type === "signal") {
    return (
      <div className={`${styles.visualPanel} ${styles.signal}`}>
        <div className={styles.signalSource}>SALE</div>
        <span>Purchase event</span>
        <span>Click ID</span>
        <span>Revenue</span>
        <div className={styles.signalTarget}>META</div>
      </div>
    );
  }

  if (type === "map") {
    return (
      <div className={`${styles.visualPanel} ${styles.map}`}>
        <span>AD</span><i /><span>PAGE</span><i /><span>CHAT</span><i /><span>SALE</span>
      </div>
    );
  }

  return (
    <div className={`${styles.visualPanel} ${styles.dashboard}`}>
      <div className={styles.dashTop}><span>ROAZR</span><small>Last 30 days</small></div>
      <div className={styles.dashStats}>
        <div><small>REVENUE</small><b>₦8.4M</b></div>
        <div><small>ROAS</small><b>5.7×</b></div>
        <div><small>SALES</small><b>184</b></div>
      </div>
      <div className={styles.bars}>{[34, 54, 43, 67, 59, 86, 74, 96].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
    </div>
  );
}

export function RoazrHome() {
  const storyRef = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const update = () => {
      const story = storyRef.current;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const distance = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      story.style.setProperty("--p", progress.toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className={styles.site}>
      <header className={styles.nav}>
        <div className={styles.wrap}>
          <Link className={styles.logo} href="/" aria-label="Roazr home">ROAZR</Link>
          <nav aria-label="Primary navigation">
            <a href="#system">Product</a>
            <Link href="/how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
          </nav>
          <div className={styles.navActions}>
            <a className={styles.signin} href={site.signinUrl}>Sign in</a>
            <a className={styles.pill} href={site.signupUrl}>Start free</a>
          </div>
        </div>
      </header>

      <main>
        <section ref={storyRef} className={styles.story}>
          <div className={styles.stage}>
            <h1 className={styles.headline}>Your ads see clicks.<br /><em>Roazr sees who bought.</em></h1>
            <div className={styles.deck} aria-hidden="true">
              {["META", "WHATSAPP", "PAYSTACK", "LEAD", "SALE", "REVENUE", "CAMPAIGN", "ROAS"].map((label, i) => (
                <div className={styles.deckCard} style={{ "--i": i } as React.CSSProperties} key={label}>
                  <span>{label}</span><small>CONNECTED</small>
                </div>
              ))}
            </div>
            <div className={`${styles.metric} ${styles.metricOne}`}><strong>One sale.<br /><em>Exact source.</em></strong><span>From click to payment, connected.</span></div>
            <div className={`${styles.metric} ${styles.metricTwo}`}><strong>Every sale.<br /><em>Fed back.</em></strong><span>Give your ad platform the signal it was missing.</span></div>
            <div className={styles.manifesto}>
              <h2>Stop paying for<br /><em>invisible waste.</em></h2>
              <p>Roazr connects your ads, funnels, WhatsApp leads and recorded sales, so you can see what produced revenue and put your budget behind it.</p>
            </div>
            <div className={styles.scrollLine}><i /></div>
          </div>
        </section>

        <section className={styles.products} id="system">
          <div className={styles.wrap}>
            <p className={styles.kicker}>THE REVENUE ATTRIBUTION SYSTEM</p>
            <h2 className={styles.sectionTitle}>One customer journey.<br />Nothing missing.</h2>
            <div className={styles.productGrid}>
              {systemCards.map((card) => (
                <article className={styles.product} style={{ "--bg": card.color, "--ink": card.ink || "#000000" } as React.CSSProperties} key={card.title}>
                  <div className={styles.productTop}>
                    <h3>{card.title}</h3>
                    <div><b>{card.eyebrow}</b><p>{card.body}</p></div>
                    <a href={card.href}>{card.action} ↗</a>
                  </div>
                  <div className={styles.productScene}><ProductVisual type={card.visual} /></div>
                </article>
              ))}
            </div>
            <p className={styles.andMore}>From attention to attributed revenue</p>
          </div>
        </section>

        <section className={styles.tech}>
          <div className={styles.wrap}>
            <p className={styles.kicker}>HOW ROAZR THINKS</p>
            <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>Built around the sale,<br />not the click.</h2>
            <div className={styles.techGrid}>
              {principles.map(([title, body], i) => (
                <article className={styles.techCard} key={title}>
                  <h3>{title}</h3><p>{body}</p>
                  <div className={`${styles.geometry} ${styles[`geometry${i + 1}`]}`}><i /><i /><i /></div>
                </article>
              ))}
            </div>
            <p className={styles.darkAndMore}>Four steps. One source of truth.</p>
          </div>
        </section>

        <section className={styles.editorial}>
          <div className={styles.wrap}>
            <h2 className={`${styles.sectionTitle} ${styles.lightTitle}`}>The problem was never<br />a lack of data.</h2>
          </div>
          <div className={styles.carousel} style={{ "--slide": slide } as React.CSSProperties}>
            {statements.map(([title, body], i) => (
              <article className={`${styles.statement} ${styles[`statement${i + 1}`]}`} key={title}>
                <div><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></div>
                <a href={i === 2 ? site.signupUrl : "/how-it-works"}>{i === 2 ? "Start free" : "See how it works"} ↗</a>
              </article>
            ))}
          </div>
          <div className={styles.carouselControls}>
            <button onClick={() => setSlide((slide + 2) % 3)} aria-label="Previous statement">←</button>
            <button onClick={() => setSlide((slide + 1) % 3)} aria-label="Next statement">→</button>
          </div>
          <div className={styles.rail}><i style={{ transform: `translateX(${slide * 100}%)` }} /></div>
        </section>

        <section className={styles.ctaSection}>
          <div className={`${styles.wrap} ${styles.ctaGrid}`}>
            <div><p>START WITH THE DATA YOU ALREADY HAVE</p><h2>See which ads<br />created revenue.</h2></div>
            <div className={styles.ctaCard}>
              <strong>14 days</strong>
              <b>Full access. No card required.</b>
              <p>Connect your funnel, track the journey and stop deciding with half the picture.</p>
              <a href={site.signupUrl}>Start your free trial</a>
            </div>
            <div className={styles.ctaSide}><span>Ads</span><i /> <span>Leads</span><i /> <span>Sales</span></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.wrap}>
          <div className={styles.footerGrid}>
            <div><h4>Product</h4><Link href="/how-it-works">How it works</Link><Link href="/integrations">Integrations</Link><Link href="/pricing">Pricing</Link><a href={site.signupUrl}>Start free</a></div>
            <div><h4>Company</h4><a href={`mailto:${site.emails.hello}`}>Contact</a><Link href="/demo">Book a demo</Link><Link href="/#system">Product</Link></div>
            <div><h4>Legal</h4><Link href="/privacy-policy">Privacy policy</Link><Link href="/terms-of-service">Terms of service</Link><Link href="/data-deletion">Data deletion</Link></div>
            <div><h4>What Roazr does</h4><p>Roazr connects ads, funnel activity, leads and recorded sales so businesses can see which campaigns produced revenue.</p><a className={styles.footerCta} href={site.signupUrl}>Start 14-day free trial ↗</a></div>
          </div>
          <div className={styles.giant}>ROAZR</div>
          <div className={styles.fine}><span>© {new Date().getFullYear()} Etin Media, Inc.</span><span>Every sale, fed back to your ads.</span></div>
        </div>
      </footer>
    </div>
  );
}
