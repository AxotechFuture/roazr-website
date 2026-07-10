import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Data Deletion Instructions",
  description:
    "Roazr Data Deletion Instructions — how to disconnect your Meta account or request deletion of your Roazr data.",
};

const toc = [
  { href: "#disconnect", label: "Option 1 — Disconnect yourself" },
  { href: "#full-deletion", label: "Option 2 — Request full account deletion" },
  { href: "#contact", label: "Contact" },
];

export default function DataDeletionPage() {
  return (
    <LegalShell
      title="Data Deletion Instructions"
      updated="June 8, 2026"
      toc={toc}
      intro={
        <p>
          <strong>Roazr</strong> is a software platform operated by{" "}
          <strong>Etin Media, Inc.</strong>, a company registered in the United
          States. This page explains how to delete your data or disconnect
          Roazr&rsquo;s access to your Meta (Facebook) account. You can remove
          the integration yourself at any time, or request full deletion of
          your Roazr account and associated data.
        </p>
      }
    >
      <section id="disconnect">
        <h2>1. Option 1 — Disconnect yourself (immediate)</h2>
        <p>
          If you only want to stop Roazr from accessing your Meta ad accounts,
          you can disconnect the integration directly from your Roazr
          dashboard:
        </p>
        <ol>
          <li>
            Log in to <a href="https://app.roazr.com">app.roazr.com</a>
          </li>
          <li>
            Go to <strong>Settings</strong>
          </li>
          <li>
            Click <strong>Disconnect</strong> on the Meta connection
          </li>
        </ol>
        <p>
          This immediately removes your stored Meta access token and ad-account
          credentials from Roazr.
        </p>
        <p>
          To also revoke access on Meta&rsquo;s side, go to{" "}
          <strong>Facebook Settings → Business Integrations</strong> and remove
          Roazr.
        </p>
      </section>

      <section id="full-deletion">
        <h2>2. Option 2 — Request full account deletion</h2>
        <p>
          If you want Etin Media to delete your Roazr account and all
          associated data, email us from the address tied to your account:
        </p>
        <ul>
          <li>
            Send an email to{" "}
            <a href="mailto:privacy@roazr.com">privacy@roazr.com</a>
          </li>
          <li>
            Use the subject line: <strong>Delete my data</strong>
          </li>
          <li>
            Send the request from your Roazr account email so we can verify
            ownership
          </li>
        </ul>
        <p>
          We will delete all associated data within <strong>30 days</strong>{" "}
          and confirm completion by email.
        </p>
        <p>
          Please note: conversion events already delivered to Meta are subject
          to Meta&rsquo;s own data retention and deletion processes. Removing
          your Roazr account does not automatically delete data Meta has
          already received.
        </p>
      </section>

      <section id="contact">
        <h2>3. Contact</h2>
        <p>
          If you have questions about data deletion or need help disconnecting
          an integration, contact us at{" "}
          <a href="mailto:privacy@roazr.com">privacy@roazr.com</a>.
        </p>
        <address>
          <strong>Etin Media, Inc.</strong>
          <br />
          Attn: Privacy
          <br />
          Email: <a href="mailto:privacy@roazr.com">privacy@roazr.com</a>
        </address>
      </section>
    </LegalShell>
  );
}
