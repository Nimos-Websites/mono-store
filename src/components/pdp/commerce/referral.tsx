"use client";

/*
  REFERRAL — the access-rewards module. The reward is ACCESS, never
  money: no discount, no credit, no coupon code, no email. A code is
  generated in this browser and registered on the same server-side list
  the waitlist writes to (POST /api/referral → one NDJSON line, the
  same rate-limited, no-email discipline as /api/waitlist).

  Arriving with ?ref=CODE registers a redemption note and rides along
  with the list. Nothing is promised that cannot be kept: Batch 02's
  queue reads these codes, in public, when it opens.
*/

import { useEffect, useId, useState } from "react";

type Status = "idle" | "registering" | "registered" | "redeemed" | "failed";

const CODE_KEY = "mono-referral-code-v1";
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

const makeCode = (): string => {
  let out = "";
  const bytes = new Uint8Array(6);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) crypto.getRandomValues(bytes);
  else for (let i = 0; i < 6; i++) bytes[i] = Math.floor(Math.random() * 256);
  for (let i = 0; i < 6; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return `PLIM-${out}`;
};

const readCode = (): string => {
  try {
    const stored = window.localStorage.getItem(CODE_KEY);
    if (stored) return stored;
    const fresh = makeCode();
    window.localStorage.setItem(CODE_KEY, fresh);
    return fresh;
  } catch {
    return makeCode();
  }
};

export function ReferralModule({ className = "" }: { className?: string }) {
  const noteId = useId();
  const [code, setCode] = useState("PLIM-······");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [arrivedWith, setArrivedWith] = useState("");

  /* Browser reads are deferred one frame: the server render stays stable
     (placeholder code, idle state) and the client fills in on the first
     animation frame — no hydration mismatch, no setState-in-effect. */
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const mine = readCode();
      setCode(mine);
      const ref = new URLSearchParams(window.location.search).get("ref");
      if (ref && /^PLIM-[A-Z2-9]{6}$/.test(ref)) {
        setArrivedWith(ref);
        setStatus("redeemed");
        setMessage(`You arrived with ${ref}. It rides along with your place on the list.`);
        void post({ code: ref, kind: "redeem" });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  async function post(body: { code: string; kind: "issue" | "redeem" }) {
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("rejected");
      return true;
    } catch {
      return false;
    }
  }

  async function onRegister() {
    setStatus("registering");
    setMessage("");
    const ok = await post({ code, kind: "issue" });
    if (ok) {
      setStatus("registered");
      setMessage("Your code is written to the list file, beside the waitlist lines. Nothing was emailed.");
      return;
    }
    setStatus("failed");
    setMessage("That did not save. Nothing was added to the list.");
  }

  async function onCopy() {
    const url = `${window.location.origin}/steamer?ref=${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied. It carries your code — nothing else is shared.");
      return;
    } catch {
      setMessage(url);
    }
  }

  return (
    <div className={className}>
      <p className="label text-graphite-70">Referral · access, not money</p>
      <p className="mono mt-4 text-[clamp(20px,2vw,26px)] tracking-[0.06em] text-graphite">{code}</p>
      <p className="body mt-4 max-w-[48ch]">
        One code per browser, no account, no email. When a friend joins the list with your code you
        both keep your place in the Batch 02 queue — the reward is access, never a discount, a credit
        or a coupon. There is no money in this system to give away.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={onCopy} className="button button-ghost">
          Copy invite link
        </button>
        <button
          type="button"
          onClick={onRegister}
          disabled={status === "registering" || status === "registered"}
          className="button button-signal disabled:cursor-wait disabled:opacity-70"
        >
          {status === "registered" ? "Registered on the list" : "Register my code"}
        </button>
      </div>
      <div aria-live="polite" className="min-h-6">
        {message ? (
          <p id={noteId} className="form-note mt-4 max-w-[52ch] text-graphite-70">
            {message}
          </p>
        ) : null}
      </div>
      {status === "redeemed" ? (
        <p className="form-note mt-2 max-w-[52ch] text-graphite-70">
          Arrived with {arrivedWith} — noted on the list file. No message was sent to anyone.
        </p>
      ) : null}
    </div>
  );
}
