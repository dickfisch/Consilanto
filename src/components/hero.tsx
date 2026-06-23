"use client";

import { tinaField } from "tinacms/dist/react";
import { Container } from "./ui";
import { Reveal } from "./reveal";
import { HeroVideo } from "./hero-video";
import { useSiteContent, useTinaHome } from "@/lib/site-content";

export function Hero() {
  const { hero } = useSiteContent();
  const home = useTinaHome();
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-paper pb-28 pt-28 sm:pb-20"
    >
      {/* Monochromes Medium rechts, läuft nach links in Weiß aus */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-[62%]" aria-hidden>
        <HeroVideo />
        {/* Weißer Schleier oben für Logo-Lesbarkeit */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
      </div>

      {/* Nur Mobile (<sm): Bild deckt die volle Breite. Der Text sitzt unten,
          daher weißer Verlauf von UNTEN nach oben – unten kräftig (Textkontrast),
          oben auslaufend, damit das Foto sichtbar bleibt. Ab sm liegt das Bild
          rechts, Text über Weiß. */}
      <div
        className="absolute inset-0 z-[5] bg-gradient-to-t from-paper via-paper/85 to-transparent sm:hidden"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-ink/40" aria-hidden />
              <span
                className="eyebrow text-ink/60"
                data-tina-field={tinaField(home.hero, "tagline")}
              >
                {hero.tagline}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1
              className="display mt-8 text-[calc(2.4rem*var(--scale-heading))] lg:text-[calc(6.4rem*var(--scale-heading))] text-ink"
              data-tina-field={tinaField(home.hero, "headlineParts")}
            >
              {hero.headlineParts.map((part, i) =>
                part.italic ? (
                  <em
                    key={i}
                    className="font-serif font-normal italic normal-case tracking-normal"
                  >
                    {part.text}
                  </em>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h1>
          </Reveal>

        </div>
      </Container>
    </section>
  );
}

/* Weißer Intro-Abschnitt direkt unter dem Hero — Fließtext + CTA, zentriert. */
export function HeroIntro() {
  const { hero } = useSiteContent();
  const home = useTinaHome();
  return (
    <section className="bg-paper text-ink py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p
              className="body-copy mx-auto max-w-xl"
              data-tina-field={tinaField(home.hero, "body")}
            >
              {hero.body}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <a
              href="#kontakt"
              className="group mt-10 inline-flex items-center gap-4 text-sm font-light uppercase tracking-[0.22em] text-ink"
            >
              <span
                className="border-b border-ink/40 pb-1 transition-colors group-hover:border-ink"
                data-tina-field={tinaField(home.hero, "cta")}
              >
                {hero.cta}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
