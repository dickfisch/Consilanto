"use client";

/**
 * Client-Hülle der Startseite: verbindet die Inhalte über `useTina` mit dem
 * TinaCMS-Editor (Live-Vorschau) und stellt sie per Context bereit.
 * Ausserhalb des Editors verhält sie sich wie statisches Rendering.
 */
import type { CSSProperties } from "react";
import { useTina, tinaField } from "tinacms/dist/react";
import type { HomeQuery } from "../../tina/__generated__/types";
import { buildContent, type HomeData } from "@/lib/content";
import { SiteContentProvider } from "@/lib/site-content";

import { SiteHeader } from "@/components/site-header";
import { Hero, HeroIntro } from "@/components/hero";
import {
  PersonSection,
  MetaSection,
  HaltungSection,
  AngebotSection,
  FuerWenSection,
  VertrauenSection,
} from "@/components/sections";
import { ProcessScroll } from "@/components/process-scroll";
import { AblaufSection } from "@/components/ablauf-section";
import { ImageBand } from "@/components/image-band";
import { CtaSection } from "@/components/cta-section";

export function HomeBody(props: {
  query: string;
  variables: { relativePath: string };
  data: HomeQuery;
}) {
  const { data } = useTina(props);
  const home = data.home as unknown as HomeData;
  const content = buildContent(home);

  // Editierbare Textgrößen-Faktoren als CSS-Variablen (skalieren ganze
  // Textgruppen proportional; siehe .eyebrow/.body-copy/Headings in globals.css).
  const scaleStyle = {
    "--scale-heading": content.typeScale.headings,
    "--scale-body": content.typeScale.body,
    "--scale-eyebrow": content.typeScale.eyebrows,
  } as CSSProperties;

  return (
    <SiteContentProvider home={home}>
      <div style={scaleStyle}>
        <SiteHeader />
      <main>
        <Hero />
        <HeroIntro />
        <PersonSection />
        <MetaSection />
        <ProcessScroll />
        <HaltungSection />
        <ImageBand
          src={content.media.editorialImage}
          quote={content.brand.tagline}
          cite="Consilanto"
          srcField={tinaField(home.media, "editorialImage")}
          quoteField={tinaField(home.brand, "tagline")}
        />
        <AngebotSection />
        <AblaufSection />
        <FuerWenSection />
        <VertrauenSection />
        <CtaSection />
      </main>
      </div>
    </SiteContentProvider>
  );
}
