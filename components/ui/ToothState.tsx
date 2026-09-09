/**
 * ToothState — signature tooth illustration for "Dental, Explained."
 *
 * One molar silhouette, five clinical states that crossfade with the active
 * topic (ache → canals → crown → missing → child). Palette-restricted to the
 * design system: GC Blue, Soft Blue, Ice, Champagne, Ink. Decorative only.
 */
const TOOTH_PATH =
  "M60 16 C42 16 30 28 31 44 C32 54 36 60 37 72 C38 84 42 94 47 94 C51 94 52 84 54 76 C55.5 70 57.5 68 60 68 C62.5 68 64.5 70 66 76 C68 84 69 94 73 94 C78 94 82 84 83 72 C84 60 88 54 89 44 C90 28 78 16 60 16 Z";

export default function ToothState({
  topicId,
  theme,
}: {
  topicId: string;
  theme: string;
}) {
  return (
    /* Figure plate — frames the tooth as a specimen card and anchors the
       orbiting dashed ring, giving the left column a deliberate focal
       object instead of a floating glyph in dead space. */
    <div aria-hidden="true" className="mx-auto w-48 max-w-full lg:w-56">
      <div className="gc-float relative rounded-[2rem] border border-gc-ink/10 bg-gc-light px-7 pb-5 pt-6 shadow-[0_24px_48px_-32px_rgba(16,26,32,0.4)]">
        {/* Orbiting dashed ring — slow rotation (globals: gc-orbit);
            collapsed to its settled state under prefers-reduced-motion.
            Centered by the flex wrapper so the ring's own rotate transform
            never fights a translate. */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 120 120"
            fill="none"
            className="gc-orbit h-[8.75rem] w-[8.75rem] text-gc-blue/35"
          >
            <circle
              cx="60"
              cy="60"
              r="56"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="2.5 7"
              strokeLinecap="round"
            />
            {/* Ring satellite dot */}
            <circle cx="60" cy="4" r="2.75" fill="currentColor" />
          </svg>
        </div>
        <svg viewBox="0 0 120 120" className="relative h-auto w-full" fill="none">
        {/* Soft halo behind the tooth */}
        <circle cx="60" cy="60" r="52" fill="var(--color-gc-blue)" opacity="0.06" />

        {topicId === "tooth-pain" && (
          <g
            stroke="var(--color-gc-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={TOOTH_PATH} fill="var(--color-gc-ice)" />
            {/* Ache bolt */}
            <path d="M86 8 L74 30 L82 30 L70 52" />
            {/* Radiating ache lines */}
            <path d="M36 12 L30 5" />
            <path d="M46 8 L44 1" />
            <path d="M28 22 L19 17" />
          </g>
        )}

        {topicId === "root-canal" && (
          <g
            stroke="var(--color-gc-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={TOOTH_PATH} fill="var(--color-gc-ice)" />
            {/* Canal tracts down both roots */}
            <path d="M50 44 C50 58 48 70 47 86" strokeDasharray="4 5" />
            <path d="M70 44 C70 58 72 70 73 86" strokeDasharray="4 5" />
            {/* Nerve */}
            <circle cx="60" cy="46" r="4" fill="var(--color-gc-blue)" stroke="none" />
          </g>
        )}

        {topicId === "crowns" && (
          <g
            stroke="var(--color-gc-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={TOOTH_PATH} fill="var(--color-gc-ice)" />
            {/* Protective cap */}
            <rect
              x="31"
              y="20"
              width="58"
              height="21"
              rx="10.5"
              fill="var(--color-gc-champagne)"
              stroke="var(--color-gc-ink)"
              strokeOpacity="0.15"
            />
            {/* Cap shine */}
            <path d="M40 27 C46 24 60 23 68 25" stroke="#FFFFFF" strokeOpacity="0.7" />
          </g>
        )}

        {topicId === "missing-tooth" && (
          <g
            stroke="var(--color-gc-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Phantom tooth — dashed absence */}
            <path d={TOOTH_PATH} strokeDasharray="6 7" opacity="0.75" />
            {/* Drift arrow — neighbouring teeth move into the gap */}
            <path d="M98 56 C106 62 106 74 98 80" />
            <path d="M102 74 L98 80 L92 78" />
          </g>
        )}

        {topicId === "children" && (
          <g
            stroke="var(--color-gc-blue)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Smaller tooth */}
            <g transform="translate(12 20) scale(0.8)">
              <path d={TOOTH_PATH} fill="var(--color-gc-ice)" />
            </g>
            {/* Gentle-care heart */}
            <path
              d="M92 22 C89 16 80 18 80 24 C80 29 86 32 92 36 C98 32 104 29 104 24 C104 18 95 16 92 22 Z"
              fill="var(--color-gc-blue-soft)"
            />
            {/* Sparkle */}
            <path d="M28 6 V16" />
            <path d="M23 11 H33" />
          </g>
        )}
        </svg>
        <p className="relative mt-2 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gc-silver">
          {theme}
        </p>
      </div>
    </div>
  );
}
