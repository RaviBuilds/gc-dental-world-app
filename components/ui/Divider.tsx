type DividerProps = {
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Orbit/swoosh SVG motif derived from the GC Dental World logo
 * (visual design system — brand-derived SVG system, never generic dental icons).
 */
export default function Divider({ tone = "dark", className = "" }: DividerProps) {
  const stroke = tone === "dark" ? "#2879A8" : "#D9E8ED";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 24"
      fill="none"
      className={`h-6 w-60 ${className}`}
    >
      <path
        d="M6 18c40-14 120-18 228-14"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M6 18C36 8 96 4 160 5.4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="226" cy="7" r="2.4" fill={stroke} />
    </svg>
  );
}
