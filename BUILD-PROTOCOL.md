# MONO — BUILD PROTOCOL (STRICT)

**This file is law.** Every spawned subagent MUST read this file BEFORE writing
any code. No exceptions. No "I'll read it later." No "I know what to do."

---

## 0. THE ONE RULE

**If you did not read `BUILD-PROTOCOL.md` before your first line of code, you
have already failed.** Stop. Read it. Then start.

---

## 1. PRE-FLIGHT CHECKLIST (complete BEFORE any code)

- [ ] Read `BUILD-PROTOCOL.md` in full
- [ ] Read `src/lib/brand.ts` — every product fact lives here
- [ ] Read `PRODUCT-DECISION.md` — the research behind every claim
- [ ] Read `src/app/globals.css` — the design system (tokens, primitives)
- [ ] Read `src/components/devices.tsx` — the section primitives
- [ ] Read `src/components/motion.tsx` — the motion runtime
- [ ] Identify which files you will edit (see §3 — File Ownership)

**If any of these files are missing or unreadable, STOP and report.**

---

## 2. HONESTY LAWS (non-negotiable, no exceptions)

1. **No invented numbers.** Every figure traces to `brand.ts` or
   `PRODUCT-DECISION.md`. If the data doesn't exist, omit it.
2. **No fake scarcity.** No countdowns, no "only X left", no "selling fast."
3. **No fake social proof.** No reviews, no ratings, no testimonials, no
   customer names.
4. **No fake pricing.** No compare-at, no struck-through, no "was $X."
5. **No invented claims.** No founding dates, no origin stories, no
   sustainability claims, no awards, no press.
6. **AI imagery disclosed.** Every generated image is labelled as generated.
7. **No email sending.** Capture forms write to a local file only. No
   outbound email, ever.
8. **No payment methods.** No Stripe keys, no checkout enablement.

**Violating any of these laws = the build is rejected.**

---

## 3. FILE OWNERSHIP (hard boundaries)

You may ONLY edit files in your assigned ownership list. **Do not touch
anything else.** If you need a file outside your list, STOP and report.

| Agent | Owns | Does NOT touch |
|---|---|---|
| **Design System** | `src/app/globals.css`, `src/lib/brand.ts` | All components, all pages |
| **Home** | `src/app/page.tsx`, `src/components/home/*` | All other pages, globals.css |
| **PDP** | `src/app/steamer/page.tsx`, `src/components/pdp/*` | All other pages, globals.css |
| **Catalogue** | `src/app/catalogue/page.tsx`, `src/components/catalogue/*` | All other pages |
| **Commerce** | `src/app/cart/*`, `src/app/checkout/*`, `src/components/cart/*`, `src/components/pdp/commerce/*` | All other pages |
| **Content** | `src/app/how/*`, `src/app/policies/*`, `src/app/waitlist/*` | All other pages |
| **Infrastructure** | `src/app/layout.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`, `src/components/motion.tsx`, `src/components/devices.tsx` | All pages, globals.css |
| **Scenes** | `src/lib/scenes/*`, `src/lib/materials.ts`, `src/components/render/*` | All pages, globals.css |

**Shared files (require coordination):**
- `src/app/layout.tsx` — Infrastructure owns, but must not break any page
- `src/components/motion.tsx` — Infrastructure owns, but must not break any page

---

## 4. DESIGN SYSTEM LAWS

### 4.1 Tokens (globals.css — never raw hex on a surface)
- Use CSS custom properties only: `var(--color-*)`, `var(--font-*)`, `var(--ease)`
- Never write raw hex values in components
- Never write raw `rgba()` in components

### 4.2 Typography
- Display: `var(--font-display)` at `clamp()` sizes, tight letter-spacing
- Body: `var(--font-body)` at 16px base
- Metadata: tracked caps at 11px, `var(--font-mono)`
- **Tabular lining numerals for all money, indices, catalogue ids**

### 4.3 Section Primitives (devices.tsx — use these, don't invent)
- `RuleHeading` — brass rule + index numeral, opens every act
- `BigNumber` — enormous tabular figure for numeric arguments
- `Ledger` — asymmetric 7/5, 12/5, 5/3 grid via `flip`
- `Placard` — spec document panel
- `Seam` — brass hairline divider
- `CatalogCaption` — `01 — THE ROOM, FURNISHED THROUGH THE RAIL`

### 4.4 Motion (motion.tsx — use these, don't invent)
- `LineMaskReveal` — ONE arrival moment per page (headline)
- `RevealOnScroll` — stagger children on scroll
- `ImageClipReveal` — photograph reveal
- `data-magnetic` — button pull toward cursor
- **Banned:** fade-up-on-everything, `hover:scale`, default springs, glow pulses
- **All motion gates on `prefers-reduced-motion`**

### 4.5 Anti-Tell Enforcement
- No numbered section headers as spacing grammar
- No eyebrow kicker above a heading
- No centered hero with two buttons
- No 3-up icon card grid
- No equal-card rows
- No raw hex off-token
- No `rgba(184,153,104,…)` tan washes

---

## 5. BUILD SEQUENCE (follow exactly)

### Step 1: Read
Read all files in §1. Do not skip.

### Step 2: Plan
Before writing code, output a brief plan:
- Which files you will edit
- What each file will do
- Which design system tokens/primitives you will use

### Step 3: Build
Write code following §3 (File Ownership) and §4 (Design System Laws).

### Step 4: Verify
```bash
npx tsc --noEmit -p .          # Must be clean
npx eslint src --max-warnings=0 # Must be clean
```

### Step 5: Screenshot
```bash
node /tmp/shot.mjs http://localhost:3187/<route> <out>.png 1440 900 1
node /tmp/shot.mjs http://localhost:3187/<route> <out>.png 390 844 1
```
Look at the PNGs. Fix: overflow, awkward crops, text-on-busy-imagery, tiny
tap targets, empty space, misaligned grids, console errors.

### Step 6: Report
Final message must include:
- Files changed
- Routes done
- Blockers (if any)
- 3 honest weaknesses

---

## 6. SUBAGENT DISPATCH TEMPLATE

When spawning a subagent, use this exact prompt structure:

```
You are the [ROLE] agent for the MONO one-product storefront.

FIRST: Read /home/dev55/mono-store/BUILD-PROTOCOL.md in full. It is law.
THEN: Read src/lib/brand.ts, PRODUCT-DECISION.md, globals.css, devices.tsx, motion.tsx.

YOUR OWNERSHIP: [files from §3]

BUILD:
[specific requirements]

VERIFY: tsc, eslint, screenshots at 1440 + 390.
REPORT: files changed, routes done, blockers, 3 honest weaknesses.
```

---

## 7. FAILURE MODES (what kills builds)

1. **Invented data** — a number that doesn't trace to brand.ts or PRODUCT-DECISION.md
2. **Generic AI grammar** — centered hero, 3-up cards, numbered sections
3. **File ownership violation** — editing files outside your list
4. **Raw hex in components** — must use tokens
5. **No screenshot verification** — tsc passing is not a review
6. **Skipping the protocol** — not reading BUILD-PROTOCOL.md before code

---

## 8. THE ONE-PRODUCT TEMPLATE LAW

Product #2..#100 is a **config change, not a build**. When adding a new product:
1. Add a row to `src/data/products.json`
2. Add brand constants to `src/lib/brand.ts`
3. The PDP, cart, checkout, and funnel all work without new code
4. If you need new code for product #2, the template is broken — fix the template

---

*End of protocol. This file is law.*
