"use client";

/**
 * Specialty services: a static grid of teal icon tiles. Clicking one
 * grows it, from exactly where it sits, into a card centred on the
 * screen; closing shrinks it back into its place. The grid itself never
 * moves — the tile's slot is held by an invisible copy while it's open.
 *
 * The motion is a shared-layout morph (Framer's layoutId): the tile and
 * the centred card are "the same element", so it travels and resizes as
 * one surface instead of the page reflowing. Unhurried and without
 * overshoot — `morph` below — with the details fading in only once the
 * card has arrived, so nothing is read mid-flight.
 *
 * The open card is a modal dialog: the page behind is dimmed and stops
 * scrolling, Escape or a click outside closes it, focus moves into it
 * and returns to the tile afterwards.
 *
 * There are no photographs of these jobs, so the "visual" is the
 * service's own mark drawn large on teal with a slow ripple — not a
 * borrowed photo of a different job. Credentials are marked in green:
 * the page's one meaning for green is verified.
 */
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { client } from "@/client.config";
import { specialtyServices } from "@/content/services";
import type { SpecialtyService } from "@/content/types";
import { ease } from "@/lib/motion";
import { FlowLines } from "./FlowLines";
import { Check, PathIcon } from "./Icons";
import { Rail, useRailClone } from "./Rail";
import { RequestButton } from "./RequestButton";

const s = client.services;

/** The open/close morph: half a second, smooth in and out, no bounce. */
const morph = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const };

function Credential({ svc, onTeal = false }: { svc: SpecialtyService; onTeal?: boolean }) {
  if (!svc.badge) return <span className={onTeal ? "text-white" : "text-ink-2"}>{svc.meta}</span>;
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold text-green ${
        onTeal ? "rounded-full bg-white px-2.5 py-1" : ""
      }`}
    >
      <Check className="size-3.5" />
      {svc.badge}
    </span>
  );
}

/** What a closed tile shows. Used for the tile and for its placeholder. */
function TileFace({ svc, motionIds = false }: { svc: SpecialtyService; motionIds?: boolean }) {
  return (
    <>
      <motion.span
        layoutId={motionIds ? `mark-${svc.key}` : undefined}
        transition={morph}
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-teal text-white transition-colors duration-200 group-hover:bg-teal-dark"
      >
        <PathIcon d={svc.icon} className="size-7" />
      </motion.span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <motion.span
          layoutId={motionIds ? `name-${svc.key}` : undefined}
          transition={morph}
          className="font-display font-semibold text-[1.1875rem] leading-tight text-ink group-hover:text-teal-dark"
        >
          {svc.name}
        </motion.span>
        <span className="text-[0.875rem]">
          <Credential svc={svc} />
        </span>
      </span>
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 flex size-9 shrink-0 items-center justify-center rounded-full border border-teal/40 text-teal-dark transition-colors duration-200 group-hover:border-teal group-hover:bg-teal group-hover:text-white md:static"
      >
        <span className="relative block size-3.5">
          <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-current" />
        </span>
      </span>
    </>
  );
}

// Upright on phones (icon above name, in a swipe rail), a row from md up.
const tileCls =
  "group relative flex h-full w-full flex-col items-start gap-3 rounded border border-rule bg-white p-5 text-left md:flex-row md:items-center md:gap-4";

function OpenCard({ svc, onClose }: { svc: SpecialtyService; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Modal behaviour: Escape closes, the page stops scrolling, focus moves in.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 350);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prev;
      window.clearTimeout(t);
    };
  }, [onClose]);

  // Portalled to <body>: the section creates its own stacking context,
  // so rendered in place the sticky nav would paint over the dialog.
  //
  // The wrapper is a motion element with an exit of its own: that is
  // what tells AnimatePresence when the close is finished. Without it
  // the card shrinks back onto the tile and then stays mounted there.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: morph.duration, ease: ease.inOut } }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-deep/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: ease.inOut }}
        onClick={onClose}
      />
      <motion.div
        layoutId={`card-${svc.key}`}
        transition={morph}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`specialty-title-${svc.key}`}
        // Sized to the VISIBLE screen: 100dvh excludes the mobile browser
        // bars (100vh does not, which pushed the buttons off the bottom).
        // Phones: a column — header, scrolling details, pinned actions.
        // md+: the two-column card, details scrolling within their column.
        className="relative flex w-full max-w-4xl max-h-[calc(100vh-2rem)] supports-[height:100dvh]:max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded bg-white md:grid md:grid-cols-[17rem_1fr] md:grid-rows-[minmax(0,1fr)] lg:grid-cols-[19rem_1fr]"
        style={{ borderRadius: 8 }}
      >
        {/* Always-visible close, whatever scrolls. */}
        <button
          type="button"
          onClick={onClose}
          aria-label={`${s.specialtyClose} ${svc.name}`}
          className="press absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full border border-rule bg-white text-ink hover:bg-ground active:bg-rule/50"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {/* The visual: the service's mark on teal. A compact row on phones. */}
        <div className="relative isolate flex shrink-0 items-center gap-4 overflow-hidden bg-teal py-5 pl-5 pr-16 text-white md:flex-col md:items-start md:gap-6 md:py-8 md:pl-8 md:pr-8">
          <FlowLines />
          <motion.span
            layoutId={`mark-${svc.key}`}
            transition={morph}
            className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 md:size-28"
          >
            <span aria-hidden="true" className="ping-soft absolute inset-0 rounded-full border-2 border-white/40" />
            <PathIcon d={svc.icon} className="relative size-7 md:size-14" />
          </motion.span>
          <div className="relative flex min-w-0 flex-col gap-1.5 md:gap-2">
            <motion.h4
              layoutId={`name-${svc.key}`}
              transition={morph}
              id={`specialty-title-${svc.key}`}
              className="font-display font-semibold text-[1.375rem] leading-tight md:text-[1.75rem]"
            >
              {svc.name}
            </motion.h4>
            <motion.span
              className="text-[0.875rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.35 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <Credential svc={svc} onTeal />
            </motion.span>
          </div>
        </div>

        {/*
          The details: fade in once the card has arrived. The text scrolls
          (min-h-0 lets it shrink inside the capped card); the actions are
          a pinned footer outside the scroll, so they are always on screen.
        */}
        <motion.div
          className="flex min-h-0 flex-1 flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35, ease: ease.out, delay: 0.32 } }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
        >
          <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain px-6 py-6 md:py-8 md:pl-8 md:pr-16 lg:py-9 lg:pl-9">
          <p className="text-[1.0625rem] leading-relaxed text-ink-2">{svc.description}</p>
          <ul className="grid gap-3 border-t border-rule pt-5 sm:grid-cols-2">
            {svc.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-ink">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                  <Check className="size-3" />
                </span>
                {b}
              </li>
            ))}
          </ul>
          </div>
          <div className="flex shrink-0 items-center gap-3 border-t border-rule bg-white px-6 py-4 md:px-8 lg:px-9">
            <RequestButton service={svc.name} className="flex-1 justify-center sm:flex-none" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="press h-12 rounded border border-rule px-5 font-body font-semibold text-ink hover:bg-ground active:bg-rule/50"
            >
              {s.specialtyClose}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/**
 * One tile. In the drifting rail's visual copy (useRailClone) it is a
 * plain look-alike: a second real tile would register the same layoutId
 * twice and break the open/close morph. The copy is inert anyway — a
 * touch on the rail first moves it back onto the real tiles.
 */
function SpecialtyTile({
  svc,
  isOpen,
  onOpen,
  tileRef,
}: {
  svc: SpecialtyService;
  isOpen: boolean;
  onOpen: () => void;
  tileRef: (el: HTMLButtonElement | null) => void;
}) {
  const clone = useRailClone();
  if (clone) {
    return (
      <div className={tileCls}>
        <TileFace svc={svc} />
      </div>
    );
  }
  if (isOpen) {
    // Holds the slot so the grid never moves while the card is out.
    return (
      <div aria-hidden="true" className={`${tileCls} invisible`}>
        <TileFace svc={svc} />
      </div>
    );
  }
  return (
    <motion.button
      ref={tileRef}
      layoutId={`card-${svc.key}`}
      transition={morph}
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      // No .press scale here: Framer owns this element's transform for the morph.
      className={`${tileCls} transition-colors duration-150 hover:border-teal/50 active:bg-teal/[0.06]`}
      style={{ borderRadius: 8 }}
    >
      <TileFace svc={svc} motionIds />
      <span className="sr-only">— show details</span>
    </motion.button>
  );
}

export function SpecialtyServices() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const open = specialtyServices.find((x) => x.key === openKey) ?? null;

  const close = () => {
    const key = openKey;
    setOpenKey(null);
    // Return focus to the tile it came from, once it is back in place.
    if (key) window.setTimeout(() => tileRefs.current[key]?.focus({ preventScroll: true }), 520);
  };

  return (
    <div className="flex flex-col gap-6 pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-teal/30 pb-4">
        <h3 className="font-display font-semibold text-d-3 text-ink">{s.specialtyHeading}</h3>
        <p className="font-body text-[0.9375rem] text-ink-2">{s.specialtyHint}</p>
      </div>

      <LayoutGroup id="specialty">
        {/* Phones: a drifting rail of upright tiles. md+: the grid. */}
        <Rail
          label={s.specialtyHeading}
          gridClassName="md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3"
          itemClassName="basis-[62%] relative"
        >
          {specialtyServices.map((svc) => (
            <SpecialtyTile
              key={svc.key}
              svc={svc}
              isOpen={openKey === svc.key}
              onOpen={() => setOpenKey(svc.key)}
              tileRef={(el) => {
                tileRefs.current[svc.key] = el;
              }}
            />
          ))}
        </Rail>

        <AnimatePresence>{open && <OpenCard key={open.key} svc={open} onClose={close} />}</AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
