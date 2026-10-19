"use client";

import { useCallback, useRef, useState } from "react";
import { sweetMessages, type SweetMessage } from "@/data/messages";
import { useBurst } from "@/lib/hooks";

/**
 * A jar of folded notes on the cottage desk. Each tap pulls out a
 * different one — never the same one twice in a row — on a little
 * piece of paper that matches its mood.
 */
export default function NotesJar() {
  const [note, setNote] = useState<SweetMessage | null>(null);
  const [count, setCount] = useState(0);
  const lastIndex = useRef(-1);
  const { particles, fire } = useBurst("hearts");

  const pull = useCallback(() => {
    let index = Math.floor(Math.random() * sweetMessages.length);
    if (sweetMessages.length > 1) {
      while (index === lastIndex.current) {
        index = Math.floor(Math.random() * sweetMessages.length);
      }
    }
    lastIndex.current = index;
    setNote(sweetMessages[index]);
    setCount((value) => value + 1);
    fire(7);
  }, [fire]);

  return (
    <div className="notes-jar">
      <div className="notes-jar-art" aria-hidden="true">
        <svg viewBox="0 0 120 140">
          <path d="M34 36h52l8 16v70a10 10 0 0 1-10 10H36a10 10 0 0 1-10-10V52Z" fill="var(--ivory)" fillOpacity="0.75" stroke="var(--line)" strokeWidth="2" />
          <path d="M38 26h44a4 4 0 0 1 4 4v6H34v-6a4 4 0 0 1 4-4Z" fill="var(--clay)" opacity="0.7" />
          {[
            { x: 44, y: 78, r: -14, c: "var(--blush)" },
            { x: 66, y: 72, r: 10, c: "var(--sage-pale)" },
            { x: 52, y: 100, r: 6, c: "var(--honey-soft)" },
            { x: 72, y: 104, r: -8, c: "var(--lavender-soft)" },
            { x: 58, y: 120, r: 2, c: "var(--blush)" },
          ].map((paper, index) => (
            <rect
              key={index}
              x={paper.x}
              y={paper.y}
              width="22"
              height="16"
              rx="3"
              fill={paper.c}
              transform={`rotate(${paper.r} ${paper.x + 11} ${paper.y + 8})`}
            />
          ))}
        </svg>
        <span className="notes-jar-glow" />
      </div>

      <div className="notes-jar-copy">
        <h3>A jar of little notes</h3>
        <p>Small things I would say to you in passing. Take one whenever.</p>

        <button type="button" className="button button-primary" onClick={pull}>
          {count === 0 ? "Take a note out" : "Take another"}
        </button>

        <div className="notes-jar-slot" aria-live="polite">
          {note ? (
            <p className={`sweet-note sweet-note-${note.tone}`} key={count}>
              {note.text}
            </p>
          ) : (
            <p className="sweet-note-empty">there are {sweetMessages.length} in here</p>
          )}
        </div>

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
    </div>
  );
}
