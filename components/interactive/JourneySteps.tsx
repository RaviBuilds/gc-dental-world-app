"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import JourneyGlyph from "@/components/ui/JourneyGlyph";

type JourneyStep = {
  number: string;
  title: string;
  glyph: string;
  copy: string;
  micro: string | null;
};

/**
 * JourneySteps — the concern-to-care numbered timeline (§12) with a
 * scroll-linked progress rail.
 *
 * Progressive enhancement, same philosophy as Reveal/HighlightMotion:
 *   - Without JS: steps render fully visible with their static rule
 *     connectors and the rail shows as a static track (the fill stays
 *     undrawn at scaleY(0)).
 *   - With JS and motion allowed: the rail fills top-to-bottom (with a
 *     champagne marker riding its end) as steps cross into view, and each
 *     step gets the standard Reveal rise.
 *   - Under prefers-reduced-motion: the rail is hidden via motion-reduce
 *     (no JS check needed) and the reveals collapse to static.
 */
export default function JourneySteps({ steps }: { steps: readonly JourneyStep[] }) {
  const [progress, setProgress] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setProgress((p) => Math.max(p, (index + 1) / steps.length));
          }
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -60px 0px" },
    );
    for (const el of itemRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <div className="relative">
      {/* Progress rail — static track without JS; hidden for reduced motion */}
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-0 top-1 w-[2px] rounded-full bg-gc-blue/15 motion-reduce:hidden"
      >
        <div
          className="absolute inset-0 origin-top rounded-full bg-gc-blue transition-transform duration-700 ease-[var(--ease-soft)]"
          style={{ transform: `scaleY(${progress})` }}
        />
        <div
          className="absolute -left-[3px] h-2 w-2 rounded-full bg-gc-champagne transition-[top] duration-700 ease-[var(--ease-soft)]"
          style={{ top: `calc(${progress * 100}% - 4px)` }}
        />
      </div>

      <ol className="relative flex flex-col gap-10 pl-6 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:pl-10 lg:grid-cols-3 lg:gap-x-10">
        {steps.map((step, i) => (
          <li
            key={step.number}
            data-index={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="group relative"
          >
            <Reveal delay={(i % 3) * 80}>
              <div className="h-full border-t-2 border-gc-blue/30 pt-5 transition-colors duration-300 group-hover:border-gc-blue/70">
                <div className="flex items-start gap-4 transition-transform duration-300 ease-[var(--ease-soft)] group-hover:-translate-y-0.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gc-blue-soft/70 text-gc-blue">
                    <JourneyGlyph id={step.glyph} className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-display text-2xl text-gc-blue/45 md:text-3xl"
                        aria-hidden="true"
                      >
                        {step.number}
                      </span>
                      <h4 className="text-lg font-bold text-gc-ink">
                        <span className="sr-only">Step {step.number}: </span>
                        {step.title}
                      </h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gc-ink/65">{step.copy}</p>
                    {step.micro && (
                      <p className="small-ui mt-3 text-gc-blue">{step.micro}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
