import { client } from "@/client.config";
import { faqs } from "@/content/faqs";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";

/** The teal FAQ band. Questions come from content/faqs.ts. */
export function FaqList() {
  const f = client.faq;
  return (
    <section id="faq" className="bg-teal relative shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip size-full">
        <div className="flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <SectionHead heading={f.heading} lede={f.lede} />

            <dl className="flex flex-col gap-[40px] md:gap-[48px] items-start leading-[1.5] max-w-[768px] not-italic overflow-clip relative shrink-0 text-[16px] text-white w-full">
              {faqs.map((faq) => (
                <div key={faq.q} className="flex flex-col gap-[12px] md:gap-[16px] items-start relative shrink-0 w-full">
                  <dt className="font-body font-bold relative shrink-0 w-full md:text-[18px]">{faq.q}</dt>
                  <dd className="font-body font-normal relative shrink-0 w-full text-[16px]">{faq.a}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col gap-[24px] items-center max-w-[560px] relative shrink-0 w-full">
              <div className="flex flex-col gap-[12px] md:gap-[16px] items-center relative shrink-0 text-center text-white w-full">
                <h3 className="font-display font-medium leading-[1.3] relative shrink-0 w-full text-[24px] tracking-[-0.24px] md:text-[36px] md:tracking-[-0.36px]">
                  {f.followUpHeading}
                </h3>
                <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 w-full text-[16px] md:text-[18px]">
                  {f.followUpBody}
                </p>
              </div>
              <a
                href="#contact"
                className="flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-white/20 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span className="font-body font-medium leading-[1.5] not-italic text-[16px] text-white">{f.cta}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
