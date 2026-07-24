# Etin Media "AI Ads System" funnel — session handoff

## What this is
2-page static direct-response funnel for Best Etinosa (Etin Media), selling "The Complete AI Ads System" at ₦9,900 to Nigerian business owners. Mobile-first; traffic from paid social.

- Repo: `AxotechFuture/roazr-website`, branch **`claude/etin-media-ai-ads-funnel-lw6jby`** (all work committed + pushed here)
- Files: `etin-media-ai-ads-landing/index.html` (landing, 12 sections), `checkout.html`, `assets/proof/*` (real images)
- Live previews (claude.ai artifacts, same URLs redeployed each round):
  - Landing: https://claude.ai/code/artifact/f4a4a14d-67b5-41b5-9873-41cd6011373b
  - Checkout: https://claude.ai/code/artifact/8e4962dd-0b25-4ba4-ada2-28087ad161d4

## Copy rules (critical)
Copy is LOCKED verbatim (quirks/typos intentional: "N2M profit", "Option 3.None.", "back..", "when??"). Owner-approved changes so far: guarantee unified to "₦150,000 in 7 days"; headline "Steal Our ₦233M AI Ads System…"; S2 heading "Aren't You Tired Of Your Business Doing You Like This?"; removed: "I know exactly what your life…", "Notice something?…" line, eyebrow line, award block, coach photo. Visual-only restyles allowed; NO invented copy, NO emojis (inline SVG only).

## Design state (current)
- System font stack only (`-apple-system, system-ui, …`), no Google Fonts. All dark text #000000. All radii 4px (circles/pills exempt). Accent: green #22C55E (all former yellow), red #EB0000 CTAs, hero = crimson gradient.
- Hero: plain headline (no highlight/underline), trust pill = white rounded bar: amber badge "₦233M+ GENERATED" → "1,000+ CAMPAIGNS…" → laurel-flanked 5 amber stars → "TRUSTED BY 4,000+ NIGERIAN BUSINESSES".
- Before/after proof (real Ads Manager screenshots) stacked vertically with yellow-circle "30 DAYS LATER ↓" arrow; auto-swap pattern: `assets/proof/before.png|after.png` replace HTML mockup via img onload.
- S3 modules: white cards; module 2 + 3 have real images (transparent PNG / whitened bg). S5: plain check-list on grey (owner rejected tile redesign — ask before restyling). S6: cream certificate + green laurel SVGs. S8: black prize card (green top accent) + bonus cards w/ red icon chips. S9: framed phone-glyph counter + red badge. S10: pure black section, black card with thin 1px red border, circle checks, green value tags, price stack inside card. P.S.: giant black "P.S." heading + left-aligned paragraphs (no box). Footer: wordmark + rule.
- Endorsements (2×2): Ajaps Evans (CMO, Magenta Residential), Christian Paul (Radu Consulting), Uchechukwu Mojekwu (CEO, Makarios Consulting), BZ Allel (CEO, Assetar — quote pending, shows "Review coming soon."). Photos = labeled placeholders.
- Wall of Alerts: 8 real screenshots in `assets/proof/wall/w1-8.jpg` with real captions (Kelvin Luxe ₦7.58M/mo; 7.72x ROAS; Davidson GA; Mr Okpala; Ms Abigail 1,200% ROAS; real-estate 43 inspections; Ms Sonnia 23 sales overnight; Ekhato Precios ₦1.39M/85 orders).

## Behavior/JS
- All 5 landing CTAs open a lead-capture modal (First Name/Email/Phone, "Nigeria +234" prefix) → continues to `checkout.html?fn=&em=&ph=` which prefills the form. href stays as no-JS fallback.
- Checkout: pre-checked ₦4,900 order bump ("Banned Ad Account Recovery Protocol"), live summary (₦9,900/₦14,800), Paystack inline (kobo 990000/1480000), double-submit guard, PaystackPop-missing fallback message + script re-inject, phone normalized to +234, success card. **KEY STILL PLACEHOLDER: `pk_live_REPLACE_ME` in checkout.html.**
- Sales-proof popup (bottom-left pill, WiserNotify style): random buyer names (NG/GH/ZA lists in index.html), random "X minutes/hours ago" (50% <1h), "Purchased AI Ads Machine ✓ Verified" → wisernotify URL. Timing: 10s → 5 pops (in 2s/hold 3s/out 2s/gap 6s) → 30s → 5 → 15min → 4 → repeat(10min → 7). `#proofdemo` in URL = accelerated test mode.
- Top bar: tel:+2349167637825, ETIN MEDIA wordmark ("Need Help?" removed).

## Verification tooling (session-scratchpad only — regenerate if needed)
Scripts lived in the old session scratchpad (gone after container reclaim): `copycheck.js` (locked lines vs rendered text), `funcheck.js` (54 functional checks: modal flow, bump math, Paystack stub, FAQ, overflow at 320/375/1280), `sections.js`/`shoot.js` (screenshots via playwright-core + `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, route-stub Paystack), `build-preview.js` (artifact preview: strips wrapper, stubs Paystack, inlines assets/proof images as data URIs, rewrites checkout link to the checkout artifact URL). Pattern: run checks after every change; republish both artifact URLs; commit as author `best <etinosaelogho@gmail.com>` (NEVER Claude as author); push to the branch above.

## Outstanding
1. Paystack public key (pk_live_) into checkout.html
2. Hosting: Netlify Drop / Vercel (drag `etin-media-ai-ads-landing/` folder; zip was delivered) — no Vercel token in env
3. BZ Allel quote; 4 endorser headshots; module 1 (AI Ad Machine) visual; checkout "Product Bundle Mockup"; VSL video embed
4. Checkout page hasn't received the newer landing restyles (trust pill, some polish) — owner hasn't asked; keep consistent when touched
5. Owner prefers: pure black surfaces, thin red borders, reference-image-driven redesigns; send transparent assets as PNG
