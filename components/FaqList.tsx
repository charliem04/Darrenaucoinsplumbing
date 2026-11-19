"use client";

/**
 * FAQ: the questions as a list you can scan, each opening in place.
 * The first is open so the section never looks empty. Beside it, the
 * "still have questions" box with the phone number, so the answer to
 * an unanswered question is one tap away.
 *
 * Open/close animates grid-template-rows, never height.
 */
import { useState } from "react";
import { client } from "@/client.config";
import { faqs } from "@/content/faqs";
import { phoneDisplay } from "@/lib/phone";
import { Button } from "./Button";
import { ChevronDown } from "./Icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SectionHead } from "./SectionHead";

export function FaqList() {
  const f = client.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" ground="ground" labelledBy="faq-h">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          <SectionHead id="faq-h" label={f.label} heading={f.heading} lede={f.lede} />
          <Reveal className="hidden lg:flex flex-col gap-4 rounded border border-rule bg-white p-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-display font-semibold text-[1.25rem] text-ink">{f.followUpHeading}</h3>
              <p className="text-ink-2">{f.followUpBody}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" call icon>
                <span className="tabular">{phoneDisplay}</span>
              </Button>
              <Button variant="quiet" href="#contact">
                {f.cta}
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal as="dl" className="flex flex-col rounded border border-rule bg-white divide-y divide-rule">
          {faqs.map((faq, i) => {
            const on = open === i;
            return (
              <div key={faq.q}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="press group w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className={`font-display font-semibold text-[1.1875rem] leading-snug ${on ? "text-teal-dark" : "text-ink group-hover:text-teal-dark group-active:text-teal-dark"}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-200 ease-brand ${
                        on ? "rotate-180 border-teal bg-teal text-white" : "border-rule text-ink-2"
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-brand ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 -mt-1 text-[1.0625rem] leading-relaxed text-ink-2 max-w-[62ch]">{faq.a}</p>
                  </div>
                </dd>
              </div>
            );
          })}
        </Reveal>

        {/* Phones/tablets: the follow-up box under the list. */}
        <Reveal className="lg:hidden flex flex-col gap-4 rounded border border-rule bg-white p-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-display font-semibold text-[1.25rem] text-ink">{f.followUpHeading}</h3>
            <p className="text-ink-2">{f.followUpBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" call icon>
              <span className="tabular">{phoneDisplay}</span>
            </Button>
            <Button variant="quiet" href="#contact">
              {f.cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
