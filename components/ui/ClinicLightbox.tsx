"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type LightboxImage = {
  src: string;
  alt: string;
  label: string;
  description?: string;
};

type ClinicLightboxProps = {
  images: readonly LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (step: 1 | -1) => void;
};

/**
 * ClinicLightbox — full-screen photo viewer for The Clinic mosaic (§16).
 * Mounts only while open (gallery renders it conditionally), so mount /
 * unmount own the focus and scroll-lock lifecycle.
 *
 * Accessibility contract (mirrors the MobileMenu dialog pattern):
 *   role="dialog" + aria-modal, focus trap, Esc / backdrop click to close,
 *   ArrowLeft / ArrowRight navigation, focus returned to the opening tile.
 * Z-index uses the reserved --z-lightbox token (globals.css :root).
 */
export default function ClinicLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: ClinicLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = images[index];

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, []);

  if (!current) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNavigate(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNavigate(-1);
      return;
    }
    if (event.key === "Tab") {
      // Focus trap — cycle within the dialog.
      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href]",
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Clinic photos — ${current.label}`}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-[var(--z-lightbox)] flex items-center justify-center p-4 sm:p-8"
    >
      {/* Scrim — click to close */}
      <button
        type="button"
        aria-label="Close photo viewer"
        onClick={onClose}
        tabIndex={-1}
        className="gc-lightbox-scrim absolute inset-0 cursor-zoom-out bg-gc-navy/90"
      />

      {/* Figure */}
      <figure className="gc-lightbox-figure relative flex max-h-full w-full max-w-5xl flex-col items-center">
        <div className="relative h-[68vh] w-full">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
        <figcaption className="mt-4 max-w-2xl text-center">
          <span className="small-ui text-gc-blue-soft">{current.label}</span>
          {current.description ? (
            <span className="mt-1 block text-sm leading-relaxed text-gc-light/75">
              {current.description}
            </span>
          ) : null}
        </figcaption>

        {/* Prev / next — canonical house arrow, mirrored for "previous" */}
        <button
          type="button"
          onClick={() => onNavigate(-1)}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-gc-light transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gc-blue-soft"
        >
          <svg aria-hidden="true" width="16" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M17 6H2m4.5-4.5L2 6l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onNavigate(1)}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-gc-light transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gc-blue-soft"
        >
          <svg aria-hidden="true" width="16" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M1 6h15M11.5 1.5 16 6l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </figure>

      {/* Close — receives initial focus */}
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close photo viewer"
        className="gc-lightbox-figure absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-gc-light transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gc-blue-soft sm:right-8 sm:top-8"
      >
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </div>
  );
}

