"use client";

/**
 * The call card — and every "Call" button that opens it.
 *
 * Deliberate behaviour carried over from the live site: on a desktop,
 * clicking Call opens this small card showing the number rather than
 * firing tel: (which on a computer just launches whatever app has
 * claimed the protocol). On a phone, Call dials.
 *
 * Every trigger is a real <a href="tel:…">, so it still dials with
 * JavaScript off; the click handler only intercepts it at desktop
 * widths.
 */
import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { client } from "@/client.config";
import { phoneDashed, phoneHref } from "@/lib/phone";
import { DESKTOP_QUERY, spring } from "@/lib/motion";

const CallCardContext = createContext<() => void>(() => {});

export function CallCardProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const show = useCallback(() => setOpen(true), []);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <CallCardContext.Provider value={show}>
      {children}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={close}
            />
            {/*
              Centred by a flex wrapper rather than translate classes:
              Framer writes `transform` inline for the scale/y spring,
              which would overwrite a -translate-1/2 centring transform.
            */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
              <motion.div
                key="card"
                role="dialog"
                aria-modal="true"
                aria-labelledby="call-card-heading"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={spring.callCard}
                className="pointer-events-auto bg-white rounded-[24px] p-[48px] shadow-2xl max-w-[500px] w-full"
              >
                <div className="flex flex-col gap-[32px] items-center text-center">
                  <div className="flex flex-col gap-[16px]">
                    <h3
                      id="call-card-heading"
                      className="font-display font-medium text-[32px] text-ink leading-[1.2] tracking-[-0.32px]"
                    >
                      {client.callCard.heading}
                    </h3>
                    <p className="font-body font-normal text-[16px] text-ink leading-[1.5]">
                      {client.callCard.body}
                    </p>
                  </div>
                  <p className="font-display font-medium text-[40px] text-blue leading-[1.2] tracking-[-0.4px]">
                    {phoneDashed}
                  </p>
                  <div className="flex flex-col gap-[12px] w-full">
                    <button
                      type="button"
                      autoFocus
                      onClick={close}
                      className="text-ink font-body font-medium text-[16px] px-[24px] py-[12px] rounded-[12px] hover:bg-gray-100 transition-colors"
                    >
                      {client.callCard.close}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </CallCardContext.Provider>
  );
}

/**
 * A tel: link that opens the call card instead at desktop widths.
 * Style it like any element; it renders an <a>.
 */
export function CallLink({
  className,
  children,
  onNavigate,
}: {
  className?: string;
  children: ReactNode;
  /** Runs on every click — e.g. closing the mobile menu. */
  onNavigate?: () => void;
}) {
  const show = useContext(CallCardContext);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (window.matchMedia(DESKTOP_QUERY).matches) {
      e.preventDefault();
      show();
    }
  };
  return (
    <a href={phoneHref} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
