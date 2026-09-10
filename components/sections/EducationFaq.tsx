import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import DentalIconPattern from "@/components/ui/DentalIconPattern";
import { faqIntro, faqs } from "@/data/faqs";

/**
 * Questions patients ask before they book (content strategy section 17).
 * Editorial left column pairs the heading with the doctor portrait — the
 * human anchor behind the "no pressure" promise (design system 12.12).
 */
export default function EducationFaq() {
  return (
    <Section
      id="faqs"
      tone="ivory"
      labelledBy="faq-heading"
      className="relative isolate overflow-hidden"
    >
      {/* Dental icon pattern — tooth/sparkle/cross texture behind the
          portrait column (desktop only; single-column mobile would read it
          as noise behind text). DOM-ordered before the wash so the bloom
          glows over the texture. */}
      <DentalIconPattern
        id="faq-dental-pattern"
        className="absolute inset-y-0 left-0 hidden w-[58%] text-gc-ink/[0.14] lg:block"
      />

      {/* Ambient wash — tonal bloom over the pattern, house trio */}
      <div
        aria-hidden="true"
        className="gc-radial-wash pointer-events-none absolute -left-40 bottom-24 z-0 h-[30rem] w-[30rem] rounded-full opacity-50"
      />

      <div className="relative z-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionLabel>FAQ</SectionLabel>
          <h2 id="faq-heading" className="h2-display measure-tight text-gc-ink">
            {faqIntro.heading}
          </h2>
          <p className="lead measure mt-4 text-gc-ink/70">{faqIntro.intro}</p>

          {/* Doctor portrait — the answers have a face.
              lg width is capped a step below the column (24rem) so the
              portrait column lands close to the accordion natural height. */}
          <figure className="group/fig mt-10">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm bg-gc-stone shadow-[0_24px_48px_-28px_rgba(16,26,32,0.4)] lg:max-w-[24rem]">
              <Image
                src={faqIntro.portrait.src}
                alt={faqIntro.portrait.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-[var(--ease-soft)] group-hover/fig:scale-[1.02]"
              />
            </div>
            <figcaption className="mt-4 max-w-md text-sm leading-relaxed text-gc-ink/60 lg:max-w-[24rem]">
              {faqIntro.portrait.caption}
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <Accordion items={faqs.map(({ id, question, answer }) => ({ id, question, answer }))} />
        </Reveal>
      </div>
    </Section>
  );
}
