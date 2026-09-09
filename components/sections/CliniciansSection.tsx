import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import EditorialRow from "@/components/ui/EditorialRow";
import ExperienceMedia from "@/components/ui/ExperienceMedia";
import Reveal from "@/components/ui/Reveal";
import ArrowLink from "@/components/ui/ArrowLink";
import {
  cliniciansIntro,
  clinicianChips,
  cliniciansTeamImage,
  credentialsIntro,
  cliniciansCta,
} from "@/data/doctors";
import RichText from "@/components/ui/RichText";

/**
 * Clinicians band (§13 + §14). Team-level presentation until the confirmed
 * roster and credentials are supplied — no invented profiles.
 *
 * Ambient layer (all aria-hidden, static without JS):
 *   A. Concentric orbital arcs — brand echo, cropped by the section edge
 *   B. Radial wash — tonal bloom behind the second beat
 *   C. Ghost numeral — beat-count echo, view-linked drift (globals.css)
 *
 * Both rows carry the house ExperienceMedia treatment (echo frame, dot grid,
 * caption chip, sparkle marks) and beat numerals; the band closes with a CTA
 * row so the journey from meeting the team to booking never dead-ends.
 */
export default function CliniciansSection() {
  return (
    <Section
      id="doctors"
      tone="ivory"
      labelledBy="doctors-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content) ── */}
      {/* A · Concentric orbital arcs — brand echo, cropped by the section edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 900"
        fill="none"
        className="pointer-events-none absolute -bottom-[26rem] -left-[26rem] z-0 w-[min(80vw,58rem)] text-gc-blue opacity-[0.06]"
      >
        <circle cx="450" cy="450" r="300" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="448" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      {/* B · Radial wash — tonal bloom behind the second beat */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -right-48 top-1/3 z-0 h-[34rem] w-[34rem] rounded-full"
      />
      {/* C · Ghost numeral — beat-count echo (Experience §03 pattern) */}
      <span
        aria-hidden="true"
        className="gc-ghost-numeral pointer-events-none absolute -top-14 right-0 z-0 select-none font-display text-[7rem] leading-none text-gc-blue/[0.07] md:-top-20 md:text-[11rem]"
      >
        02
      </span>

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
        <SectionLabel>The clinicians</SectionLabel>
        <Reveal>
          <h2 id="doctors-heading" className="h2-display measure-wide text-gc-ink">
            {cliniciansIntro.heading}
          </h2>
          <p className="lead measure mt-4 text-gc-ink/70">
            <RichText>{cliniciansIntro.intro}</RichText>
          </p>
        </Reveal>

        {/* Verifiable, team-level trust chips */}
        <Reveal>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {clinicianChips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-gc-blue/25 bg-gc-light px-3.5 py-1.5 text-sm font-medium text-gc-ink/80"
              >
                {chip}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 flex flex-col gap-16 md:mt-20 md:gap-24">
          <Reveal>
            <EditorialRow
              number="01"
              title="Meet the team in person"
              image={cliniciansTeamImage}
              imageSizes="(max-width: 1024px) 100vw, 45vw"
              media={
                <ExperienceMedia
                  image={cliniciansTeamImage}
                  label="The clinical team"
                  interactive
                  accentOffset
                />
              }
            >
              The team photo you see here is the real clinical team of GC Dental
              World — the same people who will greet you, examine you and explain
              your options.
            </EditorialRow>
          </Reveal>
          <Reveal>
            <EditorialRow
              number="02"
              title={credentialsIntro.heading}
              image={{ src: credentialsIntro.image, alt: credentialsIntro.imageAlt }}
              reverse
              media={
                <ExperienceMedia
                  image={{ src: credentialsIntro.image, alt: credentialsIntro.imageAlt }}
                  label="Clinical recognition"
                  flip
                  interactive
                  aspectClass="aspect-[3/2]"
                />
              }
            >
              <RichText>{credentialsIntro.copy}</RichText>
            </EditorialRow>
          </Reveal>
        </div>

        {/* Band close — the same team will be there when you visit */}
        <Reveal>
          <div className="mt-16 flex flex-col items-start gap-5 border-t border-gc-blue/15 pt-8 md:flex-row md:items-center md:justify-between">
            <p className="measure text-gc-ink/70">{cliniciansCta.copy}</p>
            <ArrowLink href={cliniciansCta.href} className="shrink-0 text-lg">
              {cliniciansCta.label}
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
