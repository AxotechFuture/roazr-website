import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-4">
            <Link href="/" aria-label="Roazr home">
              <Wordmark />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Revenue attribution for businesses that close where their
              customers actually are.
            </p>
            <a
              href={`mailto:${site.emails.hello}`}
              className="text-sm text-accent hover:underline"
            >
              {site.emails.hello}
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
              Product
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-muted-strong transition-colors hover:text-foreground">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-strong transition-colors hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-strong transition-colors hover:text-foreground">
                  Book a demo
                </Link>
              </li>
              <li>
                <a href={site.appUrl} className="text-muted-strong transition-colors hover:text-foreground">
                  Sign in
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
              Legal
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-strong transition-colors hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-strong transition-colors hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="text-muted-strong transition-colors hover:text-foreground">
                  Data Deletion
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
              Support
            </p>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href={`mailto:${site.emails.hello}`} className="text-muted-strong transition-colors hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-strong transition-colors hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <a href={`mailto:${site.emails.privacy}`} className="text-muted-strong transition-colors hover:text-foreground">
                  Privacy requests
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-muted">
            Roazr is a software platform by {site.company} It integrates with
            your existing ad platforms and WhatsApp Business API to provide
            attribution data.
          </p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {site.company}
          </p>
        </div>
      </div>
    </footer>
  );
}
