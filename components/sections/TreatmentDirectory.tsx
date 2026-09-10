import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RevealGroup from "@/components/ui/RevealGroup";
import ArrowLink from "@/components/ui/ArrowLink";
import RichText from "@/components/ui/RichText";
import TreatmentList from "@/components/ui/TreatmentList";
import AtlasVisual from "@/components/ui/AtlasVisual";
import DentalIconPattern from "@/components/ui/DentalIconPattern";
import { treatmentsIntro, treatmentCategories } from "@/data/treatments";
import { bookAppointmentHref } from "@/data/navigation";

/**
 * Treatment directory (content strategy section 18) — "Clinical Atlas"
 * presentation. ONE clinical visual (the looping dental-arch atlas render,
 * AtlasVisual) + SIX canonical care areas as an indexed editorial list.
 * Deliberately NOT a card grid: the atlas is the section's centerpiece, the
 * rows are its interactive index.
 *
 * Ambient layer (all aria-hidden, static without JS — house trio, ivory
 * tone, grouped in a single negative-z wrapper so the atlas video's
 * multiply blend still sees the section ground):
 *   A. Dental icon pattern — glyph texture, ink lowered so it never
 *      competes with the atlas render
 *   B. Concentric orbital arcs — brand echo, cropped by the section edge
 *   C. Radial wash — tonal bloom behind the atlas plate
 * Rows expand to general-educational detail (client island: TreatmentList);
 * the atlas visual is a separate, minimal client island (AtlasVisual).
 */
export default function TreatmentDirectory() {
  return (
    <Section
      id="treatments"
      tone="ivory"
      labelledBy="treatments-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content, beneath the blend) ── */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* A · Dental icon pattern — texture under everything */}
        <DentalIconPattern
          id="treatments-dental-pattern"
          className="absolute inset-0 text-gc-blue/[0.055]"
        />
        {/* B · Concentric orbital arcs — brand echo, cropped by the section edge */}
        <svg
          viewBox="0 0 900 900"
          fill="none"
          className="pointer-events-none absolute -bottom-[24rem] -right-[24rem] w-[min(80vw,52rem)] text-gc-blue opacity-[0.04]"
        >
          <circle cx="450" cy="450" r="300" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
          <circle cx="450" cy="450" r="448" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>
        {/* C · Radial wash — tonal bloom behind the atlas plate */}
        <div className="gc-radial-wash pointer-events-none absolute -left-56 top-[26%] h-[38rem] w-[38rem] rounded-full opacity-40" />
      </div>

      {/* ── Content ── */}
      <div>
        {/* Structural break — FAQ above and this section share the Warm Ivory
            ground, so a single container-width hairline marks the boundary.
            It is the group's first beat: the rule draws in from the left
            (gc-line-draw) while the label rises. */}
        <RevealGroup step={90}>
          <div aria-hidden="true" className="gc-line-draw mb-16 h-px w-full bg-gc-ink/15 md:mb-20" />
          {/* Editorial sequencing — rule draw → label → heading → intro */}
          <SectionLabel>Dental care areas</SectionLabel>
          <h2 id="treatments-heading" className="h2-display measure-wide text-gc-ink">
            {treatmentsIntro.heading}
          </h2>
          <p className="lead measure mt-4 text-gc-ink/70">
            <RichText>{treatmentsIntro.intro}</RichText>
          </p>
        </RevealGroup>

        {/* Atlas ↔ index split — the render anchors the left column, the six
            care areas index it on the right. The editorial closing lives in
            the atlas column, bottom-anchored via mt-auto so both columns
            resolve together (CTA bottom ≈ item 06 bottom) — the grid
            stretches the columns to equal height, so this holds at any
            viewport and adapts when rows expand. Mobile stack order falls
            out of the DOM: title → intro → video → annotation → closing. */}
        <div className="care-atlas mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="flex flex-col lg:col-span-5">
            {/* Atlas settles into view — a slight scale-in, no slide; the
                looping render inside stays the section's only motion asset. */}
            <Reveal scale={0.985} distance={10}>
              <AtlasVisual />
            </Reveal>
            {/* Editorial closing — a quiet line, then the conversation CTA */}
            <Reveal className="mt-10 lg:mt-auto">
              <p className="font-display text-xl text-gc-navy md:text-2xl">
                {treatmentsIntro.closing}
              </p>
              <div className="mt-5">
                <ArrowLink href={bookAppointmentHref}>
                  {treatmentsIntro.ctaLabel}
                </ArrowLink>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <TreatmentList categories={treatmentCategories} />
          </div>
        </div>
      </div>
    </Section>
  );
}