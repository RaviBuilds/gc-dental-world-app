import type { ReactNode } from "react";

/**
 * JourneyGlyph — one hand-rolled, minimal line-art glyph per concern-to-care
 * step (content strategy §12). Same editorial line language as ThemeGlyph:
 * inline SVG only — no icon library — so the strokes match the orbital arcs
 * and squiggle underline used across the site. Glyph keys mirror the `glyph`
 * field on careJourney.steps; unknown ids fall back to the understand glyph.
 * Always rendered aria-hidden — purely decorative.
 */
const GLYPHS: Record<string, ReactNode> = {
  /* Speech bubble with a question — the patient describes the problem. */
  understand: (
    <>
      <path d="M4.5 5.5h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4.5 4v-4h-1a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <path d="M10.4 9.7c.2-.9 1-1.6 2-1.6 1.1 0 2 .8 2 1.8 0 1.3-1.9 1.4-1.9 2.7" />
      <path d="M12.4 15.3h.01" />
    </>
  ),
  /* Magnifier — the clinical examination finds the cause. */
  examine: (
    <>
      <circle cx="11" cy="11" r="5.5" />
      <path d="m15.1 15.1 4.4 4.4" />
    </>
  ),
  /* Clipboard with lines — findings and options, written down. */
  explain: (
    <>
      <path d="M9.5 4.5h5v2.5h-5z" />
      <path d="M14.5 5.5h2.5a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1H9.5" />
      <path d="M9.5 11.5h5M9.5 14.5h3.5" />
    </>
  ),
  /* Circle with check — a considered decision, agreed together. */
  decide: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8.6 12.3 2.3 2.2 4.5-4.8" />
    </>
  ),
  /* Tooth line art — the treatment itself. */
  treat: (
    <path d="M12 5.7c-1.5-1.2-3-1.6-4.4-.9C5.9 5.6 5 7.4 5 9.4c0 3.6 1.8 10.1 3.4 10.1 1.4 0 1.1-4.3 3.6-4.3s2.2 4.3 3.6 4.3c1.6 0 3.4-6.5 3.4-10.1 0-2-.9-3.8-2.6-4.6-1.4-.7-2.9-.3-4.4.9Z" />
  ),
  /* Calendar — follow-up and ongoing care. */
  review: (
    <>
      <path d="M6 6.5h12a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Z" />
      <path d="M8.5 4.5v4M15.5 4.5v4M5 10.5h14" />
    </>
  ),
};

export default function JourneyGlyph({
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
      {GLYPHS[id] ?? GLYPHS.understand}
    </svg>
  );
}
