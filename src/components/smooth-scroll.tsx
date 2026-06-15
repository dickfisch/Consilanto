"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis, setExitSnapSuppressed } from "@/lib/lenis";

/**
 * Aktiviert sanftes Inertia-Scrolling (Lenis) auf der ganzen Seite und
 * leitet Anker-Links (#…) sauber durch Lenis. Respektiert
 * prefers-reduced-motion — dann bleibt natives Scrollen aktiv.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      // Etwas mehr Smoothing + gedämpfte Scroll-Eingabe, damit man nach langen
      // (gepinnten) Sektionen nicht mit vollem Momentum „durchschießt".
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8, // < 1 = Scrollen langsamer/kontrollierter (Bremse)
      touchMultiplier: 1.1,
    });
    setLenis(lenis);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Anker-Links über Lenis scrollen lassen
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      // Exit-Snap währenddessen aussetzen, sonst fängt er den Scroll ab, wenn er
      // durch die Process-Section rauscht (sprang sonst zu #haltung statt ans Ziel).
      setExitSnapSuppressed(true);
      lenis.scrollTo(el as HTMLElement, { offset: 0 });
      window.setTimeout(() => setExitSnapSuppressed(false), 1800);
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  return null;
}
