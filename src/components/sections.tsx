import type { ReactNode } from "react";
import { Container, Eyebrow } from "./ui";
import { Reveal } from "./reveal";
import { AngebotThemes } from "./angebot-themes";
import {
  person,
  meta,
  angebot,
  fuerWen,
  vertrauen,
  ROMAN,
} from "@/lib/content";

/* ------------------------------------------------------------------ */
/*  Bausteine                                                          */
/* ------------------------------------------------------------------ */
function SectionShell({
  id,
  children,
  dark = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={[
        "scroll-mt-0 py-28 sm:py-36 lg:py-48",
        dark ? "bg-dark text-white" : "bg-paper text-ink",
        className,
      ].join(" ")}
    >
      <Container>{children}</Container>
    </section>
  );
}

function SerifTitle({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={[
        "font-serif font-normal leading-[1.1] tracking-[-0.01em]",
        "text-[1.9rem] lg:text-[3.5rem]",
        dark ? "text-white" : "text-ink",
        className,
      ].join(" ")}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  02 — Die Person                                                    */
/* ------------------------------------------------------------------ */
export function PersonSection() {
  return (
    <SectionShell id={person.id}>
      <Reveal>
        <Eyebrow>{person.eyebrow}</Eyebrow>
      </Reveal>
      <div className="mt-12 grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <SerifTitle>{person.title}</SerifTitle>
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={180}>
            <p className="font-serif text-xl italic leading-relaxed text-ink/80">
              {person.intro}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <ul className="mt-6 space-y-1">
              {person.accents.map((a) => (
                <li
                  key={a}
                  className="font-serif text-lg italic text-ink/70"
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-7 space-y-5">
            {person.body.map((p, i) => (
              <Reveal key={i} as="p" delay={i * 90} className="body-copy">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ */
/*  03 — Die Metaebene (zentriertes Statement)                         */
/* ------------------------------------------------------------------ */
export function MetaSection() {
  return (
    <section id={meta.id} className="scroll-mt-0 bg-paper text-ink">
      {/* Trennlinie am Abschnitts-Übergang — inhaltsbreit & zentriert. Oben das
          Padding der Person-Section, unten das der Meta-Section (gleich groß) →
          die Linie sitzt mittig im Zwischenraum zwischen beiden Abschnitten. */}
      <Container>
        <div className="mx-auto max-w-4xl border-t border-line" aria-hidden />
      </Container>

      <Container className="py-28 sm:py-36 lg:py-48">
        <div className="mx-auto max-w-4xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>{meta.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <SerifTitle className="mt-10">{meta.title}</SerifTitle>
        </Reveal>
        <Reveal delay={220}>
          <p className="body-copy mx-auto mt-9 max-w-xl">{meta.intro}</p>
        </Reveal>
        <div className="mx-auto mt-8 max-w-3xl">
          {meta.accents.map((a, i) => (
            <Reveal
              key={a}
              delay={i * 80}
              className="group cursor-default border-b border-line transition-colors duration-300 last:border-0 hover:bg-ink/[0.03]"
            >
              <span className="block py-4 font-serif text-lg italic text-ink/70 transition-all duration-300 group-hover:scale-[1.04] group-hover:text-ink sm:text-xl">
                {a}
              </span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="body-copy mx-auto mt-10 max-w-2xl">{meta.body[0]}</p>
        </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  05 — Honorarberatung als Haltung                                   */
/*  Ausgelagert in eigene Client-Komponente (scroll-gesteuerter         */
/*  Blur-Reveal der Pledges, gepinnt wie „Zeit ist Strategie").         */
/* ------------------------------------------------------------------ */
export { HaltungSection } from "./haltung-section";

/* ------------------------------------------------------------------ */
/*  06 — Mein Angebot (große Serif-Liste — Signatur der Referenz)      */
/* ------------------------------------------------------------------ */
export function AngebotSection() {
  return (
    <SectionShell id={angebot.id} className="border-t border-line">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Eyebrow>{angebot.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <SerifTitle className="mt-10">{angebot.title}</SerifTitle>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
              {angebot.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="font-serif text-lg italic text-ink/70"
                >
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={160}>
            <p className="body-copy">{angebot.intro}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="body-copy mt-5">{angebot.bridge}</p>
          </Reveal>
        </div>
      </div>

      {/* Klickbare Themen — öffnen ein Overlay mit Detailtext */}
      <AngebotThemes themes={angebot.themes} />

      <div className="mt-16 grid gap-10 sm:grid-cols-2">
        {angebot.contrasts.map((c, i) => (
          <Reveal key={c.to} delay={i * 120}>
            <p className="text-sm font-light uppercase tracking-[0.18em] text-ink/60">
              {c.from}
            </p>
            <p className="font-serif mt-2 text-2xl italic sm:text-3xl">{c.to}</p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ */
/*  07 — Für wen das richtig ist                                       */
/* ------------------------------------------------------------------ */
export function FuerWenSection() {
  return (
    <SectionShell id={fuerWen.id} dark>
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow tone="light">{fuerWen.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <SerifTitle dark className="mt-10">
              {fuerWen.title}
            </SerifTitle>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ul>
            {fuerWen.audience.map((line, i) => (
              <Reveal
                key={i}
                delay={i * 100}
                as="li"
                className="group flex cursor-default items-baseline gap-5 border-b border-line-dark px-2 py-6 transition-colors duration-300 hover:bg-white/[0.04]"
              >
                <span className="font-serif text-base italic text-dark-muted transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-white">
                  {ROMAN[i]}
                </span>
                <p className="font-serif text-xl font-normal leading-snug transition-transform duration-500 ease-out group-hover:translate-x-8 sm:text-2xl sm:group-hover:translate-x-12">
                  {line}
                </p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <p className="body-copy mt-9 text-dark-body">{fuerWen.body}</p>
          </Reveal>
        </div>
      </div>
    </SectionShell>
  );
}

/* ------------------------------------------------------------------ */
/*  08 — Warum Menschen bleiben (zentriertes Statement)                */
/* ------------------------------------------------------------------ */
export function VertrauenSection() {
  return (
    <SectionShell id={vertrauen.id}>
      <div className="mx-auto max-w-4xl text-center">
        <Reveal className="flex justify-center">
          <Eyebrow>{vertrauen.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={120}>
          <p className="body-copy mt-9">{vertrauen.lead}</p>
        </Reveal>
        <div className="mt-8 space-y-3">
          {vertrauen.statements.map((s, i) => (
            <Reveal key={i} delay={i * 130}>
              <SerifTitle className={i === 0 ? "" : "italic text-ink/70"}>
                {s}
              </SerifTitle>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
