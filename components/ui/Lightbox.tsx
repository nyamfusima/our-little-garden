"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Memory } from "@/data/memories";
import Modal from "./Modal";
import PhotoFrame from "./PhotoFrame";

type LightboxProps = {
  items: Memory[];
  index: number | null;
  onClose: () => void;
  onMove: (index: number) => void;
};

/** Full-screen view of one memory, with arrows, keys and swipe. */
export default function Lightbox({ items, index, onClose, onMove }: LightboxProps) {
  const open = index !== null && index >= 0 && index < items.length;
  const touchStart = useRef<number | null>(null);
  // held so the photo does not vanish while the dialog fades out
  const lastShown = useRef<number>(0);

  const step = useCallback(
    (direction: number) => {
      if (index === null) return;
      const next = (index + direction + items.length) % items.length;
      onMove(next);
    },
    [index, items.length, onMove],
  );

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, step]);

  if (open) lastShown.current = index as number;
  const shownIndex = open ? (index as number) : lastShown.current;
  const memory = items[shownIndex] ?? null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="lightbox-title"
      className="lightbox"
      backdropClassName="lightbox-backdrop"
    >
      {memory ? (
        <div
          className="lightbox-inner"
          onTouchStart={(event) => {
            touchStart.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (start === null) return;
            const delta = (event.changedTouches[0]?.clientX ?? start) - start;
            if (Math.abs(delta) > 45) step(delta < 0 ? 1 : -1);
          }}
        >
          <button
            type="button"
            className="icon-button lightbox-close"
            onClick={onClose}
            aria-label="Close this memory"
            data-autofocus
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>

          <figure className="lightbox-figure">
            <PhotoFrame
              src={memory.src}
              alt={memory.alt}
              placeholderNote="this photo is still to come"
              variant={shownIndex % 4}
              fit="natural"
              priority
            />
            <figcaption>
              <p className="kicker">
                {memory.when ? `${memory.when} · ` : ""}
                {shownIndex + 1} of {items.length}
              </p>
              <h2 id="lightbox-title">{memory.title}</h2>
              <p className="lightbox-caption">{memory.caption}</p>
              {memory.story ? <p className="lightbox-story">{memory.story}</p> : null}
            </figcaption>
          </figure>

          <div className="lightbox-controls">
            <button type="button" className="button button-quiet" onClick={() => step(-1)}>
              <span aria-hidden="true">←</span> previous
            </button>
            <button type="button" className="button button-quiet" onClick={() => step(1)}>
              next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
