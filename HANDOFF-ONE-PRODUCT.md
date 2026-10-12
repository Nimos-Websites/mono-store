# HANDOFF — One real product, end to end, premium-brand grade
> You are picking up mid-build. Your job is ONE product, finished, at the level of
> wezelbezel.com and davidandrewfurniture.com. Not a palette swap. A real brand.
> Read this whole file before touching code.

---

## PHASE −1 · THE INTELLIGENCE SWEEP (do this FIRST, output before any code)

Nothing gets built until this is gathered and written down. This is the part that
makes ours a premium brand instead of a nice-looking store.

### Deliverable
`BRAND-FUNNEL-RESEARCH.md` — a sourced, dated intelligence file. Every claim in it
carries a URL. Where you could not verify something, write "unverified" — do not
fill the gap with a guess.

### What to gather, in this order

**1. The premium D2C brand playbooks (study the funnels, not the aesthetics)**
Named brands to dissect end to end — each one is a different lesson:

| Brand | The lesson |
|---|---|
| **Dollar Shave Club** | the original one-product launch video → landing page funnel |
| **Ridge** | one hero product, "covered for life" warranty as the marketing wedge, referral + paid social |
| **True Classic** | one product, infinite audience angles, UGC at scale |
| **Manscaped** | selling an awkward product; objection-handling copy as the funnel |
| **Casper** | one product, risk-reversal guarantee, bundle ladder |
| **Yeti / Solo Stove / Caraway / Our Place / Great Jones** | premium functional objects: material story, waitlist/drop mechanics, the unboxing as media |
| **Bombas** | one-for-one mission layered onto a commodity |
| **Wildgrain** | free-trial-to-subscription ladder |

For each, capture: **the funnel steps** (ad → landing → PDP → ATC → upsell →
post-purchase), **the offer architecture** (bundles, guarantees, warranties,
subscription), **the objection handling**, and **what the first 3 seconds do.**

**2. YouTube and long-form teardowns — mine them, don't guess**
Channels that dissect premium brands and funnels (verify each before citing):
`Wholesale Ted`, `Ac Hampton`, `James Beeson`, `Chris Winter` (UGC),
`Sebastian Esala` (organic), `Ecom Wolf`, `Ben Heath` (paid social),
`Nick Nayani`, `Dave Nick`, `Charlie Morgan`. Search terms that find the gold:
`"premium brand teardown"`, `"DTC brand breakdown"`, `"why <brand> works"`,
`"funnel breakdown"`, `"landing page teardown"`, `"one product store"`,
`"how they scaled"`. Take the *mechanism*, not the opinion.

**3. Swipe-file and archive sources**
`swiped.co` · `land-book.com` · `landingfolio.com` · `lapa.ninja` · `refero.io` ·
`pageflows.com` · `onepagelove.com` · `reallygoodemails.com` ·
`web.archive.org` (a funnel at three points in time shows what they changed) ·
`builtwith.com` (what a brand's stack actually is).

**4. Live signals — what is converting right now**
`ads.tiktok.com/business/creativecenter` (hashtag momentum — already wired in
`tools/trendscan.mjs`), the **Meta Ad Library** (creative that has run ~90+ days is
the winner — that's the signal), Amazon Movers & Shakers, and Reddit/forums
searching the *complaints* about the category. Pain > praise.

**5. Pain mining for our product specifically**
Search the category's failure modes: leak, scale, dead element, cord, warranty.
Every pain found becomes a row in the dossier's pain-point ledger.

### Output shape (fill every section)
```
# BRAND FUNNEL RESEARCH — <date>
1. Playbooks      — the brands above, mechanism per brand, sourced
2. Funnel anatomy — the 6 winning funnel shapes, with named examples
3. Offer architecture — bundle/guarantee/warranty/subscription patterns that work
4. Copy patterns   — 10 objection-handling lines, source per line
5. Media patterns  — what wins in the first 3 seconds, and the 6 formats
6. Pain ledger     — every category complaint found, with source
7. Our wedge       — the one thing our brand does that the category does not
8. Unverified      — everything looked at and could not confirm
```

---

## THE PRODUCT — chosen on VERIFIED demand, not taste

**Handheld garment steamer.**

| Evidence | Figure | Source |
|---|---|---|
| Units, 30 days | **44,800** | RapidTok, single listing, Aug 2026 |
| Reviews | **37,989 at 4.6★** | same listing |
| Shape | multi-year depth, not a spike | volume + depth = structural demand |
| Category price | $29.70 (Dr.Flash) | our $89 must be a *system*, not a spec |

**Live SKU already in the catalogue** (`app/src/data/products.json`, search
"Steam Iron") — pid / sku / cogs / weightG are in that row. DO NOT invent numbers.
**Excluded and stay excluded:** beauty, supplements, ingestibles, medical
(`PRODUCT-DECISION.md` says so; `tools/market/run.mjs` enforces it).

## THE BRAND — invented from the sweep, not from taste

A real name, voice, one-line story for a furniture-quality handheld steamer sold as
a system (unit + case + protocol + 3-year warranty) at $89 vs the $29.70 category
price. **Follow `MONO-DESIGN-LAW.md` (= `~/daf-v3/DESIGN.md` 1:1):** alabaster
ground, royal amethyst acts, brass rules, Poppins site-wide, tabular numerals,
catalog captions under every photograph. The devices stay; the subject changes.
Name it like a furniture house, not a gadget brand.

## THE EXPERIENCE — all of it, on one PDP

1. **Hero** — the three.js scene in `src/lib/product-model.ts` is a *chair*.
   **Rebuild it as the steamer**: real dimensions, ceramic plate, tank, handle, DAF-legal
   materials, DPR cap 2, destroyed off-view, no addons. Label it a render, always.
2. **RuleHeading + BigNumber** — brass rule + index numeral opening each act; one
   enormous tabular figure (25 seconds, 22 g/min, 4–5 mm).
3. **The ledger armature** — asymmetric 7/5, 12/5, 5/3, zigzag. **Never centered
   heroes. Subject wide, spec narrow.**
4. **Catalog caption** under every photo: `CJYD… — 850 G, $10.11 LANDED, 1 OF 1`.
5. **Dossier** — fill `data/marketing/<handle>.json` via the three worker teams in
   `tools/market/run.mjs` (research / psychology / data). `ProductDossier` renders
   PAS / features / audiences / objections / pain-points-with-evidence / history.
   **Sourced or it does not render.**
6. **Motion** — ONE arrival (`LineMaskReveal` on the headline), then `RevealOnScroll`
   stagger, `ImageClipReveal` on photos, brass seams, one purposeful interactive.
   **Banned: fade-up-on-everything, hover:scale, default springs, glow pulses.**
7. **Buy path** — cart (`src/components/cart/`) → `POST /api/checkout` (Stripe, gated
   403 by design). Leave the gate alone.

## WHAT "DONE" MEANS

- `npx tsc --noEmit` clean · `npx eslint src --max-warnings=0` clean
- Screenshots 1440 + 390 full page, read them, `overflow:false`, `errors:[]`, 2–3 rounds
- `motion-menu audit_page` on the PDP — no tells from the new sections
- One real brand name, voice and story a customer could repeat
- The page reads like davidandrewfurniture.com, not like a gadget listing

## KNOWN GAPS you inherit (do not rediscover them)

1. **No video model exists anywhere.** Free engines (Cloudflare FLUX, local SDXL) take
   no image input, so they cannot reproduce this exact SKU. Product-accurate stills need
   a reference-conditioned model; OpenRouter sits at $0.36 against a $1.00 minimum.
2. **Supplier photo is commodity-grade** — Chinese text overlay, price sticker. Caption
   it if useful; premium imagery is your job. Free-engine studio frames are acceptable
   for world/texture, labelled generated.
3. **`variantStock` is null** — availability reads "confirmed when you order".
4. **Catalogue still holds supplements** — apply the exclusion filter to the index.

## THE ONE THING NOT TO DO

Do not ship a token swap and call it a brand. Do not invent a funnel. Go read the
ones that already work, name your sources, and build something better than them.
