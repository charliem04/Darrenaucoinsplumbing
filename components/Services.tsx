"use client";

/**
 * "What we handle" + "Specialty services".
 *
 * Core services: one piece of state over content/services.ts, drawn
 * as a vertical list beside a detail panel at md+ (the old row of
 * seven tabs crushed to 54px-wide labels at tablet width), and as an
 * accordion on phones.
 *
 * Specialty services are laid out open, not behind accordions: they
 * are the services people search for by name (gas, backflow, water
 * heaters), so they should be readable at a glance. Credentials are
 * marked in green — the page's one meaning for green: verified.
 */
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/client.config";
import { serviceTabs, specialtyServices } from "@/content/services";
import type { ServiceTab } from "@/content/types";
import { dur, ease } from "@/lib/motion";
import { ArrowRight, Check, ChevronDown, PathIcon } from "./Icons";
import { RevealGroup, RevealItem } from "./Reveal";
import { Section } from "./Section";
import { SectionHead } from "./SectionHead";

const s = client.services;

function Photo({ tab, sizes }: { tab: ServiceTab; sizes: string }) {
  return (
    <Image
      alt={tab.photo.alt}
      src={tab.photo.src}
      fill
      sizes={sizes}
      className="object-cover"
      style={{ objectPosition: tab.objectPosition }}
    />
  );
}

function RequestLink() {
  return (
    <a
      href="#contact"
      className="press group inline-flex items-center gap-2 font-body font-semibold text-teal-dark hover:text-teal active:text-teal-dark rounded"
    >
      {s.tabCta}
      <ArrowRight className="size-[18px] transition-transform duration-150 ease-brand group-hover:translate-x-0.5" />
    </a>
  );
}

export function Services() {
  const [activeKey, setActiveKey] = useState(serviceTabs[0].key);
  const active = serviceTabs.find((t) => t.key === activeKey) ?? serviceTabs[0];

  // Warm the cache for every service photo so switching never flashes.
  useEffect(() => {
    for (const t of serviceTabs) {
      const img = new window.Image();
      img.src = t.photo.src;
    }
  }, []);

  return (
    <Section id="services" ground="ground" labelledBy="services-h">
      <div className="flex flex-col gap-12 md:gap-14">
        <SectionHead id="services-h" label={s.label} heading={s.heading} lede={s.lede} />

        {/* ── md+: list + panel ─────────────────────────────── */}
        <div className="hidden md:grid grid-cols-[13rem_1fr] lg:grid-cols-[16rem_1fr] gap-6 lg:gap-8 items-start">
          <div role="tablist" aria-orientation="vertical" aria-label={s.heading} className="flex flex-col">
            {serviceTabs.map((tab) => {
              const on = tab.key === activeKey;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  id={`tab-${tab.key}`}
                  aria-selected={on}
                  aria-controls="service-panel"
                  onClick={() => setActiveKey(tab.key)}
                  className={`press relative text-left h-12 pl-5 pr-3 rounded font-display font-semibold text-[1.0625rem] ${
                    on ? "text-ink bg-white" : "text-ink-2 hover:text-ink hover:bg-white/60 active:bg-white"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="service-indicator"
                      aria-hidden="true"
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-teal"
                      transition={{ type: "spring", stiffness: 500, damping: 42 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.key}`}
            className="relative bg-white rounded border border-rule overflow-hidden min-h-[26rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: dur.panel, ease: ease.out }}
                className="grid lg:grid-cols-[1fr_minmax(0,22rem)] h-full"
              >
                <div className="flex flex-col gap-4 p-7 lg:p-10 justify-center">
                  <p className="font-display font-semibold text-[0.9375rem] tracking-[0.04em] text-teal-dark">
                    {active.tagline}
                  </p>
                  <h3 className="font-display font-semibold text-d-3 text-ink text-balance">{active.title}</h3>
                  <p className="text-[1.0625rem] leading-relaxed text-ink-2 max-w-[52ch]">{active.description}</p>
                  <div className="pt-2">
                    <RequestLink />
                  </div>
                </div>
                <div className="relative hidden lg:block min-h-[26rem] bg-ground">
                  <Photo tab={active} sizes="22rem" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── phones: accordion ─────────────────────────────── */}
        <div className="md:hidden flex flex-col rounded border border-rule bg-white divide-y divide-rule overflow-hidden">
          {serviceTabs.map((tab) => {
            const on = tab.key === activeKey;
            return (
              <div key={tab.key}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`svc-${tab.key}`}
                  onClick={() => setActiveKey(tab.key)}
                  className="press w-full flex items-center justify-between gap-4 min-h-14 px-5 text-left"
                >
                  <span className={`font-display font-semibold text-[1.125rem] ${on ? "text-teal-dark" : "text-ink"}`}>
                    {tab.label}
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-200 ease-brand ${on ? "rotate-180 text-teal-dark" : "text-ink-2"}`}
                  />
                </button>
                {/* Height via grid rows — never animate height directly. */}
                <div
                  id={`svc-${tab.key}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-brand ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 px-5 pb-6">
                      <div className="relative aspect-[4/3] rounded overflow-hidden bg-ground">
                        <Photo tab={tab} sizes="calc(100vw - 40px)" />
                      </div>
                      <h3 className="font-display font-semibold text-[1.375rem] leading-tight text-ink">{tab.title}</h3>
                      <p className="leading-relaxed text-ink-2">{tab.description}</p>
                      <RequestLink />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Specialty services ───────────────────────────── */}
        <div className="flex flex-col gap-6 pt-4">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-4">
            <h3 className="font-display font-semibold text-d-3 text-ink">{s.specialtyHeading}</h3>
            <p className="font-display font-semibold text-[0.9375rem] tracking-[0.04em] text-ink-2">{s.specialtyLabel}</p>
          </div>
          <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {specialtyServices.map((svc, i) => (
              <RevealItem
                as="li"
                key={svc.key}
                index={i}
                className="flex flex-col gap-4 rounded border border-rule bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded bg-teal/10 text-teal-dark">
                    <PathIcon d={svc.icon} className="size-[22px]" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <h4 className="font-display font-semibold text-[1.1875rem] leading-tight text-ink">{svc.name}</h4>
                    {svc.badge ? (
                      <p className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-green">
                        <Check className="size-3.5" />
                        {svc.badge}
                      </p>
                    ) : (
                      <p className="text-[0.875rem] text-ink-2">{svc.meta}</p>
                    )}
                  </div>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-ink-2">{svc.description}</p>
                <ul className="mt-auto flex flex-col gap-2 border-t border-rule pt-4">
                  {svc.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[0.9375rem] text-ink">
                      <Check className="size-4 shrink-0 mt-[3px] text-teal" />
                      {b}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
