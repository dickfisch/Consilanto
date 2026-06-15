"use client";

import { createElement, useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Verzögerung in ms für gestaffeltes Einblenden */
  delay?: number;
  /** Wrapper-Element (default: div) */
  as?: ElementType;
  className?: string;
};

/**
 * Blendet Inhalte sanft ein, sobald sie in den Viewport scrollen.
 * Respektiert prefers-reduced-motion über CSS (siehe globals.css).
 */
export function Reveal({ children, delay = 0, as, className }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Test-/Print-Schalter: ?reveal=off blendet alles sofort ein.
    if (
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("reveal") === "off"
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return createElement(
    Tag,
    {
      ref,
      "data-reveal": "",
      className: [visible ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" "),
      style: delay
        ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties)
        : undefined,
    },
    children,
  );
}
