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
        {/* Motion boot — runs before first paint so no armed initial state
            can flash. Arms two systems only when JS is running and motion is
            allowed: .gc-hl-armed (highlight entrance fills, HighlightMotion
            owns the observer) and .gc-motion-armed (reveal/line-draw initial
            states — without this class content renders fully visible, so
            no-JS readers and crawlers always get the complete page). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('gc-hl-armed','gc-motion-armed')}}catch(e){}",
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

