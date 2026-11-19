import { client } from "@/client.config";
import { About } from "@/components/About";
import { BookingBand } from "@/components/BookingBand";
import { CallCardProvider } from "@/components/CallCard";
import { Contact } from "@/components/Contact";
import { FaqList } from "@/components/FaqList";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Pipe } from "@/components/Pipe";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { TrustStrip } from "@/components/TrustStrip";

/**
 * The one page. Running order follows the visitor's questions:
 *
 *   Can you help me, right now?   Hero — what, where, the number
 *   Should I trust you?           TrustStrip — years, trucks, response, homes
 *   Do you do my job?             Services
 *   Are you equipped for it?      About (equipment)
 *   What do others say?           Testimonials
 *   What about price / area?      FAQ
 *   OK — how do I reach you?      Contact: details and the form together
 *
 * Sections read their copy from client.config.ts and content/; this
 * file is only the order.
 */
export default function Home() {
  return (
    <CallCardProvider>
      <div id="top" className="relative w-full overflow-x-clip">
        {/* Hidden until a keyboard user tabs to it; jumps past the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
        >
          {client.nav.skip}
        </a>
        <Nav />
        <Pipe />
        <main id="main">
          <Hero />
          <TrustStrip />
          <Services />
          <About />
          <Testimonials />
          <FaqList />
          {/* Renders nothing while client.booking.provider is "none". */}
          <BookingBand />
          <Contact />
        </main>
        <Footer />
      </div>
      <JsonLd />
    </CallCardProvider>
  );
}
