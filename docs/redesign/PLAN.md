# Roazr × Ramp-style design overhaul — plan

Goal: move roazr.com from its current look (dark canvas, neon-mint gradients, glow/aurora
effects, pill buttons, heavy animation) to the feeling of **ramp.com**: a warm off-white
editorial system, nearly monochrome, with a single vivid accent that appears only where
money moves. Calm, flat, confident — "attribution infrastructure" should look like
infrastructure, not a crypto landing page.

Reviewable mockup: see `docs/redesign/mockups/home-ramp.html` (also published as a
Claude artifact). It renders the full homepage with real copy and a 3-way accent
switcher so the direction can be picked before any code changes.

---

## The target language (what makes Ramp feel like Ramp)

| Trait | Ramp | Roazr today | Overhaul target |
|---|---|---|---|
| Canvas | Warm off-white ("bone") | Near-black `#04090b` | Bone `#FAF9F4`, white cards |
| Color | Near-monochrome + one chartreuse accent on action surfaces only | Mint gradients everywhere, 4 brand accent colors, glows | Ink + ash neutrals; ONE accent, used only on CTAs, live states, and key data |
| Type | Single-weight neo-grotesque (Lausanne 400) at huge sizes, tight leading; tracked uppercase labels | Geist w/ gradient "glow text", multiple weights | Schibsted Grotesk 400 (closest free Lausanne-alike); hierarchy from size + case, not bold; keep Geist Mono for kickers/data |
| Surfaces | Flat, hairline borders, shadow-free, 12–16px card radius | Translucent blur panels, glow shadows | White cards, 1px hairline, radius 14px, no shadows |
| Buttons | 6px-radius rectangles | 999px pills w/ gradient + shine sweep | 6px rectangles: accent fill + ink text (primary), hairline outline (ghost) |
| Motion | Tactile, sparing | Aurora blobs, particles, beams, 3D tilt, marquee, spotlight | Subtle reveals + count-ups only; delete ambient effects |
| Dark sections | Inverted ink band for closing CTA / footer | Everything dark | Bone throughout; ink band only for FinalCta + Footer |

## Accent decision (pick in the mockup)

1. **Mint — brand** `#2EE889` — keeps Roazr's green identity, flattened (no gradient), ink text on accent.
2. **Chartreuse — Ramp** `#E4F222` — the faithful knock-off; reads "energy/money", breaks from WhatsApp-green.
3. **Emerald — calm** `#12B76A` — deeper, more "trustworthy fintech", closest to current light-mode accent.

## Open decisions for review

- **Accent** (above).
- **Dark mode**: Ramp has none. Recommend: light becomes the only theme (delete toggle),
  OR keep a dark theme restyled to the same flat system. Deleting is less work and more Ramp.
- **Typeface**: Schibsted Grotesk (proposed, shown in mockup) vs keeping Geist at 400-only.
- **HeroVisual**: flatten the existing dashboard mock (keep content, restyle light/flat) vs
  replace with a simpler static composition.

---

## Phases

### Phase 1 — Tokens & foundation (`app/globals.css`, `app/layout.tsx`)
- New palette as CSS vars: `--bone #FAF9F4`, `--card #FFFFFF`, `--ink #171C18`,
  `--ash #5E6B62`, `--hairline rgba(23,28,24,.12)`, chosen accent + `--ink-band #121713`.
- Light becomes `:root` default; resolve dark-mode decision.
- Load Schibsted Grotesk via `next/font/google`; keep Geist Mono.
- Radii: `--r-card 14px`, `--r-btn 6px`. Remove glow/gradient vars.

### Phase 2 — Primitives
- `.btn`: rectangles, 6px radius; primary = accent bg + ink text; ghost = hairline border.
- `.panel`: flat white + hairline, no blur/no shadow; hover = border darkens + 1px lift max.
- `.kicker`: keep mono-uppercase pattern, recolor to ash with accent dash.
- Delete `.aurora`, `.noise`, `.spotlight`, `.glow-text`, grid-bg (or fade grid to 3% ink).
- `SectionHead`, `SpotlightCard` (→ plain `Card`), `Reveal` retained; `MagneticLink`,
  `Particles` removed.

### Phase 3 — Nav & Hero
- Nav: bone bg, hairline bottom border on scroll, ink links, rectangular CTAs.
- Hero: left-aligned display type (clamp ~44→84px, lh ~1.0, weight 400), accent
  highlight on one phrase, dual CTAs, trust line.
- HeroVisual: strip beams/particles/3D tilt/`theme-dark-pin`; restyle as flat light
  dashboard card per mockup.

### Phase 4 — Sections (top → bottom)
- LogoStrip: kill marquee → static row, grayscale ink chips, mono label.
- Problem: two flat cards (pixel-blind vs Roazr-connected), semantic red only for "lost" state.
- HowItWorks: 3 hairline cards, big mono numerals, flat mini-visuals.
- Features → **demo bento** (Ramp's signature): large light-gray cards, two-tone
  headline (ink lead + ash rest), corner ↗, each card containing an embedded product
  demo that bleeds off the card edge — chat pop + dark "verified purchase" card,
  event-stream window, payment-matching table, ROAS dashboard window, integrations
  tile grid. 2 wide cards on top, 3 below.
- Metrics: hairline-divided columns, huge tabular numerals (keep CountUp).
- Testimonials: editorial quotes — large text, hairline rules, mono attribution.
- FAQ: keep two-col accordion, hairline dividers, plus/minus indicators.
- FinalCta: inverted ink band, accent primary button.

### Phase 5 — Chrome & remaining pages
- Footer: lives on the ink band, mono column labels.
- `/demo` page + `DemoForm`: light flat fields, 6px radii, accent focus rings.
- Legal pages via `LegalShell`: bone canvas, editorial type.
- `opengraph-image.tsx` + `icon.svg`/`Wordmark`: bone/ink/accent rework.

### Phase 6 — Motion & QA
- Motion: scroll reveals ≤ 12px rise, one orchestrated hero load sequence; respect
  `prefers-reduced-motion` (already handled).
- QA: AA contrast on accent surfaces, mobile pass, Lighthouse, remove dead CSS/components.

Each phase lands as its own commit(s) on `claude/roazr-design-overhaul-0mkcn8`.
