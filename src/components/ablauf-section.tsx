"use client";

import { tinaField } from "tinacms/dist/react";
import { Container } from "./ui";
import { Reveal } from "./reveal";
import { useSiteContent, useTinaHome } from "@/lib/site-content";

export function AblaufSection() {
  const { ablauf, ROMAN } = useSiteContent();
  const home = useTinaHome();
  return (
    <section
      id={ablauf.id}
      className="relative scroll-mt-0 overflow-hidden bg-dark text-white"
    >
      {/* EIN durchgehendes Bild über die ganze Sektion (Platzhalter). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/erol-key.jpg"
        alt=""
        aria-hidden
        className="is-grayscale absolute inset-0 h-full w-full object-cover"
      />
      {/* Grund-Abdunklung für Lesbarkeit (oben + unten dunkler) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/85"
        aria-hidden
      />

      {/* Überschrift. Mobile: im Fluss ganz oben (schiebt die Spalten nach
          unten, kein Überlappen). Ab lg: absolutes Overlay über den Spalten —
          durchklickbar (pointer-events-none), damit der Spalten-Hover greift. */}
      <Container className="pointer-events-none relative z-30 inset-x-0 top-0 pt-28 pb-4 text-center sm:pt-36 lg:absolute lg:pb-0 lg:pt-44">
        <Reveal className="flex justify-center">
          <span
            className="eyebrow text-white/60"
            data-tina-field={tinaField(home.ablauf, "eyebrow")}
          >
            {ablauf.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h2
            className="display mx-auto mt-8 max-w-5xl text-[2.4rem] lg:text-[5.8rem] text-white"
            data-tina-field={tinaField(home.ablauf, "headlineParts")}
          >
            {ablauf.headlineParts.map((part, i) =>
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
          </h2>
        </Reveal>
      </Container>

      {/* Drei vollhohe Spalten — Trennlinien & Hover laufen bis ganz oben */}
      <div className="relative z-10 grid lg:grid-cols-3">
        {ablauf.steps.map((step, i) => (
          <a
            key={step.title}
            href={step.href}
            data-tina-field={tinaField(home.ablauf.steps[i])}
            className="panel-col group relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden border-t border-white/15 px-8 pb-20 pt-16 text-center lg:min-h-[122vh] lg:justify-end [&:first-child]:border-t-0 lg:border-l lg:border-t-0 lg:[&:first-child]:border-l-0"
          >
            {/* Dim-/Blur-Schicht: aktiv wenn DIESE Spalte gehovert wird */}
            <div
              className="col-dim pointer-events-none absolute inset-0 z-10"
              aria-hidden
            />

            <Reveal
              delay={i * 140}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Diamant-Monogramm im Rahmen */}
              <div className="flex h-28 w-28 items-center justify-center border border-white/35 sm:h-32 sm:w-32">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/logo-icon.svg"
                  alt=""
                  aria-hidden
                  className="h-10 w-auto sm:h-12"
                />
              </div>

              <h3 className="font-serif mt-8 flex items-start gap-2 text-3xl font-normal sm:text-4xl">
                {step.title}
                <span className="font-serif text-base italic text-white/60">
                  {ROMAN[i]}.
                </span>
              </h3>

              <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-dark-body">
                {step.body}
              </p>

              {/* CTA-Button vorerst ausgeblendet (12.06.2026). Spalte bleibt
                  über das umschließende <a> klickbar. Zum Zurückholen den Block
                  wieder einkommentieren. */}
              {/* <span className="mt-8 inline-flex items-center gap-3 border border-white/40 px-9 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 group-hover:border-white">
                {step.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span> */}
            </Reveal>
          </a>
        ))}
      </div>

    </section>
  );
}
