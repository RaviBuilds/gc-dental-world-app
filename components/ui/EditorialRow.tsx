import Image from "next/image";
import type { ReactNode } from "react";

type EditorialRowProps = {
  title: string;
  children: ReactNode;
  image: { src: string; alt: string };
  /** Fully-composed media block (e.g. ExperienceMedia). Replaces the plain
      image box; the `image` prop is then only a fallback (unused). */
  media?: ReactNode;
  /** Flip the image to the left of the text (alternating rhythm). */
  reverse?: boolean;
  /** Width fraction of the image column, e.g. "lg:col-span-5" vs text "lg:col-span-7". */
  imageCols?: string;
  textCols?: string;
  imageSizes?: string;
  /** Editorial beat numeral above the heading (decorative, e.g. "01"). */
  number?: string;
  /** Small editorial annotation rendered under the copy (e.g. process cue). */
  meta?: ReactNode;
  /** With `reverse`, keep the image before the text on mobile stacking order
      (mobile reads image → content in both rows; desktop keeps alternating). */
  mobileImageFirst?: boolean;
};

/**
 * Asymmetric image/text row primitive (visual design system §7 —
 * intentional asymmetric splits, e.g. 5/7, 7/5).
 */
export default function EditorialRow({
  title,
  children,
  image,
  media,
  reverse = false,
  imageCols = "lg:col-span-5",
  textCols = "lg:col-span-7",
  imageSizes = "(max-width: 1024px) 100vw, 40vw",
  number,
  meta,
  mobileImageFirst = false,
}: EditorialRowProps) {
  const imageBlock = (
    <div
      className={`${imageCols}${
        reverse && mobileImageFirst ? " max-lg:order-first" : ""
      }`}
    >
      {media ?? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-gc-stone">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={imageSizes}
            className="object-cover"
          />
        </div>
      )}
    </div>
  );

  const textBlock = (
    <div className={`${textCols} flex flex-col justify-center`}>
      {number ? (
        <span
          aria-hidden="true"
          className="mb-3 font-display text-2xl text-gc-blue"
        >
          {number}
        </span>
      ) : null}
      <h3 className="h3-display mb-4 text-gc-ink">{title}</h3>
      <div className="measure text-gc-ink/80">{children}</div>
      {meta ? <div className="mt-6">{meta}</div> : null}
    </div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      {reverse ? (
        <>
          {textBlock}
          {imageBlock}
        </>
      ) : (
        <>
          {imageBlock}
          {textBlock}
        </>
      )}
    </div>
  );
}
