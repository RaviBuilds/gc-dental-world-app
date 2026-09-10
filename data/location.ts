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
  /** WhatsApp contact — same verified clinic phone */
  whatsappHref: `https://wa.me/917032444510`,
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
  /**
   * Live map preview — the SAME verified search query as directionsUrl,
   * rendered through Google's `output=embed` search interface. Google places
   * its own result marker; no pin is fabricated and no additional location
   * is invented (content strategy §24).
   */
  mapEmbedUrl:
    "https://www.google.com/maps?q=GC+Dental+World+Khajaguda+Nanakramguda+Road+Hyderabad&output=embed",
  /**
   * Visit guidance — scannable, patient-intent phrasing of facts already
   * present in the verified addressLines above. Nothing new is claimed
   * (no parking, no lift, no transport info — none of it is verified).
   */
  visitNotes: [
    {
      icon: "landmark",
      text: "Look for the Andhra Bank landmark, near Delhi Public School",
    },
    {
      icon: "floor",
      text: "The clinic is on the building's 1st floor",
    },
  ] as { icon: "landmark" | "floor"; text: string }[],
};
