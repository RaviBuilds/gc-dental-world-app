import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import ArrowLink from "@/components/ui/ArrowLink";
import Reveal from "@/components/ui/Reveal";
import RevealGroup from "@/components/ui/RevealGroup";
import { intentSection } from "@/data/home";
import RichText from "@/components/ui/RichText";

/**
 * "What brings you here?" — editorial patient routing (content strategy §04,
 * visual design system §12.3). Four numbered route rows separated by hairline
 * rules — a premium editorial patient index, not a card grid. The whole row
 * is the link; interaction stays subtle (small shift, arrow nudge, GC Blue
 * accent). Canonical copy is preserved verbatim from data/home.ts.
 *
 * Left column = editorial canvas: oversized H2, generous negative space, the
 * barely-visible dental-arch line art (purely decorative, aria-hidden) and a
 * tiny concern → understand → explore journey cue. Right column remains the
 * primary functional interaction area.
 */
export default function IntentNavigator() {
  const routes = intentSection.options;

  return (
    <Section
      id="care"
      tone="ivory"
      labelledBy="intent-heading"
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16">
        {/* Left — orientation (editorial canvas) */}
        <div className="relative lg:col-span-5">
          {/* Decorative dental-arch line art — masked GC Blue field, lives
              behind the copy, cropped by the section boundaries. */}
          <div aria-hidden="true" className="intent-arch" />

          {/* Clinic render video — full-width landscape plinth anchored to
              the bottom of this column, purely decorative. Muted +
              playsInline enable autoplay; no controls, not focusable, hidden
              from assistive tech. Paints above the arch (DOM order), below
              the copy. */}
          <video
            className="intent-media"
            src="/assets/section-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
          />

          {/* Editorial sequencing — label → heading → intro → journey cue.
              The arch behind keeps its own settle + scroll-depth drift. */}
          <RevealGroup className="relative" step={90}>
            <SectionLabel>Start with what you need</SectionLabel>
            <h2 id="intent-heading" className="h2-display-md text-gc-ink">
              {intentSection.heading}
            </h2>
            <p className="lead measure mt-5 text-gc-ink/70">
              <RichText>{intentSection.intro}</RichText>
            </p>

            {/* Patient-journey micro-visual — explains the routing philosophy
                (concern → plain-language understanding → care path). Purely
                explanatory/decorative: aria-hidden, never the only way to
                understand the section. */}
            <p
              aria-hidden="true"
              className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-gc-blue/80 lg:mt-20"
            >
              <span>Concern</span>
              <span className="font-normal text-gc-ink/30">→</span>
              <span>Understand</span>
              <span className="font-normal text-gc-ink/30">→</span>
              <span>Explore</span>
            </p>
          </RevealGroup>
        </div>

        {/* Right — the four routes */}
        <div className="lg:col-span-7">
          <ul>
            {routes.map((option, i) => (
              <li key={option.id}>
                <Reveal delay={i * 70}>
                  <a
                    href={option.href}
                    className={[
                      "group block border-t border-gc-ink/10 py-7 transition-colors duration-200 ease-[var(--ease-soft)] focus-visible:border-gc-blue/40 hover:border-gc-blue/40 lg:py-8",
                      i === routes.length - 1 ? "border-b" : "",
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[2.5rem_1fr_auto] lg:items-start lg:gap-x-8">
                      {/* Editorial route number — a navigation marker, not a statistic */}
                      <span
                        aria-hidden="true"
                        className="text-[0.8125rem] font-bold tracking-[0.22em] text-gc-blue lg:pt-2"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      <div className="transition-transform duration-250 ease-[var(--ease-soft)] group-hover:translate-x-1.5">
                        <h3 className="text-[1.25rem] font-semibold leading-snug text-gc-ink transition-colors duration-200 ease-[var(--ease-soft)] group-hover:text-gc-blue md:text-[1.375rem]">
                          {option.title}
                        </h3>
                        <p className="measure mt-2 text-[0.9375rem] leading-relaxed text-gc-ink/65">
                          {option.description}
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-gc-blue lg:justify-self-end lg:pt-2">
                        {option.cta}
                        <svg
                          aria-hidden="true"
                          width="16"
                          height="12"
                          viewBox="0 0 18 12"
                          fill="none"
                          className="transition-transform duration-200 ease-[var(--ease-soft)] group-hover:translate-x-1"
                        >
                          <path
                            d="M1 6h15M11.5 1.5 16 6l-4.5 4.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>

          {/* Closing bridge → FAQs. Spaced as the closing sentence of the
              routing system — sits close beneath the final rule and aligns
              with the route-title column on desktop (number col 2.5rem +
              gap 2rem). Link keeps a 44px+ touch target via ArrowLink. */}
          <Reveal delay={routes.length * 70}>
            <p className="mt-6 text-sm text-gc-ink/65 lg:mt-8 lg:pl-[4.5rem]">
              Every path leads to plain-language explanations —{" "}
              <ArrowLink href="#faqs">see common questions</ArrowLink>
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
