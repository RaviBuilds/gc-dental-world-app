import { trustSignals } from "@/data/trustSignals";
import TiltCard from "@/components/ui/TiltCard";

/**
 * GoogleReviewsCard — the VERIFIED Google Business Profile artifact inside
 * the ReviewThemes navy panel (§07 "What patients remember").
 *
 * Deliberately styled in TRUE Google colors (white card, #1a73e8 Google blue,
 * #fbbc04 stars) against the navy panel — the contrast is what makes it read
 * as an embedded Google object rather than another on-brand element, which is
 * the trust mechanism. All values come from `data/trustSignals.ts` (exact:
 * 4.8 / 286, per its own governance comment) — nothing is hardcoded here.
 *
 * Integrity: aggregates only — no review quotes (those live in the authentic
 * excerpt slot, pending corpus), no aggregateRating structured data
 * (lib/seo.ts rule), links use the clinic-confirmed share link verbatim.
 *
 * The fractional 5th star (4.8 → 80% fill) follows Google's own rendering.
 * Stars pop in once on load (gc-star-pop, CSS-only); the card itself does
 * NOT re-animate on theme switches — it sits outside the keyed panel.
 *
 * Hover: cursor-tracked 3D tilt + backside shadow via TiltCard (same style
 * as the §15 trust panel). The card keeps its laid-on-the-table rest
 * rotation, which composes with the tilt (nested transforms); the old
 * static hover lift was superseded by the tracked tilt.
 */

/* Official Google "G" mark — inline SVG, four brand colors. */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

/* Google-style five-point star — fill color supplied by the caller. */
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 2.6l2.9 5.87 6.48.94-4.69 4.57 1.11 6.45L12 17.38l-5.8 3.05 1.11-6.45-4.69-4.57 6.48-.94L12 2.6z" />
    </svg>
  );
}

/* Star row — 4 full + fractional 5th for 4.8, Google-style. Each star pops
   in with a 90ms stagger; the row is one labeled image for AT. */
function StarRow() {
  const { ratingValue } = trustSignals;
  const full = Math.floor(ratingValue); // 4 at 4.8
  const fraction = ratingValue - full; // 0.8 → 80% gold on the 5th

  return (
    <div
      role="img"
      aria-label={`Rated ${ratingValue} out of 5`}
      className="flex items-center gap-1 pb-1"
    >
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < full ? 1 : i === full ? fraction : 0;
        return (
          <span
            key={i}
            className="gc-star-pop relative inline-block h-5 w-5"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            {/* Gray base star (Google's #dadce0 empty state) */}
            <Star className="absolute inset-0 h-full w-full fill-[#dadce0]" />
            {/* Gold fill, width-clipped for the fractional star */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-full w-5 fill-gc-star" />
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function GoogleReviewsCard({
  className = "",
}: {
  className?: string;
}) {
  const { ratingValue, reviewCount, googleBusiness } = trustSignals;
  const profile = googleBusiness.profileUrl;

  return (
    <TiltCard
      shadowClassName="rounded-xl"
      className="w-fit"
    >
      <figure
        className={`rotate-[1.25deg] rounded-xl bg-white p-6 shadow-[0_24px_48px_-16px_rgba(9,20,28,0.5)] transition-transform duration-300 ease-soft md:p-7 ${className}`}
      >
      {/* Header — G mark + wordmark */}
      <div className="flex items-center gap-2.5">
        <GoogleG className="h-6 w-6" />
        <span className="text-base font-medium text-[#5f6368]">
          Google Reviews
        </span>
      </div>

      {/* Rating — exact 4.8 + stars + review count */}
      <div className="mt-4 flex items-end gap-3">
        <p className="text-4xl font-medium leading-none text-[#202124]">
          {ratingValue}
        </p>
        <StarRow />
      </div>
      <a
        href={profile}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm font-medium text-gc-google-blue hover:underline"
      >
        {reviewCount} Google reviews
      </a>

      <div aria-hidden="true" className="my-4 h-px bg-[#e8eaed]" />

      {/* Verified business identity — name + GBP category/locality */}
      <p className="text-sm font-semibold text-[#202124]">
        {googleBusiness.name}
      </p>
      <p className="text-sm text-[#5f6368]">
        {googleBusiness.category} in {googleBusiness.locality}
      </p>

      {/* Google-style pills — both link to the clinic-confirmed profile */}
      <div className="mt-5 flex flex-wrap gap-2.5">
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[#dadce0] px-4 py-2 text-sm font-medium text-gc-google-blue transition-colors hover:bg-[#f8fbff]"
        >
          Write a review
        </a>
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-gc-google-blue px-4 py-2 text-sm font-medium text-white transition-shadow hover:shadow-md"
        >
          View on Google
        </a>
      </div>
      </figure>
    </TiltCard>
  );
}