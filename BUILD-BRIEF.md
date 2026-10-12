# SORREL — BUILD BRIEF
> The constitution. Every agent reads this in full before touching a file. It is law.
> Generated 2026-10-08 · Concept brand · No store, no Shopify, no photography.

---

## THE BRIEF FROM BEN

> "Genuinely I don't know what product, or what brand. But here's the thing — site comes before
> all of that. And how we're able to brand and market comes down to that strictness."

Read that as: the deliverable is not a product. It's a **brand + a one-product store + a
marketing strategy**, proven by a site that is so disciplined that the branding and the
marketing are forced out of it. MONO is the answer: one chair, one price, one batch, one page.

---

## MEDIA — read this, it changes everything

**There is no photography and there is no image generation.** Every path was tested and is dead:

| Path | Result |
|---|---|
| higgsfield CLI | 0.1 credits on the plus plan |
| OpenRouter image output | requires $1.00 minimum balance, account has $0.64 |
| fal.ai (`fal_key` and `daf_fal_key`) | every model: `401 Cannot access application` |
| Together AI | `403 / 1010` |
| Gemini API (4 keys) | `429 quota exceeded` × 3, `400 invalid key` × 1 |
| Pollinations | `402` on paid models, `429` on the shared community pool |

**Do not attempt image generation. Do not add `<img>` tags pointing at stock or placeholder
services. Do not reference `/public/media`.** That directory will not exist.

**Instead, the visual system is:**

1. `src/components/chair-scene.tsx` — a **parametric Three.js model of the chair**, built from
   the real dimensions in BRAND-FOUNDATION.md §1. Oak and leather PBR materials, procedural
   canvas textures for grain, IBL environment + key light. Interactive: drag to rotate.
   This is a `client` component with `"use client"`.
2. `src/lib/materials.ts` — the procedural grain textures (oak, leather, plaster) as
   `CanvasTexture`s. Shared by the 3D model and by CSS-backed material panels.
3. Type and negative space carry the rest. This is the design direction, not a fallback.

**The label law:** the chair render is always captioned as a render. Never present it as a
photograph of a finished object.

---

## DESIGN SYSTEM — already written. USE IT. Do not edit `globals.css`.

- Palette: `--plaster #EFEAE1` · `--ground #F6F2EA` · `--oak #C9A87C` · `--oak-pale #E2D2B4`
  · `--MONO #8A4A2B` · `--MONO-deep #5E3220` · `--ink #1B1714` · `--ash #6E7A6B` · `--brass #8C6F42`
- Type: `var(--font-display)` Instrument Serif · `var(--font-body)` Schibsted Grotesk ·
  `var(--font-mono)` DM Mono
- Classes available (do not invent new ones):
  `.wrap` `.wrap-narrow` `.act` `.band` `.band-dark` `.band-MONO` `.band-plaster`
  `.display` `.title-l` `.title-m` `.title-s` `.lede` `.body` `.micro` `.mono` `.label`
  `.button` `.button-signal` `.button-ghost` `.button-light` `.button-block` `.arrow-link`
  `.rule` `.ledger` `.ledger-row` `.spec` `.panel` `.panel-media` `.grain-oak` `.grain-leather`
- Motion attributes handled by `src/components/motion.tsx`:
  `data-reveal` `data-stagger` `data-parallax` `data-magnetic`
- Fonts are wired in `src/app/layout.tsx` via `next/font/google`. Do not add another font.

---

## ABSOLUTE DESIGN RULES (violations are rejected)

1. **NO numbered section headers** (01 / 02 / 03) and **no tiny uppercase eyebrow label** above
   a heading. `.label` is for metadata only — captions, table headers, field labels, spec rows.
   Never as a mini-heading sitting on top of a title.
2. **NO centred-hero-with-two-buttons.** **NO three-up icon-card grid.** **NO identical card row
   used twice.** Adjacent sections must differ in column count, alignment and scale.
3. **Pages are not product grids.** Interleave render, type, spec ledger and story.
4. **Mobile (390px) must be as good as desktop.** No horizontal overflow at 390 / 768 / 1024 /
   1440. Minimum 44px tap targets. The 3D scene must degrade on low-power/mobile: cap DPR at 2,
   drop shadow resolution on small screens, never block the page on WebGL init.
5. **Accessibility.** Alt text or `aria-label` on every render surface, real `<label>`s on every
   form field, visible focus rings, semantic landmarks (`header`/`main`/`nav`/`footer`), and the
   canvas must have a text alternative — the spec ledger beside it IS the alternative.
6. **Motion respects `prefers-reduced-motion`.** Lenis and GSAP must both stand down.
7. **No code comments.** Match the existing style. No new dependencies without asking.

---

## HONESTY LAWS (hard — from the owner)

- **THE DISCLOSURE.** MONO does not exist. The footer of every page carries a one-line concept
  notice, and `/policies` explains it in full. Nothing on any page may imply a real company.
- No fake scarcity. No countdowns. No "only N left". No "selling fast". The only scarcity stated
  is **Batch 01 = 40 chairs**, and the only lead time stated is **12–14 weeks**.
- No fake social proof. **There is no reviews module.** No star ratings, no testimonials, no
  customer names or photos. Where a reviews section would go, put an honest "no reviews yet".
- No fake pricing. One price, `$4,200 CAD`. No compare-at, no discount, no anchoring.
- No invented claims: no awards, no press, no founding date, no sustainability badge, no
  certification marks, no "ethically sourced", no "handcrafted", no "artisan".
- No invented numbers. Every number on the site traces to BRAND-FOUNDATION.md §1 (product
  table) or §3 (pillars). Dimensions, materials, thicknesses, batch size, lead time — all from
  §1. Do not introduce a new statistic.
- **NO-EMAIL LAW.** Capture forms POST to `/api/waitlist` and nothing else. Never send email.
- Don't invent social URLs, phone numbers, or street addresses beyond the stated Kelowna origin.

---

## PRODUCT FACTS — the only numbers allowed

| Field | Value |
|---|---|
| Name | The MONO Chair |
| Price | $4,200 CAD |
| Batch | Batch No. 01 — 40 chairs |
| Lead time | 12–14 weeks from order |
| Frame | Solid white oak, quartersawn, 40 mm square tapered legs |
| Seat height | 620 mm |
| Overall width | 690 mm |
| Overall depth | 740 mm |
| Overall height | 720 mm |
| Leather | 4–5 mm saddle vegetable-tanned, aniline finish, full grain |
| Joinery | Dowelled and glued, hand-finished |
| Finish | Satin hard-wax oil, renewable |
| Sizes | One |
| Origin | Kelowna, British Columbia |
| Reservation | 30% deposit to reserve a chair in a batch |

Anything not in this table must not appear as a fact on the site.

---

## FILE OWNERSHIP — hard, no exceptions

| Agent | Owns |
|---|---|
| **HOME** | `src/app/page.tsx`, `src/components/home/*` |
| **CHAIR (PDP)** | `src/app/chair/page.tsx`, `src/components/chair/*`, `src/components/chair-scene.tsx` |
| **CRAFT** | `src/app/craft/page.tsx`, `src/components/craft/*` |
| **WAITLIST + POLICIES** | `src/app/waitlist/page.tsx`, `src/app/policies/page.tsx`, `src/app/api/waitlist/route.ts`, `src/components/forms/*` |
| **LEAD** | `globals.css`, `layout.tsx`, `header.tsx`, `footer.tsx`, `motion.tsx`, `lib/*`, config |

Editing outside your list clobbers another agent. If you need something from another list,
write the requirement in your final report instead of editing it.

---

## YOUR OUTPUT

1. Read this brief and `BRAND-FOUNDATION.md` in full.
2. Load the `design-qa` skill and the `motion-menu` skill before you build.
3. `npx tsc --noEmit` must be clean.
4. Screenshot your routes at **1440×900** and **390×844**, full page:
   `node ~/recipe/brand-build/shot.mjs http://localhost:3141<route> /tmp/<name>.png 1440 900 1`
5. **Read the screenshots with the Read tool.** Fix overflow, awkward crops, tiny tap targets,
   dead space, misaligned grids. A passing typecheck is not a review.
6. Report: files changed, routes done, blockers, and 3 honest weaknesses. Under 250 words.