const integrations = [
  { name: "Meta", detail: "Conversions API" },
  { name: "Google Ads", detail: "Offline conversions" },
  { name: "TikTok", detail: "Events API" },
  { name: "WhatsApp Business", detail: "Cloud API" },
  { name: "Paystack", detail: "Payments" },
  { name: "Instagram", detail: "Lead ads" },
] as const;

function Row() {
  return (
    <>
      {integrations.map((i) => (
        <span
          key={i.name}
          className="mx-8 inline-flex items-baseline gap-2.5 whitespace-nowrap"
        >
          <span className="text-lg font-semibold tracking-tight text-muted-strong/70">
            {i.name}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">
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
          Native integrations with the platforms that run your growth
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
