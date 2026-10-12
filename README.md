# MONO — one product, one store

A one-product storefront system. Each product gets its own brand, its own
endpoint, its own funnel, its own margin profile. The page is the store.

| Document | What it is |
|---|---|
| `PRODUCT-DECISION.md` | The research, the four findings that shaped the decision, live supply quotes, unit economics, and the risks |
| `MARKETING.md` | Positioning, one ICP, channel ranking, 90-day plan, six metrics, kill criteria |
| `BUILD-PROTOCOL.md` | The strict build protocol every spawned subagent must follow |
| `src/lib/brand.ts` | The single source of product facts. Every number comes from here. |
| `src/patterns/` | Bespoke PDP pattern reference (from the superstore merge) |
| `src/components/chrome/` | Shared chrome: cursor, grain, Lenis, split-heading |

## The thesis
One product, built as a template. Product #2..#100 is a config change, not a build.

## Honesty laws enforced in code
- Every figure traces to `brand.ts` or `PRODUCT-DECISION.md`. No invented statistics.
- The 3D model is labelled a render everywhere it appears.
- No reviews, no star ratings, no testimonials, no customer names.
- No fake scarcity, no compare-at price, no countdown.
- `/policies` discloses the whole thing: concept brand, no order, no payment, no email.
- **No email is ever sent.** Capture writes to a local file only.
- `robots: noindex`. This is a demonstration, not a storefront to be found.

## Running it
```bash
npm install && npm run dev -- --port 3187
npm run build && npx tsc --noEmit && npx eslint src --max-warnings=0
```
