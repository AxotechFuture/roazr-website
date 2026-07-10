"use server";

import { z } from "zod";
import {
  bandLabels,
  COUNTRIES,
  CURRENCY_CODES,
  PLATFORMS,
  qualify,
} from "@/lib/qualification";

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().max(200),
  company: z.string().trim().min(1).max(160),
  website: z.string().trim().max(200).optional().default(""),
  country: z.enum(COUNTRIES),
  whatsapp: z
    .string()
    .trim()
    .min(7)
    .max(24)
    .regex(/^\+?[\d\s()-]{7,}$/),
  platforms: z.array(z.enum(PLATFORMS)).max(PLATFORMS.length),
  runningAds: z.boolean(),
  currency: z.enum(CURRENCY_CODES as [string, ...string[]]),
  spendBand: z.number().int().min(0).max(4),
  /** Honeypot — humans never see this field. */
  fax: z.string().max(0).optional().default(""),
});

export type LeadPayload = z.input<typeof leadSchema>;

export type LeadResult =
  | { ok: true; status: "qualified" | "unqualified" }
  | { ok: false; error: string };

async function saveToAirtable(fields: Record<string, unknown>): Promise<void> {
  const key = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "Leads";

  if (!key || !baseId) {
    console.warn(
      "[roazr] AIRTABLE_API_KEY / AIRTABLE_BASE_ID not set — lead NOT persisted:",
      JSON.stringify(fields),
    );
    return;
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      // typecast lets Airtable auto-create select options (e.g. new
      // currencies) instead of rejecting the record.
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Airtable ${res.status}: ${body}`);
  }
}

export async function submitLead(input: LeadPayload): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please check your details and try again." };
  }
  const d = parsed.data;

  // Bots that fill the honeypot get a convincing dead end, no record.
  if (d.fax !== "") {
    return { ok: true, status: "unqualified" };
  }

  // Scoring happens here, server-side only — the browser never learns
  // the thresholds.
  const status = qualify({ runningAds: d.runningAds, spendBand: d.spendBand });

  try {
    await saveToAirtable({
      Name: d.name,
      Email: d.email,
      Company: d.company,
      Website: d.website,
      Country: d.country,
      WhatsApp: d.whatsapp,
      "Running ads": d.runningAds,
      Platforms: d.platforms,
      Currency: d.currency,
      "Monthly ad spend": bandLabels(d.currency)[d.spendBand],
      Status: status,
      Source: "roazr.com/demo",
    });
  } catch (err) {
    // Never lose the lead silently AND never break the visitor's flow:
    // log loudly for ops, still show the visitor their result.
    console.error("[roazr] Failed to persist lead:", err);
  }

  return {
    ok: true,
    status: status === "Qualified" ? "qualified" : "unqualified",
  };
}
