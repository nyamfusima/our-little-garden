"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { finale } from "@/data/finale";
import { site } from "@/data/site";
import { useBurst, useReducedMotion } from "@/lib/hooks";
import { Motif, Postmark, Sprig, WaxSeal } from "../art/Decor";
import AudioNote from "../ui/AudioNote";
import Modal from "../ui/Modal";
import VideoNote from "../ui/VideoNote";
import { useWorld } from "../world/WorldProvider";

/**
 * The last letter. Sealed until she opens it, and openable again
 * any time afterwards — her progress is never spent.
 */
export default function Finale({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { openFinale } = useWorld();
  const [phase, setPhase] = useState<"sealed" | "open">("sealed");
  const { particles, fire } = useBurst("petals");
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!open) setPhase("sealed");
  }, [open]);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const breakSeal = useCallback(() => {
    openFinale();
    fire(18);
    if (reduced) {
      setPhase("open");
      return;
    }
    timer.current = window.setTimeout(() => setPhase("open"), 620);
  }, [fire, openFinale, reduced]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      labelledBy="finale-title"
      className="finale"
      backdropClassName="finale-backdrop"
    >
      <div className="finale-inner" data-phase={phase}>
        <button type="button" className="icon-button modal-close" onClick={onClose} aria-label="Close" data-autofocus>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        {phase === "sealed" ? (
          <div className="finale-sealed">
            <p className="kicker">{finale.sealLabel}</p>
            <h2 id="finale-title" className="finale-seal-title">
              For {site.herName}
            </h2>
            <p className="finale-seal-note">{finale.envelopeNote}</p>

            <button type="button" className="finale-envelope" onClick={breakSeal} aria-label="Break the seal and open the last letter">
              <span className="finale-env-body" aria-hidden="true" />
              <span className="finale-env-flap" aria-hidden="true" />
              <span className="finale-env-seal" aria-hidden="true">
                <WaxSeal motif="heart" />
              </span>
            </button>

            <button type="button" className="button button-primary" onClick={breakSeal}>
              Open it
              <span className="button-icon" aria-hidden="true">
                <Motif motif="heart" size={14} />
              </span>
            </button>
          </div>
        ) : (
          <article className="finale-letter">
            <div className="finale-marks" aria-hidden="true">
              <Postmark text="the last one" />
            </div>
            <p className="kicker">the last letter</p>
            <h2 id="finale-title">{finale.title}</h2>
            <Sprig className="finale-sprig" />

            <p className="letter-greeting">{finale.greeting}</p>
            {finale.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <p className="letter-signoff">{finale.signoff}</p>
            <p className="letter-signature">{finale.signature}</p>

            <AudioNote src={finale.voice.src} label={finale.voice.label} />
            <VideoNote src={finale.video.src} label={finale.video.label} />

            <p className="finale-closing">{finale.closingLine}</p>

            <button type="button" className="button button-primary" onClick={onClose}>
              Close the garden gently
            </button>
          </article>
        )}

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
      </div>
    </Modal>
  );
}
