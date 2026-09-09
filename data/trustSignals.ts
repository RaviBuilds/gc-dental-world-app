/**
 * Verified aggregate signals — content strategy §03 / §22.
 * Values must stay EXACT: 4.8 and 286. Never round up.
 */
export const trustSignals = {
  rating: "4.8 / 5",
  ratingValue: 4.8,
  ratingSource: "Google Reviews",
  reviewCount: 286,
  reviewLabel: "Patient Reviews",
  /**
   * Presentation wording per the approved trust-rail refinement:
   * "A Dedicated Clinical Team" (replaces the earlier "Real Clinical Team").
   * No team-wide experience, credential or award claims — supporting label is
   * "Doctors & Staff" only.
   */
  team: "A Dedicated Clinical Team",
  location: "Gachibowli, Hyderabad",
  /**
   * Google Business Profile card — rendered by GoogleReviewsCard inside the
   * ReviewThemes panel (§07 "What patients remember") as the VERIFIED source
   * artifact. Fields are [VERIFIED] against the live GBP listing. `profileUrl`
   * is the clinic-confirmed share link, used verbatim — never shortened,
   * re-derived or substituted.
   */
  googleBusiness: {
    name: "GC Dental World",
    category: "Dental clinic",
    locality: "Hyderabad, Telangana",
    profileUrl: "https://share.google/wUy7dkqMmVycsv29X",
  },
} as const;

/**
 * GATED TRUST FIELD — heroPatientMetric (hero bottom-right proof strip).
 *
 * Source status: NEEDS-CLINIC-CONFIRMATION.
 *
 * The 20,000+ patient/smile figure is NOT verified in the canonical content
 * strategy document, so `value` MUST stay null until the clinic confirms the
 * figure in writing. The hero renders this strip ONLY when `value` is a
 * non-empty string; a null value collapses the element cleanly. NEVER render
 * a placeholder ("XX,XXX+", "[NUMBER]", "20,000+*") in its place, and do not
 * hardcode the number anywhere else in the codebase.
 *
 * To activate after clinic confirmation:
 *   1. set value: "20,000+"
 *   2. set sourceStatus: "VERIFIED"
 *   3. update docs/gc-dental-world-content-strategy.md (the canonical doc —
 *      do not skip this step; it is the source of record).
 */
export type HeroPatientMetric = {
  /** Clinic-confirmed figure, e.g. "20,000+". Null = strip hidden. */
  value: string | null;
  /** Small uppercase label beneath the number. */
  label: string;
  /** Data-governance flag — must be "VERIFIED" before value is ever set. */
  sourceStatus: "VERIFIED" | "NEEDS-CLINIC-CONFIRMATION";
};

export const heroPatientMetric: HeroPatientMetric = {
  value: null,
  label: "Smiles & Counting",
  sourceStatus: "NEEDS-CLINIC-CONFIRMATION",
};
