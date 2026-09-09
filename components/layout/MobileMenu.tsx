"use client";

import { useEffect, useRef } from "react";
import { primaryNav, bookAppointmentHref } from "@/data/navigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Full-screen mobile menu dialog — focus trap, Esc to close,
 * focus returned to the trigger on close.
 */
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement;

    const dialog = dialogRef.current;
    const focusables = dialog?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      ref={dialogRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      hidden={!open}
      className={`fixed inset-0 top-16 z-50 overflow-y-auto bg-gc-ivory px-6 pb-12 pt-6 md:top-20 ${
        open ? "gc-anim-fade" : ""
      }`}
    >
      <nav aria-label="Primary mobile">
        <ul className="flex flex-col divide-y divide-gc-ink/10 border-y border-gc-ink/10">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className="flex min-h-14 items-center justify-between py-4 text-lg font-semibold text-gc-ink"
              >
                {item.label}
                <span aria-hidden="true" className="text-gc-blue">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 flex flex-col gap-3">
        <a
          href={bookAppointmentHref}
          onClick={onClose}
          className="flex min-h-12 items-center justify-center rounded-full bg-gc-blue px-6 font-semibold text-white"
        >
          Book an Appointment
        </a>
        <a
          href="tel:+917032444510"
          className="flex min-h-12 items-center justify-center rounded-full border border-gc-ink/20 px-6 font-semibold text-gc-ink"
        >
          Call 070324 44510
        </a>
      </div>
    </div>
  );
}
