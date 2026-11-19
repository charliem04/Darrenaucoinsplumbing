"use client";

/**
 * "What we handle" + "Specialty services".
 *
 * The service panel is one piece of state over one list
 * (content/services.ts), drawn two ways: a row of tabs with a sliding
 * panel at md and up, an accordion on phones. Same data, same active
 * tab — just the layout the live site used at each width.
 */
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import { client } from "@/client.config";
import { serviceTabs, specialtyServices } from "@/content/services";
import type { ServiceTab } from "@/content/types";
import { dur, spring } from "@/lib/motion";
import { Check } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

const s = client.services;

function TabPhoto({ tab, sizes }: { tab: ServiceTab; sizes: string }) {
  return (
    <Image
      alt={tab.photo.alt}
      src={tab.photo.src}
      fill
      sizes={sizes}
      className="object-cover pointer-events-none rounded-[16px]"
      style={{ objectPosition: tab.objectPosition }}
    />
  );
}

function LearnMore() {
  return (
    <a
      href="#contact"
      className="relative rounded-[12px] shrink-0 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
    >
      <span className="flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full">
        <span className="font-body font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
          {s.tabCta}
        </span>
      </span>
    </a>
  );
}

export function Services() {
  const [activeKey, setActiveKey] = useState(serviceTabs[0].key);
  const [openSpecialty, setOpenSpecialty] = useState<string | null>(null);
  const active = serviceTabs.find((t) => t.key === activeKey) ?? serviceTabs[0];

  // Warm the cache for every tab photo so switching never shows a gap
  // (the old site did the same).
  useEffect(() => {
    for (const t of serviceTabs) {
      const img = new window.Image();
      img.src = t.photo.src;
    }
  }, []);

  return (
    <section
      id="services"
      className="bg-gradient-to-b from-navy to-navy-deep relative shrink-0 w-full"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[260px] blur-[80px] bg-[radial-gradient(ellipse,rgba(11,132,131,0.16),transparent_70%)] md:w-[600px] md:h-[400px] md:blur-[120px] md:bg-[radial-gradient(ellipse,rgba(11,132,131,0.22),transparent_70%)]"
      />

      <div className="flex flex-col items-center justify-center overflow-clip size-full">
        <div className="flex flex-col items-center justify-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <SectionHead eyebrow={s.eyebrow} heading={s.heading} lede={s.lede} />

            <div className="bg-navy-bar relative rounded-[16px] shrink-0 w-full border border-white/20">
              <div className="flex flex-col isolate items-center justify-center overflow-clip relative rounded-[inherit] size-full">
                {/* ── md+: tabs ─────────────────────────────────── */}
                <div role="tablist" className="hidden md:flex h-[88px] isolate items-stretch relative shrink-0 w-full z-[2]">
                  {serviceTabs.map((tab, idx) => {
                    const on = tab.key === activeKey;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        aria-controls="service-panel"
                        onClick={() => setActiveKey(tab.key)}
                        className={`flex-1 min-w-0 relative cursor-pointer transition-all duration-300 flex items-center justify-center px-[12px] lg:px-[16px] ${
                          on ? "bg-teal/20 -translate-y-1" : "hover:bg-white/5"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute border-white/20 border-solid pointer-events-none ${on ? "border-r" : "border-r border-b"} ${
                            idx === 0 && on ? "inset-[0_-1px_0_0]" : "inset-[0_-1px_-1px_0]"
                          }`}
                        />
                        <span
                          className={`font-display font-medium leading-[1.2] relative text-center text-[16px] tracking-[-0.16px] lg:text-[20px] lg:tracking-[-0.2px] ${
                            on ? "text-teal" : "text-white"
                          }`}
                        >
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div id="service-panel" role="tabpanel" className="hidden md:block relative shrink-0 w-full z-[1] overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active.key}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -80, opacity: 0 }}
                      transition={spring.tabs}
                      className="flex gap-[80px] items-center p-[48px] relative w-full"
                    >
                      <div className="flex flex-[1_0_0] flex-col gap-[32px] items-start justify-center min-w-px relative">
                        <div className="flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                          <p className="font-body font-semibold leading-[1.5] not-italic text-[16px] text-white">
                            {active.tagline}
                          </p>
                          <div className="flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full">
                            <h3 className="font-display font-medium leading-[1.2] relative shrink-0 text-[44px] tracking-[-0.44px] w-full">
                              {active.title}
                            </h3>
                            <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">
                              {active.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-[24px] items-center relative shrink-0 w-full">
                          <LearnMore />
                        </div>
                      </div>
                      <div className="aspect-square flex-[1_0_0] min-w-px relative rounded-[16px]">
                        <TabPhoto tab={active} sizes="(min-width: 1408px) 552px, 40vw" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── phones: accordion ─────────────────────────── */}
                <div className="md:hidden w-full">
                  {serviceTabs.map((tab) => {
                    const on = tab.key === activeKey;
                    return (
                      <Fragment key={tab.key}>
                        <button
                          type="button"
                          aria-expanded={on}
                          onClick={() => setActiveKey(tab.key)}
                          className={`relative shrink-0 w-full border-b border-white/20 cursor-pointer transition-colors duration-200 ${
                            on ? "bg-teal/20" : "hover:bg-white/5"
                          }`}
                        >
                          <span className="flex items-center justify-between px-[32px] py-[24px] relative size-full">
                            <span
                              className={`font-display font-medium leading-[1.4] text-[18px] tracking-[-0.18px] transition-colors duration-200 ${
                                on ? "text-teal" : "text-white"
                              }`}
                            >
                              {tab.label}
                            </span>
                            <motion.svg
                              animate={{ rotate: on ? 180 : 0 }}
                              transition={{ duration: dur.accordion }}
                              className={`size-[20px] ${on ? "text-teal" : "text-white"}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {on && (
                            <motion.div
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ height: spring.accordion, opacity: { duration: 0.2 } }}
                              className="relative shrink-0 w-full border-b border-white/20 overflow-hidden"
                            >
                              <div className="flex flex-col gap-[48px] items-start p-[24px] relative w-full">
                                <div className="flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-full">
                                  <div className="flex flex-col gap-[20px] items-start relative shrink-0 text-white w-full">
                                    <h3 className="font-display font-medium leading-[1.2] relative shrink-0 text-[32px] tracking-[-0.32px] w-full">
                                      {tab.title}
                                    </h3>
                                    <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">
                                      {tab.description}
                                    </p>
                                  </div>
                                  <LearnMore />
                                </div>
                                <div className="aspect-square relative rounded-[16px] shrink-0 w-full">
                                  <TabPhoto tab={tab} sizes="calc(100vw - 90px)" />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Specialty services ───────────────────────────── */}
            <Reveal className="flex flex-col gap-[24px] items-center w-full mt-[24px]">
              <div className="flex flex-col gap-[6px] items-start w-full md:items-center md:w-auto">
                <p className="font-display font-medium text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-teal">
                  {s.specialtyEyebrow}
                </p>
                <h3 className="font-display font-medium text-[24px] tracking-[-0.24px] md:text-[28px] md:tracking-[-0.28px] text-white leading-[1.2]">
                  {s.specialtyHeading}
                </h3>
              </div>
              <div className="flex flex-col gap-[10px] md:gap-[12px] w-full md:max-w-[780px] mx-auto">
                {specialtyServices.map((svc) => {
                  const isOpen = openSpecialty === svc.key;
                  return (
                    <button
                      key={svc.key}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenSpecialty(isOpen ? null : svc.key)}
                      className={`block text-left rounded-[12px] border transition-all duration-300 overflow-hidden w-full ${
                        isOpen
                          ? "bg-teal/[0.12] border-teal/50"
                          : "bg-white/[0.02] border-white/[0.08] md:hover:bg-teal/[0.08] md:hover:border-teal/30"
                      }`}
                    >
                      <span className="flex gap-[12px] items-center p-[14px] md:p-[16px]">
                        <span
                          className={`shrink-0 size-[36px] md:size-[40px] rounded-[8px] flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? "bg-teal text-white shadow-[0_4px_12px_rgba(11,132,131,0.5)] ring-1 ring-white/[0.15]"
                              : "bg-teal/[0.18] text-mint"
                          }`}
                        >
                          <svg className="size-[18px] md:size-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                          </svg>
                        </span>
                        <span className="block flex-1 min-w-0">
                          <span className="block font-display font-medium text-[15px] md:text-[16px] text-white leading-[1.3]">
                            {svc.name}
                          </span>
                          <span className="block font-body font-normal text-[12px] md:text-[13px] text-white/[0.55] leading-[1.4] mt-[2px]">
                            {svc.meta}
                          </span>
                        </span>
                        <svg
                          className={`shrink-0 size-[18px] md:size-[20px] text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-mint" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.span
                            className="block"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: dur.accordion, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <span className="block px-[14px] pb-[16px] md:px-[16px] md:pb-[20px]">
                              <span className="block pt-[14px] md:pt-[16px] border-t border-white/10">
                                {svc.badge && (
                                  <span className="inline-block font-display font-medium text-[10px] md:text-[11px] tracking-[0.06em] uppercase text-mint bg-teal/[0.15] px-[8px] py-[4px] md:px-[10px] md:py-[5px] rounded-[6px] mb-[10px] md:mb-[12px]">
                                    {svc.badge}
                                  </span>
                                )}
                                <span className="block font-body font-normal text-[14px] md:text-[15px] text-white/[0.85] leading-[1.6] md:leading-[1.65]">
                                  {svc.description}
                                </span>
                                <span className="block mt-[12px] md:mt-[14px] space-y-[8px]">
                                  {svc.bullets.map((b) => (
                                    <span key={b} className="flex gap-[10px] items-start">
                                      <Check className="shrink-0 mt-[3px] size-[14px] md:size-[16px] text-mint" />
                                      <span className="font-body font-normal text-[13px] md:text-[14px] text-white/75 leading-[1.5]">
                                        {b}
                                      </span>
                                    </span>
                                  ))}
                                </span>
                              </span>
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  );
                })}
              </div>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
