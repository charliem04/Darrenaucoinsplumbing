/**
 * ════════════════════════════════════════════════════════════════════
 *  CONTACT SUBMIT — where a lead actually goes.
 *
 *  Today: Web3Forms. Later: Haptic Forms, when it is finished.
 *  Swapping providers must be a one-line change here (PROVIDER below)
 *  plus an env var. Nothing in components/ knows which provider is in
 *  use — the form calls submitContact() and renders what comes back.
 *
 *  Straight to the provider from the browser. No server, no Worker, no
 *  relay: Web3Forms refuses server-side calls on its free plan. What is
 *  sent is decided in lib/formRules.ts — validated, cleaned of control
 *  characters, and serialized from a fixed list of keys.
 *
 *  ── ABOUT THE ACCESS KEY ────────────────────────────────────────────
 *
 *  NEXT_PUBLIC_WEB3FORMS_KEY ships in the JavaScript this page
 *  downloads. That is by design on Web3Forms' side: the key names a
 *  destination inbox and grants no account access. Publishable is not
 *  private, though — if it starts drawing spam, rotate it from the
 *  Web3Forms dashboard.
 *
 *  ── FAILURE IS LOUD ─────────────────────────────────────────────────
 *
 *  A form that silently drops a lead behind a success message is the
 *  worst bug this site can have. Unconfigured, rejected, or offline:
 *  every one of those returns ok:false with a message that tells the
 *  visitor to call. The ONLY path that reports success without sending
 *  is the honeypot, and that is the point of a honeypot.
 * ════════════════════════════════════════════════════════════════════
 */
import { client } from "@/client.config";
import type { SerializedContact } from "@/lib/formRules";
import { withPhone } from "@/lib/phone";

export type FormProvider = "web3forms" | "hapticforms";

/** ← The one line to change when Haptic Forms is ready. */
const PROVIDER: FormProvider = "web3forms";

export type ContactPayload = {
  /** Validated and built by serializeContact() in lib/formRules.ts. */
  fields: SerializedContact;
  /**
   * Honeypot — must be empty; bots fill it. See the field's markup in
   * components/ContactForm.tsx for why it is named what it is.
   */
  referralNote: string;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

/** Whether this build has anywhere to send a lead. */
export function contactConfigured(): boolean {
  switch (PROVIDER) {
    case "web3forms":
      return WEB3FORMS_KEY.length > 0;
    case "hapticforms":
      return false;
  }
}

const NOT_SENT = () => withPhone(client.form.errors.notSent);
const NETWORK = () => withPhone(client.form.errors.network);

export async function submitContact({ fields, referralNote }: ContactPayload): Promise<SubmitResult> {
  /*
   * Honeypot: report success so bots don't learn they were caught, but
   * send nothing.
   *
   * This is the one path that discards a submission without telling
   * anybody, so a false positive here — a real lead thrown away behind
   * a green tick — is the most expensive bug on the site. It says so in
   * development, where somebody is watching; never in production, where
   * the silence is the mechanism.
   */
  if (referralNote) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[contact] honeypot field is not empty — this submission was DISCARDED. " +
          "If you did not type in it, something (autofill, a password manager, " +
          "an extension) is filling it. That is a bug, not a caught bot."
      );
    }
    return { ok: true };
  }

  switch (PROVIDER) {
    case "web3forms":
      return sendWeb3Forms(fields);
    case "hapticforms":
      // Not built yet. Fail loudly rather than pretend.
      console.error("[contact] PROVIDER is hapticforms, which is not implemented yet.");
      return { ok: false, error: NOT_SENT() };
  }
}

async function sendWeb3Forms(fields: SerializedContact): Promise<SubmitResult> {
  if (!WEB3FORMS_KEY) {
    // The old site posted with an undefined key and showed whatever
    // came back. Unconfigured is a deploy bug; say so, and send the
    // visitor to the phone.
    console.error("[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set — this submission was NOT delivered.");
    return { ok: false, error: NOT_SENT() };
  }

  // Every key spelled out: the request carries these and nothing else.
  const body = {
    access_key: WEB3FORMS_KEY,
    subject: client.form.emailSubject.replace("{name}", fields.name).replace("{urgency}", fields.urgency),
    from_name: client.form.emailFromName,
    // Web3Forms' own server-side honeypot field. Always false from this
    // page (a filled honeypot never gets this far).
    botcheck: false,
    // Web3Forms uses `email` as the reply-to, so replying to the
    // notification reaches the customer.
    name: fields.name,
    email: fields.email,
    phone: fields.phone,
    service: fields.service,
    urgency: fields.urgency,
    message: fields.message,
  };

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
      // No cookies, and no following a redirect somewhere else.
      credentials: "omit",
      redirect: "error",
    });

    // Web3Forms answers 200 with {success:false} for its own rejections
    // (bad key, spam heuristics, failed captcha), so the status alone is
    // not the answer.
    const data = await res.json().catch(() => null);
    if (!res.ok || !data || data.success !== true) {
      console.error("[contact] Web3Forms rejected the submission:", data?.message ?? res.status);
      return { ok: false, error: NOT_SENT() };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: NETWORK() };
  }
}
