/**
 * Treatment directory — content strategy §18.
 *
 * CONTENT INTEGRITY: the six categories are canonical FRAMEWORKS, not a
 * confirmed service menu. The confirmed current service list is
 * NEEDS-CLINIC-CONFIRMATION, so each category is described in general
 * educational terms only. Individual service entries stay `null` until
 * verified — never fabricate treatment names.
 *
 * `detail` is [GENERAL-EDUCATIONAL] copy about the AREA OF DENTISTRY shown
 * when a row expands — same discipline as the FAQ answers. It never claims
 * GC-specific services, equipment, or processes.
 */
export type TreatmentCategory = {
  id: string;
  title: string;
  description: string;
  /** General-educational expansion copy for the row's disclosure panel. */
  detail: string;
  services: string[] | null; // pending verified service list
};

export const treatmentsIntro = {
  heading: "Dental care for different needs.",
  intro:
    "An overview of the areas of dental care — organized around patient needs, not clinic departments.",
};

export const treatmentCategories: TreatmentCategory[] = [
  {
    id: "general-preventive",
    title: "General & Preventive Care",
    description:
      "The foundation of dental health — examinations, professional cleaning, and guidance that keeps small problems small.",
    detail:
      "A preventive visit typically centres on an examination, professional cleaning and a conversation about daily habits — the aim is to catch change early, when it is simplest to treat. How often to visit depends on your mouth and your risk factors, not a fixed rule for everyone.",
    services: null,
  },
  {
    id: "restorative",
    title: "Restorative Dentistry",
    description:
      "Repairing teeth affected by decay or damage — fillings, crowns and treatments that preserve natural tooth structure where possible.",
    detail:
      "When a tooth is affected by decay or damage, treatment ranges from a small filling to a crown, depending on how much healthy structure remains. The goal in every case is the same: keep as much of your natural tooth as possible for as long as possible.",
    services: null,
  },
  {
    id: "tooth-replacement",
    title: "Tooth Replacement",
    description:
      "Options for missing teeth — from implants to bridges and removable solutions, chosen around the individual situation.",
    detail:
      "Missing teeth can be replaced in more than one way — implants, bridges or removable options. Each has different requirements, and the right choice depends on the health of the surrounding teeth, gums and bone, which is why assessment comes before any recommendation.",
    services: null,
  },
  {
    id: "smile-care",
    title: "Cosmetic / Smile-focused Care",
    description:
      "Care focused on how your smile looks and feels — with honest guidance about what each approach can and cannot achieve.",
    detail:
      "Smile-focused care covers the appearance of teeth — whitening, reshaping, veneers and similar options. An honest consultation covers what each approach cannot do as clearly as what it can, so expectations match outcomes before anything begins.",
    services: null,
  },
  {
    id: "children",
    title: "Children's Dental Care",
    description:
      "Preventive care and positive early experiences, so children grow up comfortable with dental visits.",
    detail:
      "Children's visits are built around familiarity — short, positive appointments that grow more thorough as your child grows. Starting early, before there is a problem, is what makes every later visit easier for both of you.",
    services: null,
  },
  {
    id: "surgical",
    title: "Surgical / Complex Dental Care",
    description:
      "Procedures that need additional planning and precision — assessed carefully, explained clearly before anything begins.",
    detail:
      "Some treatments need extra planning — imaging, a reviewed medical history, and a clear explanation of the procedure and recovery before anything is scheduled. Complexity is the reason for careful assessment, not a reason to delay it.",
    services: null,
  },
];
