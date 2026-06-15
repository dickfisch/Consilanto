/**
 * Zentrale Inhalte der Consilanto One-Pager.
 * Texte aus dem Konzept "Content_Consilanto_v01".
 * Interne Meta-Hinweise (Verweise auf die alte Website) wurden bewusst
 * weggelassen — hier steht nur kundengerichtete Copy.
 */

export const brand = {
  name: "Consilanto",
  tagline: "Unabhängige Honorarberatung für Menschen, die mehr wollen",
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
  tagline: "Unabhängige Honorarberatung",
  headline: "Luxus ist, die eigene Zukunft selbst zu gestalten.",
  /** Headline in Teilen — kursive Serif-Akzente im Stil der Referenz */
  headlineParts: [
    { text: "Luxus", italic: true },
    { text: " ist, die eigene " },
    { text: "Zukunft", italic: true },
    { text: " selbst zu gestalten." },
  ] as { text: string; italic?: boolean }[],
  body: "Bei Finanzen geht es immer auch um Zeit: um Chancen, den richtigen Moment und einen Weg, der langfristig trägt. Consilanto begleitet Sie persönlich dabei, finanzielle Klarheit zu schaffen und aus Ihren Zielen eine unabhängige Strategie zu entwickeln.",
  cta: "Erstgespräch anfragen",
};

export const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export const person = {
  id: "person",
  eyebrow: "Die Beratung",
  title:
    "Wer sich bei finanziellen Entscheidungen begleiten lässt, sollte wissen, mit wem.",
  intro: "Consilanto steht für eine Beratung, die nicht auf Distanz bleibt.",
  accents: [
    "Nicht anonym.",
    "Nicht austauschbar.",
    "Nicht von Vertriebslogiken geprägt.",
  ],
  body: [
    "Sondern persönlich, klar und mit einem echten Interesse an dem, was Sie erreichen möchten.",
    "Wer mit Consilanto arbeitet, sucht keinen Produktverkäufer. Sondern einen Gesprächspartner, der zuhört, einordnet, hinterfragt und gemeinsam mit Ihnen eine Richtung entwickelt, die zu Ihrem Leben passt.",
  ],
};

export const meta = {
  id: "metaebene",
  eyebrow: "Die Metaebene",
  title: "Es geht nicht nur um Geld. Es geht darum, wie Sie leben wollen.",
  intro: "Finanzen sind die Basis. Aber worum es eigentlich geht, ist größer:",
  accents: [
    "Um Entscheidungsfreiheit.",
    "Um Überblick.",
    "Um Prioritäten.",
    "Um den richtigen Zeitpunkt.",
    "Und um die Möglichkeit, die eigene Zukunft nicht dem Zufall zu überlassen.",
  ],
  body: [
    "Consilanto hilft Ihnen dabei, Ihre finanziellen Fragen so zu ordnen, dass daraus mehr entsteht als nur ein Plan: Klarheit, Struktur und eine belastbare Grundlage für die nächsten Schritte.",
  ],
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
  eyebrow: "Zeit als strategischer Faktor",
  headlineParts: [
    { text: "Zeit ist " },
    { text: "Strategie", italic: true },
  ] as { text: string; italic?: boolean }[],
  steps: [
    {
      label: "Was ist heute sinnvoll?",
      body: "Manche Entscheidungen entfalten ihre Wirkung erst über Jahre. Wir klären, was jetzt wirklich zählt.",
    },
    {
      label: "Was braucht Vorbereitung?",
      body: "Nicht alles muss sofort geschehen — aber vieles will rechtzeitig angelegt sein.",
    },
    {
      label: "Was sollte jetzt entschieden werden?",
      body: "Der richtige Moment eröffnet Chancen. Zu langes Warten kostet Möglichkeiten.",
    },
    {
      label: "Und was darf mit Ruhe wachsen?",
      body: "Vorausschauend geplant, arbeitet die Zeit für Sie — nicht gegen Sie.",
    },
  ],
};

export const haltung = {
  id: "haltung",
  eyebrow: "Honorarberatung als Haltung",
  title: "Honorarberatung ist hier kein Modell. Sie ist eine Haltung.",
  body: [
    "Unabhängige Beratung beginnt dort, wo Empfehlungen nicht von Provisionen, Verkaufszielen oder versteckten Anreizen beeinflusst werden. Beratung als Wissensdienstleistung im Interesse des Mandanten — nicht als verkleideter Vertrieb.",
    "Deshalb arbeitet Consilanto auf Honorarbasis. Weil eine gute Empfehlung nur dann ihren Wert entfaltet, wenn sie allein Ihrem Interesse verpflichtet ist.",
  ],
  pledges: [
    "Keine Provisionen.",
    "Keine Verkaufsagenda.",
    "Keine Beratung mit doppeltem Boden.",
  ],
};

export const angebot = {
  id: "angebot",
  eyebrow: "Mein Angebot",
  title: "Strategische Finanzberatung mit persönlicher Tiefe.",
  intro:
    "Im Mittelpunkt steht nicht das einzelne Produkt, sondern Ihre Gesamtsituation:",
  pillars: ["Ihre Ziele.", "Ihre Möglichkeiten.", "Ihre Verpflichtungen.", "Ihre Zukunft."],
  bridge:
    "Aus dieser Perspektive entsteht eine Beratung, die nicht isoliert denkt, sondern vernetzt:",
  themes: [
    { title: "Vermögensaufbau", note: "Struktur für langfristiges Wachstum." },
    { title: "Absicherung", note: "Risiken erkennen, bevor sie entstehen." },
    { title: "Altersvorsorge", note: "Heute die Weichen für später stellen." },
    { title: "Liquidität", note: "Handlungsfähig bleiben in jeder Phase." },
    { title: "Krankenversicherung", note: "Schutz, der zu Ihrem Leben passt." },
    {
      title: "Immobilien & Finanzierung",
      note: "Entscheidungen mit Tragweite begleiten.",
    },
  ],
  contrasts: [
    { from: "Das Ziel ist nicht mehr Komplexität.", to: "Sondern weniger Unsicherheit." },
    { from: "Nicht mehr Produkte.", to: "Sondern bessere Entscheidungen." },
  ],
};

export const ablauf = {
  id: "ablauf",
  eyebrow: "So arbeiten wir zusammen",
  /** Overlay-Headline mit kursiven Serif-Akzenten */
  headlineParts: [
    { text: "In drei Schritten zu Ihrer " },
    { text: "Strategie", italic: true },
  ] as { text: string; italic?: boolean }[],
  steps: [
    {
      title: "Erstgespräch",
      body: "Wir lernen uns kennen. Ich höre zu, verstehe Ihre Situation, Ihre Ziele und was Ihnen wirklich wichtig ist.",
      cta: "Erstgespräch anfragen",
      href: "#kontakt",
    },
    {
      title: "Analyse & Strategie",
      body: "Ich ordne Ihre Gesamtsituation und entwickle daraus eine unabhängige, auf Sie zugeschnittene Strategie.",
      cta: "Themen ansehen",
      href: "#angebot",
    },
    {
      title: "Begleitung",
      body: "Wir setzen die Schritte gemeinsam um — und ich begleite Sie langfristig, wenn sich Ihr Leben verändert.",
      cta: "Mehr über Consilanto",
      href: "#person",
    },
  ],
};

export const fuerWen = {
  id: "fuer-wen",
  eyebrow: "Für wen das richtig ist",
  title: "Diese Beratung ist nicht für jeden. Und genau das ist gewollt.",
  audience: [
    "Für Menschen, die Klarheit höher schätzen als schnelle Antworten.",
    "Für Menschen, die unabhängige Beratung wollen — und verstehen, warum sie dafür bezahlen.",
    "Für Menschen, die persönliche Zusammenarbeit suchen, statt sich durch anonyme Empfehlungen navigieren zu lassen.",
  ],
  body: "Wenn Sie nur ein Produkt suchen, sind Sie hier vermutlich nicht richtig. Wenn Sie einen unabhängigen Sparringspartner suchen, der strategisch mitdenkt und Verantwortung ernst nimmt, vielleicht schon.",
};

export const vertrauen = {
  id: "vertrauen",
  eyebrow: "Warum Menschen bleiben",
  title: "Vertrauen entsteht dort, wo Beratung nachvollziehbar wird.",
  lead: "Heute lässt sich das auf einen einfachen Punkt verdichten:",
  statements: [
    "Menschen bleiben dort, wo sie sich verstanden fühlen.",
    "Wo Beratung nicht drängt, sondern klärt.",
    "Und wo aus Komplexität eine Richtung wird.",
  ],
};

export const abschluss = {
  id: "kontakt",
  eyebrow: "Der nächste Schritt",
  title: "Ihre Zukunft verlangt keine Standardlösung.",
  titleAccent: "Sondern den richtigen Menschen an Ihrer Seite.",
  body: "Wenn Sie Ihre finanziellen Entscheidungen mit mehr Klarheit, besserem Timing und einer unabhängigen Strategie gestalten möchten, ist ein persönliches Gespräch mit Consilanto der richtige Anfang.",
  cta: "Jetzt Erstgespräch vereinbaren",
};

export const footer = {
  tagline: brand.tagline,
  email: "kontakt@consilanto.de",
  phone: "+49 (0) 000 000000",
  legal: [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "Cookie-Einstellungen", href: "#" },
  ],
};
