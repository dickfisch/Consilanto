# Consilanto — Website

Unabhängige Honorarberatung. One-Pager, gebaut mit **Next.js 16 (App Router)**, **TypeScript** und **Tailwind CSS v4**.

## Entwicklung

```bash
npm run dev      # Dev-Server (http://localhost:3000)
npm run build    # Produktions-Build
npm run start    # gebaute Seite lokal starten
```

## Struktur

```
src/
  app/
    layout.tsx        Fonts (Cormorant Garamond + Inter), Metadaten/SEO
    page.tsx          Reihenfolge der Sektionen
    globals.css       Design-Tokens (Farben, Fonts) + Scroll-Animationen
  components/
    site-header.tsx   Sticky-Nav (transparent über Hero → fest beim Scrollen)
    hero.tsx          Hero mit Video-Hintergrund
    sections.tsx      Person, Metaebene, Zeit, Haltung, Angebot, Für wen, Vertrauen
    cta-section.tsx   Abschluss / Kontakt
    site-footer.tsx   Footer
    reveal.tsx        Scroll-Einblend-Animation
    ui.tsx            Kleinteile (Container, Eyebrow, AccentLines)
  lib/
    content.ts        >>> ALLE TEXTE zentral hier <<<
```

## Inhalte pflegen

- **Texte:** komplett in `src/lib/content.ts`.
- **Bilder/Video:** in `public/img/` und `public/media/`. Aktuell Platzhalter
  (`erol-key.jpg`, `hero.mp4`) — einfach gleichnamig ersetzen.
- **Farben/Fonts:** Design-Tokens oben in `src/app/globals.css` (`@theme`).

## Design

Monochromes Editorial im Stil der Referenz (maximafinance.co.uk):
reines Schwarz-Weiß, dünne Versal-Sans-Headlines (Montserrat) mit kursiven
Serif-Akzenten (Playfair Display), große römisch nummerierte Serif-Listen mit
Unterstrichen, dunkle Bild-Sektionen, vertikale Navigationsleiste links
(invertiert via `mix-blend-difference`), viel Weißraum, dezente Scroll-Reveals.
`?reveal=off` an die URL hängen blendet alle Animationen sofort ein
(praktisch für Screenshots/Tests).

## Deployment

Optimiert für **Vercel** (Repo importieren genügt). Alternativ jeder
Node-Host via `npm run build && npm run start`.
