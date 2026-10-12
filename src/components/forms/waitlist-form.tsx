"use client";

import { useId, useState } from "react";

type Status = "idle" | "submitting" | "done" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function describeEmail(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "An email address is required.";
  if (trimmed.length > 254) return "That address is too long to save.";
  if (!EMAIL_RE.test(trimmed))
    return "That address does not look complete — check for a missing @ or domain.";
  return "";
}

export function WaitlistForm() {
  const inputId = useId();
  const noteId = `${inputId}-note`;
  const msgId = `${inputId}-msg`;
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const fieldError = touched ? describeEmail(email) : "";
  const fieldOk = touched && !fieldError && email.trim().length > 0;
  const submitting = status === "submitting";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    const invalid = describeEmail(email);
    if (invalid) {
      setMessage("");
      setStatus("idle");
      return;
    }
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setEmail("");
        setStatus("done");
        return;
      }

      const data: unknown = await res.json().catch(() => null);
      const detail =
        data && typeof data === "object" && "error" in data && typeof data.error === "string"
          ? data.error
          : "That did not save. Nothing was added to the list.";
      setMessage(detail);
      setStatus("failed");
    } catch {
      setMessage("The request did not reach the server. Nothing was added to the list.");
      setStatus("failed");
    }
  }

  if (status === "done") {
    return (
      <div
        aria-live="polite"
        className="border-t pt-7"
        style={{ borderColor: "rgb(246 242 234 / 0.24)" }}
      >
        <h3 className="title-s">Your address is on the list.</h3>
        <div className="mono mt-6 flex flex-col gap-3">
          <p>It was written to a text file on the server running this site. That is the whole of it.</p>
          <p>No email will be sent to you. Nobody will be contacted. There is no newsletter and no confirmation message.</p>
          <p>If Batch 02 opens, you will hear about it in public, the same as everyone else on the list.</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={submitting}
      noValidate
      className="flex flex-col gap-5"
    >
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
          disabled={submitting}
          aria-describedby={`${noteId} ${msgId}`}
          aria-invalid={Boolean(fieldError || status === "failed")}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched(true)}
          className="field-input"
          style={
            fieldError || status === "failed"
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
        disabled={submitting}
        className="button button-light button-block disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Writing" : "Put me on the list"}
      </button>

      <p id={noteId} className="form-note">
        One field, one line in a file. No email is sent, nobody is contacted, and nothing is added
        to a mailing list anywhere else.
      </p>

      <div aria-live="polite" className="min-h-6">
        <p id={msgId} className="mono flex items-start gap-2">
          {status === "failed" ? (
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
  );
}
