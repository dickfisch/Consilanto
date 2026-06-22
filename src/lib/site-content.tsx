"use client";

/**
 * Stellt die (im Editor live aktualisierten) Inhalte über React-Context bereit.
 *
 * Der Provider bekommt die Roh-Daten `home` — entweder statisch oder, im
 * TinaCMS-Editor, reaktiv aus `useTina`. Komponenten lesen die fertigen
 * Inhalte über `useSiteContent()`; `useTinaHome()` liefert die rohen,
 * von Tina „dekorierten" Daten (für `tinaField`-Klick-zum-Bearbeiten).
 */
import { createContext, useContext, type ReactNode } from "react";
import homeJson from "../../content/home/index.json";
import {
  buildContent,
  defaultContent,
  type HomeData,
  type SiteContent,
} from "./content";

type Ctx = { content: SiteContent; home: HomeData };

const SiteContentContext = createContext<Ctx>({
  content: defaultContent,
  home: homeJson as HomeData,
});

export function SiteContentProvider({
  home,
  children,
}: {
  home: HomeData;
  children: ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={{ content: buildContent(home), home }}>
      {children}
    </SiteContentContext.Provider>
  );
}

/** Fertige, von den Komponenten genutzte Inhalte (reaktiv im Editor). */
export function useSiteContent(): SiteContent {
  return useContext(SiteContentContext).content;
}

/** Rohe Tina-Daten (für `tinaField`-Markierungen in Phase 2b). */
export function useTinaHome(): HomeData {
  return useContext(SiteContentContext).home;
}
