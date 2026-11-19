import type { ReactNode } from "react";
import { CallCardProvider } from "./CallCard";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

/**
 * Frame for the two pages that are not the home page (privacy, 404):
 * the same nav and footer, with their links pointing back to the home
 * page's sections, around a plain navy text column.
 */
export function PlainPage({ children }: { children: ReactNode }) {
  return (
    <CallCardProvider>
      <div className="flex flex-col items-start relative w-full overflow-x-clip min-h-screen">
        <Nav base="/" />
        <main className="bg-navy w-full flex-1 flex flex-col items-center px-[20px] py-[64px] md:px-[64px] md:py-[112px]">
          <div className="max-w-[768px] w-full text-white font-body">{children}</div>
        </main>
        <Footer base="/" />
      </div>
    </CallCardProvider>
  );
}
