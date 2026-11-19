import type { Metadata } from "next";
import { client } from "@/client.config";
import { PlainPage } from "@/components/PlainPage";
import { phoneDisplay, phoneHref } from "@/lib/phone";

/*
 * TODO(charlie): this notice describes what the site actually does
 * (one form, posted to Web3Forms, emailed to the office; no cookies, no
 * analytics). It is a plain-language starting point, not legal advice —
 * have the client read and approve it before launch.
 */

export const metadata: Metadata = {
  title: "Privacy Policy | Darren Aucoin's Plumbing",
  description: `How ${client.businessName} handles the information you send through this website.`,
  alternates: { canonical: "/privacy/" },
  robots: { index: false, follow: true },
};

const h2 = "font-display font-medium leading-[1.3] text-[24px] tracking-[-0.24px] mt-[40px] mb-[12px]";
const p = "text-[16px] leading-[1.5] mt-[12px]";

export default function Privacy() {
  return (
    <PlainPage>
      <h1 className="font-display font-medium leading-[1.2] text-[36px] tracking-[-0.36px] md:text-[52px] md:tracking-[-0.52px]">
        Privacy Policy
      </h1>
      <p className={p}>
        This notice explains what happens to information you send through this website, run by{" "}
        {client.legalName}.
      </p>

      <h2 className={h2}>What we collect</h2>
      <p className={p}>
        Only what you type into the &ldquo;Request a Service&rdquo; form: your name, email address, phone
        number, the service you need, how soon you need it, and any details you add. Nothing is collected
        unless you submit the form.
      </p>

      <h2 className={h2}>How it reaches us</h2>
      <p className={p}>
        When you submit the form, your details are sent to Web3Forms, a form-delivery service, which emails
        them to our office. We use them to reply to you and to arrange and carry out the work you asked
        about. We do not sell them or use them for marketing lists.
      </p>

      <h2 className={h2}>Cookies and tracking</h2>
      <p className={p}>
        This website sets no cookies and runs no analytics or advertising trackers. Our hosting provider,
        Cloudflare, keeps standard server logs (such as IP addresses) to deliver and protect the site.
      </p>

      <h2 className={h2}>Your choices</h2>
      <p className={p}>
        To ask what we hold about you, or to have it corrected or deleted, contact us at{" "}
        <a className="underline hover:text-teal" href={`mailto:${client.email}`}>
          {client.email}
        </a>{" "}
        or call{" "}
        <a className="underline hover:text-teal" href={phoneHref}>
          {phoneDisplay}
        </a>
        .
      </p>
    </PlainPage>
  );
}
