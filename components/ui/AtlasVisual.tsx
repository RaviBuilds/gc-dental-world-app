"use client";

import { useEffect, useRef } from "react";

/**
 * Clinical Atlas visual (treatment directory §18) — the looping
 * dental-arch atlas render presented as the section's visual centerpiece.
 * Purely decorative/illustrative: aria-hidden, not focusable, no controls,
 * no audio, no poster (the section's own Warm Ivory ground is the frame).
 *
 * The only client island in the section, justified by two behaviours CSS
 * cannot express:
 *   1. prefers-reduced-motion: reduce — the loop is continuous motion, so
 *      playback is paused and the settled first frame becomes the static
 *      fallback (the care rows and captions carry all meaning).
 *   2. Performance — playback pauses when the plate is scrolled well out
 *      of the viewport and resumes via the same observer; autoplay
 *      failures degrade silently to a quiet still first frame.
 */
export default function AtlasVisual() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Reduced motion: hold the first frame as a static illustration.
    if (reduced.matches) {
      video.pause();
      const settle = () => {
        video.currentTime = 0.001;
      };
      if (video.readyState >= 1) settle();
      else video.addEventListener("loadedmetadata", settle, { once: true });
      return;
    }

    // Play only while the plate is near the viewport; pause well outside it.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { rootMargin: "12% 0px 12% 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="atlas-figure relative mx-auto w-full max-w-md lg:-ml-[9%] lg:max-w-none lg:w-[118%]">
      {/* Row ↔ atlas relationship bloom — see .atlas-halo (globals.css) */}
      <div aria-hidden="true" className="atlas-halo" />

      {/* 4:3 editorial presentation plate; the 16:9 media is fully contained
          (object-fit: contain) so the complete dental arch is always visible. */}
      <div className="atlas-frame relative">
        <video
          ref={videoRef}
          className="atlas-video"
          src="/assets/gc-dental-world-clinical-atlas-dental-arch.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Tiny architectural annotation — same voice as the §04 journey cue */}
      <figcaption className="mt-5 flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gc-blue/80">
        <span>Clinical atlas</span>
        <span>
          Assess <span className="font-normal text-gc-ink/30">→</span> Understand{" "}
          <span className="font-normal text-gc-ink/30">→</span> Care
        </span>
      </figcaption>
    </figure>
  );
}