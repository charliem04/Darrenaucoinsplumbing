"use client";

/**
 * The service request form. What each box accepts and what gets sent
 * live in lib/formRules.ts; where it goes, in lib/submitContact.ts.
 * This file collects, runs the anti-spam checks, and tells the visitor
 * what happened — truthfully.
 */
import { useEffect, useRef, useState, type FormEvent } from "react";
import { client } from "@/client.config";
import { phoneDisplay, withPhone } from "@/lib/phone";
import { REQUEST_SERVICE_EVENT } from "@/lib/requestService";
import { filter, LIMITS, serializeContact, validateContact } from "@/lib/formRules";
import { canSend, recordSend } from "@/lib/rateLimit";
import { submitContact } from "@/lib/submitContact";
import { Check } from "./Icons";

const f = client.form;

const EMPTY = { name: "", email: "", phone: "", service: "", urgency: "", message: "" };
type Fields = typeof EMPTY;

/**
 * A person needs longer than this between the page loading and pressing
 * Submit; a script filling every field at once doesn't take it. Told to
 * try again rather than silently dropped, so a fast human loses nothing.
 */
const MIN_FILL_MS = 3_000;

/** Fields that only accept certain characters as they're typed. */
const FILTERED = { name: filter.name, email: filter.email, phone: filter.phone, message: filter.message } as const;

// 16px text in every field: anything smaller and iOS zooms the page on
// focus. The focus ring is the field's own border plus a soft halo,
// replacing the global outline (which would double up here).
const fieldCls =
  "w-full h-12 bg-white border border-rule rounded px-4 text-[1rem] text-ink placeholder:text-ink-2/60 outline-none transition-[border-color,box-shadow] duration-150 hover:border-ink/30 focus-visible:outline-none focus:border-teal focus:shadow-[0_0_0_3px_rgb(11_132_131/0.18)]";
const selectCls = `${fieldCls} appearance-none cursor-pointer bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234A5B66' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-[length:18px] bg-[right_0.875rem_center] bg-no-repeat pr-10`;
const labelCls = "font-body font-semibold text-[0.9375rem] text-ink";

export function ContactForm() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const shownAt = useRef(0);
  // Until the page's JavaScript is running, Submit is disabled: a click
  // before then would be a plain browser submit that skips every check.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    shownAt.current = Date.now();
    setReady(true);
  }, []);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const raw = e.target.value;
    const value = k in FILTERED ? FILTERED[k as keyof typeof FILTERED](raw) : raw;
    setForm((prev) => ({ ...prev, [k]: value }));
    // The "we got it" message stays until the visitor starts another request.
    setState((s) => (s === "success" ? "idle" : s));
  };

  // "Request this service" anywhere on the page pre-selects it here —
  // only if it is a real option, so the dropdown never holds a value
  // the submit check would refuse. See lib/requestService.ts.
  useEffect(() => {
    const onRequest = (e: Event) => {
      const service = (e as CustomEvent<string>).detail;
      if ((f.serviceOptions as readonly string[]).includes(service)) {
        setForm((prev) => ({ ...prev, service }));
      }
    };
    window.addEventListener(REQUEST_SERVICE_EVENT, onRequest);
    return () => window.removeEventListener(REQUEST_SERVICE_EVENT, onRequest);
  }, []);

  const fail = (msg: string) => {
    setState("error");
    setError(withPhone(msg));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (state === "sending") return;
    const now = Date.now();

    // Native `required` stops an empty submit in any real browser; this
    // is the same check for anything that bypasses it.
    if (!(form.name && form.email && form.phone && form.service && form.urgency)) return;

    // Each answer is the shape it should be. The dropdowns and this
    // check read the same lists, so an option is never offered and then
    // refused.
    const problem = validateContact(form);
    if (problem) return fail(problem);

    // Anti-spam, cheapest first.
    if (now - shownAt.current < MIN_FILL_MS) return fail(f.errors.tooFast);
    if (!canSend(now)) return fail(f.errors.rateLimited);

    recordSend(now);
    setState("sending");
    setError("");

    const result = await submitContact({
      fields: serializeContact(form),
      referralNote: honeypot.current?.value ?? "",
    });

    if (result.ok) {
      // No timer: someone who glanced away still sees it when they look back.
      setState("success");
      setForm(EMPTY);
    } else {
      fail(result.error);
    }
  }

  return (
    <form
      // POST, never the default GET: if a submit ever happens without
      // the JavaScript, the answers must not end up in the address bar,
      // browser history or server logs.
      method="post"
      onSubmit={onSubmit}
      className="relative w-full"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="cf-name" className={labelCls}>{f.labels.name}</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={LIMITS.name}
            value={form.name}
            onChange={set("name")}
            className={fieldCls}
            placeholder={f.placeholders.name}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-email" className={labelCls}>{f.labels.email}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            required
            maxLength={LIMITS.email}
            value={form.email}
            onChange={set("email")}
            className={fieldCls}
            placeholder={f.placeholders.email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-phone" className={labelCls}>{f.labels.phone}</label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={LIMITS.phone}
            value={form.phone}
            onChange={set("phone")}
            className={fieldCls}
            placeholder={phoneDisplay}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-service" className={labelCls}>{f.labels.service}</label>
          <select id="cf-service" name="service" required value={form.service} onChange={set("service")} className={selectCls}>
            <option value="">{f.placeholders.service}</option>
            {f.serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="cf-urgency" className={labelCls}>{f.labels.urgency}</label>
          <select id="cf-urgency" name="urgency" required value={form.urgency} onChange={set("urgency")} className={selectCls}>
            <option value="">{f.placeholders.urgency}</option>
            {f.urgencyOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="cf-message" className={labelCls}>{f.labels.message}</label>
          <textarea
            id="cf-message"
            name="message"
            maxLength={LIMITS.message}
            rows={4}
            value={form.message}
            onChange={set("message")}
            className={`${fieldCls} h-auto py-3 resize-y min-h-[7.5rem]`}
            placeholder={f.placeholders.message}
          />
        </div>

        {/*
          Honeypot. Humans never see or reach it; naive bots fill every
          field they find. If it has a value, submitContact() reports
          success and sends nothing.

          Named "referral_note" deliberately. Browser autofill and
          password managers fill fields whose name, id or label looks
          like name / email / phone / address / company — the old
          "botcheck" was safe, but anything plausible-sounding is not,
          and a honeypot that autofill fills silently throws away a real
          lead behind a green tick. Keep the name meaningless to them.

          Hidden by position, not display:none, because some bots skip
          display:none fields specifically.
        */}
        <div aria-hidden="true" className="absolute left-[-10000px] top-auto w-px h-px overflow-hidden">
          <label htmlFor="cf-referral">Leave this empty</label>
          <input
            ref={honeypot}
            id="cf-referral"
            name="referral_note"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {/* Sent: green, the page's "confirmed" colour. */}
        {state === "success" && (
          <div role="status" className="sm:col-span-2 flex gap-3 rounded border border-green/30 bg-green/[0.06] px-4 py-3 text-ink">
            <Check className="size-5 shrink-0 mt-0.5 text-green" />
            <span>{withPhone(f.success).replace(/^✓\s*/, "")}</span>
          </div>
        )}
        {/* Not sent: always says so, and always gives the phone number. */}
        {state === "error" && (
          <div role="alert" className="sm:col-span-2 rounded border border-danger/30 bg-danger/[0.06] px-4 py-3 text-danger-ink">
            {error}
          </div>
        )}

        <div className="sm:col-span-2 pt-1">
          <button
            type="submit"
            disabled={!ready || state === "sending"}
            aria-busy={state === "sending"}
            className="press w-full h-12 inline-flex items-center justify-center gap-2.5 rounded bg-teal font-body font-semibold text-[1.0625rem] text-white hover:bg-teal-dark active:bg-teal-dark disabled:cursor-progress disabled:bg-teal-dark"
          >
            {state === "sending" && (
              <span aria-hidden="true" className="size-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            )}
            {state === "sending" ? f.sending : f.submit}
          </button>
        </div>
      </div>
    </form>
  );
}
