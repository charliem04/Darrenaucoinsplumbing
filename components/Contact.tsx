import { client } from "@/client.config";
import { phoneDisplay } from "@/lib/phone";
import { CallLink } from "./CallCard";
import { ContactForm } from "./ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SectionHead } from "./SectionHead";

/**
 * The last band, where every route ends: the old CTA band's message,
 * the three ways to reach DA, and the request form — together, so a
 * visitor who has decided does not have to choose between two
 * sections that both say "get in touch".
 */
export function Contact() {
  const c = client.contact;
  const a = client.address;

  const rows = [
    {
      icon: <PhoneIcon className="size-5" />,
      title: c.cards.phone.title,
      desc: c.cards.phone.desc,
      value: (
        <CallLink className="font-display font-semibold text-[1.375rem] tabular text-white hover:text-teal-light active:text-white underline-offset-4 hover:underline">
          {phoneDisplay}
        </CallLink>
      ),
    },
    {
      icon: <MailIcon className="size-5" />,
      title: c.cards.email.title,
      desc: c.cards.email.desc,
      value: (
        <a
          href={`mailto:${client.email}`}
          className="font-body font-semibold text-white [overflow-wrap:anywhere] hover:text-teal-light active:text-white underline-offset-4 hover:underline"
        >
          {client.emailDisplay}
        </a>
      ),
    },
    {
      icon: <PinIcon className="size-5" />,
      title: c.cards.office.title,
      desc: c.cards.office.desc,
      value: (
        <p className="font-body font-semibold text-white">
          {a.city}, {a.regionName} {a.postalCode}
        </p>
      ),
    },
  ];

  return (
    <Section id="contact" ground="deep" labelledBy="contact-h">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 items-start">
        <div className="flex flex-col gap-10">
          <SectionHead id="contact-h" tone="dark" label={c.label} heading={c.heading} lede={c.lede} />
          <Reveal as="ul" className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {rows.map((r) => (
              <li key={r.title} className="flex gap-4 py-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded bg-teal/20 text-teal-light">
                  {r.icon}
                </span>
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="font-display font-semibold text-[0.9375rem] tracking-[0.04em] text-white/60">{r.title}</h3>
                  {r.value}
                  <p className="text-[0.9375rem] text-white/65">{r.desc}</p>
                </div>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="rounded bg-white text-ink p-6 md:p-8">
          <div className="flex flex-col gap-1.5 mb-6">
            <h3 className="font-display font-semibold text-d-3 text-ink">{c.formHeading}</h3>
            <p className="text-ink-2">{c.formLede}</p>
          </div>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
