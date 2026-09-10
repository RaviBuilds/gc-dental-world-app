import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RevealGroup from "@/components/ui/RevealGroup";
import StarRating from "@/components/ui/StarRating";
import RichText from "@/components/ui/RichText";
import ExperienceMedia from "@/components/ui/ExperienceMedia";
import { trustSection } from "@/data/home";
import { trustSignals } from "@/data/trustSignals";

/**
 * Why GC Dental World — "Proof, not promises" evidence chapter (§19–22
 * consolidated). The section answers one question: why should a patient
 * trust this particular clinic? Reading order follows the evidence arc
 * PEOPLE → EXPERIENCE → ENVIRONMENT → REPUTATION → PLACE:
 *
 *   1. Heading + editorial introduction
 *   2. Complete team photograph (primary visual) ↔ reputation evidence
 *   3. Six canonical proof points as a scannable editorial index
 *   4. Quiet closing strip
 *
 * The team photograph carries the house ExperienceMedia treatment (echo
 * frame, caption chip, sparkle marks, corner accent) so it belongs to the
 * same photographic family as the Doctors/Experience sections above.
 *
 * Ambient layer (aria-hidden, static): concentric orbital arcs + radial
 * wash echo the Clinicians band, and a real treatment-room photograph
 * ghosts behind the index (grayscale + multiply + feathered radial mask)
 * — felt before it is noticed, never a wallpaper.
 *
 * Reputation values stay EXACT (4.8 / 286, from data/trustSignals.ts) and
 * appear statically — no count-up animation. Content integrity: no founding
 * year, no patient counts, no quotations, no superlatives (§19–§22).
 */
export default function TrustBand() {
  return (
    <Section
      id="why"
      tone="ivory"
      labelledBy="why-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient layers (behind all content) ── */}
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
      {/* B · Radial wash — tonal bloom behind the reputation column */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -right-48 top-1/3 z-0 h-[34rem] w-[34rem] rounded-full"
      />
      {/* C · Treatment-room ghost — real clinical environment as barely-visible
          texture. The radial mask feathers every edge so no rectangle
          boundary can appear; multiply keeps the ghost strictly darker than
          the paper. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/assets/gc-dental-world-dental-treatment-room-equipment.jpg"
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="proof-env object-cover"
        />
      </div>

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
      {/* ── 1 · Heading + introduction (label → heading → intro) ── */}
      <RevealGroup step={90}>
        <SectionLabel>Why GC Dental World</SectionLabel>
        <h2 id="why-heading" className="h2-display measure-wide text-gc-ink">
          {trustSection.whyHeading}
        </h2>
        <p className="lead measure mt-4 text-gc-ink/70">
          <RichText>{trustSection.whyIntro}</RichText>
        </p>
      </RevealGroup>

      {/* ── 2 · People ↔ Reputation ──
          The complete team photograph is the section's primary visual,
          framed in the house ExperienceMedia treatment; the reputation
          block sits beside it as quiet, exact evidence (no card, no
          count-up). Both columns resolve together in the grid. */}
      <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-12 lg:gap-x-16">
        <Reveal scale={0.985} className="lg:col-span-7">
          <ExperienceMedia
            image={trustSection.teamImage}
            label={trustSection.teamImage.caption}
            aspectClass="aspect-[3/2]"
            imgPosition="object-center"
            interactive
            accentOffset
          />
        </Reveal>

        <Reveal delay={100} className="lg:col-span-5">
          <div className="flex h-full flex-col border-t border-gc-ink/15 pt-6">
            <p className="small-ui text-gc-blue">Reputation</p>
            <div className="mt-5 flex items-baseline gap-x-4">
              <span className="font-display text-6xl leading-none text-gc-ink md:text-7xl">
                {trustSignals.ratingValue}
              </span>
              <StarRating rating={trustSignals.ratingValue} size={22} />
            </div>
            <p className="mt-4 text-sm font-semibold text-gc-ink/75">
              {trustSignals.reviewCount} {trustSignals.reviewLabel} ·{" "}
              {trustSignals.ratingSource}
            </p>
            <p className="measure mt-6 text-base leading-relaxed text-gc-ink/70">
              <RichText>{trustSection.reputationStatement}</RichText>
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=GC+Dental+World+Gachibowli+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-gc-blue underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gc-blue"
            >
              Read reviews on Google
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* ── 3 · Supporting evidence index ── */}
      <ProofIndex />

      {/* ── 4 · Quiet closing strip ── */}
      <Reveal>
        <p className="small-ui mt-16 border-t border-gc-ink/10 pt-8 text-center text-gc-ink/45 md:mt-20">
          {trustSection.closing}
        </p>
      </Reveal>
      </div>
    </Section>
  );
}

/**
 * Supporting evidence index — the six canonical proof points as a scannable
 * numbered index (number / headline / one-line evidence / hairline). No
 * cards, no icons. Hover is the only state change: number + title lean GC
 * Blue and the row shifts 6px — pure CSS (`.proof-row`), no client JS.
 * The place proof (real Gachibowli exterior photo) intentionally lives in
 * the VisitSection that follows — this index stays typographic.
 */
function ProofIndex() {
  return (
    <ol className="mt-16 grid gap-x-16 gap-y-2 md:mt-20 md:grid-cols-2">
      {trustSection.whyPrinciples.map((principle, i) => (
        <li key={principle.title}>
          <Reveal delay={(i % 2) * 60}>
            <div className="proof-row group border-t border-gc-ink/10 pb-7 pt-5 transition-colors duration-200 ease-[var(--ease-soft)] hover:border-gc-blue/35">
              <div className="flex gap-5 transition-transform duration-200 ease-[var(--ease-soft)] group-hover:translate-x-1.5">
                <span
                  aria-hidden="true"
                  className="font-display text-2xl leading-none text-gc-silver transition-colors duration-200 ease-[var(--ease-soft)] group-hover:text-gc-blue"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-gc-ink transition-colors duration-200 ease-[var(--ease-soft)] group-hover:text-gc-blue">
                    {principle.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gc-ink/65">
                    {principle.copy}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
