import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal
 * ----------------
 * Returns a ref + boolean. Attach the ref to any element; `isVisible`
 * flips to true the first time that element scrolls into view, and
 * STAYS true (one-time reveal — it never re-hides).
 *
 * Pair it with the `.reveal` / `.reveal-visible` CSS classes in
 * animations.css, e.g.:
 *
 *   const { ref, isVisible } = useScrollReveal();
 *   <div ref={ref} className={`reveal ${isVisible ? 'reveal-visible' : ''}`}>
 *
 * Respects `prefers-reduced-motion`: if the user has it set, the element
 * is considered visible immediately so nothing is hidden behind an
 * animation that will never play.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string },
) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion — show immediately, skip the observer entirely.
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    // Fallback for very old browsers without IntersectionObserver.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // one-time — stop watching
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, isVisible };
}
