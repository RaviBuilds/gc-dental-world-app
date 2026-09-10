import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RevealGroup from "@/components/ui/RevealGroup";
import RichText from "@/components/ui/RichText";
import ArrowLink from "@/components/ui/ArrowLink";
import ClinicGallery from "@/components/ui/ClinicGallery";
import { clinicSection } from "@/data/home";

/**
 * The Clinic — asymmetric photo mosaic (content strategy §16).
 * Uses only verified spaces: entrance, reception, treatment room, interior.
 *
 * Ambient layer (all aria-hidden, static without JS — same house trio as
 * CliniciansSection, tuned for the light tone):
 *   A. Concentric orbital arcs — brand echo, cropped by the section edge
 *   B. Radial wash — tonal bloom behind the mosaic
 *   C. Ghost numeral — editorial beat echo "04", view-linked drift
 *
 * §16 sets CTA: n/a for this section — the band closes with a cross-link
 * to the verified location block (VisitSection) instead of a duplicate
 * Get Directions button.
 */
export default function ClinicEnvironment() {
  return (
    <Section
      id="clinic"
      tone="light"
      labelledBy="clinic-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content) ── */}
      {/* A · Concentric orbital arcs — brand echo, cropped by the section edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 900"
        fill="none"
        className="pointer-events-none absolute -bottom-[26rem] -right-[26rem] z-0 w-[min(80vw,58rem)] text-gc-blue opacity-[0.06]"
      >
        <circle cx="450" cy="450" r="300" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="448" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* B · Radial wash — tonal bloom behind the mosaic */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -left-48 top-16 z-0 h-[34rem] w-[34rem] rounded-full opacity-60"
      />
      {/* C · Ghost numeral — editorial beat echo (Clinicians "02" / Experience "03").
          Anchored fully inside the section's right whitespace rather than cropped
          above the top edge, so it never slides under the sticky header. */}
      <span
        aria-hidden="true"
        className="gc-ghost-numeral pointer-events-none absolute right-0 top-2 z-0 select-none font-display text-[6.5rem] leading-none text-gc-blue/[0.07] md:top-0 md:text-[9.5rem]"
      >
        04
      </span>

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
        {/* Editorial sequencing — label → heading → intro → local signal */}
        <RevealGroup step={90}>
          <div>
            <SectionLabel>The clinic</SectionLabel>
          </div>
          <h2 id="clinic-heading" className="h2-display measure-wide text-gc-ink">
            {clinicSection.heading}
          </h2>
          <p className="lead measure mt-4 text-gc-ink/70"><RichText>{clinicSection.intro}</RichText></p>
          {/* Verified local signal + landmark — §16's "easily identifiable" promise */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="small-ui inline-flex items-center gap-2 text-gc-blue">
              <svg aria-hidden="true" width="12" height="14" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 1a5 5 0 0 1 5 5c0 3.6-5 9-5 9S2 9.6 2 6a5 5 0 0 1 5-5Z" />
                <circle cx="7" cy="6" r="1.7" />
              </svg>
              {clinicSection.localSignal}
            </span>
            <span className="text-sm text-gc-ink/60">
              {clinicSection.landmark}.
            </span>
          </div>
        </RevealGroup>

        <ClinicGallery />

        {/* Band close — photos are the real clinic; route to the location block */}
        <Reveal>
          <div className="mt-14 flex flex-col items-start gap-5 border-t border-gc-blue/15 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="measure text-gc-ink/70">
              Every photo on this page is from the actual clinic — the space you
              see is the space you&rsquo;ll visit.
            </p>
            <ArrowLink href={clinicSection.findUs.href} className="shrink-0 text-lg">
              {clinicSection.findUs.label}
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

