"use client";

import { useState } from "react";
import { Container } from "./ui";
import { Reveal } from "./reveal";
import { abschluss, footer, nav, brand } from "@/lib/content";

function ContactForm() {
  const [agreed, setAgreed] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    const body = encodeURIComponent(
      `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
    );
    const subject = encodeURIComponent("Anfrage Erstgespräch");
    window.location.href = `mailto:${footer.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="mt-10">
      <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input
            name="name"
            required
            placeholder="Vor- und Nachname"
            className="w-full border-b border-line-dark bg-transparent pb-3 text-white placeholder:text-dark-muted focus:border-white focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="sr-only">E-Mail</span>
          <input
            name="email"
            type="email"
            required
            placeholder="E-Mail-Adresse"
            className="w-full border-b border-line-dark bg-transparent pb-3 text-white placeholder:text-dark-muted focus:border-white focus:outline-none"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="sr-only">Nachricht</span>
          <input
            name="message"
            placeholder="Worum geht es? (optional)"
            className="w-full border-b border-line-dark bg-transparent pb-3 text-white placeholder:text-dark-muted focus:border-white focus:outline-none"
          />
        </label>
      </div>

      <label className="mt-8 flex cursor-pointer items-center gap-3 text-sm font-light text-dark-body">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          required
          className="h-4 w-4 accent-white"
        />
        Ich stimme der Datenschutzerklärung zu.
      </label>

      <button
        type="submit"
        disabled={!agreed}
        className="mt-8 inline-flex items-center gap-3 bg-white px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Senden
        <span aria-hidden>→</span>
      </button>
    </form>
  );
}

export function CtaSection() {
  return (
    <footer id={abschluss.id} className="scroll-mt-0 bg-dark text-white">
      <Container className="pt-28 pb-14 sm:pt-36 sm:pb-18 lg:pt-44 lg:pb-22">
        {/* Großes Schluss-Statement */}
        <div className="max-w-4xl">
          <Reveal>
            <span className="eyebrow text-dark-muted">{abschluss.eyebrow}</span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif mt-8 text-[2.1rem] lg:text-[4.2rem] font-normal leading-[1.08]">
              {abschluss.title}{" "}
              <em className="italic text-dark-body">{abschluss.titleAccent}</em>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p className="body-copy mt-9 max-w-xl text-dark-body">
              {abschluss.body}
            </p>
          </Reveal>
        </div>

        {/* Kontaktzeilen — Label links, Wert rechts */}
        <div className="mt-20">
          {[
            { label: "Kontakt", value: footer.email, href: `mailto:${footer.email}` },
            {
              label: "Telefon",
              value: footer.phone,
              href: `tel:${footer.phone.replace(/\s/g, "")}`,
            },
          ].map((row) => (
            <Reveal
              key={row.label}
              className="flex flex-col gap-2 border-t border-line-dark py-7 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="eyebrow text-dark-muted">{row.label}</span>
              <a
                href={row.href}
                className="font-serif text-2xl transition-opacity hover:opacity-70 sm:text-3xl"
              >
                {row.value}
              </a>
            </Reveal>
          ))}
          <div className="border-t border-line-dark" />
        </div>

        {/* Formular — eigene Sprungmarke, damit der Kontakt-Badge direkt hier
            (nicht am Anfang der Sektion) landet. scroll-mt für etwas Luft oben. */}
        <div id="erstgespraech" className="mt-20 max-w-3xl scroll-mt-24">
          <Reveal>
            <h3 className="font-serif text-[1.6rem] lg:text-[2.6rem] font-normal">
              {abschluss.cta}
            </h3>
          </Reveal>
          <ContactForm />
        </div>

        {/* Fußzeile */}
        <div className="mt-24 flex flex-col items-center gap-8 border-t border-line-dark pt-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-full.svg" alt={brand.name} className="h-11 w-auto" />
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-light uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col items-center gap-4 text-xs text-white/70 sm:flex-row sm:gap-8">
            <span>
              © {new Date().getFullYear()} {brand.name}. Alle Rechte vorbehalten.
            </span>
            <div className="flex gap-6">
              {footer.legal.map((item) => (
                <a key={item.label} href={item.href} className="hover:text-white">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
