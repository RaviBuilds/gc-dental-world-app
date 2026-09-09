type DentalIconPatternProps = {
  /** Unique per section — SVG pattern IDs must not collide. */
  id: string;
  /** Positioning + sizing; also the ink level via a text-* color class. */
  className?: string;
};

/**
 * DentalIconPattern — decorative repeating background texture (server-safe,
 * zero JS). Tiles three house-style hand-drawn glyphs (tooth anchor plus
 * sparkle and shield satellites) in a 280x280 SVG pattern at scattered
 * rotations so consecutive tiles never grid-align.
 *
 * Ink comes from currentColor via the wrapper text-* class (e.g.
 * text-gc-blue/[0.05]); .gc-pattern-fade (globals.css) feathers the texture
 * so it is strongest low in the section and dissolves toward the top,
 * keeping display type on clean ground.
 */
export default function DentalIconPattern({
  id,
  className = "absolute inset-0",
}: DentalIconPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={`gc-pattern-fade pointer-events-none z-0 ${className}`}
    >
      <svg className="h-full w-full">
        <defs>
          <pattern id={id} width="280" height="280" patternUnits="userSpaceOnUse">
            {/* Tooth — anchor glyph, ~28px, tilted -8deg, sits low-left where
                the fade mask peaks */}
            <g transform="translate(96 128) rotate(-8) scale(1.25)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 3C5 3 3.5 4.8 3.5 7c0 2.8 1.4 4.6 2 7 .6 2.6.8 6.5 2.5 6.5 1.5 0 1.2-4.5 4-4.5s2.5 4.5 4 4.5c1.7 0 1.9-3.9 2.5-6.5.6-2.4 2-4.2 2-7 0-2.2-1.5-4-3.5-4-1.8 0-2.6 1.2-5 1.2S8.8 3 7 3Z" />
            </g>
            {/* Sparkle — upper-right satellite */}
            <g transform="translate(206 56) rotate(15) scale(0.5)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
            </g>
            {/* Shield — lower-right satellite */}
            <g transform="translate(198 216) rotate(-10) scale(0.5)" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 2.5v5c0 4.4-3 7.5-7 8.8-4-1.3-7-4.4-7-8.8v-5L12 3Z" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
