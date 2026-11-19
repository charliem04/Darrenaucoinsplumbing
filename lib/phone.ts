/**
 * ════════════════════════════════════════════════════════════════════
 *  THE PHONE NUMBER — one source, every format derived.
 *
 *  The old site typed the number out eleven times in three formats
 *  ("337-224-4852", "(337) 224-4852", "tel:337-224-4852"), across two
 *  components. Here `client.phone` is written once and everything else
 *  is computed from it, so changing the number in client.config.ts
 *  changes every number on the page, the tel: links, the schema and
 *  the form's error messages together.
 *
 *  `client.phoneE164` is the one deliberate duplicate — the brief asks
 *  for it in the config, and it is the form a reader can check at a
 *  glance. assertPhoneConsistent() fails the build if the two disagree,
 *  so a half-edited number cannot ship.
 * ════════════════════════════════════════════════════════════════════
 */
import { client } from "@/client.config";

const digits = (s: string) => s.replace(/\D/g, "");

/** Ten-digit NANP number, no country code. */
const local = digits(client.phone).replace(/^1(?=\d{10}$)/, "");

/** "337-224-4852" — the call card's big number. */
export const phoneDashed = client.phone;

/** "(337) 224-4852" — contact card, form placeholder, messages. */
export const phoneDisplay = `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6)}`;

/** "tel:+13372244852" */
export const phoneHref = `tel:${client.phoneE164}`;

/** Thrown at build time (module load) — loud, and before anything ships. */
function assertPhoneConsistent() {
  if (local.length !== 10) {
    throw new Error(
      `[client.config] phone "${client.phone}" is not a 10-digit US number.`
    );
  }
  if (digits(client.phoneE164) !== `1${local}`) {
    throw new Error(
      `[client.config] phone "${client.phone}" and phoneE164 "${client.phoneE164}" disagree. ` +
        `Update both — every tel: link uses phoneE164.`
    );
  }
}
assertPhoneConsistent();

/** Replace `{phone}` in a config string with the display number. */
export function withPhone(template: string): string {
  return template.replaceAll("{phone}", phoneDisplay);
}
