"use client";

/**
 * Specialty services: a grid of teal icon tiles, each of which opens
 * in place into a full-width card.
 *
 * Closed, a tile is just the essentials — the service's mark, its name,
 * and its credential if it has one — so six of them scan at a glance.
 * Open, the card spans the row: a teal panel carrying the mark at full
 * size with a slow ripple around it (water, not decoration for its own
 * sake), and beside it the description, the checklist, and a button
 * that takes you to the form with this service already selected.
 *
 * One open at a time. The grid uses dense auto-flow so the opened card
 * claims a full row without leaving holes, and Framer's layout
 * animation slides the other tiles to their new places rather than
 * snapping them.
 *
 * There are no photographs of these jobs, so the "visual" is the
 * service's own mark, drawn large — not a borrowed photo of a
 * different job. Credentials are marked in green: the page's one
 * meaning for green is verified.
 */
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useRef, useState } from "react";
import { client } from "@/client.config";
import { specialtyServices } from "@/content/services";
import type { SpecialtyService } from "@/content/types";
import { dur, ease } from "@/lib/motion";
import { FlowLines } from "./FlowLines";
import { Check, PathIcon } from "./Icons";
import { RequestButton } from "./RequestButton";

const s = client.services;
const layoutTransition = { duration: 0.42, ease: ease.out };

function Credential({ svc, onTeal = false }: { svc: SpecialtyService; onTeal?: boolean }) {
  if (!svc.badge) return <span className={onTeal ? "text-white" : "text-ink-2"}>{svc.meta}</span>;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold ${
        onTeal ? "rounded-full bg-white px-2.5 py-1 text-green" : "text-green"
      }`}
    >
      <Check className="size-3.5" />
      {svc.badge}
    </span>
  );
}

/** The plus that turns into a close mark. */
function Toggle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
        open ? "border-white/50 text-white" : "border-teal/40 text-teal-dark group-hover:border-teal group-hover:bg-teal group-hover:text-white"
      }`}
    >
      <span className="absolute h-[2px] w-3.5 rounded-full bg-current" />
      <span
        className={`absolute h-3.5 w-[2px] rounded-full bg-current transition-transform duration-300 ease-brand ${open ? "rotate-90 scale-y-0" : ""}`}
      />
    </span>
  );
}

function Tile({
  svc,
  open,
  onToggle,
}: {
  svc: SpecialtyService;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <motion.li
      ref={ref}
      layout
      transition={{ layout: layoutTransition }}
      onLayoutAnimationComplete={() => {
        // Bring an opened card fully into view if it grew off-screen.
        if (open) ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }}
      className={open ? "md:col-span-2 lg:col-span-3" : ""}
    >
      <motion.div
        layout
        transition={{ layout: layoutTransition }}
        className={`overflow-hidden rounded border ${
          open ? "grid md:grid-cols-[17rem_1fr] lg:grid-cols-[20rem_1fr] border-teal bg-white" : "border-rule bg-white"
        }`}
      >
        {/* The teal panel: currents drift behind the button, not inside it. */}
        <div className={open ? "relative isolate overflow-hidden bg-teal text-white" : ""}>
        {open && <FlowLines />}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`specialty-${svc.key}`}
          className={`press group relative w-full text-left ${
            open
              ? "flex h-full flex-col gap-5 p-6 md:gap-6 md:p-7"
              : "flex items-center gap-4 p-5 hover:bg-teal/[0.04] active:bg-teal/[0.08]"
          }`}
        >
          {/* The mark. Closed: a solid teal tile. Open: drawn large, with a ripple. */}
          <motion.span
            layout="position"
            className={`relative flex shrink-0 items-center justify-center rounded-full ${
              open ? "size-20 md:size-28 self-start" : "size-14 bg-teal text-white transition-colors duration-200 group-hover:bg-teal-dark"
            }`}
          >
            {open && (
              <>
                <span aria-hidden="true" className="ping-soft absolute inset-0 rounded-full border-2 border-white/40" />
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/30" />
              </>
            )}
            <PathIcon d={svc.icon} className={`relative ${open ? "size-10 md:size-14" : "size-7"}`} />
          </motion.span>

          <motion.span layout="position" className="flex min-w-0 flex-1 flex-col gap-1">
            <span
              className={`font-display font-semibold leading-tight ${
                open ? "text-[1.75rem]" : "text-[1.1875rem] text-ink group-hover:text-teal-dark"
              }`}
            >
              {svc.name}
            </span>
            <span className="text-[0.875rem]">
              <Credential svc={svc} onTeal={open} />
            </span>
          </motion.span>

          <span className={open ? "absolute right-5 top-5" : ""}>
            <Toggle open={open} />
          </span>
          <span className="sr-only">{open ? "Close" : "Show details"}</span>
        </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`specialty-${svc.key}`}
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: dur.reveal, ease: ease.out, delay: 0.15 } }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              className="flex flex-col gap-6 p-7 lg:p-9"
            >
              <p className="text-[1.0625rem] leading-relaxed text-ink-2 max-w-[62ch]">{svc.description}</p>
              <ul className="grid gap-3 sm:grid-cols-2 border-y border-rule py-5">
                {svc.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0, transition: { duration: dur.panel, ease: ease.out, delay: 0.25 + i * 0.06 } }}
                    className="flex items-start gap-3 text-ink"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                      <Check className="size-3" />
                    </span>
                    {b}
                  </motion.li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3">
                <RequestButton service={svc.name} />
                <button
                  type="button"
                  onClick={onToggle}
                  className="press h-12 px-5 rounded border border-rule font-body font-semibold text-ink hover:bg-ground active:bg-rule/50"
                >
                  {s.specialtyClose}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.li>
  );
}

export function SpecialtyServices() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-teal/30 pb-4">
        <h3 className="font-display font-semibold text-d-3 text-ink">{s.specialtyHeading}</h3>
        <p className="font-body text-[0.9375rem] text-ink-2">{s.specialtyHint}</p>
      </div>
      <LayoutGroup>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-flow-row-dense">
          {specialtyServices.map((svc) => (
            <Tile
              key={svc.key}
              svc={svc}
              open={openKey === svc.key}
              onToggle={() => setOpenKey((k) => (k === svc.key ? null : svc.key))}
            />
          ))}
        </ul>
      </LayoutGroup>
    </div>
  );
}
