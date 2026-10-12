# SORREL — BRAND FOUNDATION

> Phase 0 output, Brand-Build Protocol v1.0. Generated 2026-10-08.
> **STATUS: CONCEPT BRAND.** MONO does not exist. It is a demonstration brand built to prove
> the pipeline. Every page in the build carries a disclosure. See §9.

---

## 1. THE PRODUCT — one product, no roadmap

**The MONO Chair.** A low-slung club chair. Solid white oak frame, saddle vegetable-tanned
leather seat and back, hand-welded seams, dowelled and glued joinery. Nothing else. No second
model, no "coming soon", no accessories, no collection.

| Field | Value |
|---|---|
| Name | The MONO Chair |
| Batch | Batch No. 01 — 40 chairs |
| Price | **$4,200 CAD** |
| Lead time | 12–14 weeks from order |
| Origin | Kelowna, British Columbia |
| Sizes | One. It does not come in sizes and we will not pretend it does. |
| Finish | Satin hard-wax oil, renewable — re-oilable at home |

### Why this price is defensible (research-grounded, not invented)

| Comparable | Price | Source |
|---|---|---|
| Maiden Home — Hyde Chair, solid white oak | $2,925 USD | maidenhome.com/collections/chairs |
| Audo Copenhagen — Brasilia Lounge Chair, low back | $3,035 USD | us.audocph.com/collections/brasilia-collection |
| Dinesen — DS301 oak / leather | €2,819 | Dinesen Collection price list |
| Menu — Elizabeth Lounge Chair, leather | $8,445 USD | danishdesignstore.com |
| Fredericia — Mogensen 2207 Club Chair | $11,925–14,400 USD | shophorne.com, aplusrstore.com |

$4,200 CAD (~$3,050 USD) places MONO **above the mass-premium entry** and **an order of magnitude
below the collector tier**. That is the honest gap: better joinery and a real leather hide than the
$2,900 chairs, at a fifth of Mogensen money. The whole brand argument lives in that sentence.

### The mechanic: batches, not stock

Real made-to-order brands publish lead times rather than fake countdowns (Audo lists MTO lead
times on product pages; Fredericia's Mogensen runs 8–16 weeks at retail). MONO publishes a
**batch size and a lead time and nothing else.** Batch 01 is capped at 40 because that is what
two benches can build in a quarter. No countdown timer. No "only 3 left." The scarcity is
structural and true.

---

## 2. NAME & MEANING

**MONO** — *MONO* (n.) is the chestnut-brown colour of vegetable-tanned leather. Also a
red-brown plant. The brand is named after the exact colour of its own material. One word,
one syllable, English, quiet, and it means the thing itself.

- Wordmark set in **Instrument Serif**, generously tracked.
- Never "SORREL®". Never a circled R until there is a registration.

### Taglines (pick one, use it everywhere)

1. **One chair. Made once.** ← chosen. It states the entire business model in four words.
2. The colour of the leather.
3. Forty at a time.

Chosen: **One chair. Made once.** It is a product promise, an operating constraint and a
point of view in four words. It also makes declining business free.

---

## 3. FOUR PILLARS — each one traceable, none invented

**1. One thing, properly.**
There is no second model and no roadmap. Everything — the tooling, the leather supplier, the
photography, the copy — is tuned to a single object. *Proof:* the product list is one line long.

**2. The hide is the spec.**
We publish hide size, thickness, tannage and cut on the PDP, in millimetres, because a
chair is a hide that was cut well. *Proof:* every spec on the PDP is a number, not an adjective.

**3. Forty at a time.**
Batch 01 is 40 chairs. Batch 02 is 40 chairs or fewer. We publish the cap. *Proof:* the
batch number is on the PDP and in the footer of every page.

**4. It arrives when it arrives.**
12–14 weeks, quoted before you pay, never shortened to make a number look better.
*Proof:* the lead time is printed in the buy box, not buried in shipping policy.

---

## 4. BRAND VOICE

| Do | Don't |
|---|---|
| State the number, then the feeling | Adjective stacking ("gorgeous", "stunning") |
| Short declarative sentences, one idea each | Exclamation, ever |
| Name the trade honestly ("tannery", "hide", "tannage") | Euphemism ("premium hide", "ethical leather") |
| Admit the constraint out loud | Hide lead time behind "processing" |
| Use periods. Lots of them. | Use semicolons for emphasis |

Banned on the whole site: *luxury, timeless, elevate, curate, journey, bespoke, artisan,
handcrafted (the chair is machine-cut and hand-finished — say that instead), exclusive,
stunning, gorgeous, timeless, heirloom.*

---

## 5. CAMPAIGN — "FIRST BATCH"

The campaign is a **film of one object being finished**, shot in the workshop, with a plain
title. No season. No drop mythology. No invented scarcity.

- **Name:** First Batch
- **Chapter 01 — The Hide.** The tannery. Hide grading, split on the spine.
- **Chapter 02 — The Frame.** White oak, quartersawn, drying in the shop.
- **Chapter 03 — The Seat.** Cutting, skiving, saddle stitch, welt.
- **Chapter 04 — The Forty.** Batch 01 closing on the bench.

Honest note: because no film of a real workshop exists yet, the campaign on the demo site is
**the 3D model of the chair on a plaster floor, lit by the shop window.** That is not a
substitute for the real film. It is the placeholder that becomes the film when the workshop
exists. It is labelled as a render.

---

## 6. DESIGN SYSTEM SUMMARY

The full system lives in `src/app/globals.css` and is law. Palette is **derived from the two
materials**, not chosen from a trend:

| Token | Hex | What it is |
|---|---|---|
| `--plaster` | `#EFEAE1` | limewashed wall — the ground |
| `--ground` | `#F6F2EA` | the page |
| `--oak` | `#C9A87C` | the timber |
| `--oak-pale` | `#E2D2B4` | sapwood, highlights |
| `--MONO` | `#8A4A2B` | the leather, the accent, the CTA |
| `--MONO-deep` | `#5E3220` | leather in shadow, dark bands |
| `--ink` | `#1B1714` | warm near-black |
| `--ash` | `#6E7A6B` | the single cool accent (milled dust, hardware) |
| `--brass` | `#8C6F42` | oxidised hardware |

**Type**
- Display: **Instrument Serif** (400 + italic) — high-contrast Didone, editorial, furniture-press.
- Body/UI: **Schibsted Grotesk** (400/500/600) — Nordic grotesque, quiet, not Inter.
- Spec/measurements: **DM Mono** (400/500) — tabular figures for the spec ledger.

Fonts are loaded from `next/font/google` and exposed as `--font-display`, `--font-body`,
`--font-mono`. No font files are committed.

---

## 7. THE MEDIA LAYER — what replaces photography

There is no photography budget and no image-generation credential on this machine. Every visual
path was verified dead (see BUILD-BRIEF.md § MEDIA). So the visual identity is **rendered, not
photographed**:

1. **The chair is a real 3D model.** A parametric club chair built from the actual spec —
   40 mm tapered legs, 620 mm seat height, 690 mm overall width. Oak and leather as distinct
   PBR materials, lit by an IBL environment with a key light through a window. This is not a
   picture of a chair; it is the chair, modelled. It rotates. On the PDP it is draggable.
2. **Material studies.** Oak grain and leather grain generated procedurally into canvas
   textures at runtime, so the surfaces are the same grain the model uses.
3. **Type carries the rest.** Enormous Instrument Serif, generous negative space, hairline
   rules, a spec ledger in DM Mono. This is the Vitsœ / Audo catalogue-page register: a
   furniture brand that trusts you to look at one object.

This is a **design decision, not a compromise.** A one-product store does not need a lookbook.
It needs one object rendered honestly and the numbers printed beside it.

---

## 8. THE SITE MAP

| Route | Job |
|---|---|
| `/` | The argument. One chair, the case for it, the waitlist. |
| `/chair` | PDP. Render, full spec ledger, batch, lead time, reserve. |
| `/craft` | How it's built, the four stages, the numbers behind each. |
| `/waitlist` | Batch 02. Honest: no date, no count, just what members get. |
| `/policies` | Shipping, returns, warranty, and the demo disclosure. |

---

## 9. HONESTY LAWS — binding on every page

**The meta-disclosure.** MONO is a concept. The footer of every page says so, and `/policies`
says so at length, and the PDP labels the render as a render. This is the one law that outranks
every other: **nothing on this site may imply a company exists that does not.**

Within the fiction, these are absolute:

1. **No fake scarcity.** No countdown timers, no "only N left", no "selling fast", no invented
   stock counts. The only scarcity stated is Batch 01 = 40 chairs, which is the operating model.
2. **No fake social proof.** No reviews, no star ratings, no testimonials, no invented customer
   names. There is no reviews module. There is an honest statement that there are none yet.
3. **No fake pricing.** No struck-through compare-at price, no invented discount, no anchoring.
   One price. It is the price.
4. **No invented claims.** No awards, no press, no "since 19XX", no sustainability badge, no
   "ethically sourced", no certification marks. If a fact isn't in this document, the site
   doesn't say it.
5. **No invented numbers.** Every number on the site traces to §1 of this file or to §3.
6. **The render is labelled as a render.** Everywhere it appears.
7. **NO-EMAIL LAW.** Capture forms write to a list via API. Nothing is ever sent.
8. **No invented social URLs.** No links to accounts that do not exist.

---

## 10. WHAT "PREMIUM" MEANS FOR THIS BRAND SPECIFICALLY

Not luxury. Not marble. Not gold foil. Premium here is:

- A **number** where an adjective would normally go.
- **Negative space** the reader can feel.
- Type that is **set**, not styled — one size scale, two families, no effects.
- Restraint in the palette: nine tokens, all of them a real material colour.
- Saying "we don't sell chairs" as proudly as "we sell this one."

The failure mode to avoid is the generic AI storefront: centred hero, two buttons, three-up
icon cards, numbered sections, a tiny uppercase eyebrow over every heading. Banned outright —
see BUILD-BRIEF.md § DESIGN RULES.