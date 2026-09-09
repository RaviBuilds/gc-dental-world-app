"use client";

import { useEffect, useState } from "react";
import { bookAppointmentHref } from "@/data/navigation";
import { locationData } from "@/data/location";

/**
 * Floating contact — desktop: minimal pill after the hero;
 * mobile: fixed bottom Call / Book action bar with safe-area handling.
 */
export default function FloatingContact() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop — minimal floating pill */}
      <div
        aria-hidden={!pastHero}
        className={`fixed bottom-6 right-6 z-30 hidden transition-all duration-300 ease-[var(--ease-soft)] lg:block ${
          pastHero
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="flex items-center gap-2 rounded-full bg-gc-navy px-2 py-2 shadow-lg">
          <a
            href={locationData.phoneHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M3.1 1.5h2.6l1.2 3.1-1.6 1.2a10.4 10.4 0 0 0 4.9 4.9l1.2-1.6 3.1 1.2v2.6a1.1 1.1 0 0 1-1.2 1.1A12.9 12.9 0 0 1 2 2.7a1.1 1.1 0 0 1 1.1-1.2Z"
                fill="currentColor"
              />
            </svg>
            {locationData.phone}
          </a>
          <a
            href={bookAppointmentHref}
            className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold text-gc-navy transition-colors hover:bg-gc-blue-soft"
          >
            Book
          </a>
        </div>
      </div>

      {/* Mobile — fixed bottom action bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-gc-ink/10 bg-gc-white p-2.5 shadow-[0_-4px_16px_rgba(16,26,32,0.08)] md:hidden"
        style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={locationData.phoneHref}
          className="flex min-h-12 items-center justify-center rounded-full border border-gc-ink/20 text-sm font-semibold text-gc-ink"
        >
          Call the Clinic
        </a>
        <a
          href={bookAppointmentHref}
          className="flex min-h-12 items-center justify-center rounded-full bg-gc-blue text-sm font-semibold text-white"
        >
          Book an Appointment
        </a>
      </div>
    </>
  );
}
