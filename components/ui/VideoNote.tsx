"use client";

import { useState } from "react";

/** An optional video message. Same rules: no autoplay, hides itself if missing. */
export default function VideoNote({ src, label }: { src: string; label: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return null;

  return (
    <figure className="video-note">
      <figcaption>{label}</figcaption>
      <video controls preload="metadata" playsInline src={src} onError={() => setBroken(true)} />
    </figure>
  );
}
