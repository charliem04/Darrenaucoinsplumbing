import { client } from "@/client.config";
import { testimonials } from "@/content/testimonials";
import { PersonIcon, Stars } from "./Icons";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionHead } from "./SectionHead";

export function Testimonials() {
  const t = client.testimonials;
  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-navy-lift md:from-navy-deep to-navy-bar relative shrink-0 w-full"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[260px] blur-[80px] bg-[radial-gradient(ellipse,rgba(11,132,131,0.16),transparent_70%)] md:w-[600px] md:h-[400px] md:blur-[120px] md:bg-[radial-gradient(ellipse,rgba(11,132,131,0.22),transparent_70%)]"
      />

      <div className="flex flex-col items-center overflow-clip size-full">
        <div className="flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px] relative size-full">
          <Reveal className="flex flex-col gap-[80px] items-center max-w-[1280px] relative shrink-0 w-full">
            <SectionHead heading={t.heading} lede={t.lede} />
            <RevealGroup className="flex flex-col gap-[32px] items-start md:flex-row md:items-stretch relative shrink-0 w-full">
              {testimonials.map((q, idx) => (
                <RevealItem key={q.name} index={idx} className="flex-[1_0_0] min-w-px relative">
                  {/*
                    The hover lift lives on this inner layer: Framer owns
                    the outer element's transform for the reveal, and
                    would overwrite a hover translate set beside it.
                  */}
                  <figure className="bg-navy h-full relative rounded-[16px] border border-white/[0.12] shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.40)] hover:-translate-y-1 transition-all duration-300">
                    <div className="overflow-clip rounded-[inherit] size-full">
                      <div className="flex flex-col gap-[20px] p-[24px] md:gap-[24px] md:p-[32px] md:justify-between items-start relative size-full">
                        <div className="flex flex-col gap-[20px] md:gap-[24px] items-start relative shrink-0">
                          <Stars />
                          <blockquote className="font-body font-normal leading-[1.5] not-italic text-[16px] md:text-[18px] text-white">
                            {q.quote}
                          </blockquote>
                        </div>
                        <figcaption className="flex flex-col justify-center items-start md:flex-row md:items-center gap-[16px] relative shrink-0 w-full">
                          <div className="relative shrink-0 size-[48px] bg-white/[0.12] rounded-full flex items-center justify-center ring-1 ring-white/[0.18] shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)]">
                            <PersonIcon />
                          </div>
                          <div className="flex flex-col items-start leading-[1.5] not-italic relative shrink-0 w-full md:flex-[1_0_0] md:min-w-px md:shrink text-[16px] text-white">
                            <p className="font-body font-semibold relative shrink-0 w-full">{q.name}</p>
                            <p className="font-body font-normal relative shrink-0 w-full">{q.detail}</p>
                          </div>
                        </figcaption>
                      </div>
                    </div>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
