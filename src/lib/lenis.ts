import type Lenis from "lenis";

// Modul-weiter Verweis auf die aktive Lenis-Instanz, damit einzelne Sektionen
// (z. B. der Scroll-Übergang in process-scroll) sanft scrollen können.
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}

// Wird während eines programmatischen Anker-Scrolls (Lenis.scrollTo) gesetzt,
// damit der Exit-Snap der Process-Section ihn nicht abfängt/umlenkt.
let exitSnapSuppressed = false;

export function setExitSnapSuppressed(v: boolean) {
  exitSnapSuppressed = v;
}

export function isExitSnapSuppressed() {
  return exitSnapSuppressed;
}
