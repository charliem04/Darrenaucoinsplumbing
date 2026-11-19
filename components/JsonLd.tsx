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
import { phoneDashed, withPhone } from "@/lib/phone";

function ld(data: object) {
  // `<` escaped so a string can never close the <script> element.
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function JsonLd() {
  const url = `${client.siteUrl}/`;
  const abs = (path: string) => `${client.siteUrl}${path}`;
  const ids = { business: `${url}#business`, website: `${url}#website`, page: `${url}#webpage` };

  // The site itself, and the one page on it, both pointing at the business.
  const website = {
    "@type": "WebSite",
    "@id": ids.website,
    url,
    name: client.businessName,
    inLanguage: "en-US",
    publisher: { "@id": ids.business },
  };
  const page = {
    "@type": "WebPage",
    "@id": ids.page,
    url,
    name: client.metaTitle,
    description: withPhone(client.metaDescription),
    inLanguage: "en-US",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.business },
    primaryImageOfPage: { "@type": "ImageObject", url: abs("/images/hero.webp") },
  };

  const business = {
    "@type": "Plumber",
    "@id": ids.business,
    name: client.businessName,
    legalName: client.legalName,
    // Real photos of the trucks and the work, the share image first.
    image: [client.ogImagePath, "/images/hero.webp", "/images/septic-tank-pump-out.webp", "/images/equipment.webp"].map(abs),
    logo: abs("/logo.png"),
    url,
    ...(client.socials.googleMaps ? { hasMap: client.socials.googleMaps } : {}),
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
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    isPartOf: { "@id": ids.page },
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // One graph, so search engines see these as one business, site and page.
  const graph = { "@context": "https://schema.org", "@graph": [business, website, page, faqPage] };

  return <script type="application/ld+json" dangerouslySetInnerHTML={ld(graph)} />;
}
