import { client } from "@/client.config";
import { testimonials } from "@/content/testimonials";
import { Stars } from "./Icons";
import { Rail } from "./Rail";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SectionHead } from "./SectionHead";

/** Two letters from a name, for the reviewer's mark. */
const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export function Testimonials() {
  const t = client.testimonials;
  return (
    <Section id="testimonials" ground="navy" labelledBy="reviews-h">
      <div className="flex flex-col gap-8 md:gap-12">
        <SectionHead id="reviews-h" tone="dark" label={t.label} heading={t.heading} lede={t.lede} />
        {/* Phones: a swipe carousel. md+: three across. */}
        <Reveal>
        <Rail label={t.heading} tone="dark" gridClassName="md:grid md:grid-cols-3 md:gap-4" itemClassName="basis-[86%]">
          {testimonials.map((q) => (
            <figure key={q.name} className="flex h-full flex-col gap-6 rounded border border-white/10 bg-white/[0.03] p-6 md:p-7">
                <Stars className="text-teal-light" />
                <blockquote className="text-[1.0625rem] leading-relaxed text-white/90 text-pretty">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal/25 font-display font-semibold text-teal-light"
                  >
                    {initials(q.name)}
                  </span>
                  <span className="flex flex-col">
                    <span className="font-display font-semibold text-white">{q.name}</span>
                    <span className="text-[0.875rem] text-white/60">{q.detail}</span>
                  </span>
                </figcaption>
              </figure>

          ))}
        </Rail>
        </Reveal>
      </div>
    </Section>
  );
}
