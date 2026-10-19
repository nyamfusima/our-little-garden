"use client";

import { useState } from "react";

/**
 * A recorded note. Uses the browser's own audio controls on
 * purpose: they are accessible, familiar on a phone, and never
 * autoplay. If the file is missing, the whole card disappears.
 */
export default function AudioNote({ src, label }: { src: string; label: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return null;

  return (
    <figure className="audio-note">
      <figcaption>{label}</figcaption>
      <audio controls preload="metadata" src={src} onError={() => setBroken(true)}>
        Your browser cannot play this recording.
      </audio>
    </figure>
  );
}
