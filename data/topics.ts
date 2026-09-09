/**
 * "Dental, Explained." topics — content strategy §05.
 * GENERAL-EDUCATIONAL content: patient-friendly, compact, no clinical lecture.
 * CTA labels are canonical; destinations are future internal pages.
 */
export type Topic = {
  id: string;
  question: string;
  body: string;
  ctaLabel: string;
  /** Short canonical topic name (§05 table) — used for eyebrows/captions. */
  theme: string;
  /** Visual tone for the topic-reactive media treatment (echo frame +
      corner accent tint): "warm" = champagne, "cool" = blue. */
  tone: "cool" | "warm";
  /** Mirrors the media composition (frame corners, arch/dots sides) so
      consecutive topics alternate silhouette. Defaults to false. */
  flip?: boolean;
  image?: string;
  imageAlt?: string;
};

export const topicsIntro = {
  heading: "Dental, explained.",
  intro:
    "Dental problems can be confusing. Before deciding on treatment, it helps to understand what may be happening, _what questions to ask_ and what options a dentist may consider.",
};

export const topics: Topic[] = [
  {
    id: "tooth-pain",
    question: "Why does a tooth hurt?",
    body: "Tooth pain can come from several possible causes — decay, gum inflammation, a cracked tooth or an old filling that has failed. Pain alone doesn't identify the cause; that's what _a clinical examination_ is for. If pain lasts more than a day or two, disturbs sleep or comes with swelling, it's time to have it assessed.",
    ctaLabel: "Understand tooth pain",
    theme: "Tooth Pain",
    tone: "warm",
    image: "/assets/gc-dental-world-dentist-explaining-treatment-to-patient.jpg",
    imageAlt:
      "A GC Dental World dentist explaining a treatment plan to a patient",
  },
  {
    id: "root-canal",
    question: "Does every painful tooth need a root canal?",
    body: "No. Pain has multiple possible causes, and *diagnosis* — not the pain itself — determines treatment. A root canal is one possible pathway when the nerve inside a tooth is affected, but other problems have simpler answers. This is why a clinical examination always comes before treatment decisions.",
    ctaLabel: "Understand root canal treatment",
    theme: "Root Canal Treatment",
    tone: "warm",
    flip: true,
    image: "/assets/gc-dental-world-dentist-performing-dental-treatment.jpg",
    imageAlt:
      "A GC Dental World dentist preparing a treatment for a patient in the operatory",
  },
  {
    id: "crowns",
    question: "When does a tooth need a crown?",
    body: "A crown is a protective covering for a tooth that has lost significant structure — after a large filling, a root canal or a crack. Whether a tooth needs a crown or a simpler restoration depends on how much _healthy tooth remains_, which is something a dentist assesses directly.",
    ctaLabel: "Learn about crowns",
    theme: "Dental Crowns",
    tone: "cool",
    image: "/assets/gc-dental-world-doctor-patient-consultation.jpg",
    imageAlt:
      "A GC Dental World dentist consulting a smiling patient in the treatment chair",
  },
  {
    id: "missing-tooth",
    question: "What happens when a tooth is missing?",
    body: "A missing tooth can affect chewing, speech and how neighbouring teeth drift over time. Common replacement approaches include implants, bridges and removable options — and _the right choice_ varies with the location of the gap, the health of surrounding teeth and individual priorities. These are questions worth asking about.",
    ctaLabel: "Explore tooth replacement",
    theme: "Tooth Replacement",
    tone: "warm",
    flip: true,
    image: "/assets/gc-dental-world-doctor-with-patient-treatment-room.jpg",
    imageAlt:
      "A GC Dental World dentist with a patient in the treatment room",
  },
  {
    id: "children",
    question: "What should parents know about children's dental care?",
    body: "Early dental visits are less about treatment and more about familiarity — helping a child learn that a dental visit is a normal, comfortable experience. Regular check-ups, attention to brushing habits and a calm first visit all shape how children feel about dental care _for years afterwards_.",
    ctaLabel: "Children's dental care",
    theme: "Children's Dental Care",
    tone: "cool",
    image: "/assets/gc-dental-world-dentist-treating-child-patient.jpg",
    imageAlt: "A GC Dental World dentist treating a young patient",
  },
];
