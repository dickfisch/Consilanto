import { client } from "../../tina/__generated__/client";
import { HomeBody } from "@/components/home-body";

export default async function Home() {
  const res = await client.queries.home({ relativePath: "index.json" });
  return (
    <HomeBody query={res.query} variables={res.variables} data={res.data} />
  );
}
