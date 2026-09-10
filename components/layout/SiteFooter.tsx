import { primaryNav, secondaryNav } from "@/data/navigation";
import { locationData } from "@/data/location";

/** Footer — utility, contact, NAP, navigation (content strategy §26). */
export default function SiteFooter() {
  return (
    <footer className="bg-gc-navy text-gc-light">
      <div className="gc-container py-16 pb-28 md:py-20 md:pb-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="inline-flex h-16 items-center rounded-md bg-white px-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/gc-dental-world-logo.jpg"
                alt="GC Dental World logo"
                width={1134}
                height={767}
                className="h-12 w-auto"
              />
            </span>
            <p className="measure mt-6 text-gc-light/70">
              GC Dental World — Dental Clinic — Gachibowli / Khajaguda,
              Hyderabad. Dental care built around people, not just procedures.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4">
            <h2 className="small-ui mb-5 text-gc-blue-soft">Explore</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[...primaryNav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-gc-light/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="small-ui mb-5 text-gc-blue-soft">Contact</h2>
            <ul className="flex flex-col gap-3 text-sm text-gc-light/80">
              <li>
                <a
                  href={locationData.phoneHref}
                  className="font-semibold text-white transition-colors hover:text-gc-blue-soft"
                >
                  {locationData.phone}
                </a>
              </li>
              <li>
                {locationData.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
              {locationData.hours ? (
                <li>{locationData.hours}</li>
              ) : (
                <li className="text-gc-light/50">
                  Opening hours published once verified with the clinic.
                </li>
              )}
              <li>
                <a
                  href={locationData.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gc-blue-soft transition-colors hover:text-white"
                >
                  Get Directions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-gc-light/50">
          <p>
            © {new Date().getFullYear()} GC Dental World. Information on this
            page is for general awareness and does not replace a clinical
            consultation.
          </p>
        </div>
      </div>
    </footer>
  );
}
