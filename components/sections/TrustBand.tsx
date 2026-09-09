import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import StarRating from "@/components/ui/StarRating";
import RichText from "@/components/ui/RichText";
import { trustSection } from "@/data/home";
import { trustSignals } from "@/data/trustSignals";

/**
 * Trust Band — Why GC Dental World (§19), History (§20), Reputation Timeline
 * (§21) and Google Reputation (§22) consolidated into one band with distinct
 * sub-presentations. Rating values stay EXACT (4.8 / 286).
 */
export default function TrustBand() {
  return (
    <Section id="why" tone="light" labelledBy="why-heading">
      {/* Why — numbered editorial stack */}
      <Reveal>
        <SectionLabel>Why GC Dental World</SectionLabel>
        <h2 id="why-heading" className="h2-display measure-wide text-gc-ink">
          {trustSection.whyHeading}
        </h2>
      </Reveal>
      <ol className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
        {trustSection.whyPrinciples.map((principle, i) => (
          <li key={principle.title}>
            <Reveal delay={(i % 2) * 60}>
              <div className="flex gap-5 border-t border-gc-ink/10 pt-5">
                <span
                  className="font-display text-2xl text-gc-blue"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-bold text-gc-ink">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gc-ink/65">
                    {principle.copy}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* History + Reputation timeline — navy panel */}
      <div className="mt-20 md:mt-28">
        <div className="rounded-sm bg-gc-navy p-8 md:p-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionLabel tone="light">Long-term trust</SectionLabel>
                <h3 className="h3-display text-gc-light">
                  {trustSection.historyHeading}
                </h3>
                <p className="measure mt-4 text-gc-light/70">
                  <RichText onDark>{trustSection.historyCopy}</RichText>
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <p className="small-ui mb-8 text-gc-blue-soft">
                  {trustSection.timelineHeading}
                </p>
                <ol className="relative flex flex-col gap-8 border-l border-white/20 pl-8">
                  {trustSection.timeline.map((milestone, i) => (
                    <li key={milestone.label} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[2.35rem] top-1.5 h-3 w-3 rounded-full border-2 ${
                          i === trustSection.timeline.length - 1
                            ? "border-gc-star bg-gc-star"
                            : "border-gc-blue-soft bg-gc-navy"
                        }`}
                      />
                      <h4 className="font-bold text-gc-light">{milestone.label}</h4>
                      <p className="text-sm text-gc-light/65">{milestone.copy}</p>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Google reputation — explicit aggregate */}
      <Reveal>
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-gc-ink/10 pt-14 text-center md:mt-24">
          <StarRating rating={trustSignals.ratingValue} size={24} />
          <h3 className="statement text-gc-ink">{trustSection.googleHeading}</h3>
          <p className="measure text-gc-ink/70"><RichText>{trustSection.googleCopy}</RichText></p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=GC+Dental+World+Gachibowli+Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gc-blue underline-offset-4 hover:underline"
          >
            Read reviews on Google
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
