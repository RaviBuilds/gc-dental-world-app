import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Divider from "@/components/ui/Divider";
import RichText from "@/components/ui/RichText";
import Button from "@/components/ui/Button";
import { finalCta } from "@/data/home";

/** Final conversion section (content strategy §25) — consultative close. */
export default function FinalCta() {
  return (
    <Section id="contact" tone="navy" labelledBy="cta-heading" className="py-0!">
      <div className="flex flex-col items-center py-24 text-center md:py-32">
        <Reveal>
          <h2 id="cta-heading" className="h2-display mx-auto max-w-3xl text-gc-light">
            {finalCta.heading}
          </h2>
          <p className="lead measure mx-auto mt-6 text-gc-light/75">
            <RichText onDark>{finalCta.copy}</RichText>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={finalCta.primary.href} variant="primary" tone="dark" size="lg">
              {finalCta.primary.label}
            </Button>
            <Button
              href={finalCta.secondary.href}
              variant="secondary"
              tone="dark"
              size="lg"
              ariaLabel={`Call the clinic on ${finalCta.secondary.label.replace("Call ", "")}`}
            >
              {finalCta.secondary.label}
            </Button>
          </div>
          <Divider tone="light" className="mx-auto mt-16" />
        </Reveal>
      </div>
    </Section>
  );
}
