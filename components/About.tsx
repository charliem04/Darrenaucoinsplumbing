import Image from "next/image";
import { client } from "@/client.config";
import { Reveal } from "./Reveal";

/**
 * The white "Equipment" band — the section the "About us" links land
 * on. The button is a blue fill at md and up and an outline on phones,
 * as on the live site.
 */
export function About() {
  const a = client.about;
  return (
    <section id="about" className="bg-white relative shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip size-full">
        <div className="flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <div className="flex flex-col gap-[48px] items-start md:flex-row md:gap-[80px] md:items-center relative shrink-0 w-full">
              <div className="flex flex-col gap-[24px] items-start shrink-0 w-full md:flex-[1_0_0] md:gap-[32px] md:min-w-px relative">
                <div className="flex flex-col gap-[12px] md:gap-[16px] items-start relative shrink-0 w-full">
                  <p className="font-body font-semibold leading-[1.5] not-italic text-ink text-[16px]">{a.eyebrow}</p>
                  <div className="flex flex-col gap-[20px] md:gap-[24px] items-start relative shrink-0 text-ink w-full">
                    <h2 className="font-display font-medium leading-[1.2] relative shrink-0 w-full text-[36px] tracking-[-0.36px] md:text-[52px] md:tracking-[-0.52px]">
                      {a.heading}
                    </h2>
                    <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 w-full text-[16px] md:text-[18px]">
                      {a.body}
                    </p>
                  </div>
                </div>
                <div className="flex gap-[24px] items-center relative shrink-0">
                  <a
                    href="#services"
                    className="relative rounded-[12px] shrink-0 border border-ink/15 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center justify-center overflow-clip px-[12px] py-[6px] relative rounded-[inherit] size-full md:bg-blue">
                      <span className="font-body font-medium leading-[1.5] not-italic relative shrink-0 text-ink md:text-white text-[16px] whitespace-nowrap">
                        {a.cta}
                      </span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="relative rounded-[16px] shrink-0 w-full aspect-[335/348] md:aspect-[600/640] md:flex-[1_0_0] md:min-w-px">
                <Image
                  alt={a.imageAlt}
                  src="/images/equipment.webp"
                  fill
                  sizes="(min-width: 1408px) 600px, (min-width: 768px) 45vw, calc(100vw - 40px)"
                  className="object-cover pointer-events-none rounded-[16px]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
