"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "./ui";
import { DiamondObject } from "./diamond-object";
import { prozess } from "@/lib/content";
import { getLenis, isExitSnapSuppressed } from "@/lib/lenis";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

// Headline in drei Wörtern (für das wortweise Scharfwerden)
const WORDS: { text: string; italic?: boolean }[] = [
  { text: "Zeit" },
  { text: "ist" },
  { text: "Strategie", italic: true },
];

// Scroll-Fahrplan (Fortschritt p = 0..1 über die Sektion).
// Die Intro-Sequenz liegt komprimiert in [0, 0.37], danach bekommen die
// Schritt-Fragen den Großteil des Scrolls → jeder Text bleibt länger stehen.
const WORD_RANGES: [number, number][] = [
  [0.0, 0.061],
  [0.061, 0.122],
  [0.122, 0.183],
];
// 0.183–0.233: Halte-Phase — alles scharf, schwarz auf reinweiß
const INVERT_START = 0.233; // Hell→Dunkel-Umschlag — extra langsam (~140vh)
const INVERT_END = 0.389;
const MOVE_START = 0.4; // Headline fährt an finale Position + Rest faded ein
const MOVE_END = 0.544;
const STEPS_START = 0.544; // ab hier crossfaden die Schritt-Fragen (lange)

// Jeder Schritt taucht an einer anderen (festen) Stelle auf — unterhalb der
// Headline, links/mittig verteilt (rechts ist das Objekt).
const STEP_POS = [
  { left: "8%", top: "37%" },
  { left: "45%", top: "31%" },
  { left: "12%", top: "56%" },
  { left: "39%", top: "49%" },
];

export function ProcessScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const objectRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const wordDeltas = useRef<{ dx: number; dy: number }[]>([]);
  const baseFont = useRef(0);
  const snappedRef = useRef(false); // verhindert mehrfaches Einrasten am Ausgang
  const prevT = useRef({ x: 0, y: 0 });
  const rotationRef = useRef(0); // Scroll-Fortschritt fürs 3D-Objekt
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isMobileRef = useRef(false);
  const steps = prozess.steps;

  // Mobile-Erkennung (<1024px) — für Render-Loop (ref) und JSX (state)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => {
      isMobileRef.current = mq.matches;
      setIsMobile(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Basis-Schriftgröße (aus dem responsiven clamp) ohne Inline-Wert lesen
    const measure = () => {
      const line = lineRef.current;
      if (!line) return;
      const words = wordRefs.current;
      const prevFs = line.style.fontSize;
      const hadStacked = line.classList.contains("stacked");
      const prevTf = words.map((w) => (w ? w.style.transform : ""));
      // Natürliche (angedockte) Größe ohne Transforms messen
      line.style.fontSize = "";
      words.forEach((w) => {
        if (w) w.style.transform = "";
      });
      baseFont.current = parseFloat(getComputedStyle(line).fontSize) || 0;
      // Wort-Offsets = Differenz zwischen Ein-Zeilen- und Stapel-Position,
      // gemessen bei angedockter Größe (dort läuft das Gleiten).
      line.classList.remove("stacked");
      const inlineR = words.map((w) => w?.getBoundingClientRect());
      line.classList.add("stacked");
      const stackR = words.map((w) => w?.getBoundingClientRect());
      wordDeltas.current = words.map((_, i) => ({
        dx: (inlineR[i]?.left ?? 0) - (stackR[i]?.left ?? 0),
        dy: (inlineR[i]?.top ?? 0) - (stackR[i]?.top ?? 0),
      }));
      // Zustand wiederherstellen (der Render-Loop übernimmt danach ohnehin)
      if (!hadStacked) line.classList.remove("stacked");
      line.style.fontSize = prevFs;
      words.forEach((w, i) => {
        if (w) w.style.transform = prevTf[i];
      });
    };
    measure();
    window.addEventListener("resize", measure);
    // Mehrfach nachmessen, bis die Webfonts geladen sind (sonst falsche Breite)
    const timers = [120, 400, 900, 1600].map((ms) =>
      window.setTimeout(measure, ms),
    );
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    let rafId = 0;
    const render = () => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = clamp(-rect.top / Math.max(total, 1), 0, 1);

        // 0) Sanftes Einrasten beim Verlassen nach unten: Sobald die Animation
        //    durch ist (p = 1, der Pin löst sich) UND mit Tempo nach unten
        //    gescrollt wird, gleitet der Scroll kontrolliert in die nächste
        //    Section, statt mit Restmomentum durchzuschießen. Langsames Scrollen
        //    (velocity klein) wird NICHT abgefangen.
        const inExitZone = rect.top <= -total;
        const lenis = getLenis();
        if (
          inExitZone &&
          !snappedRef.current &&
          lenis &&
          lenis.velocity > 4 &&
          !isExitSnapSuppressed()
        ) {
          snappedRef.current = true;
          lenis.scrollTo("#haltung", {
            duration: 1.4,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
          });
        }
        if (!inExitZone) snappedRef.current = false;

        // 1) Wortweises Scharfwerden
        WORDS.forEach((_, i) => {
          const node = wordRefs.current[i];
          if (!node) return;
          const [s, e] = WORD_RANGES[i];
          const t1 = clamp((p - s) / (e - s), 0, 1);
          node.style.filter = `blur(${((1 - t1) * 16).toFixed(2)}px)`;
        });

        // 2) Farbumkehr: Hintergrund weiß→schwarz, Schrift schwarz→weiß
        const dark = smoothstep(INVERT_START, INVERT_END, p);
        if (bgRef.current) {
          const c = Math.round(lerp(255, 7, dark));
          bgRef.current.style.backgroundColor = `rgb(${c} ${c} ${c})`;
        }
        if (h2Ref.current) {
          const tc = Math.round(lerp(12, 255, dark));
          h2Ref.current.style.color = `rgb(${tc} ${tc} ${tc})`;
        }

        // 3) Headline fährt an finale Position; Rest faded ein.
        //    Größe über font-size (bei jeder Größe scharf), Position über
        //    reines translate — KEIN scale (das würde rastern/unscharf machen).
        const line = lineRef.current;
        const mob = isMobileRef.current;
        const words = wordRefs.current;
        // Mobile dockt Größe + Position früher an (bis 0.49); der Bereich
        // [0.49, MOVE_END] bleibt fürs Wort-Gleiten bei KONSTANTER Größe frei.
        const dockEnd = mob ? 0.49 : MOVE_END;
        const f = 1 - smoothstep(MOVE_START, dockEnd, p); // 1 mittig → 0 final
        if (line && baseFont.current) {
          // Mobile: Intro stärker vergrößern (Wörter sind gestapelt → mehr Platz).
          const k = mob ? 1.4 : 0.5;
          const fs = baseFont.current * (1 + k * f);
          line.style.fontSize = `${fs.toFixed(2)}px`;
          // Mobile: Wörter gleiten diagonal aus dem Stapel in die Zeile
          // (m = 0 gestapelt → 1 eine Zeile), statt hart umzuschalten. Am Ende
          // (m ≥ 1) echtes inline-Layout + Transforms zurück → nahtlos, da die
          // transformierte Position exakt der Inline-Position entspricht.
          if (mob) {
            const m = smoothstep(0.49, MOVE_END, p);
            if (m >= 1) {
              line.classList.remove("stacked");
              words.forEach((w) => {
                if (w) w.style.transform = "";
              });
            } else {
              line.classList.add("stacked");
              words.forEach((w, i) => {
                if (!w) return;
                const d = wordDeltas.current[i] || { dx: 0, dy: 0 };
                w.style.transform = `translate(${(d.dx * m).toFixed(1)}px, ${(d.dy * m).toFixed(1)}px)`;
              });
            }
          } else {
            line.classList.remove("stacked");
            words.forEach((w) => {
              if (w) w.style.transform = "";
            });
          }
          // Ziel = Mitte des Sticky-Containers (nicht der absoluten Viewport-
          // Mitte) — sonst ragt die Headline beim Eintritt über den Sektions-
          // rand und wird von overflow-hidden abgeschnitten (= Kante).
          const stickyTop = stickyRef.current
            ? stickyRef.current.getBoundingClientRect().top
            : 0;
          const targetX = window.innerWidth / 2;
          const targetY = stickyTop + window.innerHeight / 2;
          // natürliche Mitte aus aktueller Box (abzüglich des alten translate)
          const r = line.getBoundingClientRect();
          const ncx = r.left + r.width / 2 - prevT.current.x;
          const ncy = r.top + r.height / 2 - prevT.current.y;
          const tx = Math.round((targetX - ncx) * f);
          const ty = Math.round((targetY - ncy) * f);
          prevT.current = { x: tx, y: ty };
          line.style.transform = `translate(${tx}px, ${ty}px)`;
        }
        const reveal = smoothstep(MOVE_START, MOVE_END, p);
        if (eyebrowRef.current)
          eyebrowRef.current.style.opacity = reveal.toFixed(3);
        // Objekt + Schritt-Texte einen Tick später einblenden (Desktop), damit
        // sie nicht schon während des Headline-Andockens erscheinen.
        const revealLate = smoothstep(mob ? MOVE_START : 0.46, MOVE_END, p);
        if (stepsRef.current) stepsRef.current.style.opacity = revealLate.toFixed(3);

        // 4) Objekt: faded ein und driftet; Rotation macht jetzt das 3D-Mesh
        const dp = clamp((p - MOVE_START) / (1 - MOVE_START), 0, 1);
        rotationRef.current = dp;
        if (objectRef.current) {
          // Max-Deckkraft gedrosselt, damit Text durchscheint und das Objekt
          // nicht zu sehr raussticht.
          objectRef.current.style.opacity = (revealLate * (mob ? 0.2 : 0.45)).toFixed(3);
          // Drag nur wenn das Objekt sichtbar ist (sonst nichts blockieren)
          objectRef.current.style.pointerEvents = revealLate > 0.5 ? "auto" : "none";
          const x = 6 - dp * 24;
          const y = -4 + dp * 8;
          objectRef.current.style.transform = `translateY(-50%) translate(${x}vw, ${y}vh)`;
        }

        // 5) Schritt-Fragen crossfaden
        const dp2 = clamp((p - STEPS_START) / (1 - STEPS_START), 0, 1);
        const idx = clamp(Math.floor(dp2 * steps.length), 0, steps.length - 1);
        setActive((prev) => (prev === idx ? prev : idx));
      }
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", measure);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      id={prozess.id}
      className="relative bg-dark text-white"
      style={{ height: `${(steps.length + 6) * 100}vh` }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        {/* Hintergrund-Layer (weiß → schwarz) */}
        <div
          ref={bgRef}
          className="absolute inset-0"
          style={{ backgroundColor: "#ffffff" }}
          aria-hidden
        />

        {/* 3D-Objekt (Diamant aus dem Logo) — driftet & dreht sich on-scroll */}
        <div
          ref={objectRef}
          className="absolute right-[-6vh] top-1/2 h-[48vh] w-[48vh] lg:h-[88vh] lg:w-[88vh] will-change-transform"
          style={{ opacity: 0, pointerEvents: "none", transform: "translateY(-50%)" }}
          aria-hidden
        >
          <DiamondObject rotationRef={rotationRef} />
        </div>

        {/* Schritt-Fragen + Fortschritt (faden in Phase 3 ein) — jeder Schritt
            an einer anderen Position, mit eigenem Fortschrittsbalken. */}
        <div
          ref={stepsRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{ opacity: 0 }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              style={isMobile ? undefined : { left: STEP_POS[i].left, top: STEP_POS[i].top }}
              className={`absolute transition-all duration-700 ${
                isMobile
                  ? "left-1/2 top-[44%] w-[84vw] -translate-x-1/2"
                  : "w-[min(36rem,84vw)]"
              } ${
                i === active
                  ? "translate-y-0 opacity-100 blur-0"
                  : "pointer-events-none translate-y-4 opacity-0 blur-[2px]"
              }`}
            >
              {/* Mobile: Zahl ÜBER der Überschrift (Reihenfolge via order), damit
                  der Titel die volle Breite nutzt. Desktop: Titel · Linie · Zahl. */}
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-baseline lg:gap-6">
                <span className="font-serif text-xl italic text-white/70 sm:text-2xl lg:order-3">
                  {romanize(i + 1)}.
                </span>
                <h3 className="font-serif text-[1.6rem] lg:text-[3rem] italic leading-[1.1] text-white lg:order-1">
                  {step.label}
                </h3>
                <span className="hidden h-px flex-1 bg-white/30 lg:order-2 lg:block" />
              </div>
              <p className="body-copy mt-6 max-w-md" style={{ color: "#e5e5e5" }}>
                {step.body}
              </p>
            </div>
          ))}

          {/* Ein gemeinsamer, animierter Fortschrittsbalken (feste Position) */}
          <div className="absolute bottom-[14%] left-[8%] flex items-center gap-4">
            <span className="font-serif text-sm italic text-white/60">
              0{active + 1}
            </span>
            <span className="block h-px w-28 bg-white/20">
              <span
                className="block h-px bg-white transition-all duration-700 ease-out"
                style={{ width: `${((active + 1) / steps.length) * 100}%` }}
              />
            </span>
            <span className="font-serif text-sm italic text-white/30">
              0{steps.length}
            </span>
          </div>
        </div>

        {/* Headline — startet groß/mittig/geblurrt, fährt nach oben links.
            Desktop: oberer Abstand höhenbasiert (vh), damit die Headline mit
            den höhenpositionierten Schritt-Texten synchron bleibt und auf
            breiten Screens nicht in sie hineinwächst. */}
        <Container className="absolute inset-x-0 top-0 z-10 pt-24 sm:pt-28 lg:pt-[7vh]">
          <span
            ref={eyebrowRef}
            className="eyebrow text-dark-muted"
            style={{ opacity: 0 }}
          >
            {prozess.eyebrow}
          </span>
          <h2
            ref={h2Ref}
            className="display mt-6 text-[1.6rem] lg:text-[min(6rem,11vh)]"
            style={{ color: "#0c0c0c" }}
          >
            <span
              ref={lineRef}
              className="proc-headline inline-block origin-center whitespace-nowrap text-center lg:text-left will-change-transform"
            >
              {WORDS.map((w, i) => (
                <span key={i}>
                  <span
                    ref={(node) => {
                      wordRefs.current[i] = node;
                    }}
                    className={
                      w.italic
                        ? "font-serif inline-block font-normal italic normal-case tracking-normal"
                        : "inline-block"
                    }
                  >
                    {w.text}
                  </span>
                  {i < WORDS.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          </h2>
        </Container>
      </div>
    </section>
  );
}

function romanize(n: number) {
  return ["I", "II", "III", "IV", "V", "VI"][n - 1] ?? String(n);
}
