type ArrowLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Text link with the canonical arrow (visual design system). */
export default function ArrowLink({
  href,
  children,
  tone = "dark",
  className = "",
}: ArrowLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-11 items-center gap-2 font-semibold ${
        tone === "dark"
          ? "text-gc-blue hover:text-gc-navy"
          : "text-gc-blue-soft hover:text-white"
      } transition-colors ${className}`}
    >
      <span className="underline-offset-4 group-hover:underline">
        {children}
      </span>
      <svg
        aria-hidden="true"
        width="18"
        height="12"
        viewBox="0 0 18 12"
        fill="none"
        className="transition-transform duration-200 ease-[var(--ease-soft)] group-hover:translate-x-1"
      >
        <path
          d="M1 6h15M11.5 1.5 16 6l-4.5 4.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
