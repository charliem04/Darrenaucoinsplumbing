import Image from "next/image";
import { client } from "@/client.config";

/**
 * `base` is "" on the home page (plain #anchors) and "/" elsewhere, so
 * the same links work from /privacy/ and the 404.
 */
export function Footer({ base = "" }: { base?: string }) {
  const ft = client.footer;
  const links = [
    { label: ft.links.about, href: `${base}#about` },
    { label: ft.links.services, href: `${base}#services` },
    { label: ft.links.contact, href: `${base}#contact` },
    { label: ft.links.faq, href: `${base}#faq` },
    { label: ft.links.testimonials, href: `${base}#testimonials` },
  ];
  const legal = "[text-decoration-skip-ink:none] decoration-solid relative shrink-0 underline hover:text-teal transition-colors";

  return (
    <footer className="bg-navy-bar relative shrink-0 w-full">
      <div className="flex flex-col items-center size-full">
        <div className="flex flex-col items-center px-[20px] py-[48px] md:px-[64px] relative size-full">
          <div className="flex flex-col gap-[48px] md:gap-[40px] items-start max-w-[1280px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[48px] items-start md:flex-row md:justify-between md:gap-[40px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[32px] items-start shrink-0 w-full md:contents">
                {/* Logo. The teal ring sits inside the image on phones, outside it at md+. */}
                <div className="flex flex-col items-start overflow-clip md:overflow-visible relative shrink-0">
                  <div className="relative rounded-[51px] shrink-0 h-[150px] w-[332px] md:h-[188px] md:w-[417px]">
                    <Image
                      alt={ft.logoAlt}
                      src="/images/logo-footer.webp"
                      fill
                      sizes="417px"
                      className="object-cover pointer-events-none rounded-[51px] border-4 border-teal md:border-0"
                    />
                    <div
                      aria-hidden="true"
                      className="hidden md:block absolute border-[10px] border-teal border-solid inset-[-10px] pointer-events-none rounded-[61px]"
                    />
                  </div>
                </div>

                <nav
                  aria-label="Footer"
                  className="flex flex-col gap-[16px] items-start max-w-[480px] w-full md:max-w-none md:w-auto md:flex-row md:flex-wrap md:content-start md:gap-[32px] md:whitespace-nowrap font-body font-semibold leading-[1.5] not-italic text-[14px] text-white"
                >
                  {links.map((l) => (
                    // 16px / 500, not the 14px semibold on the <nav>: on the
                    // live site these were <button>s, and the base button
                    // style overrode what they inherited. Matched as rendered.
                    <a
                      key={l.label}
                      href={l.href}
                      className="relative shrink-0 w-full md:w-auto text-left text-[16px] font-medium hover:text-teal transition-colors cursor-pointer"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-[12px] items-start relative shrink-0 w-full md:w-auto md:max-w-[400px]">
                <p className="font-body font-semibold leading-[1.5] not-italic text-[16px] text-white w-full md:w-auto">
                  {ft.ctaHeading}
                </p>
                <p className="font-body leading-[1.5] not-italic text-[14px] text-white/70 w-full md:w-auto">{ft.ctaBody}</p>
                <a
                  href={`${base}#contact`}
                  className="block text-center bg-teal hover:bg-teal-hover transition-colors rounded-[12px] px-[16px] py-[10px] w-full md:w-auto md:px-[20px] md:whitespace-nowrap font-body font-medium text-[16px] text-white cursor-pointer"
                >
                  {ft.cta}
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-[24px] items-start md:items-center pb-[16px] md:pb-0 relative shrink-0 w-full">
              <div className="h-0 relative shrink-0 w-full" aria-hidden="true">
                <div className="absolute inset-x-0 -top-px h-px bg-white/20" />
              </div>
              <div className="flex flex-col gap-[32px] items-start md:flex-row md:justify-between md:gap-0 md:whitespace-nowrap font-body font-normal leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-full">
                <div className="flex flex-col gap-[16px] md:flex-row md:gap-[24px] items-start relative shrink-0 whitespace-nowrap">
                  <a href="/privacy/" className={legal}>{ft.privacy}</a>
                  {/* Inert on the live site too — see client.config.ts. */}
                  <span className={`${legal} cursor-default`}>{ft.terms}</span>
                  <span className={`${legal} cursor-default`}>{ft.cookies}</span>
                </div>
                <p className="relative shrink-0 w-full md:w-auto">
                  © {client.copyrightYear} {client.legalName}. {ft.rights}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
