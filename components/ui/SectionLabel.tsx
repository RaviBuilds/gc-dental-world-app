type SectionLabelProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
};

/** Small-caps eyebrow label (visual design system §6 — sans, uppercase). */
export default function SectionLabel({
  children,
  tone = "dark",
}: SectionLabelProps) {
  return (
    <p
      className={`small-ui ${
        tone === "dark" ? "text-gc-blue" : "text-gc-blue-soft"
      } mb-4`}
    >
      {children}
    </p>
  );
}
