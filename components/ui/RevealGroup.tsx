"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** Delay in ms before the group's staggered sequence starts. */
  delay?: number;
  /** Per-child stagger increment in ms (default 90; keep total ≤ ~700ms). */
  step?: number;
  /** Semantic wrapper — use "ul"/"ol" when the group IS the list element. */
  as?: "div" | "ul" | "ol";
};

/**
 * RevealGroup — editorial entrance sequencing with ONE IntersectionObserver
 * per group (not per child). When the group crosses ~15% visibility,
 * .is-visible is added once and CSS staggers the direct children
 * (eyebrow → heading → supporting copy → secondary elements), so large
 * heading blocks and proof lists resolve as a sequence instead of a block.
 *
 * Children must not carry their own persistent transforms (the stagger owns
 * translateY until settled). Without JS, and under prefers-reduced-motion,
 * children render fully visible and static (states are armed by
 * html.gc-motion-armed, gated on no-preference).
 */
export default function RevealGroup({
  children,
  className = "",
  delay = 0,
  step = 90,
  as = "div",
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement | null>(null);

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

  // `as` only ever widens to semantic list wrappers ("ul"/"ol") — the ref
  // attachment and effects are element-agnostic, so the cast is safe.
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={`gc-reveal-group ${className}`}
      style={{ "--gc-stagger-step": `${step}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}