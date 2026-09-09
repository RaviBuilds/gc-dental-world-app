/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * BeforeAfterViewer — interactive before/after comparison.
 *
 * The asset is ONE authentic composite photograph, cropped to its halves via
 * 200%-offset boxes:
 *   - horizontal: before left | after right (flagship story, §08)
 *   - vertical:   before top  | after bottom (case library, §09)
 * A draggable divider (pointer + touch + keyboard, ARIA slider) wipes
 * between the halves; BEFORE/AFTER pills travel with the divider.
 *
 * One-shot reveal: when 40% visible the divider glides once (horizontal:
 * 50 → 64, vertical: 50 → 34 — both settle on the after smile), then hands
 * control to the visitor. Skipped under prefers-reduced-motion and
 * cancelled by any interaction. Without JS the SSR markup renders a static
 * 50/50 split.
 *
 * Plain <img> (not next/image) is deliberate: the offset half-crop needs a
 * 200%-wide/tall box, which fill/object-position cannot express.
 */

const MIN = 6;
const MAX = 94;

export default function BeforeAfterViewer({
  src,
  alt,
  beforeLabel = "Before",
  afterLabel = "After",
  orientation = "horizontal",
  className = "",
}: {
  src: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
  /** horizontal = side-by-side composite (before left, after right); vertical = stacked composite (before top, after bottom). */
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  const vertical = orientation === "vertical";
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const interacted = useRef(false);

  const setFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = vertical
        ? ((clientY - rect.top) / rect.height) * 100
        : ((clientX - rect.left) / rect.width) * 100;
      setPos(Math.min(MAX, Math.max(MIN, pct)));
    },
    [vertical],
  );

  /* Pointer drag — a press anywhere on the viewer starts a wipe. Intent is
     locked to the divider axis: touch-pan-y keeps page scroll untouched. */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    interacted.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClient(e.clientX, e.clientY);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging) setFromClient(e.clientX, e.clientY);
  };
  const endDrag = () => setDragging(false);

  /* Keyboard — the divider handle is a real ARIA slider. */
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    interacted.current = true;
    if (e.key === "Home") {
      e.preventDefault();
      setPos(MIN);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setPos(MAX);
      return;
    }
    const forward = vertical ? e.key === "ArrowDown" : e.key === "ArrowRight";
    const back = vertical ? e.key === "ArrowUp" : e.key === "ArrowLeft";
    if (!forward && !back) return;
    e.preventDefault();
    setPos((p) => Math.min(MAX, Math.max(MIN, p + (forward ? 4 : -4))));
  };

  /* One-shot reveal glide — plays once when 40% visible, cancelled by any
     interaction, skipped under prefers-reduced-motion (static 50/50). */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = vertical ? 34 : 64;
    let raf = 0;
    let timer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          observer.disconnect();
          if (!entry.isIntersecting || interacted.current) return;
          timer = window.setTimeout(() => {
            const start = performance.now();
            const tick = (now: number) => {
              if (interacted.current) return;
              const t = Math.min(1, (now - start) / 900);
              const eased = 1 - Math.pow(1 - t, 3);
              setPos(50 + (target - 50) * eased);
              if (t < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }, 350);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [vertical]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={`${alt} — drag or use arrow keys to compare before and after`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`relative touch-pan-y select-none overflow-hidden rounded-2xl rounded-br-[3rem] bg-gc-dark ${vertical ? "aspect-[4/3]" : "aspect-[4/5]"} ${dragging ? "cursor-grabbing" : vertical ? "cursor-ns-resize" : "cursor-ew-resize"} ${className}`}
    >
      {vertical ? (
        <>
          {/* AFTER — base layer, box shifted up to show the bottom half */}
          <img
            src={src}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[200%] w-full object-cover"
          />
          {/* BEFORE — clip-path layer on top, image anchored to the top */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: `inset(0 0 ${100 - pos}% 0)` }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="absolute inset-x-0 top-0 h-[200%] w-full object-cover"
            />
          </div>
        </>
      ) : (
        <>
          {/* AFTER — base layer, box shifted left to show the right half */}
          <img
            src={src}
            alt=""
            draggable={false}
            className="pointer-events-none absolute inset-y-0 left-[-100%] h-full w-[200%] max-w-none object-cover"
          />
          {/* BEFORE — clip-path layer on top, image anchored left */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img
              src={src}
              alt=""
              draggable={false}
              className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-cover"
            />
          </div>
        </>
      )}

      {/* Divider */}
      <div
        aria-hidden="true"
        className={`absolute z-10 bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.35)] ${
          vertical
            ? "inset-x-0 h-0.5 -translate-y-1/2"
            : "inset-y-0 w-0.5 -translate-x-1/2"
        }`}
        style={vertical ? { top: `${pos}%` } : { left: `${pos}%` }}
      />

      {/* Handle — ARIA slider */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Before and after comparison"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before`}
        aria-orientation={vertical ? "vertical" : "horizontal"}
        onKeyDown={onKeyDown}
        className={`absolute z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/15 shadow-lg backdrop-blur-sm transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gc-blue-soft ${
          vertical ? "left-1/2 cursor-ns-resize" : "top-1/2 cursor-ew-resize"
        }`}
        style={vertical ? { top: `${pos}%` } : { left: `${pos}%` }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5 text-white"
        >
          {vertical ? (
            <>
              <path d="M6 9l6-5 6 5" />
              <path d="M6 15l6 5 6-5" />
            </>
          ) : (
            <path d="M9 6l-5 6 5 6M15 6l5 6-5 6" />
          )}
        </svg>
      </div>

      {/* Travelling labels — hide when their half is nearly wiped away */}
      {vertical ? (
        <>
          <span
            className={`pointer-events-none absolute left-4 z-10 -translate-y-full rounded-full bg-gc-navy/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-opacity ${
              pos < 16 ? "opacity-0" : "opacity-100"
            }`}
            style={{ top: `calc(${pos}% - 10px)` }}
          >
            {beforeLabel}
          </span>
          <span
            className={`pointer-events-none absolute left-4 z-10 rounded-full bg-gc-blue/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-opacity ${
              pos > 84 ? "opacity-0" : "opacity-100"
            }`}
            style={{ top: `calc(${pos}% + 10px)` }}
          >
            {afterLabel}
          </span>
        </>
      ) : (
        <>
          <span
            className={`pointer-events-none absolute bottom-3 z-10 -translate-x-full rounded-full bg-gc-navy/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-opacity ${
              pos < 16 ? "opacity-0" : "opacity-100"
            }`}
            style={{ left: `calc(${pos}% - 10px)` }}
          >
            {beforeLabel}
          </span>
          <span
            className={`pointer-events-none absolute bottom-3 z-10 rounded-full bg-gc-blue/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm transition-opacity ${
              pos > 84 ? "opacity-0" : "opacity-100"
            }`}
            style={{ left: `calc(${pos}% + 10px)` }}
          >
            {afterLabel}
          </span>
        </>
      )}
    </div>
  );
}