"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import BeforeAfterViewer from "@/components/ui/BeforeAfterViewer";
import type { SmileCase } from "@/data/cases";

/**
 * Signature Smile Stories viewer — V2 recomposition (content strategy §09).
 *
 * The old master-detail wall (13 thumbs x 3 columns beside one oversized
 * static image) is replaced with a composed editorial stage:
 *   - STAGE: BeforeAfterViewer in vertical orientation — each case asset is
 *     an authentic stacked composite (before = top half, after = bottom
 *     half), so the divider wipes vertically. One-shot glide settles on the
 *     after smile; replays per case via the key remount.
 *   - FRAMING: the shared media framing language (dashed echo frame,
 *     champagne sparkle, blue plus) plus a ghost case numeral — matching the
 *     flagship story and Experience sections.
 *   - RAIL: a single-row filmstrip scrubber of AFTER-half crops (thumbnails
 *     sell the outcome), active thumb enlarged, arrow-key roving selection.
 *   - META: Case NN of 13 counter + gated treatment chip; factual stat
 *     block; mandatory educational microcopy as a full-width hairline band.
 *
 * The drag divider reuses the flagship-tested component (canonical plan §8
 * enhancement flag satisfied by shipping the accessible ARIA-slider build).
 */
export default function SmileCaseViewer({ cases }: { cases: SmileCase[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLUListElement>(null);
  const current = cases[activeIndex];
  const caseNo = String(activeIndex + 1).padStart(2, "0");
  const totalNo = String(cases.length).padStart(2, "0");

  const selectCase = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  /* Filmstrip arrow keys — roving selection with focus follow. */
  const onRailKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + delta + cases.length) % cases.length;
    selectCase(next);
    railRef.current
      ?.querySelectorAll<HTMLButtonElement>("button")
      ?.[next]?.focus();
  };

  /* Keep the active thumb visible in the mobile filmstrip scroller. */
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (rail.scrollWidth <= rail.clientWidth) return;
    const buttons = rail.querySelectorAll<HTMLButtonElement>("button");
    buttons[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  return (
    <div>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Stage — vertical wipe comparison, framed like the sections above */}
        <div className="min-w-0 lg:col-span-7">
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-14 right-0 z-0 select-none font-display text-[7rem] leading-none text-white/5"
            >
              {caseNo}
            </span>
            <div
              aria-hidden="true"
              className="absolute -inset-3 z-0 rounded-[2rem] border-2 border-dashed border-gc-blue-soft/25"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute -right-2 -top-3 z-20 h-6 w-6 text-gc-champagne"
            >
              <path d="M12 2l1.9 8.1L22 12l-8.1 1.9L12 22l-1.9-8.1L2 12l8.1-1.9z" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="absolute -bottom-4 -left-4 z-20 h-4 w-4 text-gc-blue-soft/50"
            >
              <path d="M12 4v16M4 12h16" />
            </svg>

            <div key={current.id} className="gc-review-rise-1 relative z-10">
              <BeforeAfterViewer
                src={current.src}
                alt={current.alt}
                orientation="vertical"
              />
            </div>
          </div>

          {/* Case meta — counter + gated treatment chip */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-2xl text-gc-light">
              Case <span className="text-gc-blue-soft">{caseNo}</span>
              <span className="ml-2 text-sm font-normal text-gc-light/50">
                of {totalNo}
              </span>
            </p>
            <div className="ml-auto flex items-center gap-3">
              {current.treatment ? (
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-gc-light/75">
                  {current.treatment}
                </span>
              ) : null}
              <div className="flex items-center gap-2" role="group" aria-label="Case navigation">
                <button
                  type="button"
                  aria-label="Previous case"
                  onClick={() => selectCase((activeIndex - 1 + cases.length) % cases.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-gc-light transition-colors hover:border-gc-blue hover:bg-gc-blue/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next case"
                  onClick={() => selectCase((activeIndex + 1) % cases.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-gc-light transition-colors hover:border-gc-blue hover:bg-gc-blue/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-4 w-4">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rail — single-row filmstrip scrubber of AFTER-half crops */}
        <div className="min-w-0 lg:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="small-ui text-gc-silver">Case selection</h3>
            <p
              aria-hidden="true"
              className="text-xs font-semibold tracking-widest text-gc-blue-soft"
            >
              {caseNo} / {totalNo}
            </p>
          </div>
          <ul
            ref={railRef}
            onKeyDown={onRailKeyDown}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:snap-none lg:overflow-visible lg:pb-0"
            aria-label="Smile transformation cases"
          >
            {cases.map((c, i) => {
              const active = i === activeIndex;
              return (
                <li key={c.id} className="shrink-0 snap-start">
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-label={`Show ${c.label}`}
                    onClick={() => selectCase(i)}
                    className={`block overflow-hidden rounded-sm border-2 transition-all duration-200 ${
                      active
                        ? "w-28 border-gc-blue opacity-100 shadow-[0_8px_24px_-8px_rgba(46,124,152,0.65)] lg:w-full"
                        : "w-20 border-transparent opacity-60 hover:border-gc-blue-soft hover:opacity-100 lg:w-full"
                    }`}
                  >
                    <span className="relative block aspect-[4/3] bg-gc-stone">
                      {/* Thumbnails sell the outcome — crop the after half */}
                      <Image
                        src={c.src}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                        style={{ objectPosition: "center bottom" }}
                      />
                    </span>
                    <span className="block bg-gc-light py-1 text-center text-[0.6875rem] font-semibold text-gc-ink/70">
                      {c.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Factual stat block — fills the rail column without fabrication */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="font-display text-5xl text-gc-light">{cases.length}</p>
            <p className="mt-1 text-sm text-gc-light/60">
              smile transformations, and counting.
            </p>
          </div>
        </div>
      </div>

      {/* Mandatory educational microcopy — full-width hairline band */}
      <p className="mt-10 border-t border-white/10 pt-4 text-xs leading-relaxed text-gc-light/55">
        {casesIntroMicrocopy}
      </p>
    </div>
  );
}

/** Educational microcopy — canonical (content strategy §09). */
const casesIntroMicrocopy =
  "Every dental case is different. Treatment approach and outcomes vary according to individual clinical conditions.";