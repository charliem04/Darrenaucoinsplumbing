import type { Faq } from "./types";

/**
 * The FAQ band, in page order. Also emitted as FAQPage JSON-LD, so the
 * answers here are exactly what search results quote.
 */
export const faqs: Faq[] = [
  {
    q: "How fast can you respond?",
    a: "We aim for thirty minutes or less on emergency calls. During business hours, we typically schedule same-day or next-day service. If it's a true emergency at three in the morning, we answer the phone.",
  },
  {
    q: "Do you charge for estimates?",
    a: "No. We come out, assess the problem, explain what needs to be done, and give you a fair price before we start any work. No hidden fees, no surprises.",
  },
  {
    q: "Can you handle sewer work?",
    a: "Yes. We have the equipment and expertise for everything from simple cleanouts to complete line replacement. Sewer problems demand precision, and that's what we deliver.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve Lafayette and the surrounding Acadiana area. If you're not sure whether we reach your location, call us and we'll let you know straight.",
  },
  {
    q: "Do you work on weekends?",
    a: "We handle emergency calls seven days a week. For routine service, we work Monday through Friday, but we can often fit in weekend appointments if needed.",
  },
];
