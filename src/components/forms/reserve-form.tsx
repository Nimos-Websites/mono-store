"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { PRODUCT } from "@/lib/brand";

const TERMS: { key: string; value: string }[] = [
  { key: "Product", value: `${PRODUCT.name} — ${PRODUCT.priceLabel}` },
  { key: "Warranty", value: "3 years, registered online" },
  { key: "In the box", value: "Unit, case, cup, protocol card" },
  { key: "Shipping", value: "Quoted at checkout" },
];

export function JoinForm() {
  const inputId = useId();
  const noteId = `${inputId}-note`;
  const msgId = `${inputId}-msg`;
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const trimmed = email.trim();
  const formatOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) && trimmed.length <= 254;
  const fieldError = !touched
    ? ""
    : !trimmed
      ? "An email address is required."
      : !formatOk
        ? "That address does not look complete — check for a missing @ or domain."
        : "";
  const fieldOk = touched && !fieldError && trimmed.length > 0;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (!trimmed || !formatOk) {
      setMessage("");
      return;
    }
    setPending(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      if (res.ok) {
        setEmail("");
        setSent(true);
        setPending(false);
        return;
      }

      const data: unknown = await res.json().catch(() => null);
      setMessage(
        data && typeof data === "object" && "error" in data && typeof data.error === "string"
          ? data.error
          : "That did not save. Nothing was added to the list.",
      );
    } catch {
      setMessage("The request did not reach the server. Nothing was added to the list.");
    }

    setPending(false);
  }

  if (sent) {
    return (
      <div aria-live="polite" className="border-t pt-7" style={{ borderColor: "currentColor" }}>
        <h3 className="title-s">Saved to the list.</h3>
        <p className="body mt-5 max-w-[44ch]">
          One line in a text file on the server running this site. No order has been placed, no
          payment has been taken, and no email will be sent to you.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="ledger">
        {TERMS.map((row) => (
          <div key={row.key} className="ledger-row">
            <span className="ledger-key">{row.key}</span>
            <span className="ledger-val">{row.value}</span>
          </div>
        ))}
      </div>

      <form onSubmit={onSubmit} aria-busy={pending} noValidate className="flex flex-col gap-5">
        <div className="field">
          <label htmlFor={inputId} className="label">
            Email address
          </label>
          <input
            id={inputId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            disabled={pending}
            aria-describedby={`${noteId} ${msgId}`}
            aria-invalid={Boolean(fieldError || message)}
            onChange={(event) => setEmail(event.target.value)}
            onBlur={() => setTouched(true)}
            className="field-input"
            style={
              fieldError || message
                ? { borderColor: "var(--signal)" }
                : fieldOk
                  ? { borderColor: "var(--cool)" }
                  : undefined
            }
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="button button-signal button-block disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Saving" : `Add to list · ${PRODUCT.priceLabel}`}
        </button>

        <p id={noteId} className="form-note">
          This button takes no payment and places no order. It writes your address to a text file so
          you can be told if a batch opens. See{" "}
          <Link href="/policies#disclosure" className="underline">
            the disclosure
          </Link>
          .
        </p>

        <div aria-live="polite" className="min-h-6">
          <p id={msgId} className="mono flex items-start gap-2">
            {message ? (
              <>
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--signal)" }}>
                  <path d="M8 4v6M8 12.5h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <span>{message}</span>
              </>
            ) : fieldError ? (
              <>
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--signal)" }}>
                  <path d="M8 4v6M8 12.5h.01" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                </svg>
                <span>{fieldError}</span>
              </>
            ) : fieldOk ? (
              <>
                <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" style={{ flex: "none", marginTop: 3, color: "var(--cool)" }}>
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Looks good — one line in a file, nothing sent.</span>
              </>
            ) : null}
          </p>
        </div>
      </form>
    </div>
  );
}
