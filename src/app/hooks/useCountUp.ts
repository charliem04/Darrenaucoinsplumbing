import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp
 * ----------
 * Animates a number from 0 up to `end` the first time the element
 * scrolls into view (one-time). Returns a ref to attach + the current
 * display value as a string.
 *
 * Handles the stat strings used on the site — "15+", "30 min",
 * "2000+", "3" — by splitting off any non-numeric prefix/suffix and
 * only animating the digits.
 *
 *   const years = useCountUp('15+');
 *   <p ref={years.ref}>{years.value}</p>
 *
 * Respects `prefers-reduced-motion`: jumps straight to the final value.
 */
export function useCountUp<T extends HTMLElement = HTMLParagraphElement>(
  target: string,
  options?: { durationMs?: number },
) {
  const ref = useRef<T | null>(null);
  const duration = options?.durationMs ?? 1600;

  // Split "2000+" -> prefix "", digits "2000", suffix "+"
  const match = target.match(/^(\D*)(\d[\d,]*)(.*)$/);
  const prefix = match?.[1] ?? '';
  const numeric = match ? parseInt(match[2].replace(/,/g, ''), 10) : 0;
  const suffix = match?.[3] ?? '';
  const hasComma = match?.[2].includes(',') ?? false;

  const [value, setValue] = useState(
    match ? `${prefix}0${suffix}` : target,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || !match) {
      setValue(target);
      return;
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const runCount = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic — fast start, gentle finish
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * numeric);
        const formatted = hasComma
          ? current.toLocaleString('en-US')
          : String(current);
        setValue(`${prefix}${formatted}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCount();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return { ref, value };
}
