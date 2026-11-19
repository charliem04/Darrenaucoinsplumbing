"use client";

import { client } from "@/client.config";
import { requestService } from "@/lib/requestService";
import { ArrowRight } from "./Icons";

/**
 * "Request this service": a link to the form (so it works without
 * JavaScript) that also pre-selects `service` in the form's dropdown.
 * See lib/requestService.ts.
 */
export function RequestButton({ service, className = "" }: { service: string; className?: string }) {
  return (
    <a
      href="#contact"
      onClick={() => requestService(service)}
      className={`press group inline-flex items-center gap-2 h-12 px-5 rounded bg-teal hover:bg-teal-dark active:bg-teal-dark font-body font-semibold text-white ${className}`}
    >
      {client.services.tabCta}
      <ArrowRight className="size-[18px] transition-transform duration-150 ease-brand group-hover:translate-x-0.5" />
    </a>
  );
}
