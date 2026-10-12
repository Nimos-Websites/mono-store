import type Lenis from "lenis";

let current: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  current = l;
}

export function getLenis(): Lenis | null {
  return current;
}
