import type { ServiceTab, SpecialtyService } from "./types";

/**
 * ── "What we handle" — the tabbed panel ────────────────────────────
 * In tab order, left to right (top to bottom on phones). The first
 * entry is the one open on page load.
 *
 * TODO(charlie): the old code's tab type still listed "Hydro-jetting",
 * but the tab that actually renders in that slot is "Septic Solutions"
 * (with the hydro-jetting photo). Hydro-jetting now lives in the
 * specialty list below. Carried over as rendered — confirm septic
 * pump-outs are a service DA offers, and whether "Septic Solutions"
 * should be added to the contact form's service list (it is not there
 * today).
 */
export const serviceTabs: ServiceTab[] = [
  {
    key: "Emergency",
    label: "Emergency",
    tagline: "Emergency",
    title: "Water lines break at the worst times",
    description:
      "We answer the phone at three in the morning because that's when people need us. Fast response, fair price, problem solved.",
    photo: {
      src: "/images/emergency-water-line.jpg",
      alt: "Emergency",
      width: 473,
      height: 1024,
    },
  },
  {
    key: "Sewer work",
    label: "Sewer work",
    tagline: "Sewer work",
    title: "Professional sewer line services",
    description:
      "From simple cleanouts to complete line replacement, including camera sewer line inspection to pinpoint problems without guesswork. We have the equipment and expertise to handle any sewer issue with precision.",
    photo: {
      src: "/images/sewer-work.jpg",
      alt: "Sewer work",
      width: 768,
      height: 1024,
    },
  },
  {
    key: "Water meter installation",
    label: "Meter installation",
    tagline: "Water meter installation",
    title: "Professional water meter installation",
    description:
      "Licensed and certified to install water meters for residential and commercial properties. We ensure proper installation and compliance with all local regulations.",
    photo: {
      src: "/images/water-meter-installation.jpg",
      alt: "Water meter installation",
      width: 473,
      height: 1024,
    },
  },
  {
    key: "Excavation",
    label: "Excavation",
    tagline: "Excavation",
    title: "Complete excavation capabilities",
    description:
      "When repairs require digging, we have the equipment and expertise to get it done right, minimizing disruption to your property.",
    photo: {
      src: "/images/excavation.jpg",
      alt: "Excavation",
      width: 768,
      height: 1024,
    },
  },
  {
    key: "Residential",
    label: "Residential",
    tagline: "Residential",
    title: "Trusted residential plumbing",
    description:
      "From routine maintenance to major repairs, we treat your home with the care and respect it deserves.",
    photo: {
      src: "/images/residential-plumbing.jpg",
      alt: "Residential",
      width: 473,
      height: 1024,
    },
  },
  {
    key: "Repairs",
    label: "Repairs",
    tagline: "Repairs",
    title: "Expert plumbing repairs",
    description:
      "No job too big or small. We diagnose problems accurately and fix them right the first time.",
    photo: {
      src: "/images/plumbing-repairs.jpg",
      alt: "Repairs",
      width: 473,
      height: 1024,
    },
  },
  {
    key: "Septic Solutions",
    label: "Septic Solutions",
    tagline: "Septic Solutions",
    title: "Septic tank pump outs",
    description:
      "Routine septic tank pumping keeps your system running and prevents costly backups or drain field failure. Most tanks need service every 3–5 years; we'll inspect the tank while we're there and flag anything that needs attention.",
    photo: {
      src: "/images/septic-tank-pump-out.webp",
      alt: "Septic Solutions",
      width: 985,
      height: 455,
    },
    // The old markup applied object-right AND object-[center_60%] here;
    // object-right comes later in the live stylesheet, so it wins.
  },
];

/**
 * ── "Specialty services" — the accordion under the panel ───────────
 * `badge` is a credential claim (licensed / certified). Those are
 * carried over verbatim from the live site and must not be added to
 * without the client confirming the licence exists.
 */
export const specialtyServices: SpecialtyService[] = [
  {
    key: "construction",
    icon: "M3 21V8l9-5 9 5v13M3 21h18M9 21v-8h6v8",
    name: "New construction",
    meta: "Residential & commercial",
    description:
      "Full plumbing system installation for new builds — residential homes and commercial properties alike. We coordinate with general contractors from rough-in through final fixtures, working to code and to the timeline of the project.",
    bullets: [
      "Rough-in through finish installation",
      "Custom homes, multi-family, commercial",
      "GC coordination & inspection support",
    ],
  },
  {
    key: "camera",
    icon: "M23 7l-7 5 7 5V7zM14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z",
    name: "Camera sewer line inspection",
    meta: "Diagnose without digging",
    description:
      "High-resolution video inspection of sewer and drain lines. We see exactly what's happening underground — roots, breaks, bellies, blockages — so repairs are targeted instead of guessed at. Saves time, money, and your yard.",
    bullets: [
      "Pinpoint location of blockages & breaks",
      "Pre-purchase home inspections",
      "Recorded footage available",
    ],
  },
  {
    key: "hydrojetting",
    icon: "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z",
    name: "Hydro-jetting",
    meta: "Drain & pipe cleaning",
    description:
      "Our hydro-jetting systems use precisely controlled high-pressure water to clear even the toughest clogs and buildup from your pipes. It removes years of accumulated grease, scale, and debris, restores full flow capacity, and gives your plumbing a true deep clean that lasts far longer than traditional drain cleaning.",
    bullets: [
      "High-pressure pipe cleaning",
      "Removes grease, roots & scale",
      "Camera inspection included",
    ],
  },
  {
    key: "gas",
    icon: "M12 2c1 3 3 5 3 8a3 3 0 11-6 0c0-1 .5-2 1-3-2 2-4 5-4 8a6 6 0 1012 0c0-5-4-9-6-13z",
    name: "Gas lines",
    meta: "Licensed master gas fitter",
    // TODO(charlie): licence claim — confirm DA holds a master gas
    // fitter licence (and get the number if we want it on the page).
    badge: "Licensed master gas fitter",
    description:
      "Gas line work isn't something to leave to an unlicensed handyman. Our master gas fitters are trained, licensed, and permitted to install and repair natural gas and LP lines — for ranges, water heaters, generators, outdoor kitchens, and more.",
    bullets: [
      "New gas line installation",
      "Leak detection & repair",
      "Appliance hookups & code-compliant permits",
    ],
  },
  {
    key: "backflow",
    icon: "M7 16l-4-4m0 0l4-4m-4 4h18m-4 4l4-4m0 0l-4-4",
    name: "Backflow services",
    meta: "Certified installer & tester",
    // TODO(charlie): certification claim — confirm DA is a certified
    // backflow tester.
    badge: "Certified installer & tester",
    description:
      "Backflow preventers keep contaminated water from flowing back into your clean water supply. Most municipalities require annual testing by a certified tester — that's us. We install, repair, and test, and we file the paperwork with your water authority.",
    bullets: [
      "Backflow preventer installation",
      "Annual certification testing",
      "Repairs and replacements",
    ],
  },
  {
    key: "water-heater",
    icon: "M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M6.34 17.66l-1.41 1.41m12.73 0l-1.41-1.41M6.34 6.34L4.93 4.93M12 6a6 6 0 100 12 6 6 0 000-12z",
    name: "Water heaters",
    meta: "Tank & tankless install/repair",
    description:
      "From traditional tank units to high-efficiency tankless systems, we install, replace, and repair every type. Not getting hot water? Running out too fast? We'll diagnose the issue and walk you through your options — including upgrade paths that pay for themselves.",
    bullets: [
      "Tank & tankless installation",
      "Gas, electric, and hybrid units",
      "Repair, flushing, anode replacement",
    ],
  },
];
