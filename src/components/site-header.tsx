"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const fullLogoRef = useRef<HTMLImageElement>(null);
  const diamondRef = useRef<HTMLImageElement>(null);
  const progRef = useRef(0); // Fortschritt: 0 = volles Logo, 1 = Diamant
  const lastScrollRef = useRef(0);

  // Scroll sperren wenn Overlay offen
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Logo-Animation beim Scrollen durch die erste Section: Wortmarke blendet aus,
  // der Diamant (rechts im Logo) wandert in die Mitte, flippt in 3D und wächst.
  useEffect(() => {
    const smoothstep = (e0: number, e1: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
      return t * t * (3 - 2 * t);
    };
    let raf = 0;
    const render = () => {
      const full = fullLogoRef.current;
      const dia = diamondRef.current;
      if (full && dia) {
        // An die Scroll-Distanz gekoppelt: der Morph läuft MIT dem Scrollen.
        // ~MORPH_DISTANCE px runterscrollen = volles Logo → Diamant, hoch =
        // zurück. Richtungsbasiert & jederzeit umkehrbar; ganz oben volles Logo.
        const MORPH_DISTANCE = 340;
        const y = window.scrollY;
        const sdy = y - lastScrollRef.current;
        lastScrollRef.current = y;
        progRef.current = Math.max(
          0,
          Math.min(1, progRef.current + sdy / MORPH_DISTANCE),
        );
        if (y < 24) progRef.current = 0;
        const p = progRef.current;
        // Wortmarke (ohne Diamant) blendet aus, während der einzelne Diamant
        // gleichzeitig losfliegt — flüssig, da es nur einen Diamanten gibt.
        full.style.opacity = (1 - smoothstep(0.05, 0.5, p)).toFixed(3);
        const e = smoothstep(0.08, 1, p);
        // Diamant-Geometrie aus dem vollen Logo ableiten (Messwerte aus der SVG)
        const W = full.offsetWidth;
        const H = full.offsetHeight;
        const dx = 0.441 * W; // Diamant-Mitte rechts vom Logo-Zentrum
        const dy = -0.271 * H; // und etwas höher
        const diaH = 0.458 * H; // Diamant-Höhe im vollen Logo
        dia.style.height = `${diaH.toFixed(2)}px`;
        const tx = dx * (1 - e);
        const ty = dy * (1 - e);
        const scale = 1 + e * 0.6; // wächst beim Flippen
        const flip = e * 180; // 3D-Flip
        dia.style.transform = `translate(-50%, -50%) translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) rotateY(${flip.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      {/* Fixe Chrome-Schicht — invertiert sich über mix-blend-difference
          automatisch gegen helle und dunkle Sektionen. */}
      <div className="pointer-events-none fixed inset-0 z-40 mix-blend-difference">
        {/* Logo zentriert oben */}
        <a
          href="#top"
          aria-label="Consilanto — Startseite"
          className="pointer-events-auto absolute left-1/2 top-6 -translate-x-1/2 [perspective:600px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={fullLogoRef}
            src="/img/logo-wordmark.svg"
            alt="Consilanto"
            className="h-9 w-auto sm:h-11"
          />
          {/* Diamant-Ebene — liegt anfangs exakt über dem Logo-Diamanten,
              wandert beim Scrollen in die Mitte, flippt und wächst. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={diamondRef}
            src="/img/logo-icon.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 w-auto will-change-transform"
          />
        </a>

        {/* Vertikale Navigationsleiste links (ab lg) */}
        <nav className="pointer-events-auto absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex flex-col items-center gap-2 text-white transition-colors"
            >
              <span className="h-4 w-px bg-white/50 transition-all duration-300 group-hover:h-6 group-hover:bg-white" />
              <span className="vertical-label text-[0.66rem] font-normal uppercase tracking-[0.12em] text-white/90 transition-colors group-hover:text-white">
                {item.label}
              </span>
            </a>
          ))}
          <span className="h-4 w-px bg-white/50" aria-hidden />
        </nav>

        {/* Hamburger (mobil) */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Menü öffnen"
          className="pointer-events-auto absolute right-6 top-6 flex h-10 w-10 flex-col items-end justify-center gap-1.5 text-white lg:hidden"
        >
          <span className="block h-px w-7 bg-current" />
          <span className="block h-px w-5 bg-current" />
        </button>
      </div>

      {/* Mobile-Overlay */}
      <div
        className={[
          "fixed inset-0 z-50 flex flex-col bg-dark text-white transition-opacity duration-500 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-6 py-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-full.svg" alt="Consilanto" className="h-8 w-auto" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Menü schließen"
            className="relative h-10 w-10"
          >
            <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 rotate-45 bg-white" />
            <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 -rotate-45 bg-white" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center gap-2 px-6">
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif flex items-baseline gap-4 border-b border-line-dark py-4 text-3xl"
            >
              <span className="font-sans text-xs text-dark-muted">
                0{i + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
