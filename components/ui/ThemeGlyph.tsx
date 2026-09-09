import type { ReactNode } from "react";

/**
 * ThemeGlyph — one hand-rolled, minimal line-art glyph per review theme
 * (content strategy §07). Inline SVG only — no icon library — so the
 * strokes match the site's editorial line language (orbital arcs, squiggle
 * underline) instead of a stock icon set.
 *
 * Glyph keys mirror `data/reviewThemes.ts` → theme.id; unknown ids fall
 * back to the explanations glyph. Always rendered inside an aria-hidden
 * stamp — purely decorative.
 */
const GLYPHS: Record<string, ReactNode> = {
  /* Speech bubble with text lines — the explanation theme. */
  explanations: (
    <>
      <path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 4v-4h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  /* Two figures — front desk to treatment chair. */
  team: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19.5c0-3.3 2.5-5 5.5-5s5.5 1.7 5.5 5" />
      <circle cx="16.5" cy="9.5" r="2.2" />
      <path d="M16.5 14.5c2.4 0 4.3 1.5 4.3 4.3" />
    </>
  ),
  /* Shield with check — hygiene. */
  hygiene: (
    <>
      <path d="M12 3.5 18.5 6v5.2c0 4.6-3.2 7.6-6.5 8.8-3.3-1.2-6.5-4.2-6.5-8.8V6L12 3.5Z" />
      <path d="m9.2 11.6 2 2 3.6-3.8" />
    </>
  ),
  /* Armchair — comfort during treatment. */
  comfort: (
    <>
      <path d="M6.5 11.5V8a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v3.5" />
      <path d="M4.5 14.5v-1a2 2 0 0 1 4 0v1.5h7v-1.5a2 2 0 0 1 4 0v1a2.5 2.5 0 0 1-2.5 2.5H7a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M7 18v2M17 18v2" />
    </>
  ),
  /* Adult + child figures — family care. */
  family: (
    <>
      <circle cx="8.5" cy="7.5" r="2.6" />
      <path d="M3.5 19.5c0-3.4 2.2-5.3 5-5.3s5 1.9 5 5.3" />
      <circle cx="16.5" cy="10.5" r="2" />
      <path d="M14.8 19.5c0-2.7 1.1-4.2 2.9-4.2 1.7 0 2.8 1.5 2.8 4.2" />
    </>
  ),
  /* Clock — appointments and follow-up. */
  appointments: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </>
  ),
};

export default function ThemeGlyph({
  id,
  className = "",
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {GLYPHS[id] ?? GLYPHS.explanations}
    </svg>
  );
}