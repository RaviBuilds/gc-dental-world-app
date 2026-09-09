import Image from "next/image";
import type { ReactNode } from "react";

type ImageFrameProps = {
  src: string;
  alt: string;
  /** "fill" requires a sized wrapper via className (aspect utilities). */
  mode?: "fill" | "intrinsic";
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  /** Focal point strategy for responsive cropping. */
  position?: string; // e.g. "center 30%"
  children?: ReactNode;
};

/**
 * Image presentation wrapper (visual design system §11) — consistent frame,
 * radius and focal-point handling for next/image.
 */
export default function ImageFrame({
  src,
  alt,
  mode = "fill",
  width,
  height,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className = "",
  imgClassName = "",
  position = "center",
  children,
}: ImageFrameProps) {
  return (
    <figure className={`relative overflow-hidden rounded-sm ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill={mode === "fill"}
        width={mode === "intrinsic" ? width : undefined}
        height={mode === "intrinsic" ? height : undefined}
        priority={priority}
        sizes={mode === "fill" ? sizes : undefined}
        className={`object-cover ${imgClassName}`}
        style={{ objectPosition: position }}
      />
      {children}
    </figure>
  );
}
