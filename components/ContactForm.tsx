"use client";

/**
 * The service request form. Everything about where it goes lives in
 * lib/submitContact.ts; this file only collects, checks the obvious,
 * and tells the visitor what happened — truthfully.
 */
import { useRef, useState, type FormEvent } from "react";
import { client } from "@/client.config";
import { phoneDisplay, withPhone } from "@/lib/phone";
import { submitContact } from "@/lib/submitContact";

const f = client.form;

const EMPTY = { name: "", email: "", phone: "", service: "", urgency: "", message: "" };
type Fields = typeof EMPTY;

/** One submission per this many ms — carried from the old form. */
const RATE_LIMIT_MS = 10_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldCls =
  "bg-transparent border border-white/20 rounded-[8px] px-[16px] py-[12px] text-white placeholder-white/50 outline-none focus:border-teal transition-colors";
const selectCls =
  "bg-navy-bar border border-white/20 rounded-[8px] px-[16px] py-[12px] text-white outline-none focus:border-teal transition-colors cursor-pointer";
const labelCls = "font-body font-semibold text-[16px] text-white";

export function ContactForm() {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const lastSubmit = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const fail = (msg: string) => {
    setState("error");
    setError(msg);
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmit.current < RATE_LIMIT_MS) return fail(f.errors.rateLimited);

    // Native `required` stops an empty submit in any real browser; this
    // is the same check for anything that bypasses it.
    if (!(form.name && form.email && form.phone && form.service && form.urgency)) return;

    if (!EMAIL_RE.test(form.email.trim())) return fail(f.errors.invalidEmail);

    // The dropdowns and this check read the same list, so an option can
    // never be offered and then refused.
    if (
      !(f.serviceOptions as readonly string[]).includes(form.service) ||
      !(f.urgencyOptions as readonly string[]).includes(form.urgency)
    ) {
      return fail(f.errors.invalidSelection);
    }

    lastSubmit.current = now;
    setState("sending");
    setError("");

    const result = await submitContact({ ...form, referralNote: honeypot.current?.value ?? "" });

    if (result.ok) {
      setState("success");
      setForm(EMPTY);
      setTimeout(() => setState("idle"), 6000);
    } else {
      fail(result.error);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-navy-bar border border-white/20 rounded-[16px] p-[24px] md:p-[48px] w-full"
    >
      <div className="flex flex-col gap-[24px] md:grid md:grid-cols-2 md:gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <label htmlFor="cf-name" className={labelCls}>{f.labels.name}</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={form.name}
            onChange={set("name")}
            className={fieldCls}
            placeholder={f.placeholders.name}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="cf-email" className={labelCls}>{f.labels.email}</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={form.email}
            onChange={set("email")}
            className={fieldCls}
            placeholder={f.placeholders.email}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="cf-phone" className={labelCls}>{f.labels.phone}</label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
            value={form.phone}
            onChange={set("phone")}
            className={fieldCls}
            placeholder={phoneDisplay}
          />
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="cf-service" className={labelCls}>{f.labels.service}</label>
          <select id="cf-service" name="service" required value={form.service} onChange={set("service")} className={selectCls}>
            <option value="">{f.placeholders.service}</option>
            {f.serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[8px]">
          <label htmlFor="cf-urgency" className={labelCls}>{f.labels.urgency}</label>
          <select id="cf-urgency" name="urgency" required value={form.urgency} onChange={set("urgency")} className={selectCls}>
            <option value="">{f.placeholders.urgency}</option>
            {f.urgencyOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[8px] md:col-span-2">
          <label htmlFor="cf-message" className={labelCls}>{f.labels.message}</label>
          <textarea
            id="cf-message"
            name="message"
            maxLength={2000}
            rows={4}
            value={form.message}
            onChange={set("message")}
            className={`${fieldCls} resize-none`}
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

        {state === "success" && (
          <div role="status" className="md:col-span-2 bg-teal/20 border border-teal rounded-[8px] px-[16px] py-[12px] text-white text-[16px]">
            {withPhone(f.success)}
          </div>
        )}
        {state === "error" && (
          <div role="alert" className="md:col-span-2 bg-red-900/40 border border-red-500 rounded-[8px] px-[16px] py-[12px] text-white text-[16px]">
            {error}
          </div>
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={state === "sending"}
            className="bg-blue w-full px-[24px] py-[12px] rounded-[12px] font-body font-medium text-[18px] text-white hover:bg-blue-press disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {state === "sending" ? f.sending : f.submit}
          </button>
        </div>
      </div>
    </form>
  );
}
