/**
 * Signature Smile Stories — content strategy §09.
 * VISUAL-EVIDENCE: 13 authentic before/after composite photographs
 * (before = top half, after = bottom half of each image).
 *
 * CONTENT INTEGRITY: treatment names / case contexts are
 * NEEDS-CLINIC-CONFIRMATION — `treatment` stays null until verified.
 * Educational microcopy below is canonical and must always be shown.
 */
export type SmileCase = {
  id: string;
  label: string;
  src: string;
  alt: string;
  treatment: string | null; // pending verified treatment name
};

export const casesIntro = {
  heading: "Real cases. Real smiles.",
  intro: "A selection of treatment outcomes from GC Dental World.",
  microcopy:
    "Every dental case is different. Treatment approach and outcomes vary according to individual clinical conditions.",
};

function caseEntry(n: number): SmileCase {
  const id = String(n).padStart(2, "0");
  return {
    id: `case-${id}`,
    label: `Case ${id}`,
    src: `/assets/gc-dental-world-smile-transformation-case-${id}.jpg`,
    alt: `Before and after views of smile transformation case ${id} treated at GC Dental World`,
    treatment: null,
  };
}

export const smileCases: SmileCase[] = Array.from({ length: 13 }, (_, i) =>
  caseEntry(i + 1),
);
