import { metrics } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Metrics() {
  return (
    <section className="border-y border-line bg-wash py-16 sm:py-20">
      <div className="container-x">
        <Reveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-[2.6rem]">
                  <CountUp
                    value={m.value}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    decimals={m.decimals}
                  />
                </p>
                <p className="mt-2 text-[13px] text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
