/**
 * Primary navigation — canonical labels from content strategy §01.
 * Single source of truth for header, mobile menu and footer.
 */
export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "Why GC Dental World", href: "#trust" },
  { label: "Dental Care", href: "#dental-explained" },
  { label: "Treatments", href: "#treatments" },
  { label: "Smile Stories", href: "#smile-stories" },
  { label: "Doctors", href: "#doctors" },
  { label: "Patient Experience", href: "#experience" },
  { label: "Clinic", href: "#clinic" },
  { label: "FAQs", href: "#faqs" },
];

export const bookAppointmentHref = "#contact";
