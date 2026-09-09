import { clinicPhone, clinicPhoneHref } from "@/lib/seo";

/**
 * Location + contact data — content strategy §24.
 * VERIFIED (user-supplied): business name, full address, location areas, phone.
 * Still pending verification: opening hours.
 * Pending fields are `null` and must NOT be invented.
 */
export const locationData = {
  businessName: "GC Dental World",
  businessType: "Dental Clinic",
  areas: ["Khajaguda", "Gachibowli", "Hyderabad"],
  phone: clinicPhone,
  phoneHref: clinicPhoneHref,
  fullAddress:
    "1st floor, Khajaguda - Nanakramguda Rd, next to Andhra Bank, near Delhi Public School, Madhura Nagar Colony, Gachibowli, Khajaguda, Hyderabad, Telangana 500008",
  addressLines: [
    "1st floor, Khajaguda - Nanakramguda Rd",
    "Next to Andhra Bank, near Delhi Public School",
    "Madhura Nagar Colony, Gachibowli, Khajaguda",
    "Hyderabad, Telangana 500008",
  ],
  hours: null as string | null, // pending verified current hours
  /** Google Maps search link — a search query, not a fabricated pin. */
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=GC+Dental+World+Khajaguda+Nanakramguda+Road+Hyderabad",
};

