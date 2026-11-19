"use client";

import { client } from "@/client.config";
import { requestService } from "@/lib/requestService";
import { ArrowRight } from "./Icons";

/**
 * "Request this service": a link to the form (so it works without
 * JavaScript) that also pre-selects `service` in the form's dropdown.
 * See lib/requestService.ts.
 */
export function RequestButton({
  service,
  onTeal = false,
  className = "",
}: {
  service: string;
  /** White button with teal text, for use on a teal ground. */
  onTeal?: boolean;
  className?: string;
}) {
  const look = onTeal
    ? "bg-white text-teal-dark hover:bg-white/90 active:bg-white/80"
    : "bg-teal text-white hover:bg-teal-dark active:bg-teal-dark";
  return (
    <a
      href="#contact"
      onClick={() => requestService(service)}
      className={`press group inline-flex items-center gap-2 h-12 px-5 rounded font-body font-semibold ${look} ${className}`}
    >
      {client.services.tabCta}
      <ArrowRight className="size-[18px] transition-transform duration-150 ease-brand group-hover:translate-x-0.5" />
    </a>
  );
}
