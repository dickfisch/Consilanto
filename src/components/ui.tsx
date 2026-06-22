import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-20 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "ink",
  tinaField,
}: {
  children: ReactNode;
  tone?: "ink" | "light";
  /** Optionaler TinaCMS-Klick-zum-Bearbeiten-Marker für den Text. */
  tinaField?: string;
}) {
  const color = tone === "light" ? "text-dark-muted" : "text-ink/70";
  const line = tone === "light" ? "bg-white/30" : "bg-ink/30";
  return (
    <div className="flex items-center gap-3">
      <span className={`h-px w-8 ${line}`} aria-hidden />
      <span className={`eyebrow ${color}`} data-tina-field={tinaField}>
        {children}
      </span>
    </div>
  );
}
