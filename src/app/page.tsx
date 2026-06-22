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
import { brand, media } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <HeroIntro />
        <PersonSection />
        <MetaSection />
        <ProcessScroll />
        <HaltungSection />
        <ImageBand
          src={media.editorialImage}
          quote={brand.tagline}
          cite="Consilanto"
        />
        <AngebotSection />
        <AblaufSection />
        <FuerWenSection />
        <VertrauenSection />
        <CtaSection />
      </main>
    </>
  );
}
