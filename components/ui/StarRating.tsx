/**
 * Star rating — Google-yellow stars are reserved EXCLUSIVELY for authentic
 * Google-style rating indicators (visual design system §5).
 */
export default function StarRating({
  rating,
  max = 5,
  size = 16,
  label,
}: {
  rating: number;
  max?: number;
  size?: number;
  label?: string;
}) {
  return (
    <span
      role="img"
      aria-label={label ?? `Rated ${rating} out of ${max} stars`}
      className="inline-flex items-center gap-0.5"
    >
      {Array.from({ length: max }, (_, i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={`star-grad-${i}`}>
                <stop offset={`${fill * 100}%`} stopColor="#FBBC04" />
                <stop offset={`${fill * 100}%`} stopColor="#E5E0D6" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.5 14.9 8.6l6.6.8-4.9 4.5 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.4l6.6-.8L12 2.5z"
              fill={`url(#star-grad-${i})`}
            />
          </svg>
        );
      })}
    </span>
  );
}
