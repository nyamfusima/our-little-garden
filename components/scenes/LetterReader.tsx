"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Letter } from "@/data/letters";
import { useBurst, useReducedMotion } from "@/lib/hooks";
import { Motif, Postmark, Sprig, Stamp } from "../art/Decor";

type LetterReaderProps = {
  letter: Letter;
  onClose: () => void;
  /** Reading order, used for the “letter n of n” line. */
  index: number;
  total: number;
};

/** The letter itself: paper, stamp, handwriting, and a gentle way to fold it away. */
export default function LetterReader({ letter, onClose, index, total }: LetterReaderProps) {
  const [folding, setFolding] = useState(false);
  const { particles, fire } = useBurst("petals");
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const foldAway = useCallback(() => {
    if (folding) return;
    if (reduced) {
      onClose();
      return;
    }
    setFolding(true);
    fire(12);
    timer.current = window.setTimeout(onClose, 760);
  }, [fire, folding, onClose, reduced]);

  return (
    <article className="letter-paper" data-theme={letter.theme} data-folding={folding ? "true" : "false"}>
      <button
        type="button"
        className="icon-button letter-close"
        onClick={onClose}
        aria-label="Close this letter"
        data-autofocus
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <header className="letter-paper-head">
        <div className="letter-paper-marks">
          <Stamp motif={letter.motif} label={letter.stamp} />
          <Postmark text={letter.prompt.slice(0, 18)} />
        </div>
        <p className="kicker">
          letter {index + 1} of {total}
        </p>
        <h2 className="letter-paper-title" id="letter-title">
          {letter.title}
        </h2>
        <p className="letter-paper-prompt">{letter.prompt}</p>
        <Sprig className="letter-paper-rule" />
      </header>

      <div className="letter-body">
        <p className="letter-greeting">{letter.greeting}</p>
        {letter.paragraphs.map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>{paragraph}</p>
        ))}

        <p className="letter-signoff">{letter.signoff}</p>
        <p className="letter-signature">{letter.signature}</p>

        {letter.ps ? <p className="letter-ps">P.S. {letter.ps}</p> : null}
      </div>

      <footer className="letter-paper-foot">
        <button type="button" className="button button-primary" onClick={foldAway}>
          Fold it back up
          <span className="button-icon" aria-hidden="true">
            <Motif motif="heart" size={14} />
          </span>
        </button>
        <p className="letter-keep">it stays here, you can read it again whenever</p>
      </footer>

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
    </article>
  );
}
