/**
 * Zentrale Inhalte der Consilanto One-Pager.
 *
 * Die redaktionell pflegbaren Texte/Bilder liegen in `content/home/index.json`
 * und werden über TinaCMS (Oberfläche unter /admin) bearbeitet.
 *
 * `buildContent(home)` setzt aus den Roh-Daten (entweder der statischen JSON
 * oder — im Editor — den Live-Daten von TinaCMS) die typisierten Objekte
 * zusammen und ergänzt strukturelle, nicht-redaktionelle Felder (IDs,
 * Anker-Links, römische Ziffern, Navigation).
 *
 * Für die Live-Vorschau im Editor wird `buildContent` mit den reaktiven
 * Daten aus `useTina` aufgerufen (siehe `site-content.tsx`).
 */
import homeJson from "../../content/home/index.json";

type Part = { text: string; italic?: boolean };

/** Roh-Form der editierbaren Inhalte (Struktur von content/home/index.json). */
export interface HomeData {
  seo: { title: string; description: string; shareImage: string };
  brand: { tagline: string };
  hero: { tagline: string; headlineParts: Part[]; body: string; cta: string };
  media: { heroVideo: string; editorialImage: string; ablaufImage: string };
  person: {
    eyebrow: string;
    title: string;
    intro: string;
    accents: string[];
    body: string[];
  };
  meta: {
    eyebrow: string;
    title: string;
    intro: string;
    accents: string[];
    body: string[];
  };
  prozess: {
    eyebrow: string;
    headlineParts: Part[];
    steps: { label: string; body: string }[];
  };
  haltung: {
    eyebrow: string;
    title: string;
    body: string[];
    pledges: string[];
  };
  angebot: {
    eyebrow: string;
    title: string;
    intro: string;
    pillars: string[];
    bridge: string;
    themes: { title: string; note: string }[];
    contrasts: { from: string; to: string }[];
  };
  ablauf: {
    eyebrow: string;
    headlineParts: Part[];
    steps: { title: string; body: string; cta: string; href: string }[];
  };
  fuerWen: {
    eyebrow: string;
    title: string;
    audience: string[];
    body: string;
  };
  vertrauen: {
    eyebrow: string;
    title: string;
    lead: string;
    statements: string[];
  };
  abschluss: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    body: string;
    cta: string;
  };
  footer: { tagline: string; email: string; phone: string };
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

const nav = [
  { label: "Die Beratung", href: "#person" },
  { label: "Haltung", href: "#haltung" },
  { label: "Angebot", href: "#angebot" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Für wen", href: "#fuer-wen" },
  { label: "Kontakt", href: "#kontakt" },
];

/** „time" wird aktuell von keiner Komponente genutzt — rein statisch erhalten. */
const time = {
  id: "zeit",
  eyebrow: "Zeit als strategischer Faktor",
  title:
    "Zeit ist in finanziellen Fragen nie nur ein Rahmen. Sie ist Teil der Strategie.",
  accents: [
    "Der richtige Moment kann Chancen eröffnen.",
    "Zu langes Warten kann Möglichkeiten kosten.",
    "Vorausschauendes Handeln kann über Jahre Wirkung entfalten.",
  ],
  lead: "Wer seine Zukunft gestalten will, muss deshalb nicht nur in Zahlen denken, sondern in Zusammenhängen:",
  questions: [
    "Was ist heute sinnvoll?",
    "Was braucht Vorbereitung?",
    "Was sollte jetzt entschieden werden?",
    "Und was darf mit Ruhe wachsen?",
  ],
  body: "Consilanto begleitet Sie dabei, diese Fragen mit Weitblick zu beantworten — damit Zeit nicht verstreicht, sondern für Sie arbeitet.",
};

/**
 * Baut aus den Roh-Inhalten die fertigen, von den Komponenten genutzten
 * Objekte (inkl. statischer Struktur-Felder).
 */
export function buildContent(home: HomeData) {
  return {
    brand: {
      name: "Consilanto",
      tagline: home.brand.tagline,
      advisor: "Consilanto",
    },
    nav,
    hero: {
      tagline: home.hero.tagline,
      headline: "Luxus ist, die eigene Zukunft selbst zu gestalten.",
      headlineParts: home.hero.headlineParts as Part[],
      body: home.hero.body,
      cta: home.hero.cta,
    },
    media: {
      heroVideo: home.media.heroVideo,
      editorialImage: home.media.editorialImage,
      ablaufImage: home.media.ablaufImage,
    },
    ROMAN,
    person: {
      id: "person",
      eyebrow: home.person.eyebrow,
      title: home.person.title,
      intro: home.person.intro,
      accents: home.person.accents,
      body: home.person.body,
    },
    meta: {
      id: "metaebene",
      eyebrow: home.meta.eyebrow,
      title: home.meta.title,
      intro: home.meta.intro,
      accents: home.meta.accents,
      body: home.meta.body,
    },
    time,
    prozess: {
      id: "zeit",
      eyebrow: home.prozess.eyebrow,
      headlineParts: home.prozess.headlineParts as Part[],
      steps: home.prozess.steps,
    },
    haltung: {
      id: "haltung",
      eyebrow: home.haltung.eyebrow,
      title: home.haltung.title,
      body: home.haltung.body,
      pledges: home.haltung.pledges,
    },
    angebot: {
      id: "angebot",
      eyebrow: home.angebot.eyebrow,
      title: home.angebot.title,
      intro: home.angebot.intro,
      pillars: home.angebot.pillars,
      bridge: home.angebot.bridge,
      themes: home.angebot.themes,
      contrasts: home.angebot.contrasts,
    },
    ablauf: {
      id: "ablauf",
      eyebrow: home.ablauf.eyebrow,
      headlineParts: home.ablauf.headlineParts as Part[],
      steps: home.ablauf.steps,
    },
    fuerWen: {
      id: "fuer-wen",
      eyebrow: home.fuerWen.eyebrow,
      title: home.fuerWen.title,
      audience: home.fuerWen.audience,
      body: home.fuerWen.body,
    },
    vertrauen: {
      id: "vertrauen",
      eyebrow: home.vertrauen.eyebrow,
      title: home.vertrauen.title,
      lead: home.vertrauen.lead,
      statements: home.vertrauen.statements,
    },
    abschluss: {
      id: "kontakt",
      eyebrow: home.abschluss.eyebrow,
      title: home.abschluss.title,
      titleAccent: home.abschluss.titleAccent,
      body: home.abschluss.body,
      cta: home.abschluss.cta,
    },
    footer: {
      tagline: home.footer.tagline,
      email: home.footer.email,
      phone: home.footer.phone,
      legal: [
        { label: "Impressum", href: "#" },
        { label: "Datenschutz", href: "#" },
        { label: "Cookie-Einstellungen", href: "#" },
      ],
    },
  };
}

export type SiteContent = ReturnType<typeof buildContent>;

/** Statische Standard-Inhalte (aus der committeten JSON). */
export const defaultContent: SiteContent = buildContent(homeJson as HomeData);

/* Benannte Einzel-Exporte (statisch) — für Komponenten, die keine reaktiven
   Inhalte brauchen (z. B. nur `nav` oder `ROMAN`), sowie als Fallback. */
export const brand = defaultContent.brand;
export { nav, ROMAN, time };
export const hero = defaultContent.hero;
export const media = defaultContent.media;
export const person = defaultContent.person;
export const meta = defaultContent.meta;
export const prozess = defaultContent.prozess;
export const haltung = defaultContent.haltung;
export const angebot = defaultContent.angebot;
export const ablauf = defaultContent.ablauf;
export const fuerWen = defaultContent.fuerWen;
export const vertrauen = defaultContent.vertrauen;
export const abschluss = defaultContent.abschluss;
export const footer = defaultContent.footer;
