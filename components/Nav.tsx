"use client";

/**
 * The sticky nav.
 *
 *   phones   logo + name, a call button, a menu button (60px)
 *   md+      logo + name, section links, the phone number, Request
 *            service (72px)
 *
 * The phone number is printed, not hidden behind a "Call" label: for a
 * plumber it is the most useful thing in the bar. The current section
 * is marked with a short teal bar that slides between links as you
 * scroll — the nav's one moving part.
 *
 * `base` is "" on the home page and "/" elsewhere so links still work
 * from /privacy/ and the 404.
 */
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { client } from "@/client.config";
import { phoneDisplay } from "@/lib/phone";
import { dur, ease } from "@/lib/motion";
import { CallLink } from "./CallCard";
import { MenuIcon, PhoneIcon } from "./Icons";

const n = client.nav;
const LINKS = [
  { id: "services", label: n.services },
  { id: "about", label: n.about },
  { id: "testimonials", label: n.testimonials },
  { id: "faq", label: n.faq },
  { id: "contact", label: n.contact },
];

/** Which section is under the nav. Home page only. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      // A thin band just under the nav: whichever section crosses it is current.
      { rootMargin: "-80px 0px -75% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, [enabled]);
  return active;
}

export function Nav({ base = "" }: { base?: string }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(base === "");
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-bar text-white border-b border-white/[0.08]">
      <div className="px-5 md:px-10 lg:px-24">
        <div className="mx-auto max-w-content flex items-center gap-3 md:gap-4 h-[60px] md:h-[72px]">
          <a
            href={`${base}#top`}
            className="press flex items-center gap-2.5 md:gap-3 min-w-0 rounded"
            aria-label={`${client.businessName} — home`}
          >
            <span className="relative shrink-0 h-8 w-[53px] md:h-11 md:w-[73px] overflow-hidden rounded-[4px] bg-white">
              <Image src="/images/logo-nav.webp" alt="" fill priority sizes="73px" className="object-contain p-0.5" />
            </span>
            <span className="font-display font-semibold text-[1.0625rem] md:text-[1.375rem] leading-tight truncate">
              {client.businessName}
            </span>
          </a>

          {/* md+: section links */}
          <nav aria-label="Main" className="hidden lg:flex items-center gap-1 ml-auto">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`${base}#${l.id}`}
                aria-current={active === l.id ? "location" : undefined}
                className={`press relative px-3 py-2 rounded font-body font-medium text-[0.9375rem] transition-colors ${
                  active === l.id ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-3 right-3 -bottom-[1px] h-[2px] rounded-full bg-teal-light"
                    transition={{ type: "spring", stiffness: 500, damping: 45 }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 ml-auto lg:ml-4">
            <CallLink className="press flex items-center gap-2 px-2 py-2 rounded whitespace-nowrap font-display font-semibold text-[1.125rem] tabular text-white hover:text-teal-light">
              <PhoneIcon className="size-[18px] text-teal-light" />
              {phoneDisplay}
            </CallLink>
            {/* lg+ only: at tablet width it lives in the menu instead. */}
            <a
              href={`${base}#contact`}
              className="press hidden lg:inline-flex items-center h-10 px-4 rounded whitespace-nowrap bg-teal hover:bg-teal-dark active:bg-teal-dark font-body font-semibold text-[0.9375rem]"
            >
              {n.request}
            </a>
          </div>

          {/* phones: call; below lg: the menu (section links only appear at lg) */}
          <div className="lg:hidden flex items-center gap-1 ml-auto md:ml-0">
            <CallLink className="md:hidden press flex items-center justify-center size-11 rounded bg-teal">
              <PhoneIcon className="size-5" />
              <span className="sr-only">{n.call} {phoneDisplay}</span>
            </CallLink>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? n.closeMenu : n.openMenu}
              className="press flex items-center justify-center size-11 rounded hover:bg-white/[0.06] active:bg-white/[0.1]"
            >
              <MenuIcon open={open} className="size-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            className="lg:hidden overflow-hidden border-t border-white/[0.08]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: dur.panel, ease: ease.out }}
          >
            <ul className="px-5 py-3 flex flex-col">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <a
                    href={`${base}#${l.id}`}
                    onClick={close}
                    className="flex items-center h-12 font-display font-semibold text-lg text-white/85 hover:text-white border-b border-white/[0.06]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-4 pb-2">
                <a
                  href={`${base}#contact`}
                  onClick={close}
                  className="press flex items-center justify-center h-12 rounded bg-teal font-body font-semibold"
                >
                  {n.request}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
