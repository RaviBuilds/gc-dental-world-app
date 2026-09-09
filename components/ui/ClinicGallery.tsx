"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import ClinicLightbox from "@/components/ui/ClinicLightbox";
import { clinicSection } from "@/data/home";

type ClinicImage = (typeof clinicSection.images)[number];

/**
 * Small hand-drawn line glyphs per space — house style (stroke currentColor,
 * ~1.5 weight, no icon library). Purely decorative reinforcement of the
 * caption chip label.
 */
const glyphs: Record<ClinicImage["label"], ReactNode> = {
  "Main entrance": (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v11M1.5 14h13" />
      <circle cx="10.4" cy="8.4" r="0.4" fill="currentColor" stroke="none" />
    </svg>
  ),
  Reception: (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 9.5h13M3 9.5V7a2.5 2.5 0 0 1 2.5-2.5h5A2.5 2.5 0 0 1 13 7v2.5M5 12.5h6" />
    </svg>
  ),
  "Treatment spaces": (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2.5v5.5a3 3 0 0 0 3 3h3.5M13 7.5V13M3 13h7" />
    </svg>
  ),
  "Patient areas": (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14V2h5v12M9 14V6h5v8M1.5 14h13" />
    </svg>
  ),
};

function Tile({
  img,
  index,
  onOpen,
  aspectClass = "aspect-[16/10]",
  large = false,
}: {
  img: ClinicImage;
  index: number;
  onOpen: () => void;
  /** Photo-box aspect on mobile; on md the h-full chain overrides it. */
  aspectClass?: string;
  large?: boolean;
}) {
  const sizes = large
    ? "(max-width: 768px) 100vw, 58vw"
    : "(max-width: 768px) 85vw, 36vw";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${img.label} — open photo larger`}
      className="clinic-tile group/tile relative block h-full w-full cursor-zoom-in rounded-sm text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gc-blue"
    >
      <div className={`relative ${aspectClass} h-full overflow-hidden rounded-sm bg-gc-stone shadow-[0_18px_40px_-24px_rgba(16,26,32,0.35)]`}>
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={sizes}
          loading={large ? undefined : "lazy"}
          className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover/tile:scale-[1.02]"
        />
        {/* Hover veil — a breath of navy so the scale reads as lift */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gc-navy/0 transition-colors duration-500 group-hover/tile:bg-gc-navy/10"
        />
        {/* Top scrim — keeps the index numeral legible over bright walls */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-gc-navy/25 via-gc-navy/10 to-transparent"
        />
        {/* Editorial index numeral */}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 font-display text-xl leading-none text-white/95 [text-shadow:0_1px_12px_rgba(16,26,32,0.65)] md:text-2xl"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Glassy caption chip — house ExperienceMedia treatment */}
        <div className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 shadow-sm backdrop-blur-md transition-transform duration-300 ease-[var(--ease-soft)] group-hover/tile:-translate-y-0.5">
          <span className="flex items-center gap-2">
            <span className="text-gc-blue">{glyphs[img.label]}</span>
            <span className="text-[0.6875rem] font-semibold uppercase tracking-wide text-gc-ink/85">
              {img.label}
            </span>
          </span>
          <span className="clinic-desc text-xs leading-snug text-gc-ink/65">
            {img.description}
          </span>
        </div>
      </div>
    </button>
  );
}

/**
 * The Clinic photo mosaic — client island owning the lightbox state only.
 * Layout contract:
 *   - md+: asymmetric 7/12 large tile + vertical stack of three (unchanged
 *     from the original section composition).
 *   - <md: the three small tiles become a horizontal scroll-snap strip
 *     (.gc-clinic-strip) so the section doesn't stack four screens tall.
 * Staggered per-image Reveal delays (90ms) follow the VisitSection pattern.
 */
export default function ClinicGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const images = clinicSection.images;
  const large = images.find((img) => img.large);
  const small = images.filter((img) => !img.large);

  const navigate = (step: 1 | -1) =>
    setOpenIndex((current) =>
      current === null
        ? current
        : (current + step + images.length) % images.length,
    );

  return (
    <>
      <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12">
        {large ? (
          <div className="md:col-span-7">
            <Reveal className="h-full">
              <Tile
                img={large}
                index={images.indexOf(large)}
                onOpen={() => setOpenIndex(images.indexOf(large))}
                aspectClass="aspect-[4/3]"
                large
              />
            </Reveal>
          </div>
        ) : null}

        <div className="gc-clinic-strip flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:col-span-5 md:flex-col md:overflow-visible md:pb-0">
          {small.map((img, i) => {
            const index = images.indexOf(img);
            return (
              <Reveal
                key={img.src}
                delay={i * 90}
                className="w-[82%] shrink-0 snap-center md:w-auto md:flex-1"
              >
                <Tile img={img} index={index} onOpen={() => setOpenIndex(index)} />
              </Reveal>
            );
          })}
        </div>
      </div>

      {openIndex !== null ? (
        <ClinicLightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={navigate}
        />
      ) : null}
    </>
  );
}

