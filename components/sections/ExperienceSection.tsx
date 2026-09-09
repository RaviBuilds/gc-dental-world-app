import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialRow from "@/components/ui/EditorialRow";
import ExperienceMedia from "@/components/ui/ExperienceMedia";
import RichText from "@/components/ui/RichText";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import ReviewThemes from "@/components/interactive/ReviewThemes";
import { experience } from "@/data/home";
import { trustSignals } from "@/data/trustSignals";
import { reviewThemes, reviewThemesIntro } from "@/data/reviewThemes";

/**
 * Experience section (content strategy §06, refined) — "Dental care feels
 * different when you know what to expect."
 *
 * Three-part editorial philosophy — LISTEN → EXPLAIN → CARE:
 *   01 Your concern is heard first        (consultation photo)
 *   02 Everything is explained, in plain language (explanation photo)
 *   03 Care continues beyond the chair    (text-led closing beat —
 *      intentionally quieter, full-width, asymmetric 4/7 grid)
 *
 * Visual treatment (parity with "Dental, Explained."):
 *  - AMBIENT layer at section scale (all aria-hidden, pointer-events-none):
 *    orbital arcs, ghosted dental-arch watermark, soft radial wash — with
 *    slow scroll-drift via the shared `explainer-bg-*` classes.
 *  - Photos render through ExperienceMedia (7-layer composition, shared
 *    `explainer-*` fan-apart drift) instead of the raw image box.
 *  - Narrative paragraphs render through RichText: creative inline
 *    highlights (brush swash / hand-drawn underline / champagne squiggle)
 *    guide the eye — words are styled, never re-written.
 *
 * Review themes (§07 "What patients remember") close the section on the navy
 * panel as the evidence layer. Content integrity: LISTEN/EXPLAIN/CARE themes
 * are REVIEW-DERIVED; follow-up is never a clinic-wide promise (§06 marks it
 * NEEDS-CLINIC-CONFIRMATION) — the closing copy keeps it conditional and
 * review-attributed. Process cues are decorative marginalia (aria-hidden).
 */
export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      tone="ivory"
      labelledBy="experience-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content) ── */}
      {/* A · Concentric orbital arcs — brand echo, cropped by the section edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 900"
        fill="none"
        className="explainer-bg-arcs pointer-events-none absolute -left-[24rem] top-[38%] z-0 w-[min(75vw,54rem)] text-gc-blue opacity-[0.07]"
      >
        <circle cx="450" cy="450" r="300" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="448" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* B · Dental-arch watermark — ghosted line art behind the heading */}
      <div
        aria-hidden="true"
        className="explainer-bg-arch gc-arch-mask pointer-events-none absolute -top-10 right-0 z-0 aspect-[1200/1000] w-[min(42vw,32rem)] opacity-[0.05]"
      />

      {/* C · Soft radial wash — tonal bloom behind the second photo's corner */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -left-48 top-[46%] z-0 h-[36rem] w-[36rem] rounded-full"
      />

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
        <Reveal>
          <SectionLabel>The GC Dental World experience</SectionLabel>
          <h2 id="experience-heading" className="h2-display measure-wide text-gc-ink">
            {experience.heading}
          </h2>
          <div className="measure mt-6 text-gc-ink/70">
            <p className="lead">
              <RichText>{experience.intro[0]}</RichText>
            </p>
            <p className="mt-4 leading-relaxed">
              <RichText>{experience.intro[1]}</RichText>
            </p>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-14 md:mt-16 md:gap-20">
          <Reveal>
            <EditorialRow
              number={experience.rows[0].number}
              title={experience.rows[0].title}
              image={experience.rows[0].image}
              imageCols="lg:col-span-5"
              textCols="lg:col-span-7"
              media={
                <ExperienceMedia
                  image={experience.rows[0].image}
                  label={experience.rows[0].cue[0]}
                />
              }
              meta={<ProcessCue steps={experience.rows[0].cue} />}
            >
              <RichText>{experience.rows[0].copy}</RichText>
            </EditorialRow>
          </Reveal>
          <Reveal>
            <EditorialRow
              number={experience.rows[1].number}
              title={experience.rows[1].title}
              image={experience.rows[1].image}
              reverse
              mobileImageFirst
              imageCols="lg:col-span-5"
              textCols="lg:col-span-7"
              media={
                <ExperienceMedia
                  image={experience.rows[1].image}
                  label={experience.rows[1].cue[0]}
                  flip
                />
              }
              meta={<ProcessCue steps={experience.rows[1].cue} />}
            >
              <RichText>{experience.rows[1].copy}</RichText>
            </EditorialRow>
          </Reveal>
        </div>

        {/* Closing beat — 03 · CARE. Text-led editorial bridge: no image,
            asymmetric 4/7 grid, deliberately slower rhythm than the rows.
            A ghost numeral keeps the beat alive without competing with 01/02. */}
        <Reveal>
          <div className="relative mt-16 border-t border-gc-ink/10 pt-10 md:mt-20 md:pt-12">
            <span
              aria-hidden="true"
              className="gc-ghost-numeral pointer-events-none absolute -top-14 right-0 select-none font-display text-[7rem] leading-none text-gc-blue/[0.07] md:-top-20 md:text-[11rem]"
            >
              03
            </span>
            <div className="relative grid gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl text-gc-blue"
                >
                  {experience.closing.number}
                </span>
                <h3 className="h3-display mt-3 text-gc-ink">
                  {experience.closing.title}
                </h3>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <p className="measure text-gc-ink/80">
                  <RichText>{experience.closing.copy}</RichText>
                </p>
                <ProcessCue steps={experience.closing.cue} className="mt-6" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* What patients remember — navy submodule (§07), DETACHED POSTCARD
            composition matching AuthorityModule (§15): the contained,
            asymmetrically-rounded panel sits on the ivory flow instead of a
            flat full-width band. .trust-panel owns the scroll-driven
            enter/exit transform (same keyframes as §15 — each panel gets its
            own view() timeline); TiltCard nests INSIDE it so the hover tilt
            never fights that animation. Ambient layers echo the trust panel.
            The Google card below presents the VERIFIED aggregates as a source
            artifact; the Trust Band keeps its editorial proof-strip role. No
            JSON-LD aggregateRating (lib/seo.ts rule). */}
        <div className="trust-panel relative mt-16 md:mt-20">
          <TiltCard
            className="overflow-hidden rounded-[2.5rem] rounded-bl-[4rem] bg-gc-navy shadow-[0_48px_96px_-48px_rgba(16,26,32,0.45)]"
            shadowClassName="rounded-[2.5rem] rounded-bl-[4rem]"
          >
            {/* Ambient background layers — navy never reads as a flat fill.
                Same trio as the trust panel, tuned for the tablist layout.
                All decorative, non-interactive, clipped by the panel. */}
            <div
              aria-hidden="true"
              className="trust-arch pointer-events-none absolute -top-24 -right-16 aspect-[1200/1000] w-[45%] opacity-[0.08]"
            />
            <div
              aria-hidden="true"
              className="trust-sheen gc-radial-wash pointer-events-none absolute -top-36 left-1/3 h-96 w-96 opacity-20"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 80 80"
              fill="currentColor"
              className="pointer-events-none absolute -bottom-8 -left-6 h-24 w-24 text-gc-blue-soft/25"
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

            <div className="relative px-6 py-14 sm:px-10 md:px-14 md:py-20">
              <div className="mb-8">
                <SectionLabel tone="light">
                  From {trustSignals.reviewCount} Google reviews
                </SectionLabel>
              </div>
              <ReviewThemes themes={reviewThemes} intro={reviewThemesIntro} />
            </div>
          </TiltCard>
        </div>
      </div>
    </Section>
  );
}

/**
 * ProcessCue — small uppercase editorial marginalia (LISTEN → UNDERSTAND …).
 * Decorative/structural annotation only: aria-hidden, no containers, no
 * icons; arrows sit inside the text's own size and weight.
 */
function ProcessCue({
  steps,
  className = "",
}: {
  steps: readonly string[];
  className?: string;
}) {
  return (
    <p aria-hidden="true" className={`small-ui text-[0.6875rem] text-gc-blue ${className}`}>
      {steps.map((step, i) => (
        <span key={step}>
          {i > 0 && (
            <span aria-hidden="true" className="mx-2 text-gc-blue/40">
              →
            </span>
          )}
          {step}
        </span>
      ))}
    </p>
  );
}
