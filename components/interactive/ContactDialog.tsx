"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { locationData } from "@/data/location";
import { bookAppointmentHref } from "@/data/navigation";
import { DURATION_BASE, EASE_SOFT } from "@/lib/motion";

const SCROLL_TRIGGER_THRESHOLD = 0.5; // 50% of page scroll
const SESSION_KEY = "gc-dental-world-contact-dialog-dismissed";

/**
 * Premium mid-page consultation dialog.
 *
 * Triggers once at ~50% scroll progress during the browsing session.
 * Features doctor portrait, editorial copy, and WhatsApp/booking CTAs.
 *
 * Accessibility: full keyboard navigation, focus trap, escape to close.
 * Session: dismissal persists via sessionStorage.
 */
export default function ContactDialog() {
  const [isOpen, setIsOpen] = useState(false);

  // Initialize with session dismissal state
  const [hasTriggered, setHasTriggered] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });

  // Initialize with reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Listen for reduced motion preference changes
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleChange);
    return () => motionQuery.removeEventListener("change", handleChange);
  }, []);

  // Scroll trigger with performance optimization
  useEffect(() => {
    if (hasTriggered) return;

    let rafId: number;
    let lastScrollY = 0;

    const checkScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      // Avoid triggering on very short pages
      if (docHeight < 800) return;

      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

      if (scrollProgress >= SCROLL_TRIGGER_THRESHOLD && scrollY > lastScrollY) {
        setHasTriggered(true);
        previousFocusRef.current = document.activeElement as HTMLElement;
        setIsOpen(true);
      }

      lastScrollY = scrollY;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        checkScrollProgress();
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hasTriggered]);

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Move focus to close button
    closeButtonRef.current?.focus();

    // Focus trap
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);

    // Persist dismissal
    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch {
      // sessionStorage unavailable; dismissal state remains in memory
    }

    // Restore focus
    setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 100);
  }, []);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, handleClose]);

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose],
  );

  if (!isOpen) return null;

  const backdropStyle = reducedMotion
    ? {}
    : {
        animation: `fadeIn ${DURATION_BASE}ms ${EASE_SOFT}`,
      };

  const modalStyle = reducedMotion
    ? {}
    : {
        animation: `modalEnter ${DURATION_BASE}ms ${EASE_SOFT}`,
      };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes modalExit {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(4px);
          }
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center bg-gc-ink/45 p-4 backdrop-blur-sm"
        style={backdropStyle}
        onClick={handleBackdropClick}
        aria-hidden="true"
      >
        {/* Dialog */}
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-dialog-heading"
          className="relative flex w-full max-w-[900px] flex-col overflow-hidden rounded-lg border border-gc-ink/10 bg-gc-white shadow-2xl md:max-h-[85vh] md:flex-row"
          style={modalStyle}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            aria-label="Close contact dialog"
            className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full text-gc-ink/60 transition-colors hover:bg-gc-ink/5 hover:text-gc-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gc-blue md:right-4 md:top-4"
          >
            <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M12.8 3.2 8 8l4.8 4.8-1.6 1.6L6.4 9.6l-4.8 4.8L0 12.8 4.8 8 0 3.2 1.6 1.6 6.4 6.4 11.2 1.6Z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Left: Doctor portrait */}
          <div className="relative h-64 w-full shrink-0 overflow-hidden bg-gc-stone md:h-auto md:w-[380px]">
            <Image
              src="/assets/gc-dental-world-doctor-portrait.jpg"
              alt="GC Dental World doctor"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              className="object-cover object-center"
              priority={false}
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-1 flex-col justify-center gap-6 p-6 md:gap-8 md:p-10 lg:p-12">
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-gc-blue">
                Let&apos;s talk about your care
              </div>
              <h2
                id="contact-dialog-heading"
                className="font-display text-2xl leading-snug text-gc-ink md:text-3xl lg:text-4xl"
              >
                A conversation can be the right place to start.
              </h2>
              <p className="text-base leading-relaxed text-gc-ink/70 md:text-lg">
                Have a dental concern, a question about your options, or simply
                want to know what to expect? Speak with the GC Dental World team
                and take the next step when you&apos;re ready.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={locationData.whatsappHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-gc-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gc-navy focus-visible:bg-gc-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gc-blue"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                  />
                </svg>
                WhatsApp
              </a>
              <a
                href={bookAppointmentHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-gc-ink/20 px-6 py-2.5 text-sm font-semibold text-gc-ink transition-colors hover:border-gc-blue hover:text-gc-blue focus-visible:border-gc-blue focus-visible:text-gc-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gc-blue"
              >
                Book an Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
