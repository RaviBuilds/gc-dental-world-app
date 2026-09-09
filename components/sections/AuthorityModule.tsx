import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import ArrowLink from "@/components/ui/ArrowLink";
import ExperienceMedia from "@/components/ui/ExperienceMedia";
import TiltCard from "@/components/ui/TiltCard";
import { authority } from "@/data/home";

/**
 * Real-World Trust — PV Sindhu module (§15).
 * Photograph-backed factual framing only. No endorsement, official-dentist
 * relationship, celebrity or athlete-trust claims. Exact relationship wording
 * is pending clinic confirmation (NEEDS-CLINIC-CONFIRMATION).
 *
 * DETACHED POSTCARD composition — the navy content is a contained,
 * asymmetrically-rounded panel sitting on the ivory flow (not a full-bleed
 * band), so the sections above and below wrap around it. Scroll-driven
 * choreography lives in globals.css ("Trust panel"): the panel straightens
 * itself on entry, lifts and re-tilts on exit, the copy column counter-
 * drifts, and the arch/sheen layers move at their own rates — pure CSS,
 * static without support and under prefers-reduced-motion.
 *
 * Media reuses ExperienceMedia (shared photographic voice) with `onDark`
 * retuned layers; the photo stack keeps its own fan-apart drift + hover.
 */
export default function AuthorityModule() {
  return (
    <section id="trust" aria-labelledby="authority-heading" className="overflow-x-clip">
      <div className="gc-container py-20 md:py-28">
        {/* .trust-panel owns the scroll-driven enter/exit transform; the
            visual card nests inside TiltCard so the hover tilt (JS-driven
            vars) never fights that animation. */}
        <div className="trust-panel relative">
          <TiltCard
            className="overflow-hidden rounded-[2.5rem] rounded-bl-[4rem] bg-gc-navy shadow-[0_48px_96px_-48px_rgba(16,26,32,0.45)]"
            shadowClassName="rounded-[2.5rem] rounded-bl-[4rem]"
          >
          {/* Ambient background layers — navy never reads as a flat fill.
              All decorative, non-interactive, clipped by the panel. */}
          <div
            aria-hidden="true"
            className="trust-arch pointer-events-none absolute -top-24 -right-16 aspect-[1200/1000] w-[55%] opacity-[0.08]"
          />
          <div
            aria-hidden="true"
            className="trust-sheen gc-radial-wash pointer-events-none absolute -top-36 left-1/4 h-96 w-96 opacity-20"
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

          <div className="relative grid grid-cols-1 items-center gap-12 px-6 py-14 sm:px-10 md:px-14 md:py-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              {/* Cap the photo on tablet widths so the single column
                  doesn't tower before the copy arrives. */}
              <div className="mx-auto w-full max-w-xl lg:max-w-none">
                <ExperienceMedia
                  image={authority.image}
                  label="Patient visit"
                  onDark
                  interactive
                />
              </div>
            </Reveal>
            {/* Parallax wrapper OUTSIDE Reveal — the scroll-driven drift and
                the IO entrance transition must never own the same transform. */}
            <div className="trust-copy lg:col-span-6">
              <Reveal delay={120}>
                <SectionLabel tone="light">{authority.eyebrow}</SectionLabel>
                <h2 id="authority-heading" className="h2-display text-gc-light">
                  {authority.heading}
                </h2>
                <p className="lead measure mt-6 text-gc-light/75"><RichText onDark>{authority.copy}</RichText></p>
                <p className="measure mt-6 border-l-2 border-gc-blue pl-5 text-gc-light/60">
                  {authority.privacyNote}
                </p>

                {/* Verified factual context (§15) — check icon anchors the row. */}
                <ul className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {authority.facts.map((fact, i) => (
                    <li key={fact} className="flex items-center gap-3">
                      {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gc-light/30" />}
                      {i === 0 && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="trust-check h-4 w-4 text-gc-blue-soft"
                        >
                          <path d="M4 10.5l4 4 8-9" />
                          <circle cx="10" cy="10" r="8.6" />
                        </svg>
                      )}
                      <span className="small-ui text-gc-light/70">{fact}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ArrowLink tone="light" href={authority.cta.href}>
                    {authority.cta.label}
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

