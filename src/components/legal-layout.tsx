import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "./ui";

/**
 * Schlichtes, markenkonformes Layout für Rechtsseiten (Impressum, Datenschutz).
 * Eigener Mini-Header (Logo → Startseite) + Mini-Footer, ohne Hero/Kontaktform.
 */
export function LegalLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line">
        <Container className="flex items-center justify-between py-6">
          <Link href="/" aria-label="Zur Startseite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-full.svg" alt="Consilanto" className="h-9 w-auto" />
          </Link>
          <Link
            href="/"
            className="text-xs font-light uppercase tracking-[0.18em] text-ink/60 transition-colors hover:text-ink"
          >
            ← Zur Startseite
          </Link>
        </Container>
      </header>

      <main>
        <Container className="max-w-3xl py-20 lg:py-28">
          <h1 className="font-serif text-[2.2rem] lg:text-[3.2rem] font-normal leading-tight">
            {title}
          </h1>
          <div className="legal-content mt-12">{children}</div>
        </Container>
      </main>

      <footer className="border-t border-line">
        <Container className="flex flex-col items-center gap-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="text-xs text-ink/55">
            © {new Date().getFullYear()} Consilanto Gesellschaft für
            Finanzdienstleistungen mbH
          </span>
          <nav className="flex gap-6 text-xs font-light uppercase tracking-[0.16em] text-ink/60">
            <Link href="/" className="transition-colors hover:text-ink">
              Startseite
            </Link>
            <Link href="/impressum" className="transition-colors hover:text-ink">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-ink">
              Datenschutz
            </Link>
          </nav>
        </Container>
      </footer>
    </div>
  );
}
