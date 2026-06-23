import { defineConfig } from "tinacms";

// Branch, auf den TinaCloud schreibt (lokal/Vercel automatisch erkannt).
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Wiederverwendbares Feld für „Headline in Teilen" (Wörter mit kursivem
// Serif-Akzent). Wird im Hero, Prozess- und Ablauf-Bereich genutzt.
const headlineParts = {
  type: "object" as const,
  name: "headlineParts",
  label: "Überschrift (Teile)",
  list: true,
  ui: {
    itemProps: (item: { text?: string }) => ({ label: item?.text || "Teil" }),
  },
  fields: [
    { type: "string" as const, name: "text", label: "Text" },
    { type: "boolean" as const, name: "italic", label: "Kursiv (Serif-Akzent)" },
  ],
};

export default defineConfig({
  branch,
  // Werden für TinaCloud benötigt; lokal (Dev) bleiben sie leer.
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
      // Erlaubt Editoren das Hochladen/Ersetzen von Bildern/Videos im /admin.
      static: false,
    },
  },

  schema: {
    collections: [
      {
        name: "home",
        label: "Startseite",
        path: "content/home",
        format: "json",
        // Einzelseite: kein Anlegen/Löschen, nur Bearbeiten.
        // `router` → visueller Editor mit Live-Vorschau der Startseite ("/").
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/",
        },
        fields: [
          // --- SEO ---------------------------------------------------
          {
            type: "object",
            name: "seo",
            label: "SEO (Suchmaschinen & Social)",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Seitentitel (Browser-Tab & Google)",
              },
              {
                type: "string",
                name: "description",
                label: "Meta-Beschreibung (Google-Snippet)",
                ui: { component: "textarea" },
              },
              {
                type: "image",
                name: "shareImage",
                label: "Vorschaubild beim Teilen (Social/WhatsApp)",
              },
            ],
          },

          // --- Marke -------------------------------------------------
          {
            type: "object",
            name: "brand",
            label: "Marke",
            fields: [
              {
                type: "string",
                name: "tagline",
                label: "Claim / Tagline",
                ui: { component: "textarea" },
              },
            ],
          },

          // --- Hero --------------------------------------------------
          {
            type: "object",
            name: "hero",
            label: "Hero (Startbereich)",
            fields: [
              { type: "string", name: "tagline", label: "Eyebrow / Kleintext" },
              headlineParts,
              {
                type: "string",
                name: "body",
                label: "Einleitungstext",
                ui: { component: "textarea" },
              },
              { type: "string", name: "cta", label: "Button-Text" },
            ],
          },

          // --- Medien ------------------------------------------------
          {
            type: "object",
            name: "media",
            label: "Bilder & Video",
            fields: [
              { type: "image", name: "heroVideo", label: "Hero-Video (MP4)" },
              {
                type: "image",
                name: "editorialImage",
                label: "Editorial-Bild (Bild-Band & Hero-Poster)",
              },
              {
                type: "image",
                name: "ablaufImage",
                label: "Ablauf-Hintergrundbild (So arbeiten wir zusammen)",
              },
            ],
          },

          // --- Person / Die Beratung --------------------------------
          {
            type: "object",
            name: "person",
            label: "Die Beratung",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              { type: "string", name: "intro", label: "Intro" },
              { type: "string", name: "accents", label: "Akzent-Zeilen", list: true },
              {
                type: "string",
                name: "body",
                label: "Absätze",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },

          // --- Metaebene --------------------------------------------
          {
            type: "object",
            name: "meta",
            label: "Die Metaebene",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              { type: "string", name: "intro", label: "Intro" },
              { type: "string", name: "accents", label: "Akzent-Zeilen", list: true },
              {
                type: "string",
                name: "body",
                label: "Absätze",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },

          // --- Prozess / Zeit (Scroll) ------------------------------
          {
            type: "object",
            name: "prozess",
            label: "Zeit ist Strategie (Scroll-Bereich)",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              headlineParts,
              {
                type: "object",
                name: "steps",
                label: "Schritte",
                list: true,
                ui: {
                  itemProps: (item: { label?: string }) => ({
                    label: item?.label || "Schritt",
                  }),
                },
                fields: [
                  { type: "string", name: "label", label: "Frage / Titel" },
                  {
                    type: "string",
                    name: "body",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                ],
              },
            ],
          },

          // --- Haltung ----------------------------------------------
          {
            type: "object",
            name: "haltung",
            label: "Honorarberatung als Haltung",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "body",
                label: "Absätze",
                list: true,
                ui: { component: "textarea" },
              },
              { type: "string", name: "pledges", label: "Versprechen", list: true },
            ],
          },

          // --- Angebot ----------------------------------------------
          {
            type: "object",
            name: "angebot",
            label: "Mein Angebot",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              { type: "string", name: "intro", label: "Intro" },
              { type: "string", name: "pillars", label: "Säulen", list: true },
              {
                type: "string",
                name: "bridge",
                label: "Überleitung",
                ui: { component: "textarea" },
              },
              {
                type: "object",
                name: "themes",
                label: "Themen",
                list: true,
                ui: {
                  itemProps: (item: { title?: string }) => ({
                    label: item?.title || "Thema",
                  }),
                },
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  { type: "string", name: "note", label: "Beschreibung" },
                ],
              },
              {
                type: "object",
                name: "contrasts",
                label: "Kontraste (nicht … sondern …)",
                list: true,
                ui: {
                  itemProps: (item: { from?: string }) => ({
                    label: item?.from || "Kontrast",
                  }),
                },
                fields: [
                  { type: "string", name: "from", label: "Nicht …" },
                  { type: "string", name: "to", label: "Sondern …" },
                ],
              },
            ],
          },

          // --- Ablauf -----------------------------------------------
          {
            type: "object",
            name: "ablauf",
            label: "So arbeiten wir zusammen",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              headlineParts,
              {
                type: "object",
                name: "steps",
                label: "Schritte",
                list: true,
                ui: {
                  itemProps: (item: { title?: string }) => ({
                    label: item?.title || "Schritt",
                  }),
                },
                fields: [
                  { type: "string", name: "title", label: "Titel" },
                  {
                    type: "string",
                    name: "body",
                    label: "Text",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "cta", label: "Button-Text" },
                  { type: "string", name: "href", label: "Link-Ziel (Anker)" },
                ],
              },
            ],
          },

          // --- Für wen ----------------------------------------------
          {
            type: "object",
            name: "fuerWen",
            label: "Für wen das richtig ist",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "audience",
                label: "Zielgruppen-Zeilen",
                list: true,
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "body",
                label: "Abschlusstext",
                ui: { component: "textarea" },
              },
            ],
          },

          // --- Vertrauen --------------------------------------------
          {
            type: "object",
            name: "vertrauen",
            label: "Warum Menschen bleiben",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              { type: "string", name: "lead", label: "Lead" },
              {
                type: "string",
                name: "statements",
                label: "Aussagen",
                list: true,
                ui: { component: "textarea" },
              },
            ],
          },

          // --- Abschluss / Kontakt ----------------------------------
          {
            type: "object",
            name: "abschluss",
            label: "Der nächste Schritt (Abschluss)",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              {
                type: "string",
                name: "title",
                label: "Überschrift",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "titleAccent",
                label: "Überschrift-Akzent",
                ui: { component: "textarea" },
              },
              {
                type: "string",
                name: "body",
                label: "Text",
                ui: { component: "textarea" },
              },
              { type: "string", name: "cta", label: "Button-Text" },
            ],
          },

          // --- Footer -----------------------------------------------
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "string",
                name: "tagline",
                label: "Claim",
                ui: { component: "textarea" },
              },
              { type: "string", name: "email", label: "E-Mail" },
              { type: "string", name: "phone", label: "Telefon" },
            ],
          },
        ],
      },
    ],
  },
});
