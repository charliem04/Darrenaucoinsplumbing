import Image from "next/image";
import { client } from "@/client.config";
import { Button } from "./Button";
import { Reveal } from "./Reveal";

export function CtaBand() {
  const c = client.ctaBand;
  return (
    <section className="bg-white relative shrink-0 w-full">
      <div className="flex flex-col items-center overflow-clip size-full">
        <div className="flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <div className="relative rounded-[16px] shrink-0 w-full">
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[16px]">
                <div className="absolute inset-0 rounded-[16px] md:overflow-hidden">
                  {/*
                    Phones: a plain cover crop. md+: the Figma export's
                    hand-placed crop (552% tall, shifted up 343%), kept
                    exactly — it frames a band of the photo the cover
                    crop would not.
                  */}
                  <Image
                    alt={c.imageAlt}
                    src="/images/sewer-work.webp"
                    width={768}
                    height={1024}
                    sizes="(min-width: 1408px) 1280px, 100vw"
                    className="absolute max-w-none rounded-[16px] size-full object-cover md:rounded-none md:object-fill md:h-[552.32%] md:w-full md:left-[-0.12%] md:top-[-343.28%]"
                  />
                </div>
                <div className="absolute bg-black/40 inset-0 rounded-[16px]" />
              </div>
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="flex items-center justify-center p-[32px] md:p-[64px] relative size-full">
                  <div className="flex flex-[1_0_0] flex-col gap-[24px] md:gap-[32px] items-center max-w-[768px] min-w-px relative">
                    <div className="flex flex-col gap-[20px] md:gap-[24px] items-center relative shrink-0 text-center text-white w-full">
                      <h2 className="font-display font-medium leading-[1.2] relative shrink-0 w-full text-[36px] tracking-[-0.36px] md:text-[52px] md:tracking-[-0.52px]">
                        {c.heading}
                      </h2>
                      <p className="font-body font-normal leading-[1.5] not-italic relative shrink-0 w-full text-[16px] md:text-[18px]">
                        {c.body}
                      </p>
                    </div>
                    <div className="flex gap-[16px] items-start relative shrink-0">
                      <Button variant="white" call>
                        {c.primaryCta}
                      </Button>
                      <a
                        href="#contact"
                        className="flex items-center justify-center px-[12px] py-[6px] relative rounded-[12px] shrink-0 border border-white md:border-white/60 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <span className="font-body font-medium leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
                          {c.secondaryCta}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
