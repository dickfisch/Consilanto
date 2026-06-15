/**
 * Schwebender Kontakt-Button unten links: schwarzer Kreis mit weißem Diamant
 * (logo-icon.svg). Anker-Link zu #erstgespraech (direkt zum Formular, nicht an
 * den Anfang der Kontaktsektion) — das sanfte Scrollen übernimmt der globale
 * Lenis-Click-Handler (siehe smooth-scroll.tsx).
 */
export function ContactBadge() {
  return (
    <a
      href="#erstgespraech"
      aria-label="Zum Erstgespräch-Formular"
      className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-dark ring-1 ring-white/10 transition-transform duration-300 hover:scale-105"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/logo-icon.svg" alt="" aria-hidden className="h-4 w-auto" />
    </a>
  );
}
