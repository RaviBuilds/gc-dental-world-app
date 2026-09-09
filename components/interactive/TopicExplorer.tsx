"use client";

import { useState } from "react";
import RichText from "@/components/ui/RichText";
import type { Topic } from "@/data/topics";
import ArrowLink from "@/components/ui/ArrowLink";
import ExplainerMedia from "@/components/ui/ExplainerMedia";
import ToothState from "@/components/ui/ToothState";

/**
 * "Dental, Explained." topic switcher — tablist semantics with arrow-key
 * navigation. All topics remain in the DOM (hidden panels stay accessible
 * to crawlers and no-JS readers).
 */
export default function TopicExplorer({ topics }: { topics: Topic[] }) {
  const [active, setActive] = useState(0);
  const current = topics[active];

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % topics.length;
    if (e.key === "ArrowLeft") next = (index - 1 + topics.length) % topics.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = topics.length - 1;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      document.getElementById(`topic-tab-${topics[next].id}`)?.focus();
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Topic list */}
      <div className="lg:col-span-5" role="tablist" aria-label="Dental topics" aria-orientation="vertical">
        <ul className="flex flex-col">
          {topics.map((topic, i) => {
            const selected = i === active;
            return (
              <li key={topic.id}>
                <button
                  type="button"
                  role="tab"
                  id={`topic-tab-${topic.id}`}
                  aria-selected={selected}
                  aria-controls={`topic-panel-${topic.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={`group relative flex w-full items-baseline gap-4 border-b border-gc-ink/10 py-5 text-left transition-colors md:py-6 ${
                    selected ? "text-gc-blue" : "text-gc-ink hover:text-gc-blue"
                  }`}
                >
                  <span
                    className={`text-[0.6875rem] font-semibold uppercase tracking-[0.08em] ${
                      selected ? "text-gc-blue" : "text-gc-silver"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-semibold md:text-xl">
                    {topic.question}
                  </span>
                  {/* Clickability affordance — chevron rotates on the active
                      item, fades in with a nudge on hover for inactive items */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`ml-auto h-3.5 w-3.5 shrink-0 self-center transition-all duration-300 ${
                      selected
                        ? "rotate-90 opacity-100"
                        : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-60"
                    }`}
                  >
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                  {/* Animated progress underline — draws in from the left on
                      the active row (tablist affordance, §05) */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-px h-0.5 origin-left rounded-full bg-gc-blue transition-transform duration-500 ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Topic state illustration — morphs with the active topic and fills
            the column's negative space. Crossfades via the keyed wrapper. */}
        <div key={current.id} className="gc-anim-fade mt-12">
          <ToothState topicId={current.id} theme={current.theme} />
        </div>
      </div>

      {/* Active topic panel */}
      <div className="lg:col-span-7">
        <div
          role="tabpanel"
          id={`topic-panel-${current.id}`}
          aria-labelledby={`topic-tab-${current.id}`}
          key={current.id}
          className="gc-anim-stagger"
        >
          {current.image ? (
            /* Layered editorial media composition — seven layers with
               scroll-driven parallax (fan apart / converge), clip-path wipe
               reveal on topic switch, per-topic mirrored geometry. */
            <ExplainerMedia topic={current} />
          ) : null}
          <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-gc-blue">
            {String(active + 1).padStart(2, "0")} · {current.theme}
          </p>
          <h3 className="h3-display mb-4 text-gc-ink">{current.question}</h3>
          <p className="measure lead text-gc-ink/75"><RichText>{current.body}</RichText></p>
          <div className="mt-6">
            <ArrowLink href="#treatments">{current.ctaLabel}</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  );
}
