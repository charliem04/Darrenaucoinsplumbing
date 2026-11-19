import { About } from "@/components/About";
import { BookingBand } from "@/components/BookingBand";
import { CallCardProvider } from "@/components/CallCard";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";

/**
 * The one page, top to bottom in the live site's order. Each section
 * reads its own copy from client.config.ts and content/; nothing here
 * but the running order.
 */
export default function Home() {
  return (
    <CallCardProvider>
      <div id="top" className="flex flex-col items-start relative w-full overflow-x-clip">
        <Nav />
        <main className="flex flex-col w-full">
          <Hero />
          <Services />
          <About />
          <Testimonials />
          <Stats />
          <CtaBand />
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
