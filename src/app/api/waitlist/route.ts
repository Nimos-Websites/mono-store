import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

export const runtime = "nodejs";

const PAYLOAD = z.strictObject({
  email: z.email().max(254),
});

const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_MAX = 5;
/* Serverless filesystems are read-only outside /tmp, so fall back there when deployed. */
const DATA_DIR =
  process.env.VERCEL === "1" ? path.join("/tmp", "mono") : path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "waitlist.ndjson");

const hits = new Map<string, number[]>();
let accepted = 0;

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
      { ok: false, error: "A single valid email address is required." },
      { status: 400 },
    );
  }

  try {
    mkdirSync(path.dirname(FILE), { recursive: true });
    appendFileSync(FILE, `${JSON.stringify({ email: parsed.data.email, at: new Date().toISOString() })}\n`, "utf8");
  } catch {
    return Response.json(
      { ok: false, error: "The list could not be written to. Nothing was saved." },
      { status: 500 },
    );
  }

  accepted += 1;
  console.log(JSON.stringify({ event: "waitlist.accepted", accepted }));

  return Response.json({ ok: true }, { status: 200 });
}

export async function GET() {
  return Response.json({ ok: false, error: "POST only." }, { status: 405 });
}

export async function PUT() {
  return Response.json({ ok: false, error: "POST only." }, { status: 405 });
}

export async function PATCH() {
  return Response.json({ ok: false, error: "POST only." }, { status: 405 });
}

export async function DELETE() {
  return Response.json({ ok: false, error: "POST only." }, { status: 405 });
}
