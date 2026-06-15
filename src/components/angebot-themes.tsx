"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./reveal";
import { ROMAN } from "@/lib/content";
import { getLenis } from "@/lib/lenis";

type Theme = { title: string; note?: string };

// Platzhalter-Text (Lorem Ipsum) — später durch echte Inhalte pro Thema ersetzen.
const LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus.",
];

export function AngebotThemes({ themes }: { themes: Theme[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="mt-14">
        {themes.map((theme, i) => (
          <Reveal key={theme.title} delay={i * 70}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex w-full cursor-pointer items-baseline gap-6 border-b border-line px-2 py-6 text-left transition-colors duration-300 hover:bg-ink/[0.02] sm:gap-10 sm:py-8"
            >
              <span className="font-serif w-8 shrink-0 text-base italic text-ink/35 transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:text-ink">
                {ROMAN[i]}
              </span>
              <h3 className="font-serif flex-1 text-[1.6rem] font-normal leading-tight transition-transform duration-500 ease-out group-hover:translate-x-8 sm:group-hover:translate-x-16 lg:text-[3rem]">
                {theme.title}
              </h3>
              {theme.note ? (
                <span className="hidden max-w-[15rem] pt-2 text-right text-sm font-light leading-relaxed text-body transition-opacity duration-500 group-hover:opacity-60 md:block">
                  {theme.note}
                </span>
              ) : null}
            </button>
          </Reveal>
        ))}
      </div>

      {open !== null ? (
        <ThemeModal
          theme={themes[open]}
          numeral={ROMAN[open]}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}

function ThemeModal({
  theme,
  numeral,
  onClose,
}: {
  theme: Theme;
  numeral: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  // Einblenden, Hintergrund-Scroll sperren (Lenis), ESC zum Schließen.
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    window.setTimeout(onClose, 280);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={theme.title}
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      {/* Karte */}
      <div
        className={`relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col bg-paper text-ink shadow-2xl transition-all duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {/* Schließen */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Schließen"
          className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full text-ink/60 transition-colors hover:bg-ink/[0.06] hover:text-ink"
        >
          <span className="relative block h-4 w-4">
            <span className="absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
          </span>
        </button>

        {/* Scrollbarer Inhalt (data-lenis-prevent → eigener Scroll, Lenis ignoriert ihn) */}
        <div
          data-lenis-prevent
          className="overflow-y-auto px-8 py-12 sm:px-14 sm:py-16"
        >
          {/* Diamant-Logo mittig oben (schwarze Variante) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo-icon-dark.svg"
            alt=""
            aria-hidden
            className="mx-auto mb-10 h-10 w-auto"
          />
          <span className="font-serif text-base italic text-ink/40">
            {numeral}
          </span>
          <h2 className="font-serif mt-3 text-3xl font-normal leading-[1.1] sm:text-4xl">
            {theme.title}
          </h2>
          {theme.note ? (
            <p className="font-serif mt-3 text-xl italic text-ink/70">
              {theme.note}
            </p>
          ) : null}
          <div className="mt-10 space-y-5">
            {LOREM.map((p, i) => (
              <p key={i} className="body-copy">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
