"use client";

import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { Container } from "./ui";
import { Reveal } from "./reveal";
import { useSiteContent, useTinaHome } from "@/lib/site-content";

type Status = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"), // Honeypot
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Versand fehlgeschlagen. Bitte später erneut versuchen.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Keine Verbindung. Bitte später erneut versuchen.");
    }
  };

  if (status === "success") {
    return (
      <div className="mt-10 border-t border-line-dark pt-10">
        <p className="font-serif text-2xl">Vielen Dank für Ihre Anfrage.</p>
        <p className="body-copy mt-4 text-dark-body">
          Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

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

      {/* Honeypot: für Menschen unsichtbar, nur Bots füllen es aus. */}
      <div aria-hidden className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label>
          Firma (bitte freilassen)
          <input name="company" tabIndex={-1} autoComplete="off" />
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
        <span>
          Ich stimme der{" "}
          <a
            href="/datenschutz"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white"
          >
            Datenschutzerklärung
          </a>{" "}
          zu.
        </span>
      </label>

      {status === "error" ? (
        <p className="mt-6 text-sm text-red-300">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={!agreed || sending}
        className="mt-8 inline-flex items-center gap-3 bg-white px-9 py-4 text-xs font-medium uppercase tracking-[0.22em] text-ink transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {sending ? "Wird gesendet…" : "Senden"}
        {!sending && <span aria-hidden>→</span>}
      </button>
    </form>
  );
}

export function CtaSection() {
  const { abschluss, footer, nav, brand } = useSiteContent();
  const home = useTinaHome();
  return (
    <footer id={abschluss.id} className="scroll-mt-0 bg-dark text-white">
      <Container className="pt-28 pb-14 sm:pt-36 sm:pb-18 lg:pt-44 lg:pb-22">
        {/* Großes Schluss-Statement */}
        <div className="max-w-4xl">
          <Reveal>
            <span
              className="eyebrow text-dark-muted"
              data-tina-field={tinaField(home.abschluss, "eyebrow")}
            >
              {abschluss.eyebrow}
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif mt-8 text-[2.1rem] lg:text-[4.2rem] font-normal leading-[1.08]">
              <span data-tina-field={tinaField(home.abschluss, "title")}>
                {abschluss.title}
              </span>{" "}
              <em
                className="italic text-dark-body"
                data-tina-field={tinaField(home.abschluss, "titleAccent")}
              >
                {abschluss.titleAccent}
              </em>
            </h2>
          </Reveal>
          <Reveal delay={240}>
            <p
              className="body-copy mt-9 max-w-xl text-dark-body"
              data-tina-field={tinaField(home.abschluss, "body")}
            >
              {abschluss.body}
            </p>
          </Reveal>
        </div>

        {/* Kontaktzeilen — Label links, Wert rechts */}
        <div className="mt-20">
          {[
            {
              label: "Kontakt",
              value: footer.email,
              href: `mailto:${footer.email}`,
              field: tinaField(home.footer, "email"),
            },
            {
              label: "Telefon",
              value: footer.phone,
              href: `tel:${footer.phone.replace(/\s/g, "")}`,
              field: tinaField(home.footer, "phone"),
            },
          ].map((row) => (
            <Reveal
              key={row.label}
              className="flex flex-col gap-2 border-t border-line-dark py-7 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="eyebrow text-dark-muted">{row.label}</span>
              <a
                href={row.href}
                data-tina-field={row.field}
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
            <h3
              className="font-serif text-[1.6rem] lg:text-[2.6rem] font-normal"
              data-tina-field={tinaField(home.abschluss, "cta")}
            >
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
