/*
  BUILDER C (checkout) — server-only Stripe access.
  NEVER import this module from a client component. It reads the secret key,
  which must stay server-side at all times.

  No Stripe SDK dependency: raw fetch against the official Stripe REST API
  (https://docs.stripe.com/api), form-urlencoded POST, Bearer auth.
  The secret is read from process.env at CALL time (never at import time),
  and is never logged, printed, committed, or returned in any response.
*/

const STRIPE_API = "https://api.stripe.com/v1";

/* Checkout is built fully but gated off: only an explicit CHECKOUT_ENABLED=1
   in the runtime environment opens it. Default is off. */
export function isCheckoutEnabled(): boolean {
  return process.env.CHECKOUT_ENABLED === "1";
}

/* Major-unit amount (e.g. whole dollars) → integer minor units for Stripe. */
export function toCents(amount: number): number {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("toCents: amount must be a finite, non-negative number.");
  }
  return Math.round(amount * 100);
}

export type StripeParams = Record<string, string | number | boolean>;

const encodeParams = (params: StripeParams): string => {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    body.append(key, String(value));
  }
  return body.toString();
};

export type StripeFetchOptions = {
  method?: "GET" | "POST";
  idempotencyKey?: string;
};

/* Minimal fetch wrapper. POST sends params as a form-urlencoded body;
   GET appends them as a query string (used for session retrieve + expand).
   Throws a plain Error on transport failure or non-2xx Stripe responses.
   The response JSON is returned untyped — callers narrow what they need. */
export async function stripeFetch(
  path: string,
  params: StripeParams = {},
  opts: StripeFetchOptions = {},
): Promise<unknown> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Stripe cannot be contacted until the owner provides it.",
    );
  }

  const method = opts.method ?? "POST";
  const encoded = encodeParams(params);
  const url =
    method === "GET" && encoded.length > 0
      ? `${STRIPE_API}/${path}?${encoded}`
      : `${STRIPE_API}/${path}`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${secret}`,
  };
  if (method === "POST") {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  if (opts.idempotencyKey) {
    headers["Idempotency-Key"] = opts.idempotencyKey;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers,
      ...(method === "POST" ? { body: encoded } : {}),
    });
  } catch {
    throw new Error("Could not reach Stripe. Try again in a moment.");
  }

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    let message = `Stripe request failed (${res.status}).`;
    if (typeof data === "object" && data !== null && "error" in data) {
      const err = (data as { error?: { message?: unknown } }).error;
      if (err && typeof err.message === "string" && err.message.length > 0) {
        message = err.message;
      }
    }
    throw new Error(message);
  }
  return data;
}
