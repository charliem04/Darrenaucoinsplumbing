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
 * md+: list + panel. Phones: a chip row + one card (ServicesPhone).
 */
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { client } from "@/client.config";
import { serviceTabs } from "@/content/services";
import type { ServiceTab } from "@/content/types";
import { dur, ease } from "@/lib/motion";
import { copyProps, DriftEdges, useDrift } from "./drift";
import { FlowLines } from "./FlowLines";
import { ArrowRight, DropIcon } from "./Icons";
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

/**
 * Phones: a row of service chips that drifts sideways on its own (and
 * can be swiped), and one card below for the chosen service — the photo, then a teal panel with the
 * copy and the button. One thing on screen at a time, the same
 * list-then-detail idea as the desktop widget, at a phone's scale.
 */
function ServicesPhone({
  activeKey,
  setActiveKey,
  active,
}: {
  activeKey: string;
  setActiveKey: (k: string) => void;
  active: ServiceTab;
}) {
  const chips = useRef<HTMLDivElement>(null);
  const chipArea = useRef<HTMLDivElement>(null);
  // The chip row drifts like the card rails: a slow, steady, looping
  // glide with blurred edges (components/drift). A tap holds it.
  const { canDrift } = useDrift({ scroller: chips, area: chipArea, count: serviceTabs.length });

  // Keep the chosen chip in view inside the chip row (row only — never
  // scrolls the page). Only the real chips carry data-key, not the copy.
  useEffect(() => {
    const row = chips.current;
    const chip = row?.querySelector<HTMLElement>(`[data-key="${CSS.escape(activeKey)}"]`);
    if (!row || !chip) return;
    const target = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeKey]);

  const chipCls = (on: boolean) =>
    `press h-10 shrink-0 whitespace-nowrap rounded-full border px-4 font-display font-semibold text-[0.9375rem] transition-colors duration-150 ${
      on ? "border-teal bg-teal text-white" : "border-rule bg-white text-ink active:bg-teal/10"
    }`;

  return (
    <div className="md:hidden flex min-w-0 flex-col gap-4">
      <div ref={chipArea} className="relative">
        <div
          ref={chips}
          role="tablist"
          aria-label={s.heading}
          className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
        >
          {serviceTabs.map((tab) => {
            const on = tab.key === activeKey;
            return (
              <button
                key={tab.key}
                data-key={tab.key}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="service-card"
                onClick={() => setActiveKey(tab.key)}
                className={chipCls(on)}
              >
                {tab.label}
              </button>
            );
          })}
          {/* The loop's visual copy: hidden from assistive tech; a tap selects the real chip. */}
          {canDrift &&
            serviceTabs.map((tab) => (
              <span key={`copy-${tab.key}`} {...copyProps} className={`${chipCls(tab.key === activeKey)} inline-flex items-center`}>
                {tab.label}
              </span>
            ))}
        </div>
        {canDrift && <DriftEdges />}
      </div>

      <div id="service-card" role="tabpanel" className="overflow-hidden rounded border border-teal/40 bg-teal">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: ease.out }}
          >
            <div className="relative aspect-[16/10] bg-teal-dark">
              <Photo tab={active} sizes="calc(100vw - 40px)" />
            </div>
            <div className="flex flex-col gap-3 p-5 text-white">
              <p className="inline-flex items-center gap-2 font-display font-semibold text-[0.875rem] tracking-[0.04em]">
                <DropIcon className="size-4" />
                {active.tagline}
              </p>
              <h3 className="font-display font-semibold text-[1.375rem] leading-tight">{active.title}</h3>
              <p className="text-[1rem] leading-relaxed">{active.description}</p>
              <div className="pt-2">
                <RequestButton service={active.key} onTeal className="w-full justify-center" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
      <div className="flex flex-col gap-10 md:gap-14">
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

        <ServicesPhone activeKey={activeKey} setActiveKey={setActiveKey} active={active} />

        <SpecialtyServices />
      </div>
    </Section>
  );
}
