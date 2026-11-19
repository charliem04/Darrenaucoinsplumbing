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
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 4 }}
                transition={spring.callCard}
                // The one shadow on the site: the only surface that floats.
                className="pointer-events-auto mx-5 w-full max-w-[26rem] rounded bg-white p-8 shadow-[0_24px_60px_-12px_rgb(0_26_43/0.45)]"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 id="call-card-heading" className="font-display font-semibold text-d-3 text-ink">
                      {client.callCard.heading}
                    </h3>
                    <p className="inline-flex items-center gap-2 text-ink-2">
                      <span className="size-2 rounded-full bg-green" aria-hidden="true" />
                      {client.callCard.body}
                    </p>
                  </div>
                  <p className="font-display font-bold text-[2.75rem] leading-none tabular text-ink border-y border-rule py-5">
                    {phoneDashed}
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <CopyNumber />
                    <button
                      type="button"
                      autoFocus
                      onClick={close}
                      className="press h-12 rounded border border-rule font-body font-semibold text-ink hover:bg-ground active:bg-rule/50"
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
 * On a computer there is nothing to dial with, so the useful action is
 * putting the number on the clipboard. Says "Copied" for two seconds.
 */
function CopyNumber() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(phoneDashed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (permissions, insecure context): the number is
      // on screen in 44px type, which is the fallback.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="press h-12 rounded bg-teal font-body font-semibold text-white hover:bg-teal-dark active:bg-teal-dark"
    >
      {copied ? client.callCard.copied : client.callCard.copy}
    </button>
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
