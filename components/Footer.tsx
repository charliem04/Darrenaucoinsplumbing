import Image from "next/image";
import { client } from "@/client.config";
import { phoneDisplay } from "@/lib/phone";
import { CallLink } from "./CallCard";

/**
 * `base` is "" on the home page (plain #anchors) and "/" elsewhere, so
 * the same links work from /privacy/ and the 404.
 *
 * The old footer's "Terms of Service" and "Cookies Settings" were
 * underlined text that went nowhere — there are no terms and the site
 * sets no cookies — so they are gone rather than restyled.
 */
export function Footer({ base = "" }: { base?: string }) {
  const ft = client.footer;
  const links = [
    { label: ft.links.services, href: `${base}#services` },
    { label: ft.links.about, href: `${base}#about` },
    { label: ft.links.testimonials, href: `${base}#testimonials` },
    { label: ft.links.faq, href: `${base}#faq` },
    { label: ft.links.contact, href: `${base}#contact` },
  ];
  const heading = "font-display font-semibold text-[0.9375rem] tracking-[0.04em] text-white/55";
  const link = "text-white/85 hover:text-white active:text-teal-light underline-offset-4 hover:underline";

  return (
    <footer className="bg-navy-bar text-white">
      <div className="px-5 md:px-10 lg:px-24 pt-14 pb-8">
        <div className="mx-auto max-w-content flex flex-col gap-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.4fr_1.1fr]">
            <div className="flex flex-col gap-5">
              <span className="relative block h-[100px] w-[218px] overflow-hidden rounded bg-white">
                <Image src="/images/logo-footer.webp" alt={ft.logoAlt} fill sizes="218px" className="object-contain p-2" />
              </span>
              <p className="text-white/65 max-w-[34ch]">{ft.blurb}</p>
            </div>

            <nav aria-label="Footer" className="flex flex-col gap-3">
              <h2 className={heading}>{ft.navHeading}</h2>
              <ul className="flex flex-col gap-2.5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className={link}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3">
              <h2 className={heading}>{ft.contactHeading}</h2>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <CallLink className={`${link} font-display font-semibold text-[1.125rem] tabular`}>{phoneDisplay}</CallLink>
                </li>
                <li>
                  {/* Wraps only if it truly cannot fit — never mid-word otherwise. */}
                  <a href={`mailto:${client.email}`} className={`${link} [overflow-wrap:anywhere]`}>
                    {client.emailDisplay}
                  </a>
                </li>
                <li className="text-white/65">
                  {client.address.city}, {client.address.regionName} {client.address.postalCode}
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-1">
              <h2 className={heading}>{ft.ctaHeading}</h2>
              <p className="text-white/65">{ft.ctaBody}</p>
              <div>
                <a
                  href={`${base}#contact`}
                  className="press inline-flex items-center h-11 px-4 rounded bg-teal hover:bg-teal-dark active:bg-teal-dark font-body font-semibold"
                >
                  {ft.cta}
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between border-t border-white/10 pt-6 text-[0.875rem] text-white/55">
            <p>
              © {client.copyrightYear} {client.legalName}. {ft.rights}
            </p>
            <a href="/privacy/" className="hover:text-white underline-offset-4 hover:underline">
              {ft.privacy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
