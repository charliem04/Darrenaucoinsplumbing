import type { Metadata } from "next";
import { PlainPage } from "@/components/PlainPage";

export const metadata: Metadata = {
  title: "Page not found | Darren Aucoin's Plumbing",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <PlainPage>
      <h1 className="font-display font-medium leading-[1.2] text-[36px] tracking-[-0.36px] md:text-[52px] md:tracking-[-0.52px]">
        Page not found
      </h1>
      <p className="mt-[24px] text-[16px] md:text-[18px] leading-[1.5]">
        That page doesn&rsquo;t exist. Everything we do is on the home page.
      </p>
      <a
        href="/"
        className="press inline-flex mt-8 items-center justify-center h-12 px-5 rounded border border-white/30 hover:bg-white/[0.06] active:bg-white/10 font-semibold"
      >
        Back to the home page
      </a>
    </PlainPage>
  );
}
