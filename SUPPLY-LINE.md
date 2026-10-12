# THE SUPPLY LINE — how products actually get found, branded and shipped
> The answer to "we just need to get products." No site building. Sourcing first.
> Verified 8 October 2026 against vendor primary sources, not affiliate blog posts.

---

## 1. THE HEADLINE: THE 100k-SKU DREAM ALREADY EXISTS AS AN API

You said: *"find products... 100000s of products... via Api."* That is not a build. It is a
signup. **CJ Dropshipping operates a documented, open, public API (V2.0)** with roughly
**900,000 products**, **no listing limit**, **no order limit**, and **no monthly fee** to start.

| | |
|---|---|
| Catalog | ~900,000 products (CJ's own figure; third-party pages variously say 200k–400k — treat 900k as the vendor claim) |
| Cost to join | **$0.** Free tier has unlimited listings and unlimited orders |
| Paid tiers | Plus ~$16/mo · Prime ~$20/mo · Advanced ~$60/mo (higher sourcing limits, discounts, VIP access) |
| Fulfillment | 50+ warehouses globally, incl. US/EU |
| Direct dropship MOQ | **1 unit** |
| Overseas warehousing MOQ | 10 pcs per variant, 100 pcs total |
| Payment model | Pay per order: product + shipping + optional add-ons |

### The endpoints that matter

```
POST /api2.0/v1/authentication/getAccessToken     # appKey + appSecret → accessToken
GET  /api2.0/v1/product/query                    # THE CATALOG. Elasticsearch-backed.
                                                 # keyword, category, price range, country,
                                                 # supplier, certification, customisation,
                                                 # sort. page ≤1000, size ≤100 → 100k rows a sweep
GET  /api2.0/v1/product/variant/query            # variants + inventory by country
GET  /api2.0/v1/product/stock/queryByVid         # live stock
POST /api2.0/v1/logistic/freightCalculate        # real landed freight quote per route
POST /api2.0/v1/logistic/freightCalculateTip    # diagnostic: WHICH methods are unavailable and why
POST /api2.0/v1/shopping/order/createOrderV2     # push an order straight to the supplier
POST /api2.0/v1/product/query (packaging 1.8/1.9)# packaging products, at variant / product level
```

Two details in that list matter more than they look:

- **`freightCalculateTip`** is a diagnostic endpoint that returns *why* a shipping method is
  unavailable, with a documented error code per reason (2008 postcode unsupported, 2009 weight
  out of range, 2016 address unreachable…). You get real freight cost *before* you commit. That
  is what makes automated product selection possible instead of guesswork.
- **Order creation is an API call, not a Shopify integration.** We can own the endpoint entirely.
  Shopify/WooCommerce is optional, not required.

---

## 2. THE PART THAT CHANGES YOUR BRIEF: PACKAGING IS AN API TOO

You said: *"finding someone who can premium brand and package it for us."*

**Half of that is now an API call, not a hire.**

CJ's API exposes, per product:

| Capability | How |
|---|---|
| Custom packaging products | Packaging endpoints 1.8 (variant-level) and 1.9 (product-level), browsable by price and dimensions, then **linked to a product as a "packaging connection"** |
| POD logo placement | `podProperties` on order create — logo uploaded to OSS, applied to a named packaging area. POD 2.0 and POD 3.0 (POD 3.0 takes a production image + rendering) |
| Custom inserts | Part of the packaging connection set |
| Branded invoicing | Platform-level feature |

⚠️ **One gotcha worth knowing before anyone builds against it:** endpoints 1.8 and 1.9 both return
a field literally named `id`, but they mean **different things** — 1.8 returns a *variant* ID,
1.9 returns a *product* ID. `packVid` must come from 1.8's `id`. Get that wrong and the packaging
link silently fails. Documented CJ behaviour, not a bug we found.

**So the split is:**

| Need | Who does it |
|---|---|
| Physical packaging, inserts, logo on the box, POD placement | **The API.** No human required. |
| Name, positioning, art direction, tone, the angle per audience | **A human creative.** This is the only part that isn't automatable, because it's the thing that makes a $12 object read as $89. |
| Freight, inventory, order push, QC | **The API.** |

That is a smaller hire than you were budgeting for, and it should be scoped as *identity*, not
as *packaging procurement*.

---

## 3. THE AI ANGLE IS ALSO BUILT IN

CJ publishes two things that matter directly to your thesis:

- **An official MCP integration** (`/en/api/api2/mcp.html`) — our agents can pull product data
  as tools rather than a custom integration.
- **An "11 AI Data" API module** — product data served in a shape intended for AI consumption.

This means the product layer plugs into the same agent stack as the content layer. No glue code.
Between MCP and the plain REST endpoints, sourcing can be an agent capability rather than a
scraper someone maintains.

---

## 4. YOUR INSIGHT, WRITTEN AS A SYSTEM

> *"ai can make an angle for any age, race, gender, culture, and could be in the shoes of every
> user in an instant."*

That is the real moat and it is worth being precise about, because it is not the same as
"more content." Content volume competes on volume. **Personalised coverage competes on catalogue
breadth, and it is the one axis Amazon structurally cannot follow** — an Amazon listing is one
listing, and the moment you need a second angle you need a second ASIN and a second brand.

Modelled:

```
ONE product  ×  N segments  =  N endpoints, N funnels, N price/angle pairs
  from CJ     personalised    (same SKU, different entry, different proof, different creator)
```

Same physical product, same COGS, same supplier. What changes is the entry point. That is the
part a competitor cannot copy without owning the product themselves.

**The rule that keeps this honest:** the *angle* changes, the *claim* does not. The same
specification is published on every endpoint. We personalise framing and proof, never facts.
Otherwise it is deceptive marketing, and it is also the fastest way to get a chargeback.

---

## 5. THE REPEATABLE PRODUCT-FINDING MACHINE

The failure mode is one-off product picking — which is what I did, and it doesn't scale. This
replaces it.

**Stage A — Discover (automated, continuous)**
- `product/query` swept across category + price band + `customization=1` (products that accept
  branding) + `hasCertification=1` where the category needs it
- Cross-referenced against trend velocity sources: TikTok Shop movers (RapidTok / z.media /
  FastMoss / NetInfluencer publish weekly GMV + unit counts), Amazon Movers & Shakers, Google Trends
- **Filter on day one, not week zero.** Half the top sellers decelerated into month-end; entering
  at week 4–8 is the documented safest window.

**Stage B — Score (automated)**
Every candidate gets scored on five axes, all computable from the API:
1. **Landed margin** — `freightCalculate` per destination, against a target retail band
2. **Route viability** — `freightCalculateTip`; if the only available methods are 7–17 day
   cross-border, it fails regardless of margin
3. **Customisability** — `customization` flag + whether POD areas exist
4. **Content viability** — can it produce a visible transformation? (Ranked by the evidence:
   visible before/after formats outperform; unboxing works at higher AOV)
5. **Risk** — certification requirement, hazmat/battery, fragile, return-rate exposure

**Stage C — Brand (human creative, one product at a time)**
Name, angle, art direction, endpoint, funnel. Only stage C is human.

**Stage D — Ship (automated)**
Push order via API, packaging link, POD logo, tracking via `trackInfo`.

**The one metric that matters:** revenue per published asset. Not impressions, not followers.
The category leader's single best video earned **0.16% of its revenue** — 2,751 creators doing
ordinary work. A rival with 9,400 creators earned **$37 each**. Volume is the strategy and
revenue-per-asset is the only honest scoreboard.

---

## 6. THE D2C OPERATING MODEL

**No inventory at the start.** Direct dropship from CJ at 1-unit MOQ. The trade-off is honest:
7–17 day cross-border delivery to North America, which costs conversions. That is the price of
zero inventory risk, and it is why the early landing pages must set delivery expectations up
front rather than hide them.

**Escalation ladder — move inventory only when a product proves itself:**

| Trigger | Move |
|---|---|
| Product works, volume low | Stay direct. Zero risk. |
| Converts, but delivery complaints | Stock 100 units in a US warehouse (CJ's minimum: 10/variant, 100 total) → 3–10 day delivery |
| Winning SKU, margin proven | Negotiate direct with the factory, private-label the packaging |

**Margin discipline at dropship economics.** Chinese direct shipping is slow *and* the freight is
the real cost. The rule: if the freight calculator can't get you to a landed cost under ~35% of
retail, the product is out regardless of how good the margins look on paper. This is the single
most common way dropship businesses die — they model COGS and forget that freight is often
comparable to the product itself.

**Returns.** CJ provides a dispute API. Cross-border returns on a $25 item are usually
uneconomic, so returns policy is a *margin* decision, not a service one. Budget it honestly.

---

## 7. WHAT ONLY YOU CAN DO (and it's one thing)

1. **Create the CJ Dropshipping account** and generate `appKey` / `appSecret` from the developer
   console. Free tier, no card needed to browse or list. **Payment method is required before
   orders can be pushed** — and per our own standing rule, adding a payment method to a service
   is a Ben-only action. Flagging rather than doing it.

That single credential unblocks: the catalog sweep, the freight-cost modelling, the packaging
catalogue, and the order pipeline. Everything else in this document is buildable without it.

**Not needed, and I want to be explicit so nobody spends money on it:**
- A Shopify store. We own the endpoint; orders go through the API.
- A packaging supplier. The API does it.
- A "trending products" paid tool. The vendors' own weekly reports are public and free.
- More website work.

---

## 8. THE HONEST RISKS

1. **CJ is a China-direct supply chain.** 7–17 day delivery, inconsistent QC between factories,
   and freight costs that vary per route. The brand has to be built to absorb that, not hide it.
2. **Margin compresses fast.** Product + freight + packaging + payment + returns on a $25 item
   leaves very little. High-AOV products are the only ones where this model has real headroom.
3. **Personalisation at scale is a claims risk.** The moment the angle differs from the fact,
   it's deceptive. The system must enforce: angle varies, specification does not.
4. **"Premium" is the hardest word here.** A branded box on a generic product raises price
   expectations and then has to meet them. Most dropship brands die at exactly this point — the
   unboxing doesn't match the product page. Budget for the packaging and inserts being genuinely
   good, not the cheapest that will take a logo.
5. **Everything above is verified at the API level, not the outcome level.** The catalog is
   real and the endpoints are documented. Whether *a specific product* holds up is what Stage B
   scoring is for, and it has not been run yet.

---

## 9. WHAT CHANGES FROM THE MONO BUILD

Nothing is wasted. The MONO build is the **worked reference implementation** of stage C — one
product, one brand, one endpoint, one funnel, one honest disclosure, plus the risk register and
kill criteria that make it a template rather than a one-off.

The next build is not another site. It is `stage-a-discover` and `stage-b-score` — the machine
that fills the queue, and the doc above that tells you what to do with it.

---

*Sources: developers.cjdropshipping.com API V2.0 reference (product, shopping, logistic, auth,
standard modules; MCP integration page; AI Data module). CJ Dropshipping platform pricing and
catalog figures from cjdropshipping.com. Comparison figures (Spocket MOQ, warehouse minimums,
delivery windows, flat-fee model) from spocket.co/comparison/spocket-or-cjdropshipping. Trend and
velocity figures as previously cited in PRODUCT-DECISION.md.*