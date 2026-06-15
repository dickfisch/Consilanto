"use client";

import { useEffect, useRef } from "react";
import { Container } from "./ui";

/**
 * Vollflächiges Bild-Band mit dezentem Parallax als visuelle Trennung
 * zwischen zwei inhaltlichen Sektionen. Bild ist ein Platzhalter und
 * lässt sich jederzeit über `src` austauschen.
 */
export function ImageBand({
  src,
  quote,
  cite,
}: {
  src: string;
  quote?: string;
  cite?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    let rafId = 0;
    const run = () => {
      const el = ref.current;
      const img = imgRef.current;
      if (el && img) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(
          -1,
          Math.min(1, (rect.top + rect.height / 2 - vh / 2) / vh),
        );
        img.style.transform = `translateY(${p * 15}%) scale(1.34)`;
      }
      rafId = requestAnimationFrame(run);
    };
    rafId = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section
      ref={ref}
      className="relative h-screen overflow-hidden bg-dark"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt=""
        aria-hidden
        style={{ transform: "scale(1.34)" }}
        className="is-grayscale absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      {quote ? (
        <Container className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <span className="h-px w-12 bg-white/40" aria-hidden />
          <p className="font-serif mt-8 max-w-3xl text-2xl italic leading-snug text-white sm:text-3xl lg:text-4xl">
            {quote}
          </p>
          {cite ? (
            <span className="eyebrow mt-8 text-white/55">{cite}</span>
          ) : null}
        </Container>
      ) : null}
    </section>
  );
}
