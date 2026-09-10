import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import FloatingContact from "@/components/layout/FloatingContact";
import HighlightMotion from "@/components/interactive/HighlightMotion";
import ContactDialog from "@/components/interactive/ContactDialog";
import Hero from "@/components/sections/Hero";
import TrustRail from "@/components/sections/TrustRail";
import IntentNavigator from "@/components/sections/IntentNavigator";
import DentalExplained from "@/components/sections/DentalExplained";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SmileStories from "@/components/sections/SmileStories";
import CareJourney from "@/components/sections/CareJourney";
import CliniciansSection from "@/components/sections/CliniciansSection";
import AuthorityModule from "@/components/sections/AuthorityModule";
import ClinicEnvironment from "@/components/sections/ClinicEnvironment";
import EducationFaq from "@/components/sections/EducationFaq";
import TreatmentDirectory from "@/components/sections/TreatmentDirectory";
import TrustBand from "@/components/sections/TrustBand";
import VisitSection from "@/components/sections/VisitSection";
import FinalCta from "@/components/sections/FinalCta";

/**
 * GC Dental World — homepage composition.
 * Canonical content order: docs/gc-dental-world-content-strategy.md,
 * consolidated into 13 visual bands (approved plan Rev. 2 §7).
 */
export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-gc-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <SiteHeader />

      {/* Scroll progress — 1px GC Blue line at the very top. Pure CSS
          scroll-linked (no JS, no scroll listeners); renders nothing at all
          without scroll-driven-animation support or under reduced motion. */}
      <div aria-hidden="true" className="gc-progress-bar" />

      <main id="main-content">
        {/* 02–03 Hero + trust rail */}
        <Hero />
        <TrustRail />

        {/* 04 Patient-intent routing */}
        <IntentNavigator />

        {/* 05 Dental, Explained */}
        <DentalExplained />

        {/* 06–07 Experience + What patients remember */}
        <ExperienceSection />

        {/* 08–09 Smile stories + case library */}
        <SmileStories />

        {/* 10–12 Diagnosis, knowledge hub, concern to care */}
        <CareJourney />

        {/* 13–14 Clinicians + credentials */}
        <CliniciansSection />

        {/* 15 Real-world trust / PV Sindhu */}
        <AuthorityModule />

        {/* 16 The clinic */}
        <ClinicEnvironment />

        {/* 17 FAQ */}
        <EducationFaq />

        {/* 18 Treatment directory */}
        <TreatmentDirectory />

        {/* 19–22 Why / history / timeline / Google reputation */}
        <TrustBand />

        {/* 23–24 First visit + location */}
        <VisitSection />

        {/* 25 Final CTA */}
        <FinalCta />
      </main>

      {/* 26 Footer */}
      <SiteFooter />
      <FloatingContact />
      {/* Mid-page consultation dialog — triggers at ~50% scroll once per session */}
      <ContactDialog />
      {/* One-shot entrance fill for editorial highlights (client, renders null) */}
      <HighlightMotion />
    </>
  );
}
