/**
 * "What Patients Remember" — content strategy §07.
 * REVIEW-DERIVED: the six themes below recur in the supplied review corpus.
 *
 * CONTENT INTEGRITY: authentic verbatim review excerpts have NOT been supplied
 * yet. Theme descriptions paraphrase the recurring review language; no review
 * is quoted or attributed until authentic excerpts are provided. Add each
 * excerpt (verbatim) to `excerpt` when the corpus is supplied — never write
 * one by hand. `excerptAuthor` / `excerptSource` accompany it in the panel.
 *
 * Descriptions are rendered through RichText: ONE *brush* word each, per the
 * site-wide highlight rules. Words are styled, never re-written.
 */
export type ReviewTheme = {
  id: string;
  number: string;
  title: string;
  description: string;
  excerpt: string | null; // pending authentic review corpus
  excerptAuthor: string | null; // first name + initial, from the review itself
  excerptSource: string | null; // e.g. "Google Review"
};

export const reviewThemesIntro = {
  heading: "What patients remember.",
  intro:
    "Nobody remembers a waiting room. They remember how they were treated — six themes recur when patients describe GC Dental World.",
};

export const reviewThemes: ReviewTheme[] = [
  {
    id: "explanations",
    number: "01",
    title: "Clear explanations",
    description:
      "Patients repeatedly mention doctors taking the time to *explain* the problem, the treatment process and the options — before anything begins.",
    excerpt: null,
    excerptAuthor: null,
    excerptSource: null,
  },
  {
    id: "team",
    number: "02",
    title: "A friendly clinical team",
    description:
      "Reviews describe an *approachable*, reassuring team — from the front desk to the treatment chair.",
    excerpt: null,
    excerptAuthor: null,
    excerptSource: null,
  },
  {
    id: "hygiene",
    number: "03",
    title: "Clean and hygienic environment",
    description:
      "*Cleanliness* of the clinic is one of the most commonly repeated observations across the review corpus.",
    excerpt: null,
    excerptAuthor: null,
    excerptSource: null,
  },
  {
    id: "comfort",
    number: "04",
    title: "Comfort during treatment",
    description:
      "Patients frequently recall feeling at *ease* during procedures — including those who arrived anxious.",
    excerpt: null,
    excerptAuthor: null,
    excerptSource: null,
  },
  {
    id: "family",
    number: "05",
    title: "Care for families",
    description:
      "Families mention bringing children and parents alike — and being treated with *patience* in both directions.",
    excerpt: null,
    excerptAuthor: null,
    excerptSource: null,
  },
  {
    id: "appointments",
    number: "06",
    title: "Appointments and follow-up",
    description:
      "Reviewers often note that appointments ran as expected and that the team stayed *reachable* after treatment.",
    excerpt: null,
    excerptAuthor: null,
    excerptSource: null,
  },
];
