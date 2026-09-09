import Image from "next/image";

/**
 * ExperienceMedia — layered editorial photo composition for the Experience
 * section's 01/02 rows ("LISTEN" / "EXPLAIN"). Mirrors the ExplainerMedia
 * stack from "Dental, Explained." so the whole site shares one photographic
 * voice — same fan-apart scroll motion via the shared `explainer-*` drift
 * classes in globals.css (progressive enhancement: static without support,
 * collapsed under prefers-reduced-motion).
 *
 * Layers (back → front):
 *   1. Dental-arch line art — masked GC Blue field bleeding past the frame
 *   2. Dot grid — counter-corner texture
 *   3. Dashed echo frame — counter-rotated outline behind the photo
 *   4. Photograph — editorial crop, asymmetric corner radius, deep shadow
 *   5. Glassy caption chip — row theme (e.g. "LISTEN"), top corner
 *   6. Sparkle marks — champagne star + blue plus
 *   7. Solid corner accent — peeking bottom corner
 *
 * `flip` mirrors the silhouette for the alternating row rhythm. Offsets stay
 * inside the container gutter on mobile (no horizontal overflow).
 *
 * Optional extensions (opt-in, default off — Experience rows predate them):
 *   - `interactive`: hover language — photo scales 1.02 and the caption chip
 *     nudges up, transform-only, under a `group/med` wrapper.
 *   - `aspectClass`: override the photo box aspect (e.g. "aspect-[3/2]" so a
 *     wide source shows full-frame instead of an accidental side-crop).
 *   - `imgPosition`: object-position utility (default "object-top").
 *   - `accentOffset`: pushes the solid corner accent further out so it peeks
 *     clear of the photo instead of colliding with a tight corner (the drift
 *     animation only moves it via transform, so inset utilities compose).
 *   - `onDark`: retunes layer colors for navy/dark section backgrounds (the
 *     blue dot grid and dashed echo frame are invisible on gc-navy). Only
 *     colors change — geometry, drift and hover behave identically.
 */
export default function ExperienceMedia({
  image,
  label,
  flip = false,
  interactive = false,
  aspectClass = "aspect-[4/3]",
  imgPosition = "object-top",
  accentOffset = false,
  onDark = false,
}: {
  image: { src: string; alt: string };
  label: string;
  flip?: boolean;
  interactive?: boolean;
  aspectClass?: string;
  imgPosition?: string;
  accentOffset?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className={`relative ${interactive ? "group/med" : ""}`}>
      {/* 1 · Dental-arch line art — backmost layer, bleeding past the top */}
      <div
        aria-hidden="true"
        className={`explainer-arch gc-arch-mask pointer-events-none absolute -top-14 aspect-[1200/1000] w-[42%] opacity-[0.12] ${
          flip ? "-right-4 sm:-right-8" : "-left-4 sm:-left-8"
        }`}
      />

      {/* 2 · Dot grid — counter-corner texture */}
      <svg
        aria-hidden="true"
        viewBox="0 0 80 80"
        fill="currentColor"
        className={`explainer-dots absolute -bottom-6 h-20 w-20 ${
          flip ? "-left-4 sm:-left-7" : "-right-4 sm:-right-7"
        } ${onDark ? "text-gc-blue-soft/35" : "text-gc-blue/25"}`}
      >
        {Array.from({ length: 5 }).flatMap((_, row) =>
          Array.from({ length: 5 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={8 + col * 16}
              cy={8 + row * 16}
              r="1.6"
            />
          )),
        )}
      </svg>

      {/* 3 · Dashed echo frame — counter-rotated outline behind the photo */}
      <div
        aria-hidden="true"
        className={`explainer-frame absolute -inset-3 rounded-[2rem] border-2 border-dashed ${
          onDark ? "border-gc-light/25" : "border-gc-blue/40"
        }`}
      />

      {/* 4 · Photograph — editorial crop, asymmetric corner radius */}
      <div
        className={`relative ${aspectClass} overflow-hidden bg-gc-stone shadow-[0_28px_56px_-28px_rgba(16,26,32,0.3)] ${
          flip ? "rounded-2xl rounded-bl-[3rem]" : "rounded-2xl rounded-br-[3rem]"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className={`object-cover ${imgPosition}${
            interactive
              ? " transition-transform duration-700 ease-[var(--ease-soft)] group-hover/med:scale-[1.02]"
              : ""
          }`}
        />
      </div>

      {/* 5 · Glassy caption chip — row theme, top corner */}
      <div
        className={`explainer-chip absolute top-4 ${
          flip ? "right-4" : "left-4"
        } flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-md${
          interactive
            ? " transition-transform duration-300 ease-[var(--ease-soft)] group-hover/med:-translate-y-0.5"
            : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gc-blue" />
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gc-ink/80">
          {label}
        </span>
      </div>

      {/* 6 · Sparkle marks — champagne star + blue plus */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`explainer-spark absolute -top-4 h-6 w-6 ${
          flip ? "-right-3" : "-left-3"
        } text-gc-champagne`}
      >
        <path d="M12 2l1.9 8.1L22 12l-8.1 1.9L12 22l-1.9-8.1L2 12l8.1-1.9z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className={`explainer-spark-b absolute -bottom-4 h-4 w-4 ${
          flip ? "-left-6 sm:-left-9" : "-right-6 sm:-right-9"
        } text-gc-blue/50`}
      >
        <path d="M12 4v16M4 12h16" />
      </svg>

      {/* 7 · Solid corner accent — peeking bottom corner (accentOffset pushes
          it clear of a tight photo corner instead of colliding) */}
      <div
        aria-hidden="true"
        className={`explainer-accent absolute h-20 w-20 rounded-2xl bg-gc-blue-soft ${
          flip
            ? `${accentOffset ? "-bottom-7 -right-7" : "-bottom-3 -right-3"} rounded-br-[2.5rem]`
            : `${accentOffset ? "-bottom-7 -left-7" : "-bottom-3 -left-3"} rounded-bl-[2.5rem]`
        }`}
      />
    </div>
  );
}
