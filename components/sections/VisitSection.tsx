import Image from "next/image";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import Button from "@/components/ui/Button";
import { firstVisit } from "@/data/home";
import { locationData } from "@/data/location";
import { bookAppointmentHref } from "@/data/navigation";

/** Plan Your Visit — first-visit guide (§23) + location (§24). */
export default function VisitSection() {
  return (
    <Section id="visit" tone="ice" labelledBy="visit-heading">
      <Reveal>
        <SectionLabel>If you are new</SectionLabel>
        <h2 id="visit-heading" className="h2-display measure-wide text-gc-ink">
          {firstVisit.heading}
        </h2>
        <p className="lead measure mt-4 text-gc-ink/70"><RichText>{firstVisit.intro}</RichText></p>
      </Reveal>

      <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-5">
        {firstVisit.steps.map((step, i) => (
          <li key={step.number}>
            <Reveal delay={i * 60}>
              <div className="flex h-full flex-col border-t-2 border-gc-blue/40 pt-4">
                <span
                  className="font-display text-2xl text-gc-blue"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <h3 className="mt-2 font-bold text-gc-ink">
                  <span className="sr-only">Step {step.number}: </span>
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-gc-ink/65">
                  {step.copy}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {/* Location */}
      <div
        id="location"
        className="mt-20 grid grid-cols-1 items-center gap-10 border-t border-gc-ink/10 pt-14 md:mt-28 md:pt-20 lg:grid-cols-12 lg:gap-16"
      >
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gc-stone">
            <Image
              src="/assets/gc-dental-world-gachibowli-clinic-building-exterior.jpg"
              alt="The exterior of the GC Dental World clinic building in Gachibowli, Hyderabad"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="lg:col-span-6">
          <SectionLabel>Location</SectionLabel>
          <h3 className="h3-display text-gc-ink">
            Find {locationData.businessName}
          </h3>
          <p className="small-ui mt-2 text-gc-blue">
            {locationData.areas.join(" · ")}
          </p>
          <address className="lead measure mt-4 not-italic text-gc-ink/75">
            {locationData.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          {locationData.hours ? (
            <p className="measure mt-4 text-gc-ink/75">{locationData.hours}</p>
          ) : (
            <p className="mt-4 text-sm text-gc-ink/50">
              Opening hours will be published once verified with the clinic.
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={locationData.directionsUrl}
              variant="primary"
              ariaLabel="Get directions to GC Dental World on Google Maps"
            >
              Get Directions
            </Button>
            <Button
              href={locationData.phoneHref}
              variant="secondary"
              ariaLabel={`Call the clinic on ${locationData.phone}`}
            >
              Call the Clinic
            </Button>
            <Button href={bookAppointmentHref} variant="ghost">
              Book an Appointment
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
