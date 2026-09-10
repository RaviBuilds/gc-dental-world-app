import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RevealGroup from "@/components/ui/RevealGroup";
import RichText from "@/components/ui/RichText";
import ArrowLink from "@/components/ui/ArrowLink";
import JourneySteps from "@/components/interactive/JourneySteps";
import { careJourney } from "@/data/home";

/**
 * Understanding Your Care band — diagnosis philosophy (§10), knowledge hub
 * heading (§11) and the concern-to-care journey (§12).
 *
 * Ambient layer (all aria-hidden, pointer-events-none, static without JS):
 *   A. Radial wash — breaks the flat stone fill behind the diagnosis column
 *   B. Dental-arch watermark — §12.3 line art, ghosted bottom-right
 *   C. Ghost numeral — journey-length echo, view-linked drift (globals.css)
 *
 * The journey itself is a scroll-linked timeline (JourneySteps): a progress
 * rail fills as steps enter view, steps stagger in via Reveal and carry
 * hover states. The band closes with a CTA row instead of dead-ending after
 * step 06, and the knowledge-hub card links to real homepage anchors.
 */
export default function CareJourney() {
  return (
    <Section
      id="dental-care"
      tone="stone"
      labelledBy="diagnosis-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content) ── */}
      {/* A · Radial wash — tonal bloom behind the diagnosis column */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -left-48 -top-48 z-0 h-[36rem] w-[36rem] rounded-full"
      />
      {/* B · Dental-arch watermark — ghosted line art, bottom-right */}
      <div
        aria-hidden="true"
        className="gc-arch-mask pointer-events-none absolute -bottom-10 right-0 z-0 aspect-[1200/1000] w-[min(40vw,30rem)] opacity-[0.05]"
      />
      {/* C · Ghost numeral — echo of the journey length (Experience §03 pattern) */}
      <span
        aria-hidden="true"
        className="gc-ghost-numeral pointer-events-none absolute -top-14 right-0 z-0 select-none font-display text-[7rem] leading-none text-gc-blue/[0.07] md:-top-20 md:text-[11rem]"
      >
        06
      </span>

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
        {/* Diagnosis philosophy + knowledge hub */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <Reveal className="md:col-span-7">
            <SectionLabel>Understood, not just treated</SectionLabel>
            <h2 id="diagnosis-heading" className="h2-display measure-wide text-gc-ink">
              {careJourney.diagnosisHeading}
            </h2>
            <p className="lead measure mt-6 text-gc-ink/75">
              <RichText>{careJourney.diagnosisCopy}</RichText>
            </p>
            {/* Honest process chips — scannable, derived from the copy above */}
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {careJourney.philosophyChips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-gc-blue/25 bg-gc-light/70 px-3.5 py-1.5 text-sm font-medium text-gc-ink/80"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="md:col-span-5">
            <div className="flex h-full flex-col rounded-sm bg-gc-blue-soft p-8 md:p-10">
              <p className="small-ui text-gc-blue">Clinical knowledge hub</p>
              <h3 className="h3-display mt-3 text-gc-ink">
                {careJourney.knowledgeHeading}
              </h3>
              <p className="measure mt-4 text-gc-ink/70">{careJourney.knowledgeCopy}</p>
              {/* Real anchors only — the card must never dead-end */}
              <ul className="mt-6 flex flex-col gap-1.5 border-t border-gc-blue/20 pt-5">
                {careJourney.knowledgeLinks.map((link) => (
                  <li key={link.href}>
                    <ArrowLink href={link.href} className="text-[0.95rem]">
                      {link.label}
                    </ArrowLink>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Concern to care — scroll-linked numbered journey (§12) */}
        <div className="mt-20 md:mt-28">
        {/* Editorial sequencing — journey heading settles, then its intro */}
        <RevealGroup step={80}>
          <h3 className="h2-display measure-tight text-gc-ink">
            {careJourney.journeyHeading}
          </h3>
          <p className="lead measure mt-4 text-gc-ink/70">
            <RichText>{careJourney.journeyIntro}</RichText>
          </p>
        </RevealGroup>

          <div className="mt-12">
            <JourneySteps steps={careJourney.steps} />
          </div>

          {/* Journey close — the path ends at a conversation, not a dead end */}
          <Reveal>
            <div className="mt-16 flex flex-col items-start gap-5 border-t border-gc-blue/15 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="measure text-gc-ink/70">{careJourney.journeyCtaCopy}</p>
              <ArrowLink href={careJourney.journeyCtaHref} className="shrink-0 text-lg">
                {careJourney.journeyCtaLabel}
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
