# roazr.com

Marketing site for **Roazr** — revenue attribution for WhatsApp commerce, by Etin Media, Inc.

Built with Next.js (App Router) + Tailwind CSS v4 + Motion. Deploys to Vercel.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/demo` | Demo-qualification form → Airtable |
| `/privacy-policy` | Privacy policy (Meta App Review) |
| `/terms-of-service` | Terms of service |
| `/data-deletion` | Data deletion instructions (Meta App Review) |

## Demo-form qualification rules

Implemented in [lib/qualification.ts](lib/qualification.ts), scored **server-side only** in
[app/actions/lead.ts](app/actions/lead.ts):

- **Running ads:** qualifies at ≥ ₦100,000/mo (NGN) or ≥ $200/mo-equivalent (all other currencies).
- **Not running ads:** qualifies at ≥ $500/mo-equivalent planned budget (₦750,000 for NGN).
- Everyone is saved to Airtable — qualified leads tagged `Qualified`, the rest `Unqualified`.
- Honeypot field filters bots (they get a fake result, no record).

## Configuration

Copy `.env.example` → `.env.local` (and set the same vars in Vercel):

| Var | Purpose |
| --- | --- |
| `AIRTABLE_API_KEY` | Personal access token with `data.records:write` on the leads base |
| `AIRTABLE_BASE_ID` | e.g. `appXXXXXXXXXXXXXX` |
| `AIRTABLE_TABLE_NAME` | defaults to `Leads` |

Airtable table columns (created automatically via `typecast` on first submit if the base allows it):
`Name`, `Email`, `Company`, `Website`, `Country`, `WhatsApp`, `Running ads` (checkbox),
`Platforms` (multi-select), `Currency`, `Monthly ad spend`, `Status` (single-select), `Source`.

**Until the Airtable vars are set, leads are logged to the server console and NOT persisted.**

## Placeholders still to fill in (marked in code)

1. **Testimonials + metrics** — [lib/content.ts](lib/content.ts) (`metrics`, `testimonials`). Current
   entries are labeled samples, not real customers.
2. **Scheduler URL** — [lib/site.ts](lib/site.ts) `schedulerUrl`. While empty, qualified leads see
   "we'll reach out within 24 hours" instead of an instant booking button.
3. **WhatsApp number** — [lib/site.ts](lib/site.ts) `whatsappNumber` (E.164 digits, e.g.
   `2348012345678`). While empty, WhatsApp CTAs fall back to email.
