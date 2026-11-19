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
        className="inline-flex mt-[32px] items-center justify-center px-[12px] py-[6px] rounded-[12px] border border-white/20 hover:bg-white/10 transition-colors font-medium"
      >
        Back to the home page
      </a>
    </PlainPage>
  );
}
