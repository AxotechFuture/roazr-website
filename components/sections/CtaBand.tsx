import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { site } from "@/lib/site";

/**
 * Mid-page conversion band — the compact sibling of FinalCta. Drop it
 * between content sections when the reader has just seen enough to act.
 * Every proof point here is verified against the app repo: 14-day
 * full-app trial with no card (lib/plans.mjs TRIAL_DAYS), founding price
 * locked while continuously subscribed.
 */
export function CtaBand({
  title = "Live in about 10 minutes.",
  sub = "Create an account, paste two scripts, and watch the first events arrive before your tea cools.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="border-y border-line bg-wash">
      <div className="container-x py-16 sm:py-20">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted">
            {sub}
          </p>
          <div className="mt-8">
            <MagneticLink
              href={site.signupUrl}
              className="btn btn-primary btn-lg w-full sm:w-auto"
            >
              {site.cta.signup}
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticLink>
          </div>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted">
            {["No card required", "Full app access", "Founding price locked for life"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  {t}
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
