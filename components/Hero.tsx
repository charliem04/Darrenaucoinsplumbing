import Image from "next/image";
import { client } from "@/client.config";
import { Button } from "./Button";
import { Wave } from "./Icons";
import { Reveal } from "./Reveal";

export function Hero() {
  const h = client.hero;
  return (
    <section className="bg-gradient-to-b from-teal-light to-teal-dark relative shrink-0 w-full">
      <div className="flex flex-col items-center w-full px-[20px] py-[48px] md:px-[64px] md:pt-[40px] md:pb-[112px]">
        <div className="flex flex-col items-center w-full gap-[32px] max-w-[560px] md:gap-[80px] md:max-w-[1280px]">
          {/* Photo first. Fades in on load (CSS — see app/globals.css). */}
          <div className="hero-fade relative w-full rounded-[16px] overflow-hidden shadow-[0_16px_32px_rgba(0,0,0,0.4)] md:max-w-[1266px] md:rounded-[32px] md:overflow-visible md:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
            <div className="rounded-[16px] md:rounded-[32px] overflow-hidden border-8 border-navy relative">
              <Image
                alt={h.imageAlt}
                src="/images/hero.webp"
                width={903}
                height={508}
                priority
                sizes="(min-width: 1394px) 1266px, (min-width: 768px) calc(100vw - 128px), min(560px, calc(100vw - 40px))"
                className="block w-full h-auto"
              />
            </div>
          </div>

          <Reveal className="flex flex-col gap-[32px] items-center relative shrink-0 w-full md:max-w-[768px]">
            <div className="flex flex-col gap-[20px] md:gap-[24px] items-center relative shrink-0 text-center text-white w-full">
              <h1 className="font-display font-medium leading-[1.2] relative shrink-0 w-full text-[36px] tracking-[-0.4px] md:text-[72px] md:tracking-[-0.72px]">
                {h.headline}
              </h1>
              <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 w-full text-[16px] md:text-[18px]">
                {h.body}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-[12px] md:flex-nowrap md:gap-[16px] items-center md:items-start relative shrink-0">
              <Button variant="white" call className="px-[16px] py-[8px] md:px-[12px] md:py-[6px]">
                {h.primaryCta}
              </Button>
              <Button variant="ghost" href="#services" className="px-[16px] py-[8px] md:px-[12px] md:py-[6px]">
                {h.secondaryCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
      <Wave />
    </section>
  );
}
