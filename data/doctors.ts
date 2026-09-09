/**
 * Clinicians — content strategy §13 / §14.
 *
 * CONTENT INTEGRITY: the complete confirmed doctor roster and credentials are
 * pending clinic confirmation. Individual profiles are NOT invented and are
 * NOT rendered. Until supplied, this section presents the team at team level,
 * supported by authentic team photography (VISUAL-EVIDENCE).
 * Do NOT infer credentials from photographs.
 */
export const cliniciansIntro = {
  heading: "The people behind the care.",
  intro:
    "A dental practice is only as reassuring as _the people patients meet_. Meet the clinicians and team behind GC Dental World.",
};

/** Verifiable, team-level trust chips — nothing clinic-specific or invented. */
export const clinicianChips = ["Real clinical team", "Gachibowli, Hyderabad"];

export const cliniciansTeamImage = {
  src: "/assets/gc-dental-world-doctors-team-group-photo.jpg",
  alt: "The GC Dental World doctors and clinical team together at the clinic",
};

export const credentialsIntro = {
  heading: "Built on clinical knowledge. Continued through learning.",
  copy: "The clinic's professional journey — education, postgraduate qualifications, certifications, professional associations and continuing education — will be published here once each detail is _verified with the clinic_. The photographs are from the clinic itself.",
  image: "/assets/gc-dental-world-doctor-professional-event.jpg",
  imageAlt:
    "GC Dental World doctor photographed at a professional event",
};

/** Band close — routes to the real booking section. */
export const cliniciansCta = {
  copy:
    "The same team will be there when you visit — from the first conversation to follow-up care.",
  label: "Book an appointment",
  href: "#contact",
};
