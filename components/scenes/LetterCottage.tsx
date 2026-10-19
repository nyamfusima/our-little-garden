"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { letters, type Letter } from "@/data/letters";
import { MAX_STAGE } from "@/lib/garden";
import { useReducedMotion } from "@/lib/hooks";
import { Motif, Stamp, WaxSeal } from "../art/Decor";
import { Cottage } from "../art/Scenery";
import Modal from "../ui/Modal";
import NotesJar from "../ui/NotesJar";
import Reveal from "../ui/Reveal";
import SceneFrame from "../world/SceneFrame";
import { useWorld } from "../world/WorldProvider";
import LetterReader from "./LetterReader";

export default function LetterCottage() {
  const { progress, openLetter, collect } = useWorld();
  const [active, setActive] = useState<Letter | null>(null);
  const [opening, setOpening] = useState<string | null>(null);
  // held so the letter does not vanish while the dialog fades out
  const lastOpened = useRef<Letter | null>(null);
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  if (active) lastOpened.current = active;
  const shown = active ?? lastOpened.current;

  const bloomed = progress.flower.stage >= MAX_STAGE;
  const visible = letters.filter((letter) => letter.unlock !== "bloom" || bloomed);
  const hiddenCount = letters.length - visible.length;

  const open = useCallback(
    (letter: Letter) => {
      openLetter(letter.id);
      if (reduced) {
        setActive(letter);
        return;
      }
      setOpening(letter.id);
      timer.current = window.setTimeout(() => {
        setActive(letter);
        setOpening(null);
      }, 440);
    },
    [openLetter, reduced],
  );

  return (
    <SceneFrame
      title="The Letter Cottage"
      intro="Everything I kept meaning to say, finally written down and sealed. Take whichever one matches the day you are having."
      tone="paper"
      footer={
        <p className="scene-foot-note">
          {progress.lettersOpened.length} of {visible.length} opened so far — they stay here, you can read them again.
        </p>
      }
    >
      <div className="cottage-scene">
        <Cottage className="cottage-illustration" />

        {/* a spare wax seal left on the desk */}
        <button
          type="button"
          className="cottage-seal"
          onClick={() => collect("seal")}
          aria-label="Pick up the spare wax seal on the desk"
          data-found={progress.collected.includes("seal") ? "true" : "false"}
        >
          <WaxSeal motif="flower" />
        </button>
      </div>

      <ul className="letter-shelf">
        {visible.map((letter, index) => {
          const read = progress.lettersOpened.includes(letter.id);
          return (
            <li key={letter.id}>
              <Reveal delay={index % 3} variant="rise">
                <button
                  type="button"
                  className="envelope"
                  data-theme={letter.theme}
                  data-opening={opening === letter.id ? "true" : "false"}
                  data-read={read ? "true" : "false"}
                  onClick={() => open(letter)}
                >
                  <span className="envelope-art" aria-hidden="true">
                    <span className="envelope-paper">
                      <span className="envelope-paper-line" />
                      <span className="envelope-paper-line" />
                      <span className="envelope-paper-line short" />
                    </span>
                    <span className="envelope-body" />
                    <span className="envelope-flap" />
                    <span className="envelope-seal">
                      <Motif motif={letter.motif} size={13} />
                    </span>
                  </span>

                  <span className="envelope-copy">
                    <Stamp motif={letter.motif} label={letter.stamp} />
                    <span className="envelope-title">{letter.title}</span>
                    <span className="envelope-prompt">{letter.prompt}</span>
                    <span className="envelope-cue">{read ? "read it again" : "open it"}</span>
                  </span>
                </button>
              </Reveal>
            </li>
          );
        })}

        {hiddenCount > 0 ? (
          <li>
            <Reveal delay={2} variant="rise">
              <div className="envelope envelope-locked">
                <span className="envelope-art" aria-hidden="true">
                  <span className="envelope-body" />
                  <span className="envelope-flap" />
                </span>
                <span className="envelope-copy">
                  <span className="envelope-title">Not yet</span>
                  <span className="envelope-prompt">
                    One more letter appears here the day our flower blooms. It is worth the wait, I think.
                  </span>
                </span>
              </div>
            </Reveal>
          </li>
        ) : null}
      </ul>

      <Reveal variant="fade">
        <NotesJar />
      </Reveal>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        labelledBy="letter-title"
        className="letter-modal"
        backdropClassName="letter-backdrop"
      >
        {shown ? (
          <LetterReader
            letter={shown}
            index={letters.findIndex((letter) => letter.id === shown.id)}
            total={letters.length}
            onClose={() => setActive(null)}
          />
        ) : null}
      </Modal>
    </SceneFrame>
  );
}
