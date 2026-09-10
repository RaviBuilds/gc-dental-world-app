"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import RichText from "@/components/ui/RichText";
import type { TreatmentCategory } from "@/data/treatments";


/**
 * Treatment directory rows — the care-area index of the Clinical Atlas.
 * Client island owning the single-open disclosure state (mirrors
 * Accordion.tsx's a11y contract: button[aria-expanded] + region, grid-rows
 * height animation, no layout JS, instant open under reduced motion via
 * global CSS).
 *
 * Typographic, number-led editorial rows (no glyph chips — the atlas render
 * is this section's imagery): numeral → title → description → plus. Row
 * hover/focus is the `.treatment-row` hook the atlas halo CSS keys on, and
 * signals the real disclosure interaction (blue title/numeral, plus nudge,
 * divider contrast).
 */
export default function TreatmentList({
  categories,
}: {
  categories: TreatmentCategory[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <ul className="border-t border-gc-ink/10">
      {categories.map((category, i) => {
        const open = openId === category.id;
        return (
          <li key={category.id}>
            <Reveal delay={i * 40}>
              <h3>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`treatment-panel-${category.id}`}
                  id={`treatment-button-${category.id}`}
                  onClick={() => setOpenId(open ? null : category.id)}
                  className="treatment-row group relative grid w-full grid-cols-[2.25rem_1fr_1.25rem] gap-x-4 border-b border-gc-ink/10 py-6 text-left transition-colors duration-200 ease-[var(--ease-soft)] hover:border-gc-blue/35 focus-visible:border-gc-blue/35 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-gc-blue md:grid-cols-[2.75rem_1fr_1.5rem] md:gap-x-6 md:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1 font-display text-lg leading-none text-gc-silver transition-colors duration-200 ease-[var(--ease-soft)] group-hover:text-gc-blue group-aria-expanded:text-gc-blue md:text-xl"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block text-lg font-bold leading-snug text-gc-ink transition-colors duration-200 ease-[var(--ease-soft)] group-hover:text-gc-blue group-aria-expanded:text-gc-blue md:text-[1.375rem]">
                      {category.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-gc-ink/65">
                      <RichText>{category.description}</RichText>
                    </span>
                  </span>
                  <span className="justify-self-end pt-1.5">
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      className={`shrink-0 text-gc-blue transition-transform duration-200 ease-[var(--ease-soft)] group-hover:rotate-45 ${
                        open ? "rotate-45" : ""
                      }`}
                    >
                      <path
                        d="M8 1v14M1 8h14"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
              </h3>
              {/* Disclosure panel — grid-rows animation, no layout JS */}
              <div
                id={`treatment-panel-${category.id}`}
                role="region"
                aria-labelledby={`treatment-button-${category.id}`}
                className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-soft)] ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-6 pr-4 pt-1 text-sm leading-relaxed text-gc-ink/60 md:pb-7 md:pl-[4.25rem] md:pr-8 md:text-base">
                    <RichText>{category.detail}</RichText>
                  </p>
                </div>
              </div>
              {/* Verified service chips render here once the clinic confirms
                  the service list (chips contract unchanged). */}
              {category.services ? (
                <ul className="mb-7 flex flex-wrap gap-2 md:pl-[4.25rem]">
                  {category.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-full bg-gc-blue-soft px-3 py-1 text-xs font-semibold text-gc-navy"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}