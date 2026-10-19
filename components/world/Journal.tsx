"use client";

import { collectibles } from "@/data/collectibles";
import { letters } from "@/data/letters";
import { memories } from "@/data/memories";
import { stars } from "@/data/stars";
import { wishes } from "@/data/wishes";
import { finaleSteps, isFinaleUnlocked, places } from "@/lib/progress";
import { Sprig, ThingIcon } from "../art/Decor";
import Modal from "../ui/Modal";
import { useWorld } from "./WorldProvider";

/** Her little book of everything found so far. */
export default function Journal() {
  const { journalOpen, setJournalOpen, progress, goTo } = useWorld();
  const steps = finaleSteps(progress);
  const unlocked = isFinaleUnlocked(progress);

  const tallies = [
    { label: "places found", value: progress.visited.length, total: places.length },
    { label: "letters opened", value: progress.lettersOpened.length, total: letters.length },
    { label: "memories looked at", value: progress.memoriesSeen.length, total: memories.length },
    { label: "stars lit", value: progress.starsFound.length, total: stars.length },
    { label: "wishes read", value: progress.wishesRead.length, total: wishes.length },
  ];

  return (
    <Modal
      open={journalOpen}
      onClose={() => setJournalOpen(false)}
      labelledBy="journal-title"
      className="journal"
      backdropClassName="journal-backdrop"
    >
      <button
        type="button"
        className="icon-button modal-close"
        onClick={() => setJournalOpen(false)}
        aria-label="Close the journal"
        data-autofocus
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>

      <p className="kicker">kept by you</p>
      <h2 className="journal-title" id="journal-title">
        Your journal
      </h2>
      <Sprig className="journal-sprig" />

      <ul className="journal-tallies">
        {tallies.map((tally) => (
          <li key={tally.label}>
            <span className="tally-value">
              {tally.value}
              <span className="tally-total">/{tally.total}</span>
            </span>
            <span className="tally-label">{tally.label}</span>
          </li>
        ))}
      </ul>

      <section className="journal-section">
        <h3>Little things found</h3>
        <ul className="journal-things">
          {collectibles.map((thing) => {
            const found = progress.collected.includes(thing.id);
            return (
              <li key={thing.id} data-found={found ? "true" : "false"}>
                <span className="thing-icon">
                  <ThingIcon icon={thing.icon} size={found ? 30 : 24} />
                </span>
                <span className="thing-copy">
                  <strong>{found ? thing.name : "Still out there"}</strong>
                  <span>{found ? thing.note : thing.where}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="journal-section">
        <h3>The last letter</h3>
        <ul className="journal-steps">
          {steps.map((step) => (
            <li key={step.label} data-done={step.done ? "true" : "false"}>
              <span className="step-mark" aria-hidden="true" />
              <span className="step-label">{step.label}</span>
              <span className="step-count">
                {step.value}/{step.target}
              </span>
            </li>
          ))}
        </ul>
        <p className="journal-note">
          {unlocked
            ? "It is ready. There is a sealed letter waiting at the Wish Tree."
            : "When all of these are done, a last letter appears at the Wish Tree."}
        </p>
        {unlocked ? (
          <button
            type="button"
            className="button button-primary"
            onClick={() => {
              setJournalOpen(false);
              goTo("tree");
            }}
          >
            Go to the Wish Tree
          </button>
        ) : null}
      </section>
    </Modal>
  );
}
