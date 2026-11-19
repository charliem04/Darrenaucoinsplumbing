import type { MetadataRoute } from "next";
import { client } from "@/client.config";

export const dynamic = "force-static";

/**
 * Lets phones save the site to the home screen with the right name,
 * icon and colours (it opens as an ordinary browser tab).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: client.businessName,
    short_name: "DA Plumbing",
    description: client.ogDescription.replace("{phone}", client.phone),
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: client.themeColor,
    icons: [
      { src: "/logo.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
