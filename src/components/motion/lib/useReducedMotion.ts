"use client";

import { useSyncExternalStore } from "react";

/**
 * useReducedMotion — every primitive checks this before running any rAF
 * loop, ScrollTrigger scrub, or WebGL canvas. All motion gates on
 * prefers-reduced-motion. The server snapshot is `true`, so the static
 * fallback renders by default and the client corrects on mount.
 */
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function clientSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return true;
  return window.matchMedia(QUERY).matches;
}

function serverSnapshot(): boolean {
  return true;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}
