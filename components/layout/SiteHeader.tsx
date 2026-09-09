"use client";

import { useEffect, useState } from "react";
import { primaryNav, bookAppointmentHref } from "@/data/navigation";
import MobileMenu from "./MobileMenu";

/**
 * Sticky header — ivory → white on scroll, persistent Book/Call actions
 * (content strategy §01: booking/call must remain immediately accessible).
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ease-[var(--ease-soft)] ${
        scrolled || menuOpen
          ? "border-b border-gc-ink/10 bg-gc-white/90 shadow-[0_1px_12px_rgba(16,26,32,0.05)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="gc-container flex h-16 items-center justify-between gap-6 md:h-20">
        <a
          href="#top"
          className="flex items-center gap-3"
          aria-label="GC Dental World — back to top"
        >
          {/* Logo asset is a JPG with a baked-in white background — presented in a white chip
              until a transparent asset is supplied (NEEDS-CLINIC-CONFIRMATION). */}
          <span className="inline-flex h-11 items-center rounded-md bg-white px-2.5 shadow-[0_1px_2px_rgba(16,26,32,0.08)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/gc-dental-world-logo.jpg"
              alt="GC Dental World logo"
              width={88}
              height={32}
              className="h-8 w-auto max-w-none"
            />
          </span>
          <span className="sr-only">GC Dental World</span>
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap text-sm font-medium text-gc-ink/80 transition-colors hover:text-gc-blue"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+917032444510"
            className="hidden min-h-11 items-center whitespace-nowrap text-sm font-semibold text-gc-blue transition-colors hover:text-gc-navy md:inline-flex"
          >
            Call 070324 44510
          </a>
          <a
            href={bookAppointmentHref}
            className="hidden min-h-11 items-center rounded-full bg-gc-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gc-navy md:inline-flex"
          >
            Book an Appointment
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gc-ink xl:hidden"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
              {menuOpen ? (
                <path
                  d="M2 2l16 10M18 2 2 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M1 1h18M1 7h18M1 13h18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
