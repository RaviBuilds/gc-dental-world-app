"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReviewTheme } from "@/data/reviewThemes";
import RichText from "@/components/ui/RichText";
import ThemeGlyph from "@/components/ui/ThemeGlyph";
import GoogleReviewsCard from "@/components/ui/GoogleReviewsCard";
import Reveal from "@/components/ui/Reveal";

/**
 * Review theme switcher (content strategy §07) — "What patients remember".
 *
 * Left: theme tablist (roving tabindex, arrow-key navigation). On lg the
 * active pill GLIDES between rows (measured, transform-transitioned); on
 * mobile the wrap chips keep the instant background swap. Inactive rows
 * reveal a → affordance on hover, matching the Treatments hover language.
 *
 * Right: the active panel — glyph stamp, statement, description (RichText,
 * ONE brush word), and the authentic excerpt slot, which renders ONLY when
 * an excerpt exists in the data. A ghosted numeral backdrop crossfades
 * behind the panel; a segmented hairline under the grid tracks position
 * 0X/06. All switch animation is CSS (gc-review-rise / gc-anim-fade-slow),
 * collapsed by the global prefers-reduced-motion block.
 *
 * The panel's empty lower-left is anchored by GoogleReviewsCard — the
 * VERIFIED 4.8 / 286 aggregates presented as an authentic Google-styled
 * source artifact. The card sits OUTSIDE the keyed panel div, so it
 * persists across theme switches (its star pop plays once, not per tab)
 * and fills the space with evidence rather than decoration. The Trust Band
 * keeps its editorial proof-strip role — same numbers, deliberately
 * different presentations.
 *
 * The containing navy panel is a DETACHED POSTCARD (scroll-driven
 * .trust-panel + TiltCard + ambient layers), composed in ExperienceSection
 * — this component renders only the interior grid.
 */
export default function ReviewThemes({
  themes,
  intro,
}: {
  themes: ReviewTheme[];
  intro: { heading: string; intro: string };
}) {
  const [active, setActive] = useState(0);
  const current = themes[active];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState<{ top: number; height: number } | null>(
    null,
  );

  /* Gliding pill geometry — measured against the positioned tablist wrapper,
     re-measured on resize and after web fonts settle. */
  const measure = useCallback(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    setPill({ top: el.offsetTop, height: el.offsetHeight });
  }, [active]);

  useEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(() => measure()).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Roving tabindex — arrows move selection AND focus, Home/End jump. */
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = themes.length - 1;
    let delta = 0;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") delta = 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") delta = -1;
    if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
      tabRefs.current[0]?.focus();
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActive(last);
      tabRefs.current[last]?.focus();
      return;
    }
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + themes.length) % themes.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Theme selector */}
        <div className="lg:col-span-4">
          {/* .trust-copy — scroll-driven counter-drift, matching the §15
              trust panel. Sits OUTSIDE the tablist/panel so the drift never
              fights the gliding pill or the keyed rise entrances. */}
          <div className="trust-copy">
            <h3 className="h3-display mb-4 text-gc-light">{intro.heading}</h3>
            <p className="mb-8 text-sm leading-relaxed text-gc-light/60">
              {intro.intro}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="What patients remember — review themes"
            onKeyDown={onTabKeyDown}
            className="relative flex flex-wrap gap-2 lg:flex-col lg:gap-1"
          >
            {/* Gliding active pill (lg only) — sits behind the tab labels */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 right-0 z-0 hidden rounded-sm bg-white shadow-sm transition-[top,height] duration-300 ease-soft lg:block ${
                pill ? "opacity-100" : "opacity-0"
              }`}
              style={pill ? { top: pill.top, height: pill.height } : undefined}
            />
            {themes.map((theme, i) => {
              const selected = i === active;
              return (
                <div key={theme.id} role="presentation" className="w-auto lg:w-full">
                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={`review-theme-tab-${theme.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="review-theme-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={`group relative z-10 flex min-h-11 w-full items-center gap-3 rounded-full px-4 py-2 text-left text-sm font-semibold transition-colors lg:rounded-sm lg:px-3 lg:py-3 ${
                      selected
                        ? "bg-white text-gc-navy lg:bg-transparent"
                        : "text-gc-light/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span
                      className={`text-[0.6875rem] ${
                        selected ? "text-gc-blue" : "text-gc-light/40"
                      }`}
                    >
                      {theme.number}
                    </span>
                    {theme.title}
                    <span
                      aria-hidden="true"
                      className="ml-auto hidden translate-x-1 text-gc-blue opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 lg:inline"
                    >
                      →
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Theme panel — flex column: content top, Google proof card pinned
            to the lower-LEFT (lg:mt-auto) so the panel's empty space is
            filled with the VERIFIED source artifact. */}
        <div className="relative flex flex-col lg:col-span-8" aria-live="polite">
          {/* Ghosted numeral backdrop — crossfades with the active theme,
              echoes the §03 ghost-numeral motif earlier in this section. */}
          <span
            key={`ghost-${current.id}`}
            aria-hidden="true"
            className="gc-anim-fade-slow pointer-events-none absolute -bottom-10 right-2 select-none font-display text-[clamp(9rem,15vw,15rem)] leading-none text-gc-light/[0.06]"
          >
            {current.number}
          </span>

          <div
            key={current.id}
            id="review-theme-panel"
            role="tabpanel"
            aria-labelledby={`review-theme-tab-${current.id}`}
            className="relative"
          >
            {/* Glyph stamp — hand-rolled line art, aria-hidden inside */}
            <div className="gc-review-rise-1 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-gc-light/15 bg-gc-light/5 text-gc-blue-soft">
              <ThemeGlyph id={current.id} className="h-6 w-6" />
            </div>

            <div className="border-l-2 border-gc-blue pl-6 md:pl-10">
              <p className="statement gc-review-rise-1 text-gc-light">
                {current.title}
              </p>
              <p className="lead measure gc-review-rise-2 mt-6 text-gc-light/75">
                <RichText onDark>{current.description}</RichText>
              </p>

              {/* Authentic excerpt — renders ONLY when supplied in data
                  (content integrity: never written by hand). */}
              {current.excerpt ? (
                <figure className="gc-review-rise-3 mt-8">
                  <p className="font-display text-xl italic leading-snug text-gc-light md:text-2xl">
                    “{current.excerpt}”
                  </p>
                  {current.excerptAuthor || current.excerptSource ? (
                    <figcaption className="mt-3 text-sm text-gc-light/60">
                      — {current.excerptAuthor}
                      {current.excerptAuthor && current.excerptSource ? ", " : ""}
                      {current.excerptSource}
                    </figcaption>
                  ) : null}
                </figure>
              ) : null}
            </div>
          </div>

          {/* Google proof card — OUTSIDE the keyed panel: persists across
              theme switches (star pop plays once), anchors the lower-LEFT so the ghosted numeral on the right stays fully visible.
              z-10 keeps it above the ghosted numeral backdrop. */}
          <Reveal className="relative z-10 mt-10 self-start lg:mt-auto lg:pt-12">
            <GoogleReviewsCard />
          </Reveal>
        </div>
      </div>

      {/* Position meta + segmented progress hairline (static — advances
          only on selection, never auto-plays) */}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
        <p className="small-ui text-gc-light/50">Theme {current.number} of 06</p>
        <div aria-hidden="true" className="flex flex-1 gap-1 lg:max-w-sm">
          {themes.map((t, i) => (
            <span
              key={t.id}
              className={`h-px flex-1 transition-colors duration-300 ${
                i === active ? "bg-gc-blue" : "bg-gc-light/15"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
