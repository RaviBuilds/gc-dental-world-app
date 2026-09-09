"use client";

import { useEffect } from "react";

/**
 * HighlightMotion — ONE-SHOT entrance fill for editorial highlights
 * (see [data-gc-hl] rules in globals.css).
 *
 * Works in every browser (no scroll-driven-animation support needed):
 * an IntersectionObserver with a -12% bottom rootMargin draws each
 * highlight exactly once, as it crosses the ~88% viewport line. The
 * .gc-hl-drawn class is never removed, so highlights stay filled when
 * scrolled past and back. A MutationObserver catches highlights added
 * after mount (topic tabs, accordion panels). Skipped entirely under
 * prefers-reduced-motion or without IntersectionObserver — those users
 * get static, always-drawn highlights (html never stays armed).
 */
export default function HighlightMotion() {
  useEffect(() => {
    const root = document.documentElement;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      root.classList.remove("gc-hl-armed");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("gc-hl-drawn");
            io.unobserve(entry.target);
          }
        }
      },
      // Trigger at the ~88% viewport line: fill starts as the phrase
      // enters at the bottom edge and completes shortly after.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    const observeAll = () => {
      document
        .querySelectorAll("[data-gc-hl]:not(.gc-hl-drawn)")
        .forEach((el) => io.observe(el));
    };
    observeAll();

    // Class-only mutations (gc-hl-drawn) don't fire here — childList only.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
