import { randomUUID } from "node:crypto";
import { z } from "zod";
import { getProduct } from "@/lib/catalog";
import { isCheckoutEnabled, stripeFetch, toCents } from "@/lib/stripe";

export const runtime = "nodejs";

/*
  BUILDER C (checkout) — POST { items: [{ handle, qty }] } → { url }.
  ALL money is computed server-side from src/lib/catalog.ts. Client prices
  are never accepted. Checkout is gated: unless CHECKOUT_ENABLED=1, every
  valid request is refused with 403 (no Stripe call is made).
*/

const ITEM = z.strictObject({
  handle: z.string().min(1).max(120),
  qty: z.number().int().min(1).max(99),
});

const BODY = z.strictObject({
  items: z.array(ITEM).min(1).max(20),
});

/* Rate limiter mirrored from src/app/api/waitlist/route.ts. */
const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_MAX = 5;

const hits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "local";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const window = (hits.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (window.length >= WINDOW_MAX) {
    hits.set(key, window);
    return true;
  }
  window.push(now);
  hits.set(key, window);
  return false;
}

const bad = (error: string, status: number) =>
  Response.json({ error }, { status });

type CatalogProduct = {
  handle: string;
  name: string;
  price: number;
  currency?: string;
  image?: string;
};

const isAbsoluteHttps = (value: string): boolean => {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return bad(
      "Too many checkout attempts from this address. Try again in ten minutes.",
      429,
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return bad("Malformed JSON body.", 400);
  }

  const parsed = BODY.safeParse(body);
  if (!parsed.success) {
    return bad(
      "A list of items is required: { items: [{ handle, qty }] }, qty 1–99, at most 20 lines.",
      400,
    );
  }

  /* Server-side pricing: every handle must exist in OUR catalogue. */
  const lines: {
    handle: string;
    qty: number;
    name: string;
    currency: string;
    unitAmount: number;
    image: string | null;
  }[] = [];
  for (const item of parsed.data.items) {
    let product: CatalogProduct | undefined;
    try {
      product = (await getProduct(item.handle)) as
        | CatalogProduct
        | undefined;
    } catch {
      return bad(`Unknown product: ${item.handle}.`, 400);
    }
    if (!product || typeof product.name !== "string" || product.name.length === 0) {
      return bad(`Unknown product: ${item.handle}.`, 400);
    }
    if (typeof product.price !== "number" || !(product.price > 0)) {
      return bad(`“${product.name}” is not priced for sale right now.`, 400);
    }
    const rawCurrency =
      typeof product.currency === "string" && /^[a-z]{3}$/i.test(product.currency)
        ? product.currency.toLowerCase()
        : "usd";
    lines.push({
      handle: item.handle,
      qty: item.qty,
      name: product.name,
      currency: rawCurrency,
      unitAmount: toCents(product.price),
      image:
        typeof product.image === "string" && isAbsoluteHttps(product.image)
          ? product.image
          : null,
    });
  }

  /* One Checkout Session holds one currency. Refuse mixed baskets honestly. */
  const currencies = new Set(lines.map((line) => line.currency));
  if (currencies.size > 1) {
    return bad("Items in one checkout must share a single currency.", 400);
  }

  /* Gate: built fully, closed until the owner approves a real product. */
  if (!isCheckoutEnabled()) {
    return Response.json(
      { error: "Checkout opens soon.", waitlist: true },
      { status: 403 },
    );
  }

  const handles = lines.map((line) => `${line.handle}:${line.qty}`).join(",");
  if (handles.length > 500) {
    return bad("Too many items in one checkout. Split it into two orders.", 400);
  }

  const origin = new URL(request.url).origin;
  const params: Record<string, string | number> = {
    mode: "payment",
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    "metadata[handles]": handles,
    "metadata[catalogue]": "mono-1",
  };
  lines.forEach((line, i) => {
    params[`line_items[${i}][price_data][currency]`] = line.currency;
    params[`line_items[${i}][price_data][product_data][name]`] = line.name;
    if (line.image) {
      params[`line_items[${i}][price_data][product_data][images][0]`] =
        line.image;
    }
    params[`line_items[${i}][price_data][unit_amount]`] = line.unitAmount;
    params[`line_items[${i}][quantity]`] = line.qty;
  });

  let session: unknown;
  try {
    session = await stripeFetch("checkout/sessions", params, {
      idempotencyKey: randomUUID(),
    });
  } catch {
    return bad("Checkout could not be started. Nothing was charged.", 502);
  }

  const url =
    typeof session === "object" && session !== null
      ? (session as { url?: unknown }).url
      : undefined;
  if (typeof url !== "string" || url.length === 0) {
    return bad("Checkout could not be started. Nothing was charged.", 502);
  }
  return Response.json({ url }, { status: 200 });
}

export async function GET() {
  return bad("POST only.", 405);
}

export async function PUT() {
  return bad("POST only.", 405);
}

export async function PATCH() {
  return bad("POST only.", 405);
}

export async function DELETE() {
  return bad("POST only.", 405);
}
