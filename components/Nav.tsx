"use client";

/**
 * The sticky nav. One component for every width: phones get the logo,
 * wordmark and a menu button (64px tall); md and up get the full link
 * row with the "More" dropdown, Call and Book (110px tall).
 */
import Image from "next/image";
import { useState } from "react";
import { client } from "@/client.config";
import { CallLink } from "./CallCard";
import { ChevronDown } from "./Icons";

const linkCls =
  "font-body font-normal leading-[1.5] not-italic text-[16px] text-white hover:text-teal transition-colors cursor-pointer whitespace-nowrap";
// These were <button>s with no weight class on the live site, so they
// took the base button style's 500 weight; the dropdown items had no
// font class either, so they render in the body's system stack.
const dropdownCls =
  "block w-full text-left text-white hover:text-teal py-[8px] text-[16px] font-medium leading-[1.5]";
const menuCls =
  "text-left font-body font-medium text-[16px] leading-[1.5] text-white py-[8px] hover:text-teal transition-colors";

export function Nav({ base = "" }: { base?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const closeMore = () => setMoreOpen(false);
  const n = client.nav;

  return (
    <header className="bg-navy-bar sticky top-0 shrink-0 w-full z-50 shadow-lg flex flex-col overflow-hidden md:overflow-visible md:h-[110px] md:justify-center">
      <div className="h-[64px] md:h-auto relative shrink-0 w-full md:px-[64px]">
        <div className="flex items-center justify-between pl-[20px] pr-[12px] md:px-0 relative size-full md:h-[71px] md:gap-[16px]">
          {/* Logo — back to top */}
          <a
            href={`${base}#top`}
            aria-label={`${client.businessName} — back to top`}
            className="relative shrink-0 cursor-pointer h-[46px] w-[76px] md:h-[68px] md:w-[113px]"
          >
            <span className="absolute inset-0 pointer-events-none rounded-[8px]">
              <Image
                alt={n.logoAlt}
                src="/images/logo-nav.webp"
                fill
                priority
                sizes="113px"
                className="object-cover rounded-[8px]"
              />
              <span
                aria-hidden="true"
                className="absolute border-4 border-teal border-solid inset-[-4px] rounded-[12px]"
              />
            </span>
          </a>

          <p className="font-wordmark font-medium leading-[1.2] relative text-white whitespace-nowrap flex-1 min-w-0 text-center truncate text-[20px] tracking-[-0.14px] px-[8px] md:text-[42px] xl:text-[48px] md:tracking-[-0.32px] md:px-[16px]">
            {client.businessName}
          </p>

          {/* Phones: menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? n.closeMenu : n.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex items-center justify-center relative shrink-0 size-[48px] cursor-pointer"
          >
            <svg className="size-[24px]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d={menuOpen ? "M6 6L18 18M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* md+: link row */}
          <nav aria-label="Main" className="hidden md:flex gap-[16px] items-center justify-end relative shrink-0">
            <div className="flex gap-[20px] items-center justify-end relative shrink-0">
              <a href={`${base}#top`} className={linkCls}>{n.home}</a>
              <a href={`${base}#about`} className={linkCls}>{n.about}</a>
              <a href={`${base}#services`} className={linkCls}>{n.services}</a>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((o) => !o)}
                  aria-expanded={moreOpen}
                  aria-controls="nav-more"
                  className={`flex gap-[4px] items-center ${linkCls}`}
                >
                  {n.more}
                  <ChevronDown className="size-[24px]" />
                </button>
                {moreOpen && (
                  <div
                    id="nav-more"
                    className="absolute top-full mt-2 bg-navy-bar border border-white/20 rounded-[8px] p-[16px] min-w-[150px] z-50"
                  >
                    <a href={`${base}#faq`} onClick={closeMore} className={dropdownCls}>{n.faq}</a>
                    <a href={`${base}#contact`} onClick={closeMore} className={dropdownCls}>{n.contact}</a>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-[12px] items-center justify-center relative shrink-0">
              <CallLink className="flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer">
                <span className="font-body font-medium leading-[1.5] not-italic text-[16px] text-white whitespace-nowrap">
                  {n.call}
                </span>
              </CallLink>
              <a
                href={`${base}#contact`}
                className="bg-blue flex items-center justify-center px-[10px] py-[4px] relative rounded-[12px] shrink-0 hover:bg-blue-press transition-colors cursor-pointer"
              >
                <span className="font-body font-medium leading-[1.5] not-italic text-[16px] text-white whitespace-nowrap">
                  {n.book}
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Phones: the open menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="md:hidden bg-navy-bar w-full border-t border-white/20 py-[16px] px-[20px]"
        >
          <div className="flex flex-col gap-[16px]">
            <a href={`${base}#top`} onClick={closeMenu} className={menuCls}>{n.home}</a>
            <a href={`${base}#about`} onClick={closeMenu} className={menuCls}>{n.about}</a>
            <a href={`${base}#services`} onClick={closeMenu} className={menuCls}>{n.services}</a>
            <a href={`${base}#faq`} onClick={closeMenu} className={menuCls}>{n.faq}</a>
            <a href={`${base}#contact`} onClick={closeMenu} className={menuCls}>{n.contact}</a>
            <div className="flex gap-[8px] pt-[8px]">
              <CallLink
                onNavigate={closeMenu}
                className="flex-1 text-center bg-white text-ink px-[12px] py-[6px] rounded-[12px] font-body font-medium hover:bg-gray-100 transition-colors"
              >
                {n.call}
              </CallLink>
              <a
                href={`${base}#contact`}
                onClick={closeMenu}
                className="flex-1 text-center bg-blue text-white px-[12px] py-[6px] rounded-[12px] font-body font-medium hover:bg-blue-press transition-colors"
              >
                {n.book}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
