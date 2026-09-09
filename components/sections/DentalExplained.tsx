import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import TopicExplorer from "@/components/interactive/TopicExplorer";
import { topicsIntro, topics } from "@/data/topics";

/**
 * "Dental, Explained." — signature educational area (content strategy §05).
 *
 * The flat tonal fill alone reads as a void at this section's size, so an
 * AMBIENT layer plays behind the content at section scale (all `aria-hidden`,
 * `pointer-events-none`, static and readable with JS disabled):
 *
 *   A. Concentric orbital arcs — fine GC Blue circles anchored off the
 *      bottom-left edge, echoing the hero's orbit motif (brand consistency)
 *   B. Dental-arch watermark — the §12.3 arch line-art, masked GC Blue,
 *      ghosting behind the heading at whisper opacity
 *   C. Soft radial wash — gc-blue-soft bloom behind the photo's corner,
 *      breaking the single-tone fill without extra line-work
 *
 * A and B carry slow scroll-drift classes (.explainer-bg-arcs / .explainer-bg-arch)
 * so the ambient layer participates in the fan-apart motion — same
 * progressive-enhancement guard as the photo stack.
 */
export default function DentalExplained() {
  return (
    <Section
      id="dental-explained"
      tone="light"
      labelledBy="explained-heading"
      className="relative isolate overflow-hidden"
    >
      {/* ── Ambient background layer (behind content) ── */}
      {/* A · Concentric orbital arcs — brand echo, cropped by the section edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 900 900"
        fill="none"
        className="explainer-bg-arcs pointer-events-none absolute -bottom-[26rem] -left-[26rem] z-0 w-[min(80vw,58rem)] text-gc-blue opacity-[0.08]"
      >
        <circle cx="450" cy="450" r="300" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="380" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" vectorEffect="non-scaling-stroke" />
        <circle cx="450" cy="450" r="448" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* B · Dental-arch watermark — ghosted line art behind the heading */}
      <div
        aria-hidden="true"
        className="explainer-bg-arch gc-arch-mask pointer-events-none absolute -top-8 left-0 z-0 aspect-[1200/1000] w-[min(46vw,36rem)] opacity-[0.05]"
      />

      {/* C · Soft radial wash — tonal bloom behind the photo's bottom corner */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -bottom-48 -right-48 z-0 h-[38rem] w-[38rem] rounded-full"
      />

      {/* ── Content (above ambient layer) ── */}
      <div className="relative z-10">
        <Reveal>
          <SectionLabel>Before any treatment, knowledge</SectionLabel>
          <div className="mb-14 max-w-3xl">
            <h2 id="explained-heading" className="h2-display text-gc-ink">
              {topicsIntro.heading}
            </h2>
            <p className="lead measure mt-4 text-gc-ink/70"><RichText>{topicsIntro.intro}</RichText></p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <TopicExplorer topics={topics} />
        </Reveal>
      </div>
    </Section>
  );
}
