"use client";

/**
 * "What we handle" — the core services widget, and below it the
 * specialty services (components/SpecialtyServices).
 *
 * The widget is teal-led on the light ground: the service list is
 * white, and the selected service is a solid teal tab that slides
 * between items and opens into the teal detail panel beside it (with
 * the same slow currents as the navy bands) — one colour, so the
 * selection reads as a door into the panel. The photo is shown as it
 * is, with no tint over it.
 *
 * md+: list + panel. Phones: an accordion whose open row is teal.
 */
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/client.config";
import { serviceTabs } from "@/content/services";
import type { ServiceTab } from "@/content/types";
import { dur, ease } from "@/lib/motion";
import { FlowLines } from "./FlowLines";
import { ArrowRight, ChevronDown, DropIcon } from "./Icons";
import { RequestButton } from "./RequestButton";
import { Section } from "./Section";
import { SectionHead } from "./SectionHead";
import { SpecialtyServices } from "./SpecialtyServices";

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

        {/* ── md+: white list + teal panel ──────────────────── */}
        <div className="hidden md:grid grid-cols-[14rem_1fr] lg:grid-cols-[17rem_1fr] rounded overflow-hidden border border-teal/40 bg-white">
          <div className="relative border-r border-rule bg-white p-3 lg:p-4">
            <p className="px-3 pt-2 pb-3 font-display font-semibold text-[0.875rem] tracking-[0.06em] text-ink-2">
              {serviceTabs.length} {s.railLabel}
            </p>
            <div role="tablist" aria-orientation="vertical" aria-label={s.heading} className="relative flex flex-col gap-0.5">
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
                    className={`press relative flex items-center justify-between gap-2 text-left h-12 px-3 rounded font-display font-semibold text-[1.0625rem] transition-colors duration-150 ${
                      on ? "text-white" : "text-ink hover:bg-teal/[0.08] hover:text-teal-dark active:bg-teal/[0.14]"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="service-tab"
                        aria-hidden="true"
                        className="absolute inset-0 rounded bg-teal"
                        transition={{ type: "spring", stiffness: 480, damping: 40 }}
                      />
                    )}
                    <span className="relative">{tab.label}</span>
                    <ArrowRight
                      className={`relative size-4 shrink-0 transition-[opacity,transform] duration-200 ease-brand ${
                        on ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.key}`}
            className="relative isolate overflow-hidden min-h-[27rem] bg-teal text-white"
          >
            <FlowLines />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: dur.panel, ease: ease.out }}
                className="relative grid lg:grid-cols-[1fr_minmax(0,21rem)] h-full"
              >
                {/* All text is full white: white on #0b8483 is 4.56:1, and any tint drops it under AA. */}
                <div className="flex flex-col gap-4 p-7 lg:p-10 justify-center">
                  <p className="inline-flex items-center gap-2 font-display font-semibold text-[0.9375rem] tracking-[0.04em] text-white">
                    <DropIcon className="size-4" />
                    {active.tagline}
                  </p>
                  <h3 className="font-display font-semibold text-d-3 text-white text-balance">{active.title}</h3>
                  <p className="text-[1.0625rem] leading-relaxed text-white max-w-[52ch]">{active.description}</p>
                  <div className="pt-3">
                    <RequestButton service={active.key} onTeal />
                  </div>
                </div>
                <div className="relative hidden lg:block min-h-[27rem] bg-teal-dark">
                  <Photo tab={active} sizes="21rem" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── phones: accordion; the open row is teal, like the panel ── */}
        <div className="md:hidden flex flex-col rounded overflow-hidden border border-teal/40 bg-white divide-y divide-rule">
          {serviceTabs.map((tab) => {
            const on = tab.key === activeKey;
            return (
              <div key={tab.key}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`svc-${tab.key}`}
                  onClick={() => setActiveKey(tab.key)}
                  className={`w-full flex items-center justify-between gap-4 min-h-14 px-5 text-left transition-colors duration-200 ${
                    on ? "bg-teal text-white" : "text-ink active:bg-teal/10"
                  }`}
                >
                  <span className="font-display font-semibold text-[1.125rem]">{tab.label}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-200 ease-brand ${on ? "rotate-180 text-white" : "text-teal-dark"}`}
                  />
                </button>
                {/* Height via grid rows — never animate height directly. */}
                <div
                  id={`svc-${tab.key}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-brand ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-4 px-5 pt-1 pb-6 bg-teal text-white">
                      <div className="relative aspect-[4/3] rounded overflow-hidden bg-teal-dark">
                        <Photo tab={tab} sizes="calc(100vw - 40px)" />
                      </div>
                      <h3 className="font-display font-semibold text-[1.375rem] leading-tight text-white">{tab.title}</h3>
                      <p className="leading-relaxed text-white">{tab.description}</p>
                      <div>
                        <RequestButton service={tab.key} onTeal />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <SpecialtyServices />
      </div>
    </Section>
  );
}
