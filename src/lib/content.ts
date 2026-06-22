/**
 * Zentrale Inhalte der Consilanto One-Pager.
 *
 * Die redaktionell pflegbaren Texte/Bilder liegen in `content/home/index.json`
 * und werden über TinaCMS (Oberfläche unter /admin) bearbeitet. Diese Datei
 * setzt daraus die typisierten Objekte zusammen und ergänzt strukturelle,
 * nicht-redaktionelle Felder (IDs, Anker-Links, römische Ziffern).
 */
import home from "../../content/home/index.json";

type Part = { text: string; italic?: boolean };

export const brand = {
  name: "Consilanto",
  tagline: home.brand.tagline,
  advisor: "Consilanto",
};

export const nav = [
  { label: "Die Beratung", href: "#person" },
  { label: "Haltung", href: "#haltung" },
  { label: "Angebot", href: "#angebot" },
  { label: "Ablauf", href: "#ablauf" },
  { label: "Für wen", href: "#fuer-wen" },
  { label: "Kontakt", href: "#kontakt" },
];

export const hero = {
  tagline: home.hero.tagline,
  headline: "Luxus ist, die eigene Zukunft selbst zu gestalten.",
  /** Headline in Teilen — kursive Serif-Akzente im Stil der Referenz */
  headlineParts: home.hero.headlineParts as Part[],
  body: home.hero.body,
  cta: home.hero.cta,
};

/** Redaktionell pflegbare Medien (über /admin austauschbar). */
export const media = {
  heroVideo: home.media.heroVideo,
  editorialImage: home.media.editorialImage,
};

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export const person = {
  id: "person",
  eyebrow: home.person.eyebrow,
  title: home.person.title,
  intro: home.person.intro,
  accents: home.person.accents,
  body: home.person.body,
};

export const meta = {
  id: "metaebene",
  eyebrow: home.meta.eyebrow,
  title: home.meta.title,
  intro: home.meta.intro,
  accents: home.meta.accents,
  body: home.meta.body,
};

export const time = {
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

/** Scroll-Teller: Objekt bewegt sich on-scroll, Schritte wechseln durch. */
export const prozess = {
  id: "zeit",
  eyebrow: home.prozess.eyebrow,
  headlineParts: home.prozess.headlineParts as Part[],
  steps: home.prozess.steps,
};

export const haltung = {
  id: "haltung",
  eyebrow: home.haltung.eyebrow,
  title: home.haltung.title,
  body: home.haltung.body,
  pledges: home.haltung.pledges,
};

export const angebot = {
  id: "angebot",
  eyebrow: home.angebot.eyebrow,
  title: home.angebot.title,
  intro: home.angebot.intro,
  pillars: home.angebot.pillars,
  bridge: home.angebot.bridge,
  themes: home.angebot.themes,
  contrasts: home.angebot.contrasts,
};

export const ablauf = {
  id: "ablauf",
  eyebrow: home.ablauf.eyebrow,
  headlineParts: home.ablauf.headlineParts as Part[],
  steps: home.ablauf.steps,
};

export const fuerWen = {
  id: "fuer-wen",
  eyebrow: home.fuerWen.eyebrow,
  title: home.fuerWen.title,
  audience: home.fuerWen.audience,
  body: home.fuerWen.body,
};

export const vertrauen = {
  id: "vertrauen",
  eyebrow: home.vertrauen.eyebrow,
  title: home.vertrauen.title,
  lead: home.vertrauen.lead,
  statements: home.vertrauen.statements,
};

export const abschluss = {
  id: "kontakt",
  eyebrow: home.abschluss.eyebrow,
  title: home.abschluss.title,
  titleAccent: home.abschluss.titleAccent,
  body: home.abschluss.body,
  cta: home.abschluss.cta,
};

export const footer = {
  tagline: home.footer.tagline,
  email: home.footer.email,
  phone: home.footer.phone,
  legal: [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "Cookie-Einstellungen", href: "#" },
  ],
};
