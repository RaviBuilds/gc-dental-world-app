/**
 * Primary navigation — header set trimmed to 5 links (user-approved revision;
 * supersedes content strategy §01's 8-item list). Single source of truth for
 * header + mobile menu. Removed sections (Doctors, Clinic, FAQs) remain
 * reachable via the footer through `secondaryNav`.
 */
export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Dental Care", href: "#dental-explained" },
  { label: "Treatments", href: "#treatments" },
  { label: "Smile Stories", href: "#smile-stories" },
  { label: "Patient Experience", href: "#experience" },
];

/** Sections demoted from the header — footer-only links. */
export const secondaryNav: NavItem[] = [
  { label: "Doctors", href: "#doctors" },
  { label: "Clinic", href: "#clinic" },
  { label: "FAQs", href: "#faqs" },
];

export const bookAppointmentHref = "#contact";
