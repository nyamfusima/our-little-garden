"use client";

import { useState } from "react";
import { wishes } from "@/data/wishes";
import { finaleSteps, isFinaleUnlocked } from "@/lib/progress";
import { Lantern, WishTreeArt } from "../art/Scenery";
import Reveal from "../ui/Reveal";
import SceneFrame from "../world/SceneFrame";
import { useWorld } from "../world/WorldProvider";
import Finale from "./Finale";

/**
 * Where each paper wish hangs in the branches. Two sets of spots:
 * `mx`/`my` for a phone, where the tree is square and the papers
 * need two tidy columns to stop covering each other, and `x`/`y`
 * from 680px up, where there is room to scatter them properly.
 */
const SPOTS = [
  { x: 24, y: 30, mx: 29, my: 13 },
  { x: 42, y: 20, mx: 71, my: 17 },
  { x: 59, y: 26, mx: 33, my: 25 },
  { x: 76, y: 34, mx: 68, my: 29 },
  { x: 32, y: 46, mx: 28, my: 37 },
  { x: 50, y: 40, mx: 72, my: 41 },
  { x: 68, y: 48, mx: 34, my: 49 },
  { x: 84, y: 22, mx: 66, my: 52 },
];

export default function WishTree() {
  const { progress, readWish, collect } = useWorld();
  const [active, setActive] = useState<string | null>(null);
  const [finaleOpen, setFinaleOpen] = useState(false);

  const unlocked = isFinaleUnlocked(progress);
  const steps = finaleSteps(progress);
  const activeWish = wishes.find((wish) => wish.id === active) ?? null;

  return (
    <SceneFrame
      title="The Wish Tree"
      intro="People tie wishes to trees like this and leave them to the weather. These ones are mine, and they are staying put."
      tone="dusk"
      footer={
        <p className="scene-foot-note">
          {progress.wishesRead.length} of {wishes.length} wishes read.
        </p>
      }
    >
      <div className="wish-tree">
        <div className="wish-tree-stage">
          <WishTreeArt />

          {wishes.map((wish, index) => {
            const spot = SPOTS[index % SPOTS.length];
            const read = progress.wishesRead.includes(wish.id);
            return (
              <button
                key={wish.id}
                type="button"
                className="wish-tag"
                style={{
                  ["--wish-x" as string]: `${spot.x}%`,
                  ["--wish-y" as string]: `${spot.y}%`,
                  ["--wish-mx" as string]: `${spot.mx}%`,
                  ["--wish-my" as string]: `${spot.my}%`,
                  ["--sway" as string]: `${(index % 4) * 0.7}s`,
                }}
                data-kind={wish.kind}
                data-read={read ? "true" : "false"}
                data-active={active === wish.id ? "true" : "false"}
                onClick={() => {
                  readWish(wish.id);
                  setActive((current) => (current === wish.id ? null : wish.id));
                }}
              >
                <span className="wish-string" aria-hidden="true" />
                <span className="wish-paper">{wish.label}</span>
              </button>
            );
          })}

          {/* a paper lantern, waiting to be lit */}
          <button
            type="button"
            className="wish-lantern"
            onClick={() => collect("lantern")}
            aria-label="Light the paper lantern in the branches"
            data-found={progress.collected.includes("lantern") ? "true" : "false"}
          >
            <Lantern lit={progress.collected.includes("lantern")} />
          </button>
        </div>

        <div className="wish-panel" aria-live="polite">
          {activeWish ? (
            <article className="wish-note" key={activeWish.id} data-kind={activeWish.kind}>
              <p className="kicker">{activeWish.label}</p>
              <p className="wish-text">{activeWish.text}</p>
              <button type="button" className="button button-quiet" onClick={() => setActive(null)}>
                tie it back on
              </button>
            </article>
          ) : (
            <p className="wish-empty">Take one down and read it. They go back afterwards.</p>
          )}
        </div>
      </div>

      <Reveal className="finale-gate" variant="fade">
        {unlocked ? (
          <>
            <h2 className="finale-gate-title">There is one letter left</h2>
            <p className="finale-gate-note">
              You found your way around the whole garden. This is the one I wrote last, and meant most.
            </p>
            <button type="button" className="button button-primary" onClick={() => setFinaleOpen(true)}>
              {progress.finaleOpened ? "Read it again" : "Open the last letter"}
            </button>
          </>
        ) : (
          <>
            <h2 className="finale-gate-title">Something is still sealed</h2>
            <p className="finale-gate-note">
              There is a last letter under this tree. It opens once you have had a proper look around —
              here is what is left:
            </p>
            <ul className="finale-gate-steps">
              {steps.map((step) => (
                <li key={step.label} data-done={step.done ? "true" : "false"}>
                  <span className="step-mark" aria-hidden="true" />
                  {step.label}
                  <span className="step-count">
                    {step.value}/{step.target}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Reveal>

      <Finale open={finaleOpen} onClose={() => setFinaleOpen(false)} />
    </SceneFrame>
  );
}
