"use client";

import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import type { TreatmentCategory } from "@/data/treatments";

/**
 * Hand-drawn line glyphs per care area — house style (stroke currentColor,
 * ~1.5 weight, no icon library). Purely decorative (aria-hidden).
 */
const glyphs: Record<TreatmentCategory["id"], ReactNode> = {
  "general-preventive": (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5 13.5 3.5v4c0 3.5-2.4 6-5.5 7-3.1-1-5.5-3.5-5.5-7v-4L8 1.5Z" />
      <path d="m5.8 7.9 1.6 1.6 2.9-3.3" />
    </svg>
  ),
  restorative: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 11.5 3.5 5l3 2.5L8 3l1.5 4.5L12.5 5l1 6.5" />
      <path d="M2.5 13.5h11" />
    </svg>
  ),
  "tooth-replacement": (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 1.5h3M5.5 3.5h5M5 5.5h6M5.5 8h5l-.8 4.2a1.9 1.9 0 0 1-3.4 0L5.5 8Z" />
    </svg>
  ),
  "smile-care": (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5a5 5 0 0 0 10 0" />
      <path d="m12.6 1.6.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5.5-1.5Z" />
    </svg>
  ),
  children: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 13.5C5 11 2.5 8.9 2.5 6.3 2.5 4.5 3.9 3 5.7 3c1 0 1.9.5 2.3 1.2C8.4 3.5 9.3 3 10.3 3c1.8 0 3.2 1.5 3.2 3.3 0 2.6-2.5 4.7-5.5 7.2Z" />
    </svg>
  ),
  surgical: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="4.5" />
      <path d="M8 1v2.5M8 12.5V15M1 8h2.5M12.5 8H15" />
    </svg>
  ),
};

/**
 * Treatment directory rows — client island owning the single-open
 * disclosure state (mirrors Accordion.tsx's a11y contract:
 * button[aria-expanded] + region, grid-rows height animation, no layout JS,
 * instant open under reduced motion via global CSS).
 *
 * The hover-blue on numeral/title now signals a real interaction instead of
 * implying navigation that doesn't exist.
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
          <li key={category.id} className="border-b border-gc-ink/10">
            <Reveal delay={i * 40}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`treatment-panel-${category.id}`}
                id={`treatment-button-${category.id}`}
                onClick={() => setOpenId(open ? null : category.id)}
                className="group relative grid w-full gap-2 py-7 text-left md:grid-cols-12 md:items-center md:gap-8 md:py-8"
              >
                <span
                  aria-hidden="true"
                  className="hidden font-display text-2xl text-gc-silver transition-colors group-hover:text-gc-blue md:col-span-1 md:block"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex items-center gap-3 pr-8 md:col-span-4 md:pr-0">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gc-blue/25 text-gc-blue transition-colors duration-300 group-hover:border-gc-blue/50"
                  >
                    {glyphs[category.id]}
                  </span>
                  <span className="text-xl font-bold text-gc-ink transition-colors group-hover:text-gc-blue md:text-2xl">
                    {category.title}
                  </span>
                </span>
                <span className="measure text-gc-ink/70 md:col-span-6">
                  {category.description}
                </span>
                <span className="absolute right-0 top-7 md:static md:flex md:items-center md:justify-end">
                  <svg
                    aria-hidden="true"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className={`shrink-0 text-gc-blue transition-transform duration-200 ease-[var(--ease-soft)] ${
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
                <div className="grid md:grid-cols-12 md:gap-8">
                  <div aria-hidden="true" className="hidden md:col-span-5 md:block" />
                  <p className="pb-7 pr-6 text-sm leading-relaxed text-gc-ink/60 md:col-span-7 md:pr-0 md:text-base">
                    {category.detail}
                  </p>
                </div>
              </div>
            </div>
            {/* Verified service chips render here once the clinic confirms
                the service list (chips contract unchanged). */}
            {category.services ? (
              <ul className="mb-7 flex flex-wrap gap-2 md:pl-[calc(41.666%+1rem)]">
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