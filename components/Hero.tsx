import Image from "next/image";
import { client } from "@/client.config";
import { framing } from "@/lib/framing";
import { phoneDisplay } from "@/lib/phone";
import { Button } from "./Button";
import { FlowLines } from "./FlowLines";
import type { CSSProperties } from "react";

/** The truck. Rendered in one of two slots depending on width (below). */
function HeroPhoto({ className = "" }: { className?: string }) {
  return (
    <div className={`hero-fade relative ${className}`}>
      {/* A 4px teal frame — a ring (box-shadow), so it adds no layout. */}
      <div className="relative overflow-hidden rounded ring-4 ring-teal-light bg-navy-deep">
        <Image
          alt={client.hero.imageAlt}
          src="/images/hero.webp"
          width={903}
          height={508}
          priority
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="block w-full h-auto"
          {...framing("hero")}
        />
      </div>
    </div>
  );
}

/**
 * The opening band: what DA does, the number to call, and the truck.
 *
 * Stacked (phones and tablets, below lg): headline, then the truck right
 * under it, then the availability line, the intro and the buttons — the
 * photo anchors the headline instead of trailing after the buttons.
 * lg+: text on the left, the truck beside it.
 *
 * The photo has a slot in each layout and CSS shows one; both point at
 * the same file, so it is downloaded once.
 */
export function Hero() {
  const h = client.hero;
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      <FlowLines />
      <div className="relative px-5 md:px-10 lg:px-24 pt-10 pb-14 md:pt-16 md:pb-20">
        <div className="mx-auto max-w-content grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 items-center">
          <div className="flex flex-col gap-6">
            {/* Headline, (stacked: the truck), then the availability line. */}
            <div className="flex flex-col gap-5 lg:gap-4">
              <div className="hero-rise" style={{ "--d": "0.05s" } as CSSProperties}>
                <h1 className="font-display font-bold text-d-1 text-balance max-w-[16ch]">{h.headline}</h1>
              </div>
              <HeroPhoto className="lg:hidden" />
              <div className="hero-rise" style={{ "--d": "0.12s" } as CSSProperties}>
                {/* The one green on the page means "available". */}
                <p className="inline-flex items-center gap-2.5 font-body font-medium text-[1rem] text-white/85">
                  <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
                    <span className="ping-soft absolute inset-0 rounded-full bg-green-lift" />
                    <span className="relative size-2.5 rounded-full bg-green-lift" />
                  </span>
                  {client.callCard.body}
                </p>
              </div>
            </div>
            <div className="hero-rise" style={{ "--d": "0.19s" } as CSSProperties}>
              <p className="text-[1.0625rem] md:text-lg leading-relaxed text-white/75 max-w-[54ch] text-pretty">
                {h.body}
              </p>
            </div>
            <div className="hero-rise flex flex-wrap gap-3 pt-2" style={{ "--d": "0.26s" } as CSSProperties}>
              <Button variant="primary" call icon>
                {h.primaryCta} <span className="tabular">{phoneDisplay}</span>
              </Button>
              <Button variant="ghost" href="#contact">
                {h.secondaryCta}
              </Button>
            </div>
          </div>

          <HeroPhoto className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
