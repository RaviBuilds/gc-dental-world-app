/**
 * FAQ — content strategy §17.
 * GENERAL-EDUCATIONAL questions and answers. No fixed timelines invented.
 *
 * `schemaEligible` is false for all items at launch: FAQ structured data is
 * optional and eligibility-dependent (canonical plan §10). Flip to true only
 * for clinic-authored answers confirmed by the clinic.
 */
export type Faq = {
  id: string;
  question: string;
  answer: string;
  schemaEligible: boolean;
};

export const faqIntro = {
  heading: "Questions patients ask before they book.",
  intro:
    "Straight answers to the questions we hear most often — no pressure, no fixed promises.",
  /**
   * Doctor portrait in the FAQ's editorial column (visual design system §12.12).
   * The clinician's identity is not yet clinic-verified, so the alt/caption
   * stay name- and credential-free — no invented qualifications.
   */
  portrait: {
    src: "/assets/gc-dental-world-doctor-portrait.jpg",
    alt: "Dentist at GC Dental World, Gachibowli",
    caption:
      "The answers here are the ones we give in person — bring your questions to the first visit.",
  },
};

export const faqs: Faq[] = [
  {
    id: "root-canal-every-toothache",
    question: "Does every toothache need a root canal?",
    answer:
      "No. Tooth pain has many possible causes, and _only a clinical examination_ can tell which one applies to you. A root canal is one treatment pathway when the nerve inside a tooth is affected — other causes often have simpler answers.",
    schemaEligible: false,
  },
  {
    id: "tooth-saved",
    question: "How do dentists determine whether a tooth can be saved?",
    answer:
      "Dentists assess how much healthy tooth structure remains, the state of the nerve and surrounding bone, and the position of the tooth. Examination and, where needed, an X-ray give the full picture before a save-or-replace decision is made.",
    schemaEligible: false,
  },
  {
    id: "filling-vs-crown",
    question: "What is the difference between a filling and a crown?",
    answer:
      "A filling repairs a smaller area of damage inside the tooth. A crown covers the whole tooth, protecting it when too much structure has been lost for a filling to hold reliably. The clinical situation determines which is appropriate.",
    schemaEligible: false,
  },
  {
    id: "missing-tooth-replace",
    question: "When might a missing tooth need to be replaced?",
    answer:
      "Replacement is worth considering when a gap affects chewing, speech, appearance or the stability of neighbouring teeth. The right option — implant, bridge or removable — depends on the individual situation.",
    schemaEligible: false,
  },
  {
    id: "wisdom-tooth",
    question: "How is a wisdom tooth problem evaluated?",
    answer:
      "Dentists look at whether the tooth has fully come through, whether it is causing repeated infection or pressure on neighbouring teeth, and whether it can be kept clean. Not every wisdom tooth needs removal — assessment comes first.",
    schemaEligible: false,
  },
  {
    id: "child-visit-prep",
    question: "How should I prepare my child for a dental visit?",
    answer:
      "Keep the language positive and simple — a dental visit is about keeping teeth healthy, not something to fear. Avoid promising 'it won't hurt' or expressing your own anxiety. Early visits that end well make every later visit easier.",
    schemaEligible: false,
  },
  {
    id: "first-consultation",
    question: "What happens during a first dental consultation?",
    answer:
      "Typically: a conversation about your concern, an examination of your teeth and gums, and a clear explanation of what the dentist finds — including your options and what each involves. You should leave _understanding your situation_, not just with a treatment date.",
    schemaEligible: false,
  },
  {
    id: "right-option",
    question: "How do I know which treatment option is right for me?",
    answer:
      "You shouldn't have to guess. The right option depends on a proper diagnosis, and a good dentist explains the options — including what changes between them — so you can decide with full information.",
    schemaEligible: false,
  },
  {
    id: "appointment-count",
    question: "How many appointments will I need?",
    answer:
      "The number of appointments depends on the condition being treated, the treatment chosen and the individual case. After your examination you will have a realistic answer for your specific situation.",
    schemaEligible: false,
  },
];
