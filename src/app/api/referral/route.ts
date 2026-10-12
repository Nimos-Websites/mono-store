import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

/*
  REFERRAL CODES — the access-rewards ledger. One NDJSON line per
  registration or redemption, the same discipline as /api/waitlist:
  validated payload, per-address rate limit, no email is ever sent, and
  the file is the whole store. A code buys a place in the Batch 02
  queue and nothing else — there is no discount to attach to it.
*/

export const runtime = "nodejs";

const PAYLOAD = z.strictObject({
  code: z.string().regex(/^PLIM-[A-Z2-9]{6}$/),
  kind: z.enum(["issue", "redeem"]),
});

const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_MAX = 8;
const DATA_DIR =
  process.env.VERCEL === "1" ? path.join("/tmp", "mono") : path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "referrals.ndjson");

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

export async function POST(request: Request) {
  if (rateLimited(clientKey(request))) {
    return Response.json(
      { ok: false, error: "Too many submissions from this address. Try again in ten minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Malformed JSON body." }, { status: 400 });
  }

  const parsed = PAYLOAD.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, error: "A PLIM-XXXXXX code and a kind are required." },
      { status: 400 },
    );
  }

  try {
    mkdirSync(path.dirname(FILE), { recursive: true });
    appendFileSync(
      FILE,
      `${JSON.stringify({
        code: parsed.data.code,
        kind: parsed.data.kind,
        at: new Date().toISOString(),
      })}\n`,
      "utf8",
    );
  } catch {
    return Response.json(
      { ok: false, error: "The list could not be written to. Nothing was saved." },
      { status: 500 },
    );
  }

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return Response.json({ ok: false, error: "POST only." }, { status: 405 });
}
