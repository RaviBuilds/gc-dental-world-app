import type { ReactNode } from "react";

/**
 * Highlight — creative, non-bold emphasis for editorial paragraphs (site-wide).
 *
 * Exactly two variants, per the site-wide highlight rules:
 *
 *   brush     — rough BLUE brush swash behind a SINGLE word (brand moments;
 *               never on multi-word phrases)
 *   underline — hand-drawn CHAMPAGNE squiggle under a 2–4 word set; the one
 *               underline color everywhere, light and navy sections alike
 *
 * Motion: ONE-SHOT entrance fill (see HighlightMotion + globals.css).
 * While <html> is armed, both variants start undrawn and fill once —
 * underline sweeps 0→100%, brush grows 0→100% + fades in — when the
 * HighlightMotion observer reports the phrase crossing the ~88% viewport
 * line. No JS or reduced motion → fully painted, static, always.
 *
 * Decoration is purely visual and never read by screen readers: the underline
 * is a background paint and the brush SVG is aria-hidden.
 */
export type HighlightVariant = "brush" | "underline";

type HighlightProps = {
  variant?: HighlightVariant;
  onDark?: boolean;
  children: ReactNode;
};

export default function Highlight({
  variant = "underline",
  onDark = false,
  children,
}: HighlightProps) {
  if (variant === "brush") {
    // Brush — single word only by rule. A tight 0.15rem horizontal bleed reads
    // as ink spread; the wider bleed previously let decoration sit on blank
    // space when phrases wrapped (brush no longer takes phrases at all).
    return (
      <span data-gc-hl="brush" className="relative inline-block whitespace-normal">
        <svg
          aria-hidden="true"
          viewBox="0 0 200 40"
          preserveAspectRatio="none"
          className={`gc-hl-brush-fill pointer-events-none absolute -inset-x-[0.15rem] inset-y-0 h-[calc(100%+0.2rem)] w-[calc(100%+0.3rem)] ${
            onDark ? "text-gc-blue-soft/30" : "text-gc-blue/20"
          }`}
          fill="currentColor"
        >
          <path d="M8 27 C 28 16 62 11 100 13 C 138 15 168 11 192 17 C 197 19 198 24 193 27 C 170 33 128 36 86 35 C 50 34 18 33 8 30 C 5 29 6 28 8 27 Z" />
          <path
            d="M16 21 C 48 14 96 12 152 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.55"
          />
        </svg>
        <span className="relative">{children}</span>
      </span>
    );
  }

  // Underline — champagne squiggle painted per LINE FRAGMENT via
  // box-decoration-clone (see .gc-hl-underline in globals.css), so it can
  // never stretch across blank space when a phrase wraps.
  return (
    <span data-gc-hl="underline" className="gc-hl-underline">
      {children}
    </span>
  );
}
