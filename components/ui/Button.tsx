import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 ease-[var(--ease-soft)]";

const variants: Record<Variant, Record<"light" | "dark", string>> = {
  primary: {
    light:
      "bg-gc-blue text-white hover:bg-gc-navy focus-visible:bg-gc-navy",
    dark: "bg-white text-gc-navy hover:bg-gc-blue-soft",
  },
  secondary: {
    light:
      "border border-gc-ink/20 text-gc-ink hover:border-gc-blue hover:text-gc-blue",
    dark: "border border-white/30 text-white hover:border-white",
  },
  ghost: {
    light: "text-gc-blue hover:text-gc-navy",
    dark: "text-gc-blue-soft hover:text-white",
  },
};

type ButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  tone?: "light" | "dark"; // tone of the surface the button sits on
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

/**
 * Canonical button (visual design system §13). Rendered as an anchor —
 * all homepage actions are `tel:` or in-page anchors.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  tone = "light",
  children,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const sizeClass = size === "lg" ? "px-8 py-3.5 text-base" : "px-6 py-2.5 text-sm";
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant][tone]} ${sizeClass} ${className}`}
    >
      {children}
    </a>
  );
}
