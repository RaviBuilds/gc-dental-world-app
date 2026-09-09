import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import BeforeAfterViewer from "@/components/ui/BeforeAfterViewer";
import SmileCaseViewer from "@/components/interactive/SmileCaseViewer";
import { smileStory } from "@/data/home";
import { smileCases, casesIntro } from "@/data/cases";

/**
 * Smile Stories band — 80-year-old flagship story (§08) + signature case
 * library (§09) as one narrative arc. The story is the emotional centerpiece
 * and sits on full-bleed navy.
 *
 * Flagship story (visual design system §12.8 — editorial narrative +
 * interactive case visual):
 *   - Left: staggered reveal sequence (eyebrow → headline → copy → CTA),
 *     the 3-beat story arc (BEFORE → TREATMENT → AFTER), and the gated
 *     patientQuote slot — renders ONLY when an authentic quote is supplied
 *     (same integrity rule as review excerpts; never written by hand).
 *   - Right: BeforeAfterViewer — a draggable comparison built from the two
 *     halves of the authentic composite asset, wrapped in the shared media
 *     framing language (dashed echo frame, champagne sparkle, blue plus) so
 *     it belongs to the same photographic family as the sections above.
 *     Verified fact chips sit under the caption.
 *   - The CTA anchors to the case library below (#smile-cases) instead of
 *     self-referencing this section.
 */
export default function SmileStories() {
  const { patientQuote } = smileStory;

  return (
    <section id="smile-stories" aria-labelledby="story-heading" className="relative isolate overflow-hidden bg-gc-navy text-gc-light">
      {/* Ambient champagne smile-arc — faint, behind the text column */}
      <svg aria-hidden="true" viewBox="0 0 600 300" fill="none" className="pointer-events-none absolute -left-40 top-16 w-[36rem] text-gc-champagne opacity-[0.07]">
        <path d="M20 60 C 180 260, 420 260, 580 60" stroke="currentColor" strokeWidth="2" />
        <path d="M60 40 C 200 220, 400 220, 540 40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 8" />
      </svg>

      {/* Flagship story */}
      <div className="gc-container relative grid grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionLabel tone="light">{smileStory.eyebrow}</SectionLabel>
          </Reveal>
          <Reveal delay={90}>
            <h2 id="story-heading" className="h2-display measure-wide mt-4 text-gc-light">
              {smileStory.heading}
            </h2>
          </Reveal>
          <Reveal delay={180}>
            <p className="lead measure mt-6 text-gc-light/75">
              <RichText onDark>{smileStory.copy}</RichText>
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-8">
              <ArrowLink href={smileStory.cta.href} tone="light">
                {smileStory.cta.label}
              </ArrowLink>
            </div>
          </Reveal>

          {/* Story arc — BEFORE → TREATMENT → AFTER */}
          <Reveal delay={340}>
            <ol className="mt-12 max-w-xl space-y-6">
              {smileStory.story.map((beat) => (
                <li key={beat.number} className="flex gap-4">
                  <span aria-hidden="true" className="pt-0.5 text-[0.6875rem] font-semibold tracking-widest text-gc-blue-soft">
                    {beat.number}
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-gc-light">{beat.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gc-light/60">{beat.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* GATED — authentic patient quote; renders only when supplied */}
          {patientQuote ? (
            <Reveal delay={420}>
              <figure className="mt-12 border-l-2 border-gc-champagne pl-6">
                <blockquote className="font-display text-xl italic leading-snug text-gc-light md:text-2xl">
                  “{patientQuote.text}”
                </blockquote>
                {patientQuote.attribution ? (
                  <figcaption className="mt-3 text-sm text-gc-light/60">— {patientQuote.attribution}</figcaption>
                ) : null}
              </figure>
            </Reveal>
          ) : null}
        </div>

        <Reveal className="lg:col-span-5" delay={150}>
          <figure>
            {/* Shared framing language — dashed echo frame, champagne
                sparkle, blue plus (navy-tuned tones) */}
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-3 rounded-[2rem] border-2 border-dashed border-gc-blue-soft/25" />
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="absolute -right-2 -top-3 z-10 h-6 w-6 text-gc-champagne">
                <path d="M12 2l1.9 8.1L22 12l-8.1 1.9L12 22l-1.9-8.1L2 12l8.1-1.9z" />
              </svg>
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="absolute -bottom-4 -left-4 h-4 w-4 text-gc-blue-soft/50">
                <path d="M12 4v16M4 12h16" />
              </svg>

              <BeforeAfterViewer src={smileStory.image.src} alt={smileStory.image.alt} />
            </div>
            <figcaption className="mt-5 text-sm text-gc-light/60">
              {smileStory.imageCaption}
            </figcaption>
            <div className="mt-3 flex flex-wrap gap-2">
              {smileStory.facts.map((fact) => (
                <span key={fact} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-gc-light/75">
                  {fact}
                </span>
              ))}
            </div>
          </figure>
        </Reveal>
      </div>

      {/* Signature smile stories */}
      <div id="smile-cases" className="scroll-mt-24 border-t border-white/10 bg-gc-dark">
        <div className="gc-container py-20 md:py-24">
          <Reveal>
            <SectionLabel tone="light">Signature smile stories</SectionLabel>
            <div className="mb-12 max-w-2xl">
              <h3 className="h2-display text-gc-light">{casesIntro.heading}</h3>
              <p className="lead mt-3 text-gc-light/70">
                <RichText onDark>{casesIntro.intro}</RichText>
              </p>
            </div>
          </Reveal>
          <SmileCaseViewer cases={smileCases} />
        </div>
      </div>
    </section>
  );
}