import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Roazr, the marketing analytics and attribution platform operated by Etin Media, Inc.",
};

const toc = [
  { href: "#acceptance", label: "Acceptance of Terms" },
  { href: "#description", label: "Description of Service" },
  { href: "#registration", label: "Account Registration" },
  { href: "#acceptable-use", label: "Acceptable Use" },
  { href: "#meta-integration", label: "Meta Platform Integration" },
  { href: "#payments", label: "Payments & Billing" },
  { href: "#data-privacy", label: "Data & Privacy" },
  { href: "#ip", label: "Intellectual Property" },
  { href: "#termination", label: "Termination" },
  { href: "#warranties", label: "Disclaimer of Warranties" },
  { href: "#liability", label: "Limitation of Liability" },
  { href: "#changes", label: "Changes to These Terms" },
  { href: "#law", label: "Governing Law" },
  { href: "#contact", label: "Contact" },
];

export default function TermsOfServicePage() {
  return (
    <LegalShell
      title="Terms of Service"
      updated="June 15, 2026"
      toc={toc}
      intro={
        <p>
          These Terms of Service (&ldquo;<strong>Terms</strong>&rdquo;) govern
          your access to and use of <strong>Roazr</strong>, a marketing
          analytics platform available at{" "}
          <a href="https://app.roazr.com">app.roazr.com</a> (the &ldquo;
          <strong>Service</strong>&rdquo;). Roazr is operated by{" "}
          <strong>Etin Media, Inc.</strong> (&ldquo;
          <strong>Etin Media</strong>,&rdquo; &ldquo;<strong>we</strong>
          ,&rdquo; &ldquo;<strong>our</strong>,&rdquo; or &ldquo;
          <strong>us</strong>&rdquo;), a company registered in the United
          States. By accessing or using the Service, you agree to be bound by
          these Terms.
        </p>
      }
    >
      <section id="acceptance">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Roazr, you confirm that you have read,
          understood, and agree to these Terms. If you do not agree, you may
          not access or use the Service.
        </p>
      </section>

      <section id="description">
        <h2>2. Description of Service</h2>
        <p>
          Roazr is a marketing analytics and attribution platform that helps
          businesses connect advertising spend to real sales outcomes. It
          integrates with ad platforms (Meta/Facebook, Google Ads, TikTok),
          WhatsApp Business API, and payment processors (such as Paystack) to
          sync campaign performance data, attribute conversions, send enriched
          conversion events to ad platforms via their respective server-side
          APIs, and display unified reporting in your dashboard.
        </p>
      </section>

      <section id="registration">
        <h2>3. Account Registration</h2>
        <p>
          To use the Service, you must create an account and provide accurate,
          complete information. You are responsible for keeping your login
          credentials secure and for all activity that occurs under your
          account. Notify us promptly at{" "}
          <a href="mailto:privacy@roazr.com">privacy@roazr.com</a> if you
          suspect unauthorized access.
        </p>
      </section>

      <section id="acceptable-use">
        <h2>4. Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>
            Reverse engineer, decompile, or attempt to extract the source code
            of the Service;
          </li>
          <li>
            Use the Service for any unlawful purpose or in violation of
            applicable laws or regulations;
          </li>
          <li>
            Share, sublicense, or resell access to the Service without our
            written permission; or
          </li>
          <li>
            Interfere with or disrupt the integrity, security, or performance
            of the Service.
          </li>
        </ul>
      </section>

      <section id="meta-integration">
        <h2>5. Meta Platform Integration</h2>
        <p>
          When you connect a Meta advertising account, you grant us permission
          to: read campaign, ad set, and ad performance data; read the Facebook
          Pages associated with your account; send conversion events on your
          behalf via the Meta Conversions API; and create one custom conversion
          (&ldquo;Roazr WhatsApp DM&rdquo;) in your ad account to enable
          WhatsApp DM optimization. We do not create, modify, or delete your
          ads, ad sets, campaigns, or budgets. You are solely responsible for
          complying with Meta&rsquo;s own terms, policies, and developer
          requirements. Etin Media acts as your data processor when sending
          CAPI events on your behalf; you remain responsible for ensuring you
          have a lawful basis to collect and share the data you route through
          Roazr.
        </p>
      </section>

      <section id="payments">
        <h2>6. Payments &amp; Billing</h2>
        <p>
          Subscription fees are billed in advance on a recurring basis
          according to the plan you select. Fees are non-refundable for partial
          billing periods unless required by applicable law. We may change
          pricing with at least 30 days&rsquo; notice before the new rates take
          effect for your subscription.
        </p>
      </section>

      <section id="data-privacy">
        <h2>7. Data &amp; Privacy</h2>
        <p>
          Our handling of personal data is governed by our Privacy Policy at{" "}
          <a href="https://roazr.com/privacy-policy">
            roazr.com/privacy-policy
          </a>
          . By using the Service, you also agree to that policy.
        </p>
      </section>

      <section id="ip">
        <h2>8. Intellectual Property</h2>
        <p>
          Etin Media owns the Roazr platform, software, branding, and all
          related intellectual property in the Service. You retain ownership of
          your own data, content, and advertising account information that you
          provide or connect to Roazr.
        </p>
      </section>

      <section id="termination">
        <h2>9. Termination</h2>
        <p>
          Either party may terminate your access to the Service at any time.
          You may stop using Roazr and disconnect integrations at any time
          through your account settings.
        </p>
        <p>
          Upon termination, we will delete your data within 30 days, except
          where retention is required by law or permitted under our Privacy
          Policy.
        </p>
      </section>

      <section id="warranties">
        <h2>10. Disclaimer of Warranties</h2>
        <p>
          The Service is provided on an &ldquo;<strong>as is</strong>&rdquo;
          and &ldquo;<strong>as available</strong>&rdquo; basis without
          warranties of any kind, whether express, implied, or statutory,
          including implied warranties of merchantability, fitness for a
          particular purpose, and non-infringement.
        </p>
      </section>

      <section id="liability">
        <h2>11. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Etin Media&rsquo;s total
          liability for any claim arising out of or relating to these Terms or
          the Service is limited to the amount you paid us in the three (3)
          months preceding the event giving rise to the claim.
        </p>
      </section>

      <section id="changes">
        <h2>12. Changes to These Terms</h2>
        <p>
          We may update these Terms from time to time. When we make material
          changes, we will update the &ldquo;Last updated&rdquo; date at the
          top of this page. Your continued use of the Service after changes
          become effective constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section id="law">
        <h2>13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of Delaware, United
          States, without regard to conflict-of-law principles. Any dispute
          arising under these Terms will be resolved in the courts located in
          Delaware, and you consent to their jurisdiction.
        </p>
      </section>

      <section id="contact">
        <h2>14. Contact</h2>
        <p>
          If you have questions about these Terms, please contact us at:{" "}
          <a href="mailto:privacy@roazr.com">privacy@roazr.com</a>
        </p>
      </section>
    </LegalShell>
  );
}
