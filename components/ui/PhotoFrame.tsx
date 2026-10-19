"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PressedFlower } from "../art/Decor";

type PhotoFrameProps = {
  src: string;
  alt: string;
  className?: string;
  /** Picks the placeholder colourway. */
  variant?: number;
  /** Shown inside the drawn placeholder until a real file exists. */
  placeholderNote?: string;
  priority?: boolean;
  /**
   * "cover" fills the frame and crops (good for a tidy grid);
   * "natural" keeps the photo's own shape and never crops it.
   */
  fit?: "cover" | "natural";
  /** Where to crop towards when fit is "cover", e.g. "center 35%". */
  focus?: string;
};

/**
 * A photo, or — until the file actually exists in /public/photos —
 * a drawn pressed-flower stand-in. Nothing to uncomment later:
 * drop the image in and it simply appears.
 */
export default function PhotoFrame({
  src,
  alt,
  className = "",
  variant = 0,
  placeholderNote = "a photo belongs here",
  priority = false,
  fit = "cover",
  focus,
}: PhotoFrameProps) {
  const [hasPhoto, setHasPhoto] = useState(Boolean(src));
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => setHasPhoto(Boolean(src)), [src]);

  /**
   * An image can finish failing before React has hydrated, in which
   * case onError never fires. Catching that here is what makes the
   * placeholder reliable while the photos are still missing.
   */
  const check = useCallback((node: HTMLImageElement | null) => {
    imgRef.current = node;
    if (node && node.complete && node.naturalWidth === 0) setHasPhoto(false);
  }, []);

  useEffect(() => {
    const node = imgRef.current;
    if (node && node.complete && node.naturalWidth === 0) setHasPhoto(false);
  }, [src]);

  if (!hasPhoto) {
    return (
      <div className={`photo photo-empty ${className}`.trim()} data-variant={variant % 4}>
        <PressedFlower variant={variant} />
        <span className="photo-empty-note">{placeholderNote}</span>
      </div>
    );
  }

  return (
    <div className={`photo ${fit === "natural" ? "photo-natural" : ""} ${className}`.trim()}>
      <img
        ref={check}
        className="photo-img"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        style={focus ? { objectPosition: focus } : undefined}
        onError={() => setHasPhoto(false)}
      />
      <span className="photo-grain" aria-hidden="true" />
    </div>
  );
}
