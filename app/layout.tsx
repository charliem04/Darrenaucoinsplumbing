import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
// Barlow, self-hosted — see the type note in globals.css for why.
// Only the weights the page uses: text 400/500/600, display 500/600/700.
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-semi-condensed/500.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "./globals.css";
import { client } from "@/client.config";
import { withPhone } from "@/lib/phone";
import { PhotoTunerMount } from "@/components/PhotoTunerMount";

export const metadata: Metadata = {
  metadataBase: new URL(client.siteUrl),
  title: client.metaTitle,
  applicationName: client.businessName,
  description: withPhone(client.metaDescription),
  keywords: [...client.metaKeywords],
  authors: [{ name: client.businessName }],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: client.businessName,
    locale: "en_US",
    title: client.ogTitle,
    description: withPhone(client.ogDescription),
    images: [{ url: client.ogImagePath, width: 1200, height: 630, alt: client.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: client.ogTitle,
    description: withPhone(client.ogDescription),
    images: [client.ogImagePath],
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  other: {
    "geo.region": `US-${client.address.region}`,
    "geo.placename": client.address.city,
  },
};

export const viewport: Viewport = {
  themeColor: client.themeColor,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        {/*
          Scroll reveals server-render their hidden state inline. Without
          JavaScript nothing would ever un-hide them, so this puts the
          content back. Static and ours — see scripts/csp.mjs.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: "[data-reveal]{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <body>
        {children}
        {/* Local photo tuner — `npm run tune` only; absent from production builds. */}
        <PhotoTunerMount />
      </body>
    </html>
  );
}
