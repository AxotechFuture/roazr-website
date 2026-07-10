import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function LegalShell({
  title,
  updated,
  intro,
  toc,
  children,
}: {
  title: string;
  updated: string;
  intro: React.ReactNode;
  toc?: { href: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="relative flex-1 overflow-hidden">
        <div
          className="aurora pointer-events-none absolute -top-[260px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[140px]"
          aria-hidden="true"
        />
        <div className="container-x relative pb-24 pt-32 sm:pt-36">
          <div className="mx-auto max-w-3xl">
            <header>
              <p className="kicker">Legal</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                {title}
              </h1>
              <p className="mt-3 font-mono text-[12px] uppercase tracking-widest text-muted">
                Last updated: {updated}
              </p>
              <div className="legal-body mt-7 border-b border-line pb-8">
                {intro}
              </div>
            </header>

            {toc && toc.length > 0 && (
              <nav className="panel mt-8 p-6" aria-label="Table of contents">
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
            )}

            <article className="legal-body mt-10">{children}</article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
