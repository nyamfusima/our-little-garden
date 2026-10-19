"use client";

import { useEffect } from "react";
import { site } from "@/data/site";
import { useBurst } from "@/lib/hooks";
import AudioNote from "../ui/AudioNote";
import Modal from "../ui/Modal";

/**
 * The quiet one. Two little lights leaning towards each other
 * across a dark room, and something sincere underneath.
 */
export default function WishYouWereHere({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { particles, fire } = useBurst("hearts");

  useEffect(() => {
    if (open) fire(10);
  }, [open, fire]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="wish-here-title"
      className="wish-here"
      backdropClassName="wish-here-backdrop"
    >
      <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close" data-autofocus>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <div className="wish-here-scene" aria-hidden="true">
        <span className="wish-light wish-light-a" />
        <span className="wish-light wish-light-b" />
        <svg className="wish-heart" viewBox="0 0 120 110">
          <path
            d="M60 98C34 80 10 61 10 38A26 26 0 0 1 60 26a26 26 0 0 1 50 12c0 23-24 42-50 60Z"
            fill="none"
            stroke="var(--gold-soft)"
            strokeWidth="1.6"
          />
        </svg>
      </div>

      <h2 id="wish-here-title" className="wish-here-title">
        {site.wishYouWereHere.heading}
      </h2>

      {site.wishYouWereHere.lines.map((line, index) => (
        <p key={index} className="wish-here-line">
          {line}
        </p>
      ))}

      <p className="wish-here-closing">{site.wishYouWereHere.closing}</p>

      <AudioNote src={site.voiceNote.src} label={site.voiceNote.label} />

      <button type="button" className="button button-primary" onClick={onClose}>
        Back to the garden
      </button>

      <span className="burst-layer" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="burst-particle"
            style={{
              left: `${particle.x}%`,
              animationDelay: `${particle.delay}s`,
              ["--drift" as string]: `${particle.drift}px`,
              ["--spin" as string]: `${particle.rotate}deg`,
              ["--scale" as string]: particle.scale,
            }}
          >
            {particle.glyph}
          </span>
        ))}
      </span>
    </Modal>
  );
}
