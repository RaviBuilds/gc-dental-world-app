import Image from "next/image";
import Button from "@/components/ui/Button";
import { hero } from "@/data/home";
import { heroPatientMetric, trustSignals } from "@/data/trustSignals";
import StarRating from "@/components/ui/StarRating";

/**
 * Hero — "THE TEAM IS THE HERO" (content strategy §02, design system §12.1).
 *
 * ONE full-viewport photographic composition — no split layout, no carousel.
 * The authentic team photograph is the ENTIRE canvas: on desktop it fills the
 * viewport from top: 0 and slides behind the transparent header, so the wall,
 * the clock and the clinic room visible at the top are the photograph's OWN —
 * no artificial wall/clock layer exists.
 *
 * Desktop: one continuous GC Deep Navy gradient rises across the lower part
 * of the photograph; the message sits bottom-left, trust + CTA bottom-right.
 * Mobile: the same content stacks on ivory above the photo (approved mobile
 * recomposition) — still the same single photograph, six faces recognizable.
 */
export default function Hero() {
  return (
    <section
      id="top"
      aria-label="GC Dental World — dental clinic in Gachibowli, Hyderabad"
      className="relative isolate flex flex-col bg-gc-ivory lg:-mt-20 lg:h-[100svh] lg:min-h-[34rem]"
    >
      {/* ── Media layer — the authentic photograph IS the hero canvas.
          Desktop: it fills the section from top: 0 (behind the transparent
          header); its own wall, clock and room show naturally. ── */}
      <div className="relative order-last mt-8 aspect-[16/10] w-full overflow-hidden lg:absolute lg:inset-0 lg:order-none lg:mt-0 lg:aspect-auto">
        <div className="hero-media-scroll absolute inset-0">
          <div className="hero-settle absolute inset-0">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="hero-photo object-cover"
            />
          </div>
        </div>

        {/* Lower gradient — photographic tonal transition into GC Deep Navy
            (height is art-directed in CSS per breakpoint). */}
        <div className="hero-gradient hero-resolve absolute inset-x-0 bottom-0" aria-hidden="true" />

        {/* Mobile label + cue, embedded in the gradient */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 px-5 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-5 lg:hidden">
          <p className="small-ui text-[0.625rem] text-white/75">
            The people behind the care
          </p>
          <svg
            width="10"
            height="20"
            viewBox="0 0 10 20"
            fill="none"
            aria-hidden="true"
            className="hero-cue shrink-0 text-white/75"
          >
            <path
              d="M5 1v16m0 0 4-4m-4 4-4-4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Orbit motif — one fine GC Blue arc echoing the logo's orbital ring.
          Cropped by the hero's top-right edge so it reads as an extension of
          the brand mark, never as a floating circle. Drawn once. */}
      <svg
        viewBox="0 0 900 675"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-[5] hidden w-[clamp(320px,40vw,700px)] text-gc-blue lg:block"
      >
        <circle
          cx="1000"
          cy="900"
          r="1050"
          stroke="currentColor"
          strokeWidth="1"
          pathLength={100}
          vectorEffect="non-scaling-stroke"
          className="hero-orbit opacity-20"
        />
        <circle
          cx="430"
          cy="48"
          r="3"
          fill="currentColor"
          className="hero-orbit-dot"
        />
      </svg>

      {/* ── Copy layer — desktop: message bottom-left, trust + CTA bottom-right,
          both carried by the gradient over the photograph. Mobile: the same
          content stacks on ivory above the photo for readability. ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-[80rem] flex-1 flex-col justify-center gap-y-6 px-[clamp(1.25rem,5vw,5rem)] pb-10 pt-14 lg:absolute lg:inset-x-0 lg:bottom-0 lg:flex-none lg:flex-row lg:items-end lg:justify-between lg:gap-x-6 lg:pb-10 lg:pt-0">
        <div className="lg:max-w-[52rem]">
          <p
            className="hero-eyebrow hero-rise small-ui flex items-center gap-3 text-gc-navy lg:text-white/90"
            style={{ animationDelay: "120ms" }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-gc-blue/70" />
            {hero.eyebrow}
          </p>
          <h1
            className="hero-title hero-rise mt-4 text-gc-navy lg:w-max lg:text-gc-ivory"
            style={{ animationDelay: "220ms" }}
          >
            Dental care built <br className="hidden lg:inline" />
            around people, <br className="hidden lg:inline" />
            not just procedures.
          </h1>
          <p
            className="hero-support hero-rise mt-4 text-gc-ink/70 lg:text-white/70"
            style={{ animationDelay: "380ms" }}
          >
            {hero.support}
          </p>
        </div>

        {/* ── Bottom-right — trust + CTA (on the gradient) ── */}
        <div className="lg:flex lg:flex-col lg:items-end lg:pb-4">
          <div>
            {/* ── Gated trust metric — editorial proof strip (accumulated
                human impact, distinct from the Google rating below it).
                Renders ONLY when data/trustSignals.ts → heroPatientMetric
                has a clinic-confirmed value; collapses cleanly when null. ── */}
            {heroPatientMetric.value ? (
              <div
                className="hero-rise flex flex-col lg:items-end lg:text-right"
                style={{ animationDelay: "500ms" }}
              >
                <p className="hero-trust-num font-display text-gc-navy lg:text-gc-ivory">
                  {heroPatientMetric.value}
                </p>
                <p className="hero-trust-label text-gc-ink/70 lg:text-white/70">
                  {heroPatientMetric.label}
                </p>
                <span aria-hidden="true" className="hero-trust-rule" />
              </div>
            ) : null}

            <p
              className="hero-rise small-ui hidden text-white/70 lg:block"
              style={{ animationDelay: "500ms" }}
            >
              The people behind the care
            </p>

            <div
              className="hero-rise mt-3 flex items-center gap-3"
              style={{ animationDelay: "640ms" }}
            >
              <StarRating rating={trustSignals.ratingValue} size={15} />
              <p className="text-sm font-semibold text-gc-ink lg:text-white">
                {trustSignals.ratingValue} · {trustSignals.reviewCount}{" "}
                {trustSignals.ratingSource}
              </p>
            </div>

            {/* Mobile CTAs (on ivory) */}
            <div
              className="hero-rise mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:hidden"
              style={{ animationDelay: "500ms" }}
            >
              <Button
                href={hero.primaryCta.href}
                variant="primary"
                tone="light"
                size="lg"
                className="w-full justify-center sm:w-auto"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                tone="light"
                size="lg"
                className="w-full justify-center sm:w-auto"
                ariaLabel="Call the clinic on 070324 44510"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>

            {/* Desktop CTAs (on the deep navy gradient) */}
            <div
              className="hero-rise mt-5 hidden gap-4 lg:flex lg:items-center"
              style={{ animationDelay: "500ms" }}
            >
              <Button
                href={hero.primaryCta.href}
                variant="primary"
                tone="dark"
                size="lg"
              >
                {hero.primaryCta.label}
              </Button>
              <Button
                href={hero.secondaryCta.href}
                variant="secondary"
                tone="dark"
                size="lg"
                ariaLabel="Call the clinic on 070324 44510"
              >
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
