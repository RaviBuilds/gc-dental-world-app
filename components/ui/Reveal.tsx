"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the reveal transition starts. */
  delay?: number;
  /** Vertical rise in px. Default 14; use 8–10 for quiet editorial beats. */
  distance?: number;
  /** Initial scale. Default 1; use 0.985 for image plates settling in. */
  scale?: number;
};

/**
 * IntersectionObserver reveal primitive. Wraps server-rendered content so
 * sections never become client components. Hidden initial states are armed by
 * html.gc-motion-armed (set pre-paint only when JS + motion are available), so
 * content is fully visible without JS and under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  distance,
  scale,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => el.classList.add("is-visible"), delay);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const style = {
    ...(distance !== undefined ? { "--gc-reveal-y": `${distance}px` } : null),
    ...(scale !== undefined ? { "--gc-reveal-s": String(scale) } : null),
  } as CSSProperties;

  return (
    <div ref={ref} className={`gc-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
