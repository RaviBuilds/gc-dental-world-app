"use client";

import { useState } from "react";
import RichText from "@/components/ui/RichText";

type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

/**
 * Accessible single-open accordion (canonical plan §11):
 * button[aria-expanded] + region, grid-rows height animation (no layout JS),
 * instant open under reduced motion via global CSS.
 */
export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="divide-y divide-gc-ink/10 border-y border-gc-ink/10">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <li key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-button-${item.id}`}
                onClick={() => setOpenId(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-gc-ink transition-colors hover:text-gc-blue md:py-6 md:text-lg"
              >
                {item.question}
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
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-button-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-[var(--ease-soft)] ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="measure pb-6 text-gc-ink/75"><RichText>{item.answer}</RichText></p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
