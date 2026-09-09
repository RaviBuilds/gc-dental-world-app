import { Manrope, DM_Serif_Display } from "next/font/google";
import { metadata } from "@/lib/seo";
import { buildDentistSchema } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export { metadata };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dmSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        {/* Highlight entrance-fill boot — runs before first paint so armed
            highlights start undrawn with no flash. Arms only when JS is
            running and motion is allowed; HighlightMotion (page-level)
            owns the observer and de-arms for reduced-motion users. The
            class on <html> is set outside React, hence the
            suppressHydrationWarning above. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('gc-hl-armed')}}catch(e){}",
          }}
        />
        {/* Dentist entity — verified fields only (see lib/seo.ts) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildDentistSchema()) }}
        />
        {children}
      </body>
    </html>
  );
}

