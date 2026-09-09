import Image from "next/image";
import type { Topic } from "@/data/topics";

/**
 * ExplainerMedia — layered editorial photo composition for
 * "Dental, Explained." (7 layers, back → front):
 *
 *   1. Dental-arch line art — masked GC Blue field, reuses the §12.3 asset,
 *      bleeding past the frame's top corner
 *   2. Dot grid — counter-corner texture
 *   3. Dashed echo frame — counter-rotated outline behind the photo
 *   4. Photograph — 4/3 editorial crop, asymmetric corner radius,
 *      clip-path wipe reveal on topic switch
 *   5. Glassy caption chip — topic theme, top corner
 *   6. Sparkle marks — champagne star + plus
 *   7. Solid corner accent — peeking bottom corner
 *
 * Layers 1–3, 5–6 carry scroll-driven drift classes (globals.css,
 * "Explainer media"): each layer's keyframe drifts/rotates at a different
 * rate so the stack fans apart scrolling down and converges scrolling up.
 * Transform/clip-path only; gated in CSS on
 * @supports (animation-timeline: view()) + prefers-reduced-motion.
 *
 * `flip` (per-topic, data/topics.ts) mirrors corner geometry and side
 * placement so consecutive panels alternate silhouette. Offsets are kept
 * inside the container's 5vw gutter on mobile (no horizontal overflow).
 * The caption chip sits top-corner — clear of the fixed Book pill
 * (bottom-right) at every breakpoint.
 */
export default function ExplainerMedia({ topic }: { topic: Topic }) {
  const warm = topic.tone === "warm";
  const flip = topic.flip ?? false;

  return (
    <div className="relative mb-8">
      {/* 1 · Dental-arch line art — backmost layer, bleeding past the top */}
      <div
        aria-hidden="true"
        className={`explainer-arch gc-arch-mask pointer-events-none absolute -top-16 aspect-[1200/1000] w-[44%] opacity-[0.13] ${
          flip ? "-left-4 sm:-left-10" : "-right-4 sm:-right-10"
        }`}
      />

      {/* 2 · Dot grid — counter-corner texture */}
      <svg
        aria-hidden="true"
        viewBox="0 0 80 80"
        fill="currentColor"
        className={`explainer-dots absolute -bottom-6 h-20 w-20 ${
          flip ? "-right-4 sm:-right-7" : "-left-4 sm:-left-7"
        } ${warm ? "text-gc-champagne/40" : "text-gc-blue/25"}`}
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

      {/* 3 · Dashed echo frame — counter-rotated outline behind the photo.
          Tint is topic-reactive (cool = blue, warm = champagne). */}
      <div
        aria-hidden="true"
        className={`explainer-frame absolute -inset-3 rounded-[2rem] border-2 border-dashed ${
          warm ? "border-gc-champagne/50" : "border-gc-blue/40"
        }`}
      />

      {/* 4 · Photograph — 4/3 editorial crop, top-aligned so faces survive
          the tighter crop. Wipe reveal re-runs on every topic switch. */}
      <div
        className={`explainer-photo relative aspect-[4/3] overflow-hidden bg-gc-stone shadow-[0_28px_56px_-28px_rgba(16,26,32,0.3)] ${
          flip ? "rounded-2xl rounded-bl-[3rem]" : "rounded-2xl rounded-br-[3rem]"
        }`}
      >
        <div className="gc-wipe h-full w-full">
          <Image
            src={topic.image ?? ""}
            alt={topic.imageAlt ?? ""}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* 5 · Glassy caption chip — topic theme, top corner */}
      <div
        className={`explainer-chip absolute top-4 ${
          flip ? "left-4" : "right-4"
        } flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-md`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            warm ? "bg-gc-champagne" : "bg-gc-blue"
          }`}
        />
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gc-ink/80">
          {topic.theme}
        </span>
      </div>

      {/* 6 · Sparkle marks — champagne star + blue plus */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`explainer-spark absolute -top-4 h-6 w-6 ${
          flip ? "-left-3" : "-right-3"
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
          flip ? "-right-6 sm:-right-9" : "-left-6 sm:-left-9"
        } text-gc-blue/50`}
      >
        <path d="M12 4v16M4 12h16" />
      </svg>

      {/* 7 · Solid corner accent — peeking bottom corner. Tint is
          topic-reactive; side mirrors with `flip`. */}
      <div
        aria-hidden="true"
        className={`explainer-accent absolute -bottom-3 h-20 w-20 rounded-2xl ${
          flip ? "-left-3 rounded-bl-[2.5rem]" : "-right-3 rounded-br-[2.5rem]"
        } ${warm ? "bg-gc-champagne/70" : "bg-gc-blue-soft"}`}
      />
    </div>
  );
}
