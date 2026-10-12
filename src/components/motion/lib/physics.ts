/**
 * lib/physics — the page's one motion-physics vocabulary.
 * Ported 1:1 from DAF V3 (components/motion/lib/physics.ts) so Vell
 * cannot drift from the parent brand system. New primitives import from
 * here; nobody invents a private curve.
 */

// ── Eases ──────────────────────────────────────────────────────────────
/** Entrances, reveals, settles — the default curve. */
export const EASE_ENTER = "power3.out";

/** Scroll-scrubbed tweens — always linear. */
export const EASE_SCRUB = "none";

/** Mask/clip curtain reveals — content uncovers itself. */
export const EASE_REVEAL = "power4.out";

/** ImageClipReveal's symmetric variant for the longer clip travel. */
export const EASE_REVEAL_CURTAIN = "power4.inOut";

// ── Durations (seconds) ────────────────────────────────────────────────
export const DURATION_FAST = 0.3;
export const DURATION_BASE = 0.5;
export const DURATION_ENTER = 0.9;
export const DURATION_REVEAL = 1;
export const DURATION_REVEAL_CURTAIN = 1.2;

// ── Lerp / damping factors ─────────────────────────────────────────────
export const LERP_POINTER = 0.2;
export const LERP_AMBIENT = 0.08;
