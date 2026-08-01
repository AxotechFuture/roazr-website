import { BrandIcon, type BrandKey } from "@/components/brand/BrandIcon";

/* Shipped integrations only — verified against the app repo. Google Ads,
   TikTok, Pinterest, Selar, and Shopify are roadmap: they appear as
   "coming soon" on /integrations, never implied live here. Ink tokens
   keep bright marks (Snapchat) legible in light mode; Flutterwave's
   glyph carries its own colors. */
const integrations: {
  name: string;
  detail: string;
  icon: BrandKey;
  ink: string;
}[] = [
  { name: "Meta", detail: "Conversions API", icon: "meta", ink: "var(--meta-ink)" },
  { name: "Snapchat", detail: "Conversions API", icon: "snapchat", ink: "var(--snapchat-ink)" },
  { name: "WhatsApp Business", detail: "Cloud API", icon: "whatsapp", ink: "var(--whatsapp)" },
  { name: "Paystack", detail: "Payments", icon: "paystack", ink: "var(--paystack-ink)" },
  { name: "Flutterwave", detail: "Payments", icon: "flutterwave", ink: "var(--flutterwave)" },
  { name: "Stripe", detail: "Payments", icon: "stripe", ink: "var(--stripe)" },
  { name: "Calendly", detail: "Bookings", icon: "calendly", ink: "var(--calendly)" },
];

function Row() {
  return (
    <>
      {integrations.map((i) => (
        <span
          key={i.name}
          className="mx-8 inline-flex items-center gap-2.5 whitespace-nowrap"
        >
          <span style={{ color: i.ink }}>
            <BrandIcon name={i.icon} size={17} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-muted-strong/85">
            {i.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            {i.detail}
          </span>
        </span>
      ))}
    </>
  );
}

export function LogoStrip() {
  return (
    <section className="border-y border-line py-10">
      <div className="container-x">
        <p className="mb-7 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          Native integrations with the tools that run your growth
        </p>
      </div>
      <div
        className="marquee relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="marquee-track items-baseline">
          <Row />
          <Row />
        </div>
      </div>
    </section>
  );
}
