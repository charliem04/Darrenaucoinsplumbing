/**
 * ════════════════════════════════════════════════════════════════════
 *  CLIENT CONFIG — the ONLY file you should need to edit per client
 *  (plus swapping images in /public/images and setting .env.local).
 *
 *  Every component reads from this file. If you find yourself editing
 *  a component to change a business fact or a line of copy, that fact
 *  belongs here. List-shaped content — services, FAQs, testimonials,
 *  stats — lives in content/ instead, typed in content/types.ts.
 *
 *  Currently configured for: Darren Aucoin's Plumbing LLC.
 *
 *  Every string below was moved, not retyped, from the Figma Make
 *  export it replaces (src/app/components/InteractiveHomeDesktop.tsx).
 *  Items marked TODO(charlie) are business facts that were ambiguous or
 *  contradictory in the old code and need confirming with the client.
 * ════════════════════════════════════════════════════════════════════
 */

export const client = {
  // ── Identity ──────────────────────────────────────────────────────
  businessName: "Darren Aucoin's Plumbing",
  /** Used in the footer copyright line and the privacy notice. */
  legalName: "Darren Aucoin's Plumbing LLC",
  /** First year in the footer's copyright line. */
  copyrightYear: 2025,

  // ── Domain / SEO ──────────────────────────────────────────────────
  /**
   * No trailing slash.
   *
   * TODO(charlie): the old site disagrees with itself about the domain.
   * The live site, its canonical tag and its JSON-LD use
   * darrenaucoinsplumbing.com (with the "s"); its robots.txt sitemap
   * line and the rebuild brief use darrenaucoinplumbing.com. The value
   * here is the one actually serving the site today. If both domains are
   * owned, one should redirect to the other.
   */
  siteUrl: "https://darrenaucoinsplumbing.com",
  metaTitle: "Darren Aucoin's Plumbing | Lafayette, LA Plumbing Services",
  /** `{phone}` in any string in this file is filled from `phone` below. */
  metaDescription:
    "Trusted plumbing services in Lafayette, Louisiana. Emergency repairs, sewer work, hydro-jetting, excavation, and water meter installation. Call {phone}.",
  metaKeywords: [
    "plumber Lafayette LA",
    "emergency plumber Louisiana",
    "sewer repair Lafayette",
    "hydro jetting",
    "water meter installation Lafayette",
    "Acadiana plumbing",
  ],
  /** The business description in the JSON-LD (search engines only). */
  schemaDescription:
    "Trusted plumbing services in Lafayette, Louisiana. Emergency repairs, sewer work, hydro-jetting, excavation, water heater installation, gas lines, and backflow testing.",
  ogTitle: "Darren Aucoin's Plumbing | Lafayette, LA",
  ogDescription:
    "Fast, honest plumbing in Lafayette, LA. 24/7 emergency service. Call {phone}.",
  ogImagePath: "/og-image.jpg",
  /** Read aloud / shown when the share image can't load. */
  ogImageAlt: "Darren Aucoin's Plumbing — Lafayette, LA",
  /** Browser UI tint on mobile — the nav bar's colour. */
  themeColor: "#002336",

  // ── Contact ───────────────────────────────────────────────────────
  /**
   * The one number on the site. Every visible number, every tel: link
   * and the JSON-LD telephone are derived from this pair in lib/phone.ts
   * — change it here and nothing else needs touching. The build fails
   * if the two disagree, so a half-edited number cannot ship.
   */
  phone: "337-224-4852",
  phoneE164: "+13372244852", // E.164, used for tel: links and schema

  /**
   * TODO(charlie): three different addresses appear in the old code.
   *   · the Email card's mailto: sends to contact@darrenaucoinplumbing.com
   *     (no "s") — this is `email`, the address mail actually goes to;
   *   · the Email card's visible text reads darrenaucoinsplumbing@gmail.com
   *     — kept as `emailDisplay` so the page looks as it does today;
   *   · the old JSON-LD listed contact@darrenaucoinsplumbing.com.
   * A visitor who copies the text gets a different inbox from one who
   * clicks it. Pick one with the client and set both fields to it.
   */
  email: "contact@darrenaucoinplumbing.com",
  emailDisplay: "darrenaucoinsplumbing@gmail.com",

  address: {
    city: "Lafayette",
    region: "LA",
    regionName: "Louisiana",
    postalCode: "70501",
    country: "US",
  },
  /** From the old JSON-LD. Used for schema only — no map on the page. */
  geo: { latitude: 30.2241, longitude: -92.0198 },

  /**
   * Opening hours, for schema only. Carried over from the old JSON-LD.
   *
   * TODO(charlie): the old schema claims weekdays 7am–6pm and weekends
   * "24/7 emergency service", while the call card says "available 24/7"
   * and the FAQ says routine work is Monday–Friday. Confirm the real
   * hours before Google shows them.
   */
  hours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      days: ["Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
      description: "24/7 emergency service",
    },
  ],

  /** Towns named in the old JSON-LD's areaServed. Schema only. */
  serviceAreas: ["Lafayette", "Broussard", "Youngsville", "Scott", "Carencro", "Duson"],
  serviceRegion: "Acadiana",

  // ── Socials (empty string hides the link) ─────────────────────────
  socials: {
    facebook:
      "https://www.facebook.com/people/Darren-Aucoins-Plumbing-LLC/100049450522164/",
    googleMaps:
      "https://www.google.com/maps/place/Darren+Aucoin's+Plumbing+LLC/@30.2091376,-92.0395585,12z/data=!4m15!1m8!3m7!1s0x86249fc941552877:0x1eeaeeaac671292e!2sDarren+Aucoin's+Plumbing+LLC!8m2!3d30.2091376!4d-92.0395585!10e1!16s%2Fg%2F11b880prx5!3m5!1s0x86249fc941552877:0x1eeaeeaac671292e!8m2!3d30.2091376!4d-92.0395585!16s%2Fg%2F11b880prx5?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D",
  },

  // ── Booking ───────────────────────────────────────────────────────
  /**
   * DA has no online scheduler. "none" renders no booking band; every
   * "Book" / "Schedule service" button scrolls to the contact form, as
   * it does today. Adding Cal.com later is this one value plus a URL —
   * the shape is here so that is a config change, not a rebuild.
   */
  booking: { provider: "none" } as
    | { provider: "none" }
    | { provider: "calcom"; url: string },

  // ── Navigation ────────────────────────────────────────────────────
  nav: {
    about: "About us",
    services: "Services",
    testimonials: "Testimonials",
    faq: "FAQ",
    contact: "Contact",
    call: "Call",
    /**
     * Was "Book" — but there is no booking system behind it; it opens
     * the request form. Named for what it does.
     */
    request: "Request service",
    /** First thing a keyboard user tabs to. */
    skip: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  // ── Hero ──────────────────────────────────────────────────────────
  // The availability line above the headline is callCard.body.
  hero: {
    headline: "Fast, Honest Plumbing When You Need it Most",
    body: "Darren Aucoin's Plumbing serves Lafayette and Acadiana with the expertise to handle everything from simple repairs to complex sewer work. We show up prepared, fix it right the first time, and keep our prices fair.",
    imageAlt: "Darren Aucoin's Plumbing service truck parked at the shop",
    /** Followed by the phone number on the button. */
    primaryCta: "Call",
    secondaryCta: "Request service",
  },

  // ── Services ──────────────────────────────────────────────────────
  // Tab and specialty content lives in content/services.ts.
  // `label` is the pipe-fitting label above each section heading.
  services: {
    label: "Services",
    heading: "What we handle",
    lede: "From burst pipes at midnight to sewer lines that need serious work, we've got the tools and know-how to get it done. Every job gets our full attention.",
    tabCta: "Request this service",
    /** Heads the teal rail: "7 services". */
    railLabel: "services",
    specialtyHeading: "Specialty services",
    specialtyHint: "Select a service to see what's included.",
    specialtyClose: "Close",
  },

  // ── About / Equipment ─────────────────────────────────────────────
  /** The band the "About us" links land on. */
  about: {
    label: "Equipment",
    heading: "Professional tools that make the difference",
    body: "We don't cut corners on equipment. Hydro-jetting systems, excavation capabilities, and diagnostic tools mean we solve problems instead of just patching them.",
    cta: "Request service",
    imageAlt: "Mini excavator digging a trench while a plumber lays new sewer pipe",
  },

  // ── Testimonials ──────────────────────────────────────────────────
  // Quotes live in content/testimonials.ts; figures in content/stats.ts
  // (shown in the strip under the hero).
  testimonials: {
    label: "Testimonials",
    heading: "What customers say",
    lede: "Trusted by Lafayette homeowners",
  },

  // ── FAQ ───────────────────────────────────────────────────────────
  // Questions live in content/faqs.ts.
  faq: {
    label: "FAQ",
    heading: "Common questions",
    lede: "Common questions about our services, pricing, and how we work",
    followUpHeading: "Still have questions?",
    followUpBody: "Reach out and we'll answer what you need to know.",
    cta: "Contact us",
  },

  // ── Contact ───────────────────────────────────────────────────────
  // The old CTA band's message now heads this section.
  contact: {
    label: "Contact",
    heading: "Ready for reliable plumbing",
    lede: "Call us now or schedule a time that works for you. We're here when you need us.",
    cards: {
      email: {
        title: "Email",
        desc: "Send us a message and we'll get back to you within one business day.",
      },
      phone: {
        title: "Phone",
        desc: "Call us for emergencies, estimates, or to schedule your service appointment.",
      },
      office: {
        title: "Office",
        desc: "Visit us in Lafayette during business hours or call ahead to schedule a time.",
      },
    },
    formHeading: "Request a Service",
    formLede: "Fill out the form below and we'll get back to you as soon as possible.",
  },

  // ── The request form ──────────────────────────────────────────────
  form: {
    labels: {
      name: "Name *",
      email: "Email *",
      phone: "Phone *",
      service: "Service Needed *",
      urgency: "When do you need service? *",
      message: "Additional Details (Optional)",
    },
    placeholders: {
      name: "Your full name",
      email: "your@email.com",
      // The phone placeholder is the business's own number, formatted —
      // see lib/phone.ts. Not set here so it cannot drift from `phone`.
      service: "Select a service...",
      urgency: "Select urgency...",
      message: "Tell us more about your plumbing issue...",
    },
    /**
     * The dropdowns, and also the allow-list the submit handler checks
     * against — one list, so an option cannot be offered and then
     * rejected.
     *
     * (On the old site they were two lists, and they had drifted: five
     * of these services — backflow, camera inspection, gas lines, new
     * construction, water heaters — were in the dropdown but missing
     * from the allow-list, so choosing one failed with "Invalid
     * selection" and the lead was lost.)
     */
    serviceOptions: [
      "Backflow services",
      "Camera sewer line inspection",
      "Emergency",
      "Excavation",
      "Gas lines",
      "Hydro-jetting",
      "New construction",
      "Repairs",
      "Residential",
      "Sewer work",
      "Water heaters",
      "Water meter installation",
    ],
    urgencyOptions: [
      "Emergency - ASAP",
      "Within 24 hours",
      "Within this week",
      "Within this month",
      "Just planning ahead",
    ],
    submit: "Submit Request",
    sending: "Sending…",
    /** `{phone}` is replaced with the formatted business number. */
    success:
      "Thanks — we got your request and will be in touch soon. For emergencies, call {phone}.",
    errors: {
      rateLimited: "Please wait a few seconds before submitting again.",
      invalidEmail: "Please enter a valid email address.",
      invalidSelection: "Invalid selection. Please refresh the page and try again.",
      /** Unconfigured, rejected, or any other failure where nothing was sent. */
      notSent: "We couldn't send that. Please call us at {phone} — we don't want to lose your request.",
      network: "Network error. Please call us at {phone}.",
    },
    /** Subject and sender name on the notification email the office gets. */
    emailSubject: "New service request from {name} ({urgency})",
    emailFromName: "Darren Aucoin's Plumbing Website",
    emptyMessage: "No additional details provided.",
  },

  // ── Call card (the popup the Call buttons open on desktop) ────────
  callCard: {
    heading: "Call Us Now",
    body: "We're available 24/7 for emergency plumbing services",
    copy: "Copy number",
    copied: "Copied",
    close: "Close",
  },

  // ── Footer ────────────────────────────────────────────────────────
  footer: {
    logoAlt: "Darren Aucoin's Plumbing — Commercial & Residential",
    /** From the FAQ's answer on service area. */
    blurb: "Serving Lafayette and the surrounding Acadiana area.",
    navHeading: "Navigate",
    contactHeading: "Get in touch",
    links: {
      about: "About us",
      services: "Services",
      contact: "Contact",
      faq: "FAQ",
      testimonials: "Testimonials",
    },
    ctaHeading: "Need a plumber?",
    ctaBody: "Get a free estimate — no obligation.",
    cta: "Get a free estimate",
    privacy: "Privacy Policy",
    rights: "All rights reserved.",
  },
} as const;

export type ClientConfig = typeof client;
