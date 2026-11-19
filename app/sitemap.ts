import type { MetadataRoute } from "next";
import { client } from "@/client.config";

export const dynamic = "force-static";

/** One indexable page. /privacy/ is noindex and the 404 is not a page. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${client.siteUrl}/`,
      // The build date: every deploy is a fresh build of the one page.
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
