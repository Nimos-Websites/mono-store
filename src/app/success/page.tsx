import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { stripeFetch } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order confirmed",
  description:
    "Your payment receipt. No email is sent — save or print this page for your records.",
};

/* Per-request Stripe lookup: this page is never statically rendered. */
export const dynamic = "force-dynamic";

type StripeLineItem = {
  quantity?: number;
  amount_total?: number;
  description?: string;
};

type StripeSession = {
  id: string;
  payment_status?: string;
  amount_total?: number | null;
  currency?: string;
  metadata?: Record<string, string>;
  line_items?: { data?: StripeLineItem[] };
};

type SearchParams = { session_id?: string | string[] };

/* The Stripe session id is shown truncated: enough to quote, not the whole secret. */
const refOf = (id: string): string =>
  id.length > 18 ? `${id.slice(0, 10)}…${id.slice(-4)}` : id;

const formatTotal = (amount: number | null | undefined, currency: string): string => {
  if (typeof amount !== "number") return "—";
  try {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
};

/* metadata.handles is written by the checkout route as "handle:qty,handle:qty". */
const parseHandles = (raw: string | undefined): { handle: string; qty: number }[] => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((part) => {
      const at = part.lastIndexOf(":");
      if (at < 1) return null;
      const handle = part.slice(0, at);
      const qty = Number.parseInt(part.slice(at + 1), 10);
      if (!handle || !Number.isInteger(qty) || qty < 1) return null;
      return { handle, qty };
    })
    .filter((x): x is { handle: string; qty: number } => x !== null);
};

function Shell({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="band-tight pt-[calc(var(--head-h)+32px)]">
      <div className="wrap-narrow">
        <p className="label">{eyebrow}</p>
        <h1 className="title-m mt-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const raw = params.session_id;
  const sessionId = Array.isArray(raw) ? raw[0] : raw;

  if (!sessionId) {
    return (
      <Shell eyebrow="Receipt" title="No receipt to show.">
        <p className="lede mt-5">
          This page shows a receipt right after checkout. You arrived here
          without one.
        </p>
        <p className="body mt-4">
          If you just paid and this is a mistake, keep your checkout tab open
          and follow its confirmation link instead.
        </p>
        <div className="mt-10">
          <Link href="/products" className="arrow-link tap">
            Browse products <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </div>
      </Shell>
    );
  }

  let session: StripeSession | null = null;
  try {
    session = (await stripeFetch(
      `checkout/sessions/${encodeURIComponent(sessionId)}`,
      { "expand[]": "line_items" },
      { method: "GET" },
    )) as StripeSession;
  } catch {
    session = null;
  }

  if (!session || typeof session.id !== "string") {
    return (
      <Shell eyebrow="Receipt" title="We could not find that checkout session.">
        <p className="lede mt-5">
          The reference does not match any session we can read. Nothing can be
          confirmed from this page.
        </p>
        <p className="body mt-4">
          If money left your account, it will return on its own when a payment
          is not captured. Write to us with the reference below and a human
          will look it up.
        </p>
        <p className="mono mt-6">Reference: {refOf(sessionId)}</p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/cart" className="arrow-link tap">
            Return to your cart <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <Link href="/products" className="arrow-link tap">
            Browse products <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </div>
      </Shell>
    );
  }

  if (session.payment_status !== "paid") {
    return (
      <Shell eyebrow="Receipt" title="Payment did not complete.">
        <p className="lede mt-5">
          This session is not marked paid, so there is nothing to receipt.
          Nothing was charged.
        </p>
        <p className="mono mt-6">Reference: {refOf(session.id)}</p>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/cart" className="arrow-link tap">
            Return to your cart <span aria-hidden="true" className="arrow">→</span>
          </Link>
          <Link href="/products" className="arrow-link tap">
            Browse products <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </div>
      </Shell>
    );
  }

  /* Paid: names from OUR catalogue (by handle in metadata), amounts from Stripe. */
  const currency =
    typeof session.currency === "string" && session.currency.length === 3
      ? session.currency
      : "usd";
  const stripeLines = session.line_items?.data ?? [];
  const wanted = parseHandles(session.metadata?.["handles"]);
  const rows = await Promise.all(
    wanted.map(async (item, i) => {
      let name = stripeLines[i]?.description ?? item.handle;
      try {
        const product = (await getProduct(item.handle)) as
          | { name?: unknown }
          | undefined;
        if (product && typeof product.name === "string" && product.name.length > 0) {
          name = product.name;
        }
      } catch {
        /* Keep the Stripe description. Never fail a paid receipt on a lookup. */
      }
      return {
        key: `${item.handle}:${i}`,
        name,
        qty: item.qty,
        amount: stripeLines[i]?.amount_total,
      };
    }),
  );

  return (
    <Shell eyebrow="Receipt" title="Paid. Thank you.">
      <p className="lede mt-5">
        Your payment went through. This page is your receipt — no email is
        sent, so save or print it for your records.
      </p>
      <div className="ledger mt-8">
        {rows.map((row) => (
          <div key={row.key} className="ledger-row">
            <span className="ledger-key">
              {row.name} × {row.qty}
            </span>
            <span className="ledger-val">{formatTotal(row.amount, currency)}</span>
          </div>
        ))}
        <div className="ledger-row">
          <span className="ledger-key">Total charged</span>
          <span className="ledger-val">
            {formatTotal(session.amount_total, currency)}
          </span>
        </div>
      </div>
      <p className="mono mt-6">Reference: {refOf(session.id)}</p>
      <div className="mt-10">
        <Link href="/products" className="button button-signal">
          Continue browsing
        </Link>
      </div>
    </Shell>
  );
}
