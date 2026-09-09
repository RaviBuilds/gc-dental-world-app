import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import TreatmentList from "@/components/ui/TreatmentList";
import DentalIconPattern from "@/components/ui/DentalIconPattern";
import { treatmentsIntro, treatmentCategories } from "@/data/treatments";
import { bookAppointmentHref } from "@/data/navigation";

/**
 * Treatment directory (content strategy section 18). Categories are canonical
 * frameworks; individual services render only when verified. Editorial list
 * rows — deliberately NOT a card grid.
 *
 * Ambient layer (all aria-hidden, static without JS — house trio, stone tone):
 *   A. Dental icon pattern — full-section glyph texture (lowest ink here;
 *      the stone tone is denser and the hairline row borders compete)
 *   B. Concentric orbital arcs — brand echo, cropped by the section edge
 *   C. Radial wash — tonal bloom behind the list
 * Rows expand to general-educational detail (client island: TreatmentList);
 * hover-blue on titles signals the real disclosure interaction.
 */
export default function TreatmentDirectory() {
  return (
    <Section
      id="treatments"
      tone="stone"
      labelledBy="treatments-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content) ── */}
      {/* A · Dental icon pattern — texture under everything */}
      <DentalIconPattern
        id="treatments-dental-pattern"
        className="absolute inset-0 text-gc-blue/[0.06]"
      />
      {/* B · Concentric orbital arcs — brand echo, cropped by the section edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 900"
        fill="none"
        className="pointer-events-none absolute -bottom-[24rem] -right-[24rem] z-0 w-[min(80vw,52rem)] text-gc-blue opacity-[0.05]"
      >
        <circle cx="450" cy="450" r="300" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="448" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* C · Radial wash — tonal bloom behind the list */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -left-48 top-1/3 z-0 h-[34rem] w-[34rem] rounded-full opacity-50"
      />

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
        <Reveal>
          <SectionLabel>Dental care areas</SectionLabel>
          <h2 id="treatments-heading" className="h2-display measure-wide text-gc-ink">
            {treatmentsIntro.heading}
          </h2>
          <p className="lead measure mt-4 text-gc-ink/70">
            {treatmentsIntro.intro}
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16">
          <TreatmentList categories={treatmentCategories} />
        </div>

        <div className="mt-8">
          <ArrowLink href={bookAppointmentHref}>
            Discuss your situation with the clinic
          </ArrowLink>
        </div>
      </div>
    </Section>
  );
}
