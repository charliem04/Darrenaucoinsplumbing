import { client } from "@/client.config";
import { phoneDisplay } from "@/lib/phone";
import { CallLink } from "./CallCard";
import { ContactForm } from "./ContactForm";
import { ContactIcon } from "./Icons";
import { Reveal } from "./Reveal";

const linkCls =
  "block [text-decoration-skip-ink:none] decoration-solid font-body font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] underline w-full text-left hover:text-teal transition-colors cursor-pointer";

export function Contact() {
  const c = client.contact;
  const a = client.address;

  const cards = [
    {
      icon: "mail" as const,
      ...c.cards.email,
      link: (
        <a href={`mailto:${client.email}`} className={linkCls}>
          {client.emailDisplay}
        </a>
      ),
    },
    {
      icon: "call" as const,
      ...c.cards.phone,
      link: <CallLink className={linkCls}>{phoneDisplay}</CallLink>,
    },
    {
      icon: "location" as const,
      ...c.cards.office,
      // Not a link on the live site either: there is no street address
      // to send anyone to. Same look, nothing to click.
      link: (
        <span className={linkCls}>
          {a.city}, {a.regionName} {a.postalCode}
        </span>
      ),
    },
  ];

  return (
    <section id="contact" className="bg-navy relative shrink-0 w-full">
      <div className="overflow-clip size-full">
        <div className="flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[48px] items-start md:flex-row md:items-center relative shrink-0 w-full">
              {cards.map((card) => (
                <div
                  key={card.icon}
                  className="flex flex-col gap-[20px] items-start relative shrink-0 w-full md:gap-[24px] md:flex-[1_0_0] md:min-w-px"
                >
                  <ContactIcon kind={card.icon} />
                  <div className="flex flex-col gap-[20px] md:gap-[24px] items-start relative shrink-0 text-white w-full">
                    <div className="flex flex-col gap-[12px] md:gap-[16px] items-start relative shrink-0 w-full">
                      <h3 className="font-display font-medium leading-[1.3] relative shrink-0 w-full text-[24px] tracking-[-0.24px] md:text-[36px] md:tracking-[-0.36px]">
                        {card.title}
                      </h3>
                      <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 text-[16px] w-full">
                        {card.desc}
                      </p>
                    </div>
                    {card.link}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-[24px] md:gap-[32px] items-start relative shrink-0 w-full">
              <div className="flex flex-col gap-[12px] md:gap-[16px] items-start relative shrink-0 w-full">
                <h2 className="font-display font-medium leading-[1.2] text-white text-[32px] tracking-[-0.32px] md:text-[44px] md:tracking-[-0.44px]">
                  {c.formHeading}
                </h2>
                <p className="font-body font-normal leading-[1.5] not-italic text-white text-[16px] md:text-[18px]">
                  {c.formLede}
                </p>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
