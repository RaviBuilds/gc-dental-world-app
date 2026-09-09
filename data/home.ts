/**
 * Central homepage content — canonical copy from
 * docs/gc-dental-world-content-strategy.md §02, §06, §08, §10–§12, §15, §16,
 * §19–§21, §23, §25.
 *
 * CONTENT INTEGRITY NOTES:
 * - "long-established" is interim copy; replace with a confirmed founding
 *   duration when supplied (NEEDS-CLINIC-CONFIRMATION). Never manufacture a number.
 * - PV Sindhu wording is photograph-backed and factual only. No endorsement,
 *   "official dentist", "celebrity dentist" or athlete-trust claims. Exact
 *   relationship wording pending clinic confirmation.
 * - No founding year / years-of-practice claims anywhere.
 */

export const hero = {
  eyebrow: "GC Dental World · Gachibowli, Hyderabad",
  h1: "Dental care built around people, not\u00A0just procedures.",
  /**
   * Final pass: supporting line reduced to one short factual clause so the H1
   * carries the wall and the line never competes with the clock/faces.
   * Wording is drawn verbatim from strategy §02 ("patient-focused approach",
   * "Gachibowli" location signal) — no new marketing copy.
   */
  support: "Patient-focused dental care in Gachibowli, Hyderabad.",
  primaryCta: { label: "Book an Appointment", href: "#contact" },
  secondaryCta: { label: "Call 070324 44510", href: "tel:+917032444510" },
  localSignal: "Khajaguda · Gachibowli · Hyderabad",
  image: {
    src: "/assets/gc-dental-world-doctors-team-group-photo.jpg",
    alt: "The GC Dental World doctors and clinical team at the Gachibowli clinic",
  },
} as const;

export const intentSection = {
  heading: "What brings you here?",
  intro:
    "Whatever brings you here, we help you understand it. _Start with your situation_.",
  options: [
    {
      id: "pain",
      title: "I have tooth pain or discomfort",
      description:
        "Understand common causes of tooth pain and when a dental evaluation may be needed.",
      cta: "Explore tooth pain",
      href: "#dental-explained",
    },
    {
      id: "restoration",
      title: "I have a damaged or missing tooth",
      description:
        "Learn about common restorative and replacement approaches.",
      cta: "Explore restoration",
      href: "#treatments",
    },
    {
      id: "smile",
      title: "I want to improve my smile",
      description:
        "Explore the considerations behind cosmetic and smile-focused dental care.",
      cta: "Explore smile care",
      href: "#smile-stories",
    },
    {
      id: "family",
      title: "I'm looking for dental care for my family",
      description: "Information for children, adults and family dental needs.",
      cta: "Explore family care",
      href: "#experience",
    },
  ] as const,
};

/**
 * Experience section (content strategy §06, refined).
 *
 * STRUCTURE — one connected editorial story, three conceptual movements
 * (LISTEN → EXPLAIN → CARE). The movement labels are editorial navigation,
 * not medical claims.
 *
 * CONTENT INTEGRITY:
 * - Listening / explaining / taking-time language is REVIEW-DERIVED
 *   (canonical §06) — framed as "patients frequently describe", never as a
 *   clinic-wide promise.
 * - Follow-up is NOT published as a clinic-wide claim (§06 marks it
 *   NEEDS-CLINIC-CONFIRMATION): the closing beat attributes it to reviews and
 *   keeps it conditional ("differs with every procedure").
 * - No invented facts of any kind; the two photographs are the existing
 *   authentic consultation/explanation assets (VISUAL-EVIDENCE).
 */
export const experience = {
  heading: "Dental care feels different when you know what to expect.",
  /** Two-paragraph section introduction (~110 words). Sentence one of
   * paragraph two is the canonical §06 example copy, kept verbatim. */
  intro: [
    "Dental care becomes easier to navigate when you _understand what is happening_ — what the dentist is looking for, what they find, which options may exist, and what each would involve. That understanding is not something patients are expected to ask for; it is part of how a visit is meant to work here.",
    "Patients frequently describe their experience at GC Dental World in terms of _clear explanations_, approachable doctors and time taken to understand their concerns. That pattern is what the rest of this section follows: how a concern is heard before anything begins, how findings and options are explained in plain language, and how care continues once treatment itself is complete.",
  ] as const,
  rows: [
    {
      number: "01",
      title: "Your concern is heard first",
      copy: "Before any instrument is picked up, there is a *conversation*. What is bothering you, since when, what you have already tried, and what worries you most about it. Some patients arrive with one specific concern; others bring a list they have been carrying for months — both are listened to the same way, and both shape what the dentist looks for. Context matters here as much as symptoms: previous dental work, medical history, and what matters to you about the outcome. _Nothing is concluded_ during this first exchange. It exists so that the examination afterwards happens in the light of what you actually came in with.",
      /** Decorative process cue — rendered as quiet editorial marginalia. */
      cue: ["Listen", "Understand"] as const,
      image: {
        src: "/assets/gc-dental-world-doctor-patient-consultation.jpg",
        alt: "A GC Dental World doctor in consultation with a patient at the clinic",
      },
    },
    {
      number: "02",
      title: "Everything is explained, in plain language",
      copy: "Once the examination is complete, findings are _explained in plain language_ — what was seen, what it may mean, and what it does not. Where more than one approach may be possible, each option is laid out with what it involves and what considerations attach to it, so the comparison happens openly instead of in your head. Questions are treated as part of the consultation, not an interruption to it. The aim is specific: that when a treatment decision is made, it is made with a clear picture of your own situation — an _informed decision_ rather than a rushed one. And if something can simply be monitored for now, that is explained too.",
      cue: ["Findings", "Options", "Questions"] as const,
      image: {
        src: "/assets/gc-dental-world-dentist-explaining-treatment-to-patient.jpg",
        alt: "A GC Dental World dentist explaining treatment options to a patient",
      },
    },
  ],
  /** Closing beat — 03 · CARE. Text-led editorial bridge, review-attributed
   * and deliberately non-promissory about follow-up (see integrity notes). */
  closing: {
    number: "03",
    title: "Care continues beyond the chair",
    copy: "Treatment is one part of the experience, not the end of it. Across patient reviews, people often describe the time afterwards — questions answered once they were home, a team that stayed reachable, advice that still made sense days later. Follow-up differs with every procedure, so what continues beyond the chair is shaped by the treatment itself; the constant is that next steps are _explained before you leave_, not discovered afterwards.",
    cue: ["Treatment", "Recovery", "Follow-up"] as const,
  },
};

export const smileStory = {
  eyebrow: "A patient story",
  heading: "Sometimes a new smile means much more than teeth.",
  copy: "Dental treatment can be functional, personal and _deeply emotional_. For patients and families, restoring the ability to smile comfortably can mean much more than the procedure itself.",
  imageCaption:
    "An 80-year-old patient's smile after receiving a new set of teeth at GC Dental World.",
  cta: { label: "Explore More Smile Stories", href: "#smile-cases" },
  image: {
    src: "/assets/gc-dental-world-elderly-patient-smile-transformation.jpg",
    alt: "An elderly GC Dental World patient smiling after receiving a new set of teeth",
  },
  /**
   * Story beats — the §08 emotional arc (BEFORE → TREATMENT → AFTER). Copy
   * narrates the verified artifact only (the composite photo + the caption
   * facts); enrich beat 02 solely with clinic-confirmed treatment detail.
   * Never write patient biography by hand.
   */
  story: [
    {
      number: "01",
      label: "Before",
      copy: "The left photograph — teeth that could no longer support a comfortable smile.",
    },
    {
      number: "02",
      label: "The treatment",
      copy: "A new set of teeth, made and fitted at GC Dental World.",
    },
    {
      number: "03",
      label: "After",
      copy: "The right photograph — the same patient, smiling freely again.",
    },
  ],
  /** Verified facts from the caption, promoted to scannable chips. */
  facts: ["80 years old", "New set of teeth"],
  /**
   * GATED FIELD — authentic patient quote. Null renders nothing; NEVER
   * write a placeholder quote by hand (same rule as review excerpts).
   */
  patientQuote: null as { text: string; attribution: string | null } | null,
} as const;

export const careJourney = {
  diagnosisHeading: "The right treatment starts with the right diagnosis.",
  diagnosisCopy:
    "Similar symptoms can have very different underlying causes. That is why _treatment follows examination_ — different situations lead to different options, each with different considerations. Understanding your options before treatment begins is part of how care works here.",
  /** Honest process chips — derived from the copy above, nothing clinic-specific. */
  philosophyChips: ["Examination first", "Options explained", "You decide"],
  knowledgeHeading: "Know more about your dental health.",
  knowledgeCopy:
    "Tooth pain, root canals, crowns, implants, wisdom teeth, gum health, children's care and more — explored in plain language in the topics above.",
  /** Links point at real homepage anchors only — the card must never dead-end. */
  knowledgeLinks: [
    { label: "Explore dental topics", href: "#dental-explained" },
    { label: "Questions patients ask", href: "#faqs" },
    { label: "Dental care areas", href: "#treatments" },
  ],
  journeyHeading: "From concern to care.",
  journeyIntro:
    "If you have never been to a dentist — or it has simply been a while — _here is the path_, from the moment you notice something to the care that follows.",
  /**
   * Each step: what happens + what it means for you. `micro` is a GATED
   * slot (rendered only when non-null) for clinic-confirmed notes —
   * never fill it with invented specifics.
   */
  steps: [
    {
      number: "01",
      title: "Understand",
      glyph: "understand",
      copy:
        "It starts with your description of the problem — what is bothering you, since when, and what you have noticed yourself.",
      micro: null as string | null,
    },
    {
      number: "02",
      title: "Examine",
      glyph: "examine",
      copy:
        "The dentist assesses the clinical situation — examining what symptoms alone cannot show, so the cause is found, not guessed.",
      micro: null as string | null,
    },
    {
      number: "03",
      title: "Explain",
      glyph: "explain",
      copy:
        "Findings and treatment options are discussed in plain language, including what each option involves and why it is being suggested.",
      micro: null as string | null,
    },
    {
      number: "04",
      title: "Decide",
      glyph: "decide",
      copy:
        "The appropriate approach is chosen based on the individual situation — with your questions answered before anything begins.",
      micro: null as string | null,
    },
    {
      number: "05",
      title: "Treat",
      glyph: "treat",
      copy:
        "Treatment is carried out according to the plan you agreed to, and you know what is happening at each stage.",
      micro: null as string | null,
    },
    {
      number: "06",
      title: "Review",
      glyph: "review",
      copy:
        "Follow-up or ongoing care where appropriate, so the outcome is checked — not assumed.",
      micro: null as string | null,
    },
  ],
  /** Journey close — routes to the real booking section. */
  journeyCtaCopy:
    "Every journey here begins the same way — with a conversation and an examination.",
  journeyCtaLabel: "Start with a conversation",
  journeyCtaHref: "#contact",
};

export const authority = {
  eyebrow: "Real-world trust",
  heading: "Trusted beyond the everyday.",
  copy: "People from every walk of life have walked through our doors — including well-known public figures who visited the clinic, such as badminton champion PV Sindhu, seen here during a visit to GC Dental World.",
  privacyNote:
    "Whoever walks in receives the same attention, the same explanations and the same respect for privacy.",
  /** §15 "verified factual context" row — only facts already confirmed in
   *  the copy/alt text. No visit date or treatment claim until the clinic
   *  confirms them ([NEEDS-CLINIC-CONFIRMATION]). */
  facts: [
    "PV Sindhu",
    "Badminton world champion",
    "Visited the clinic at Gachibowli",
  ],
  /** Quiet CTA — reuses the journey CTA wording; keep understated. */
  cta: { label: "Start with a conversation", href: "#contact" },
  image: {
    src: "/assets/gc-dental-world-patient-visit-clinic.jpg",
    alt: "PV Sindhu during a visit to GC Dental World, standing with the clinic's doctors in front of the credential wall",
  },
} as const;

export const clinicSection = {
  heading: "Know the place before you visit.",
  intro:
    "GC Dental World is located in Khajaguda, Gachibowli, Hyderabad, making the clinic easily identifiable before your first visit.",
  /** [VERIFIED] — location areas from data/location.ts */
  localSignal: "Khajaguda · Gachibowli · Hyderabad",
  /**
   * [VERIFIED] — landmark line lifted from the confirmed Google Business
   * address (data/location.ts addressLines). Serves §16's "easily
   * identifiable" promise without inventing anything.
   */
  landmark: "Next to Andhra Bank, near Delhi Public School",
  /**
   * §16 sets CTA: n/a for this section, so instead of duplicating the
   * Get Directions block (VisitSection §23–24 owns it), the band closes
   * with a cross-link to the verified location block.
   */
  findUs: { label: "See how to find us", href: "/#location" },
  /**
   * Photo descriptions are [VISUAL-EVIDENCE] — each line only states what
   * the photograph itself shows (content strategy §16: "do not invent
   * facilities; describe only what is verified").
   */
  images: [
    {
      src: "/assets/gc-dental-world-clinic-main-entrance.jpg",
      alt: "The main entrance of GC Dental World in Gachibowli, Hyderabad",
      label: "Main entrance",
      description: "Ground-floor entrance on Khajaguda–Nanakramguda Road.",
      large: true,
    },
    {
      src: "/assets/gc-dental-world-clinic-reception-interior.jpg",
      alt: "The reception area inside GC Dental World",
      label: "Reception",
      description: "Reception desk and waiting area at the clinic entry.",
      large: false,
    },
    {
      src: "/assets/gc-dental-world-dental-treatment-room-equipment.jpg",
      alt: "A treatment room with dental equipment at GC Dental World",
      label: "Treatment spaces",
      description: "Treatment room with the dental chair and equipment.",
      large: false,
    },
    {
      src: "/assets/gc-dental-world-clinic-interior.jpg",
      alt: "The interior of the GC Dental World clinic",
      label: "Patient areas",
      description: "Interior corridor connecting the patient areas.",
      large: false,
    },
  ] as const,
};

export const trustSection = {
  whyHeading: "Why patients choose GC Dental World.",
  whyPrinciples: [
    {
      title: "A team you can meet",
      copy: "Real doctors and staff, visible before you ever book.",
    },
    {
      title: "Explanations before decisions",
      copy: "One of the most repeated themes in patient reviews.",
    },
    {
      title: "A real clinical environment",
      copy: "The clinic, its rooms and its equipment — shown, not claimed.",
    },
    {
      title: "Care across generations",
      copy: "Children, parents and grandparents appear throughout the clinic's patient stories.",
    },
    {
      title: "A reputation built over time",
      copy: "Evidence accumulated across years of patient reviews, not a marketing claim.",
    },
    {
      title: "An accessible Gachibowli location",
      copy: "Khajaguda, Gachibowli — easy to find before your first visit.",
    },
  ] as const,
  historyHeading: "A practice built through patient relationships.",
  historyCopy:
    "Some of the earliest patient reviews of GC Dental World stretch back many years. Long-term patients return, families bring family members, and _the same names reappear_ across different years of reviews. That accumulation — rather than any single claim — is the clinic's history.",
  timelineHeading: "Trust that has grown over time.",
  timeline: [
    { label: "Earlier patients", copy: "First experiences, earliest reviews." },
    { label: "Returning patients", copy: "Patients coming back over multiple years." },
    { label: "Family care", copy: "Family members treated across generations." },
    { label: "Today", copy: "4.8 ★ across 286 Google reviews." },
  ] as const,
  googleHeading: "4.8 ★ on Google",
  googleCopy:
    "286 patient reviews — organized around what patients actually mention, not a wall of stars.",
};

export const firstVisit = {
  heading: "Your first visit, made simple.",
  intro:
    "If you are new to GC Dental World, here is what a first visit generally involves.",
  steps: [
    {
      number: "01",
      title: "Before your visit",
      copy: "Have your concerns ready — and, if you have them, previous dental records or X-rays.",
    },
    {
      number: "02",
      title: "At the clinic",
      copy: "Reception helps you settle in and get registered before your consultation.",
    },
    {
      number: "03",
      title: "During consultation",
      copy: "The doctor assesses and explains — what they find, what it means, and what your options are.",
    },
    {
      number: "04",
      title: "Choosing treatment",
      copy: "Options are discussed based on your individual case. You decide with full information.",
    },
    {
      number: "05",
      title: "After treatment",
      copy: "You receive clear next-step information, with follow-up where appropriate.",
    },
  ] as const,
};

export const finalCta = {
  heading: "Ready to talk about your dental health?",
  copy: "Have a concern, a treatment question or simply want to understand what your options are? _Start with a consultation_.",
  primary: { label: "Book an Appointment", href: "#contact" },
  secondary: { label: "Call 070324 44510", href: "tel:+917032444510" },
} as const;


