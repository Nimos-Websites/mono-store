# MONO — DESIGN LAW (ported from DAF V3, 2026-10-09)

This is law. It supersedes every earlier MONO design decision. It is the DAF
brand system applied to gadgets instead of furniture — the devices are
identical, the subject changes. DAF's own contract lives at
`~/daf-v3/DESIGN.md` and `~/daf-v3/app/globals.css`; this file mirrors it so
MONO cannot drift from it.

## Research basis (inherited, not re-derived)

- **Vitra / Mattiazzi** — real-space photography, catalog-style index captions
  ("MC29 — APSIS, BY KONSTANTIN GRCIC"), short declarative lines, alternating
  image rhythm, materiality close-ups, flat matte grounds. Zero glass, zero
  glow, zero cards.
- **System1 / Orlando Wood fluent devices (IPA DataMINE)** — a repeating
  recognizable device builds memory. Every page repeats the SAME devices.
- **Ehrenberg-Bass / Binet & Field distinctive assets** — alabaster + royal
  amethyst + brass is the asset. A dark-mode agency look destroys it.
- **Attention fluency** — left-anchored, asymmetric, montage-varied layouts
  sustain attention; centered symmetric layouts depress it.

## Palette (globals.css tokens only — never raw hex on a surface)

| Token | Hex | Use |
|---|---|---|
| `--color-alabaster` | `#F2F0EB` | paper ground (default light) |
| `--color-alabaster-deep` | `#E6E2DA` | recessed matte panel |
| `--color-amethyst` | `#2E003E` | acts, accents, CTAs — the brand |
| `--color-amethyst-mid` | `#430D5E` | large fills / hover |
| `--color-amethyst-glow` | `#5B1B7C` | **WebGL light + focus glow only** |
| `--color-ink` | `#16131C` | dark acts, headlines |
| `--color-ink-soft` | `#4A4356` | body copy |
| `--color-lamp` | `#B89968` | brass — the one warm metal (rules, numerals, seams) |
| `--color-stone` | `#8A8278` | captions / metadata |
| `--color-line` | `rgba(46,0,62,.14)` | amethyst hairline seam |

## Type

**Poppins site-wide** (Ben-locked, inherited). Display tight `-0.02em` at
`clamp()` sizes. Tracked caps only in metadata/eyebrows at 11px. **Tabular
lining numerals for all money, indices and catalogue ids.**

## The fluent devices — repeat on every page, no substitutions

1. **The brass rule + index numeral** — every act opens with it (`RuleHeading`).
2. **The ledger armature** — asymmetric 7/5, 12/5, 5/3, zigzag via `flip`.
   **Never centered heroes. Subject wide, spec narrow.**
3. **The enormous tabular figure** — one per page where the argument is numeric.
4. **The catalog caption** — `01 — THE ROOM, FURNISHED THROUGH THE RAIL` under
   every photograph, small tracked caps with a brass index. For MONO:
   `CJYD323759001AZ — 460 G, DRINKWARE, $10.11 LANDED`
5. **Real-space photography** — the supplier photograph IS the argument. Always
   captioned, never floating decoration.
6. **The registers** — `/products` is a catalogue; a PDP is a spec document.

## Motion signature

ONE arrival moment per page: `LineMaskReveal` on the headline. Everything
else: `RevealOnScroll` with stagger, `ImageClipReveal` on photographs, brass
seams, **one purposeful interactive per page**.

Banned: fade-up-on-everything, `hover:scale`, default springs, glow pulses.
All motion gates on `prefers-reduced-motion`.

## Anti-tell enforcement (inherited)

No numbered section headers as spacing grammar; no eyebrow kicker above a
heading; no centered hero with two buttons; no 3-up icon card grid; no
equal-card rows; no raw hex off-token; no `rgba(184,153,104,…)` tan washes.

## What MONO adds on top

The honesty laws are unchanged and non-negotiable: no fake scarcity, no reviews
(none exist), no compare-at, every figure sourced or omitted, the render always
labelled. The dossier sections (PAS, features, psychology, pain points) are
rendered **through** these devices — as spec documents and ledgers, never as
marketing cards. A pain point is a ledger row, not a benefit tile.
