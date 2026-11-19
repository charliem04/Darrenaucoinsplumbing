/**
 * Structured data for search: the business (as a Plumber, schema.org's
 * LocalBusiness subtype) and the FAQ. Built entirely from
 * client.config.ts and content/, so it cannot disagree with the page.
 *
 * The values are the old index.html's hand-written JSON-LD, moved into
 * config. Nothing here is interpolated from a URL, form or API — that
 * is what makes the dangerouslySetInnerHTML below safe (scripts/csp.mjs
 * relies on it).
 */
import { client } from "@/client.config";
import { faqs } from "@/content/faqs";
import { serviceTabs, specialtyServices } from "@/content/services";
import { phoneDashed } from "@/lib/phone";

function ld(data: object) {
  // `<` escaped so a string can never close the <script> element.
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function JsonLd() {
  const url = `${client.siteUrl}/`;
  const business = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${url}#business`,
    name: client.businessName,
    legalName: client.legalName,
    image: `${client.siteUrl}${client.ogImagePath}`,
    logo: `${client.siteUrl}/logo.png`,
    url,
    telephone: `+1-${phoneDashed}`,
    email: client.email,
    priceRange: "$$",
    description: client.schemaDescription,
    address: {
      "@type": "PostalAddress",
      addressLocality: client.address.city,
      addressRegion: client.address.region,
      postalCode: client.address.postalCode,
      addressCountry: client.address.country,
    },
    geo: { "@type": "GeoCoordinates", ...client.geo },
    areaServed: [
      ...client.serviceAreas.map((name) => ({ "@type": "City", name })),
      { "@type": "AdministrativeArea", name: client.serviceRegion },
    ],
    openingHoursSpecification: client.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
      ...("description" in h ? { description: h.description } : {}),
    })),
    sameAs: Object.values(client.socials).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing Services",
      itemListElement: [...serviceTabs.map((t) => t.tagline), ...specialtyServices.map((s) => s.name)].map(
        (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })
      ),
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(business)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={ld(faqPage)} />
    </>
  );
}
