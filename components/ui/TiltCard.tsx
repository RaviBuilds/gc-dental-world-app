"use client";

import { useEffect, useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  /** Classes for the tilting card surface. */
  className?: string;
  /** Classes for the blurred shadow slab rendered behind the card. */
  shadowClassName?: string;
};

/* "Little bit" angles — the impact comes from the backside shadow moving
   against the card, not from wild rotation. */
const MAX_RX = 2.2; // deg — X bend (vertical cursor offset)
const MAX_RY = 2.8; // deg — Y bend (horizontal cursor offset)
const MAX_RZ = 0.5; // deg — Z-axis twist
const MAX_SHADOW = 14; // px — backside shadow counter-offset

/**
 * TiltCard — cursor-tracked 3D hover tilt with a dynamic backside shadow.
 *
 * Pointer position drives CSS custom properties on the wrapper; the card
 * (.tilt-surface) bends via perspective rotateX/rotateY plus a small Z twist,
 * while a blurred shadow slab (.tilt-shadow) counter-translates behind it,
 * reading as the card's cast shadow when it leans. All values ease back to
 * rest on pointerleave via the CSS transition.
 *
 * Pure transform work, rAF-throttled. Binds only on fine-pointer,
 * hover-capable devices and skips under prefers-reduced-motion — without JS
 * the vars stay 0 and the shadow simply reads as deeper ambient depth.
 * Transform ownership note: this component must NOT wrap an element that
 * carries a CSS animation on `transform` (animations always win) — nest it
 * INSIDE such an element instead (see AuthorityModule / .trust-panel).
 */
export default function TiltCard({
  children,
  className = "",
  shadowClassName = "",
}: TiltCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const apply = (
      rx: number,
      ry: number,
      rz: number,
      sx: number,
      sy: number,
      ss: number,
    ) => {
      wrap.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
      wrap.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
      wrap.style.setProperty("--tilt-rz", `${rz.toFixed(2)}deg`);
      wrap.style.setProperty("--sh-x", sx.toFixed(1));
      wrap.style.setProperty("--sh-y", sy.toFixed(1));
      wrap.style.setProperty("--sh-s", ss.toFixed(3));
    };

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      /* Normalized cursor offset from card center: -0.5 … 0.5 */
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const mag = Math.min(Math.hypot(nx, ny) * 2, 1);
        apply(
          ny * 2 * MAX_RX, // cursor top → top edge leans toward the viewer
          nx * 2 * MAX_RY,
          -nx * 2 * MAX_RZ, // slight counter-twist
          -nx * 2 * MAX_SHADOW, // shadow slides opposite the cursor side,
          -ny * 2 * MAX_SHADOW, // as if lit from the pointer
          1 + mag * 0.02,
        );
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      apply(0, 0, 0, 0, 0, 1);
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame.current);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <div
        aria-hidden="true"
        className={`tilt-shadow absolute inset-0 ${shadowClassName}`}
      />
      <div className={`tilt-surface relative ${className}`}>{children}</div>
    </div>
  );
}
