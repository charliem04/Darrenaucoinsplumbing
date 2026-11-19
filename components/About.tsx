import Image from "next/image";
import { client } from "@/client.config";
import { framing } from "@/lib/framing";
import { Button } from "./Button";
import { Reveal } from "./Reveal";
import { Section } from "./Section";
import { SectionHead } from "./SectionHead";

/** The equipment band — where "About us" lands. */
export function About() {
  const a = client.about;
  return (
    <Section id="about" ground="white" labelledBy="about-h">
      {/*
        Text on the left, photo on the right: every section heading has to
        start at the content's left edge so its pipe fitting meets the
        gutter pipe (see SectionHead).
      */}
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 items-center">
        <div className="flex flex-col gap-8">
          <SectionHead id="about-h" label={a.label} heading={a.heading} lede={a.body} />
          <div>
            <Button variant="primary" href="#contact">
              {a.cta}
            </Button>
          </div>
        </div>
        <Reveal className="relative aspect-[4/3] lg:aspect-[5/6] overflow-hidden rounded bg-ground">
          <Image
            alt={a.imageAlt}
            src="/images/equipment.webp"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            {...framing("about")}
          />
        </Reveal>
      </div>
    </Section>
  );
}
