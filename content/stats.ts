import type { Stat } from "./types";

/**
 * The track-record band. These are claims about the business — years,
 * fleet, response time, jobs — carried over unchanged from the live
 * site. Update them here only on the client's word.
 */
export const stats: Stat[] = [
  {
    label: "Years serving Acadiana",
    value: "15+",
    desc: "Experience handling everything from simple repairs to complex work",
  },
  {
    label: "Trucks ready to roll",
    value: "3",
    desc: "Fully equipped for residential and commercial plumbing needs",
  },
  {
    label: "Average response time",
    value: "30 min",
    desc: "We prioritize emergencies and get there when it matters most",
  },
  {
    label: "Homes we've served",
    value: "2000+",
    desc: "Families and businesses throughout Lafayette and surrounding areas",
  },
];
