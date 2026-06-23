import type { Metadata } from "next";
import { client } from "../../tina/__generated__/client";
import { HomeBody } from "@/components/home-body";

/**
 * SEO-Metadaten werden serverseitig aus den (über TinaCMS pflegbaren) Inhalten
 * erzeugt und landen so direkt im ausgelieferten HTML — von Google und
 * KI-Crawlern lesbar, ohne JavaScript. `title.absolute` umgeht die Title-
 * Vorlage aus dem Layout (sonst doppelter Marken-Suffix).
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.home({ relativePath: "index.json" });
  const seo = data.home.seo;
  return {
    title: seo?.title ? { absolute: seo.title } : undefined,
    description: seo?.description ?? undefined,
    openGraph: {
      title: seo?.title ?? undefined,
      description: seo?.description ?? undefined,
      images: seo?.shareImage ? [{ url: seo.shareImage }] : undefined,
    },
  };
}

export default async function Home() {
  const res = await client.queries.home({ relativePath: "index.json" });
  return (
    <HomeBody query={res.query} variables={res.variables} data={res.data} />
  );
}
