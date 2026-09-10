import RevealGroup from "@/components/ui/RevealGroup";
import { trustSignals } from "@/data/trustSignals";

/**
 * Editorial trust rail — quiet factual proof band between the cinematic hero
 * and the patient-intent routes (content strategy §03, visual design system
 * §12.2). Primary value + small supporting label, hairline dividers only.
 * No cards, no shadows, no icons — premium brand proof, not a dashboard.
 * Values are rendered directly (no counting animation); 4.8 and 286 are exact.
 */
export default function TrustRail() {
  const signals = [
    {
      value: `${trustSignals.ratingValue} / 5`,
      label: trustSignals.ratingSource,
      numeric: true,
    },
    {
      value: String(trustSignals.reviewCount),
      label: trustSignals.reviewLabel,
      numeric: true,
    },
    {
      value: trustSignals.team,
      label: "Doctors & Staff",
      numeric: false,
    },
    {
      value: trustSignals.location,
      label: "Hyderabad, Telangana",
      numeric: false,
    },
  ] as const;

  return (
    <section
      aria-label="GC Dental World in brief"
      className="border-b border-gc-ink/10 bg-gc-ivory"
    >
      <RevealGroup as="ul" step={80} className="gc-container grid grid-cols-2 gap-x-6 gap-y-5 py-7 sm:gap-x-10 sm:py-8 lg:grid-cols-4 lg:gap-x-0 lg:py-9">
          {signals.map((signal, i) => (
            <li
              key={signal.label}
              className={[
                "flex flex-col gap-1.5",
                // Dividers: quiet 2 × 2 below lg (horizontal rule only, column
                // separation via gap — no vertical clutter on small screens);
                // hairline verticals in the 4-up desktop rail. Per-index
                // classes avoid conflicting width/padding pairs.
                [
                  "pr-3 sm:pr-5 lg:pr-10",
                  "pr-3 sm:pr-5 lg:border-l lg:border-gc-ink/10 lg:pl-10 lg:pr-10",
                  "border-t border-gc-ink/10 pt-5 pr-3 sm:pr-5 lg:border-l lg:border-t-0 lg:border-gc-ink/10 lg:pt-0 lg:pl-10 lg:pr-10",
                  "border-t border-gc-ink/10 pt-5 pr-3 sm:pr-5 lg:border-l lg:border-t-0 lg:border-gc-ink/10 lg:pt-0 lg:pl-10 lg:pr-0",
                ][i],
              ].join(" ")}
            >
              {/* Optical weight balance: numerics are bold and slightly larger;
                  multi-word statements are a touch smaller, semibold and
                  line-balanced so no item reads heavier for having more words. */}
              <p
                className={[
                  "leading-snug text-gc-ink",
                  signal.numeric
                    ? "whitespace-nowrap text-[1.25rem] font-bold tracking-[-0.01em] lg:text-[1.375rem]"
                    : "text-balance text-[1.125rem] font-semibold tracking-[-0.005em] lg:text-[1.25rem]",
                ].join(" ")}
              >
                {signal.value}
              </p>
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-gc-ink/65">
                {signal.label}
              </p>
            </li>
          ))}
      </RevealGroup>
    </section>
  );
}
