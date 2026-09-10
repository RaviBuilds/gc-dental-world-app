import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import RevealGroup from "@/components/ui/RevealGroup";
import RichText from "@/components/ui/RichText";
import Button from "@/components/ui/Button";
import ExperienceMedia from "@/components/ui/ExperienceMedia";
import { firstVisit } from "@/data/home";
import { locationData } from "@/data/location";
import { bookAppointmentHref } from "@/data/navigation";

/**
 * Plan Your Visit — first-visit guide (§23) + location (§24).
 *
 * Location block upgrades (visual-system parity pass):
 *   - The building exterior carries the house ExperienceMedia treatment
 *     (echo frame, caption chip, sparkles, corner accent) — the same
 *     photographic voice as the Doctors/Experience/Why sections.
 *   - A live Google Maps search embed sits under the photo. It reuses the
 *     VERIFIED search query from locationData.directionsUrl — Google places
 *     its own result; no pin is fabricated (§24 content integrity).
 *   - "Good to know" visit notes surface two verified facts (landmark,
 *     floor) as scannable guidance with hand-drawn house icons — no
 *     invented facilities (no parking/lift/transport claims).
 *   - One ambient radial wash keeps the ice band from feeling flat without
 *     competing with the content.
 */
export default function VisitSection() {
  return (
    <Section
      id="visit"
      tone="ice"
      labelledBy="visit-heading"
      className="relative isolate overflow-hidden"
    >
      <Reveal>
        <SectionLabel>If you are new</SectionLabel>
        <h2 id="visit-heading" className="h2-display measure-wide text-gc-ink">
          {firstVisit.heading}
        </h2>
        <p className="lead measure mt-4 text-gc-ink/70"><RichText>{firstVisit.intro}</RichText></p>
      </Reveal>

      <ol className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 md:grid-cols-3 md:mt-16 lg:grid-cols-5">
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
        className="relative mt-20 grid grid-cols-1 items-center gap-10 border-t border-gc-ink/10 pt-14 md:mt-28 md:pt-20 lg:grid-cols-12 lg:gap-16"
      >
        {/* Ambient layer — one wash, bottom-left of the location block */}
        <div
          aria-hidden="true"
          className="gc-radial-wash pointer-events-none absolute -left-40 bottom-0 z-0 h-[28rem] w-[28rem] rounded-full"
        />

        {/* Left column — real building photo in the house treatment + live map */}
        <Reveal className="relative z-10 lg:col-span-6">
          <ExperienceMedia
            image={{
              src: "/assets/gc-dental-world-gachibowli-clinic-building-exterior.jpg",
              alt: "The exterior of the GC Dental World clinic building in Gachibowli, Hyderabad",
            }}
            label="GC Dental World · Gachibowli"
            aspectClass="aspect-[4/3]"
            imgPosition="object-center"
            interactive
            accentOffset
          />

          {/* Live map preview — Google's own search-result embed for the
              verified query (loading="lazy" keeps it off the critical path).
              Pannable in place; Get Directions below remains the route CTA. */}
          <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-gc-ink/10 bg-gc-stone shadow-[0_20px_44px_-26px_rgba(16,26,32,0.28)]">
            <iframe
              src={locationData.mapEmbedUrl}
              title="Google Maps search result for GC Dental World, Gachibowli, Hyderabad"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
          <p className="small-ui mt-3 text-gc-ink/45">
            Interactive map · shows the clinic&rsquo;s verified Google listing
          </p>
        </Reveal>

        {/* Location details — staggered arrival (label → name → address →
            notes → hours → actions) so the block reads as guided orientation */}
        <RevealGroup className="relative z-10 lg:col-span-6" step={60}>
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
          {/* Good to know — verified facts as scannable visit guidance */}
          <ul className="mt-6 space-y-2.5">
            {locationData.visitNotes.map((note) => (
              <li
                key={note.icon}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-gc-ink/70"
              >
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-gc-blue">
                  {note.icon === "landmark" ? <LandmarkIcon /> : <FloorIcon />}
                </span>
                {note.text}
              </li>
            ))}
          </ul>

          {locationData.hours ? (
            <p className="measure mt-4 text-gc-ink/75">{locationData.hours}</p>
          ) : (
            <p className="mt-4 flex items-start gap-2.5 text-sm leading-relaxed text-gc-ink/50">
              <span aria-hidden="true" className="mt-0.5 shrink-0">
                <ClockIcon />
              </span>
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
        </RevealGroup>
      </div>
    </Section>
  );
}

/**
 * House hand-drawn micro icons (14px, 1.5-stroke — same voice as the map pin
 * used in ClinicEnvironment). Server-safe inline SVG; no icon library, per
 * the one-family rule (visual design system §10.6).
 */
function LandmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14h12" />
      <path d="M3.5 14V6.5L8 3l4.5 3.5V14" />
      <path d="M6.5 14v-3h3v3" />
    </svg>
  );
}

function FloorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2.5h10v11H3z" />
      <path d="M3 8h10" />
      <path d="M8 2.5V8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.3 1.6" />
    </svg>
  );
}
