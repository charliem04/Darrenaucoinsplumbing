"use client";

/**
 * Cloudflare Turnstile, the "are you human" check, for the request form.
 *
 * On only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. Most visitors
 * never see it ("interaction-only"): it decides in the background and
 * only shows a checkbox when it's unsure.
 *
 * The token it produces is sent with the form as `cf-turnstile-response`.
 * Checking that token needs the widget's SECRET key, which can't live in
 * a static page; Web3Forms checks it when the secret is entered in its
 * dashboard (a Web3Forms Pro feature). Without that, the widget still
 * stops bots that drive this page, but not ones that post to Web3Forms
 * directly.
 *
 * Cloudflare's script is loaded only when the form comes near the
 * screen (or a field is focused), so it costs nothing at page load.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let loading: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("no turnstile")));
    s.onerror = () => {
      loading = null; // let a later attempt retry
      reject(new Error("turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  /** A fresh token, or "" when the old one expired or failed. */
  onToken: (token: string) => void;
  /** The widget couldn't load or run (network, blocker, Cloudflare error). */
  onError: () => void;
  /** Element to watch: the widget loads when it nears the screen. */
  watch: React.RefObject<HTMLElement>;
};

export const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile({ onToken, onError, watch }, ref) {
  const box = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  // Latest callbacks without re-rendering the widget when they change.
  const cb = useRef({ onToken, onError });
  cb.current = { onToken, onError };

  useImperativeHandle(ref, () => ({
    reset: () => {
      cb.current.onToken("");
      if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
    },
  }));

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    let cancelled = false;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      cleanupTriggers();
      loadTurnstile()
        .then((ts) => {
          if (cancelled || !box.current) return;
          widget.current = ts.render(box.current, {
            sitekey: TURNSTILE_SITE_KEY,
            action: "service-request",
            appearance: "interaction-only",
            size: "flexible",
            theme: "light",
            "refresh-expired": "auto",
            callback: (token: string) => cb.current.onToken(token),
            "expired-callback": () => cb.current.onToken(""),
            "error-callback": () => {
              cb.current.onToken("");
              cb.current.onError();
            },
          });
        })
        .catch(() => !cancelled && cb.current.onError());
    };

    const target = watch.current;
    const io =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && start(), {
            rootMargin: "800px 0px",
          })
        : null;
    if (target && io) io.observe(target);
    target?.addEventListener("focusin", start);
    // No IntersectionObserver (or nothing to watch): load straight away.
    if (!io || !target) start();

    function cleanupTriggers() {
      io?.disconnect();
      target?.removeEventListener("focusin", start);
    }

    return () => {
      cancelled = true;
      cleanupTriggers();
      if (widget.current && window.turnstile) window.turnstile.remove(widget.current);
      widget.current = null;
    };
  }, [watch]);

  if (!TURNSTILE_SITE_KEY) return null;
  // Empty until Turnstile decides it needs to ask; then it holds the checkbox.
  return <div ref={box} className="sm:col-span-2 empty:hidden" />;
});
