import type { Metadata } from "next";

/**
 * SEO / metadata / JSON-LD builders.
 *
 * CONTENT INTEGRITY RULES (canonical: docs/gc-dental-world-content-strategy.md):
 * - Structured data contains ONLY verified business fields.
 * - NO aggregateRating / Review markup at launch — the 4.8/286 reputation is
 *   displayed as visible on-page content only.
 * - FAQ schema is optional and eligibility-dependent; not enabled at launch.
 * - `siteUrl` (production domain) remains pending clinic confirmation.
 */

/** NEEDS-CLINIC-CONFIRMATION — production domain before launch. */
const siteUrl = "https://www.gcdentalworld.example";

export const clinicPhone = "070324 44510";
export const clinicPhoneHref = "tel:+917032444510";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "GC Dental World — Dental Clinic in Gachibowli & Khajaguda, Hyderabad",
    template: "%s | GC Dental World",
  },
  description:
    "GC Dental World is a patient-focused dental clinic in Gachibowli, Khajaguda, Hyderabad — rated 4.8 on Google by 286 patients. Dental care built around people, not just procedures.",
  keywords: [
    "dentist Gachibowli",
    "dental clinic Khajaguda",
    "GC Dental World Hyderabad",
    "dental clinic Hyderabad",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "GC Dental World",
    title: "GC Dental World — Dental Clinic in Gachibowli, Hyderabad",
    description:
      "Thoughtful dental care begins with understanding the person behind the problem. Rated 4.8 on Google by 286 patients in Gachibowli, Hyderabad.",
    images: [
      {
        url: "/assets/gc-dental-world-doctors-team-group-photo.jpg",
        width: 1200,
        height: 630,
        alt: "The GC Dental World clinical team at the Gachibowli clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GC Dental World — Dental Clinic in Gachibowli, Hyderabad",
    description:
      "Patient-focused dental care in Gachibowli & Khajaguda, Hyderabad. 4.8 ★ on Google from 286 reviews.",
  },
  robots: { index: true, follow: true },
};

/**
 * Dentist (LocalBusiness subtype) entity — verified fields only
 * (address user-supplied and verified). No geo coordinates, hours, price
 * range, aggregateRating or review markup.
 */
export function buildDentistSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: "GC Dental World",
    description:
      "Patient-focused dental clinic in Gachibowli, Khajaguda, Hyderabad, rated 4.8 on Google by 286 patients.",
    telephone: "+91-7032444510",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "1st floor, Khajaguda - Nanakramguda Rd, next to Andhra Bank, near Delhi Public School, Madhura Nagar Colony, Gachibowli, Khajaguda",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500008",
      addressCountry: "IN",
    },
    areaServed: ["Gachibowli", "Khajaguda", "Hyderabad"],
    url: siteUrl,
    image: `${siteUrl}/assets/gc-dental-world-gachibowli-clinic-building-exterior.jpg`,
  };
}
