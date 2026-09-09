import type { ReactNode } from "react";

type Tone = "ivory" | "stone" | "light" | "navy" | "ice";

const toneClasses: Record<Tone, string> = {
  ivory: "bg-gc-ivory text-gc-ink",
  stone: "bg-gc-stone text-gc-ink",
  light: "bg-gc-light text-gc-ink",
  navy: "bg-gc-navy text-gc-light",
  ice: "bg-gc-ice text-gc-ink",
};

type SectionProps = {
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

/**
 * Section shell — tonal background variants follow the canonical
 * tonal rhythm (visual design system §5.1). Full-bleed tone, contained content.
 */
export default function Section({
  id,
  tone = "ivory",
  className = "",
  containerClassName = "",
  labelledBy,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${toneClasses[tone]} ${className}`}
    >
      <div className={`gc-container py-20 md:py-28 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
}
