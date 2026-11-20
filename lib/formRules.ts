/**
 * ════════════════════════════════════════════════════════════════════
 *  FORM RULES — what each answer box may contain, in one place.
 *
 *  The same rules run three times:
 *    1. as the visitor types (`filter`), so a box never holds a
 *       character it can't use — a phone box takes digits, not letters;
 *    2. on submit (`validateContact`), so a value that is the right
 *       characters but the wrong shape (9 digits, no "@") is refused
 *       with a message that says what to fix;
 *    3. in `serializeContact`, which builds the exact object that is
 *       sent, from an allow-list of keys, cleaned again. Nothing that
 *       bypassed the form's JavaScript gets through steps 1–2 for free.
 *
 *  None of this replaces a server. Web3Forms is the receiving end, and
 *  a bot posting straight to its API never runs this file. What it does
 *  guarantee is that everything THIS PAGE sends is clean and expected,
 *  and that a real visitor learns what's wrong before pressing send.
 * ════════════════════════════════════════════════════════════════════
 */
import { client } from "@/client.config";

const f = client.form;

export const LIMITS = { name: 100, email: 254, phone: 20, message: 2000 } as const;

/*
 * ── Control and invisible characters ─────────────────────────────────
 *
 *   \p{Cc}  C0/C1 controls: NUL, ESC, BEL, DEL… A newline in a name is
 *           the classic header-injection shape; the rest is garbage.
 *   \p{Cf}  "format" characters: zero-width spaces/joiners, BOM, and the
 *           bidi overrides (U+202A–202E, U+2066–2069) that can make an
 *           email display text in a different order from what it says.
 *   \p{Co}  private-use code points: no meaning outside one font.
 *   \p{Cs}  lone surrogate halves: invalid text from a broken paste.
 *   U+2028/2029 line/paragraph separators, which are not \n but break
 *           lines in some renderers.
 *
 * Stripping \p{Cf} also removes the zero-width joiner inside some
 * multi-part emoji, which then show as their parts. That is the price
 * of a message that reads the way it looks.
 */
const INVISIBLE = /[\p{Cf}\p{Co}\p{Cs}]/gu;
/** Whitespace-like controls (tab, vertical tab, form feed): become a space. */
const CONTROL_SPACE = /[\t\v\f]/g;
/** Every other control, except \n and \r, which are handled per mode: removed. */
// eslint-disable-next-line no-control-regex
const CONTROL_OTHER = /[\u0000-\u0008\u000e-\u001f\u007f-\u009f]/g;

/**
 * Strips control and invisible characters and normalises the text.
 * Single-line fields turn every line break into a space; `multiline`
 * keeps \n (all line-ending styles become \n) and caps blank runs at
 * one empty line.
 */
export function stripControl(value: string, multiline = false): string {
  const s = value
    .normalize("NFC")
    .replace(INVISIBLE, "")
    .replace(CONTROL_OTHER, "")
    .replace(CONTROL_SPACE, " ")
    .replace(/\r\n?|[\p{Zl}\p{Zp}]/gu, "\n");
  return multiline
    ? s.replace(/ {2,}/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n")
    : s.replace(/\s+/g, " ");
}

/** Final cleanup for sending: control chars out, trimmed, capped. */
export const clean = (value: string, max: number, multiline = false) =>
  stripControl(value, multiline).trim().slice(0, max);

/*
 * ── What each box accepts, as the visitor types ──────────────────────
 */

/** Letters (any language), accents, spaces, apostrophes, hyphens, periods. */
const NAME_DISALLOWED = /[^\p{L}\p{M} '’.-]/gu;
/** Digits and the punctuation people type in phone numbers. */
const PHONE_DISALLOWED = /[^0-9 +().-]/g;
/** No whitespace or angle brackets anywhere in an email address. */
const EMAIL_DISALLOWED = /[\s<>()[\]\\,;:"]/g;

export const filter = {
  name: (v: string) => stripControl(v).replace(NAME_DISALLOWED, "").replace(/ {2,}/g, " ").slice(0, LIMITS.name),
  email: (v: string) => stripControl(v).replace(EMAIL_DISALLOWED, "").slice(0, LIMITS.email),
  phone: (v: string) => stripControl(v).replace(PHONE_DISALLOWED, "").slice(0, LIMITS.phone),
  message: (v: string) => stripControl(v, true).slice(0, LIMITS.message),
};

/*
 * ── What each answer must look like on submit ────────────────────────
 */

/** local@domain.tld — no leading/trailing/double dots, a real-looking TLD. */
const EMAIL_SHAPE =
  /^(?!\.)(?!.*\.\.)[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}(?<!\.)@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;
/** Links and markup: a plumbing request has no use for either, and spam always does. */
const LINK_OR_MARKUP = /\b(?:https?:\/\/|www\.)|<[^>]*>|\[url/i;

/** A US number: 10 digits, or 11 with a leading 1. Returns the 10, or null. */
export function phoneDigits(v: string): string | null {
  const d = v.replace(/\D/g, "");
  if (d.length === 10) return d;
  if (d.length === 11 && d.startsWith("1")) return d.slice(1);
  return null;
}

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  service: string;
  urgency: string;
  message: string;
};

/** The first problem with the answers, as a message for the visitor, or null. */
export function validateContact(v: ContactFields): string | null {
  const name = clean(v.name, LIMITS.name);
  if ((name.match(/\p{L}/gu) ?? []).length < 2) return f.errors.invalidName;

  if (!EMAIL_SHAPE.test(clean(v.email, LIMITS.email))) return f.errors.invalidEmail;

  if (!phoneDigits(v.phone)) return f.errors.invalidPhone;

  if (
    !(f.serviceOptions as readonly string[]).includes(v.service) ||
    !(f.urgencyOptions as readonly string[]).includes(v.urgency)
  ) {
    return f.errors.invalidSelection;
  }

  if (LINK_OR_MARKUP.test(v.message)) return f.errors.noLinks;
  return null;
}

/**
 * The exact object that leaves the page: fixed keys in a fixed order,
 * every value cleaned again, the phone normalised to (337) 224-4852.
 * Built field by field — never by spreading form state — so nothing
 * extra can ride along. Call only after validateContact() passed.
 */
export function serializeContact(v: ContactFields) {
  const d = phoneDigits(v.phone) ?? "";
  return Object.freeze({
    name: clean(v.name, LIMITS.name),
    email: clean(v.email, LIMITS.email).toLowerCase(),
    phone: `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`,
    service: v.service,
    urgency: v.urgency,
    message: clean(v.message, LIMITS.message, true) || f.emptyMessage,
  });
}

export type SerializedContact = ReturnType<typeof serializeContact>;
