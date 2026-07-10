import { testimonials } from "@/lib/content";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHead
          kicker="Customers"
          title="Operators who stopped guessing"
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3" stagger={0.1}>
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <SpotlightCard className="panel-hover h-full">
                <figure className="flex h-full flex-col p-6">
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none"
                  className="mb-5 text-accent/60"
                  aria-hidden="true"
                >
                  <path
                    d="M0 20V12.6C0 5.9 3.9 1.3 10.4 0l1.3 3.1C7.5 4.5 5.6 7 5.4 10H11v10H0zm15 0V12.6C15 5.9 18.9 1.3 25.4 0l1.3 3.1C22.5 4.5 20.6 7 20.4 10H26v10H15z"
                    fill="currentColor"
                    transform="scale(0.96)"
                  />
                </svg>
                <blockquote className="text-[15px] leading-relaxed text-muted-strong">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-[12.5px] text-muted">{t.role}</p>
                </figcaption>
                </figure>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
