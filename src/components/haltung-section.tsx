"use client";

import { useEffect, useRef } from "react";
import { Container, Eyebrow } from "./ui";
import { haltung } from "@/lib/content";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));
const smoothstep = (e0: number, e1: number, x: number) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

// Desktop: Reihenfolge des Scharfwerdens über den Section-Fortschritt.
const PLEDGE_RANGES: [number, number][] = [
  [0.08, 0.34],
  [0.4, 0.66],
  [0.72, 0.96],
];
// Desktop: asymmetrische Staffelung.
const INDENT = ["", "lg:pl-[48%]", "lg:pl-[14%]"];

// Mobile: Blur-Reveal-Bereiche je Pledge (vom Scroll-Fortschritt mp gesteuert,
// getrennt von der Position). Liegen so, dass jeder blurrt, wenn er in die
// Mitte rückt — der erste gleich am Anfang, die nächsten erst kurz davor.
const MOB_REVEAL: [number, number][] = [
  [0.0, 0.18],
  [0.32, 0.53],
  [0.66, 0.88],
];

function splitPledge(pledge: string) {
  const [first, ...rest] = pledge.split(" ");
  return { first, rest: rest.join(" ") };
}

// Mobile: Aktiv-Index (0..2) als Treppe — hält bei jedem Pledge kurz (sticky)
// und gleitet dann weiter, sodass der nächste in die Mitte rückt.
function activeStep(mp: number) {
  if (mp < 0.18) return 0;
  if (mp < 0.42) return smoothstep(0.18, 0.42, mp); // 0 → 1
  if (mp < 0.58) return 1;
  if (mp < 0.82) return 1 + smoothstep(0.58, 0.82, mp); // 1 → 2
  return 2;
}

export function HaltungSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const deskRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const mobAreaRef = useRef<HTMLDivElement>(null);
  const mobTrackRef = useRef<HTMLDivElement>(null);
  const mobSlotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const render = () => {
      // DESKTOP: gepinnt, Pledges werden nacheinander scharf.
      const sec = sectionRef.current;
      if (sec && deskRefs.current[0]?.offsetParent) {
        const rect = sec.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = clamp(-rect.top / Math.max(total, 1), 0, 1);
        haltung.pledges.forEach((_, i) => {
          const node = deskRefs.current[i];
          if (!node) return;
          const [s, e] = PLEDGE_RANGES[i] ?? [0, 1];
          const t = clamp((p - s) / (e - s), 0, 1);
          node.style.filter = `blur(${((1 - t) * 14).toFixed(2)}px)`;
          node.style.opacity = (0.12 + 0.88 * t).toFixed(3);
          node.style.transform = `translateY(${((1 - t) * 18).toFixed(1)}px)`;
        });
      }

      // MOBILE: gepinnter Stapel — der aktive Pledge steht zentriert, beim
      // Weiterscrollen rutscht er hoch und der nächste rückt in die Mitte.
      const area = mobAreaRef.current;
      const track = mobTrackRef.current;
      if (area && track && track.offsetParent) {
        const r = area.getBoundingClientRect();
        const total = area.offsetHeight - window.innerHeight;
        const mp = clamp(-r.top / Math.max(total, 1), 0, 1);
        const a = activeStep(mp); // 0..2
        const S = mobSlotRefs.current[0]?.offsetHeight || window.innerHeight * 0.45;
        track.style.transform = `translateY(${(-(0.5 + a) * S).toFixed(1)}px)`;
        haltung.pledges.forEach((_, i) => {
          const node = mobRefs.current[i];
          if (!node) return;
          // Blur-Reveal wie Desktop/„Zeit ist Strategie": jeder Pledge blurrt in
          // seinem eigenen Bereich von 14px → 0 auf und bleibt danach scharf.
          const [rs, re] = MOB_REVEAL[i] ?? [0, 1];
          const t = smoothstep(rs, re, mp);
          node.style.filter = `blur(${((1 - t) * 14).toFixed(2)}px)`;
          node.style.opacity = (0.1 + 0.9 * t).toFixed(3);
        });
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={sectionRef}
      id={haltung.id}
      className="relative scroll-mt-0 bg-paper text-ink lg:h-[400vh]"
    >
      {/* ===================== Desktop: gepinnt ===================== */}
      {/* h-full, damit das Sticky über die volle Section-Höhe (400vh) klebt. */}
      <div className="hidden h-full lg:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Container className="w-full">
            <div className="grid gap-x-16 lg:grid-cols-12">
              <div className="lg:col-span-6">
                <Eyebrow>{haltung.eyebrow}</Eyebrow>
                <h2 className="font-serif mt-8 text-[3.5rem] font-normal leading-[1.1] tracking-[-0.01em]">
                  {haltung.title}
                </h2>
              </div>
              <div className="space-y-5 lg:col-span-5 lg:col-start-8">
                {haltung.body.map((para, i) => (
                  <p key={i} className="body-copy">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-20 space-y-14">
              {haltung.pledges.map((pledge, i) => {
                const { first, rest } = splitPledge(pledge);
                return (
                  <p
                    key={pledge}
                    ref={(el) => {
                      deskRefs.current[i] = el;
                    }}
                    className={`display text-[3rem] leading-[1.1] ${INDENT[i] ?? ""}`}
                    style={{ filter: "blur(14px)", opacity: 0.12 }}
                  >
                    {first}{" "}
                    <span className="font-serif font-normal italic normal-case tracking-normal">
                      {rest}
                    </span>
                  </p>
                );
              })}
            </div>
          </Container>
        </div>
      </div>

      {/* ===================== Mobile: Kopf + gepinnter Stapel ===================== */}
      <div className="lg:hidden">
        {/* Kopf — normaler Fluss, scrollt weg (nicht sticky) */}
        <Container className="pb-4 pt-28">
          <Eyebrow>{haltung.eyebrow}</Eyebrow>
          <h2 className="font-serif mt-6 text-[1.9rem] font-normal leading-[1.1] tracking-[-0.01em]">
            {haltung.title}
          </h2>
          <div className="mt-8 space-y-5">
            {haltung.body.map((para, i) => (
              <p key={i} className="body-copy">
                {para}
              </p>
            ))}
          </div>
        </Container>

        {/* Gepinnter Pledge-Stapel (2-Zeiler: KEINE / Rest), zentriert */}
        <div ref={mobAreaRef} className="relative h-[600vh]">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div
              ref={mobTrackRef}
              className="absolute inset-x-0 top-1/2 will-change-transform"
            >
              {haltung.pledges.map((pledge, i) => {
                const { first, rest } = splitPledge(pledge);
                return (
                  <div
                    key={pledge}
                    ref={(el) => {
                      mobSlotRefs.current[i] = el;
                    }}
                    className="flex h-[32svh] items-center"
                  >
                    <Container className="w-full">
                      <p
                        ref={(el) => {
                          mobRefs.current[i] = el;
                        }}
                        className="display text-center text-[2.4rem] leading-[1.12]"
                        style={{ filter: "blur(9px)", opacity: 0.08 }}
                      >
                        <span className="block">{first}</span>
                        <span className="font-serif block font-normal italic normal-case tracking-normal">
                          {rest}
                        </span>
                      </p>
                    </Container>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
