"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { useReducedMotion } from "@/lib/hooks";
import { PetalField } from "../art/Decor";
import { Fireflies, GateArt, GateDoor, Hills, Moon, Padlock, StarField } from "../art/Scenery";
import PhotoFrame from "../ui/PhotoFrame";
import GateLock from "./GateLock";
import { useWorld } from "./WorldProvider";

/**
 * The opening scene: a moonlit garden gate. Locked, it asks for
 * six numbers and shows nothing of hers until they are right.
 * Unlocked, she taps the invitation, the gate swings open, and
 * the world is behind it. `preview` is the quiet version shown
 * for the single frame before we know which of those it is.
 */
export default function Gate({
  preview = false,
  locked = false,
  onUnlock,
}: {
  preview?: boolean;
  locked?: boolean;
  onUnlock?: () => void;
}) {
  const { openGate, progress, collect } = useWorld();
  const [entering, setEntering] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    },
    [],
  );

  const enter = useCallback(() => {
    if (entering) return;
    if (reduced) {
      openGate();
      return;
    }
    setEntering(true);
    timer.current = window.setTimeout(openGate, 1500);
  }, [entering, openGate, reduced]);

  const returning = progress.gateOpened;

  return (
    <section
      className="gate"
      data-entering={entering ? "true" : "false"}
      data-preview={preview ? "true" : "false"}
      data-locked={locked ? "true" : "false"}
      data-unlocking={unlocking ? "true" : "false"}
    >
      <div className="gate-sky" aria-hidden="true">
        <StarField />
        <Moon />
        <Hills tone="night" />
        <Fireflies />
        <PetalField tone="mixed" />
      </div>

      {/* one firefly is catchable — the first hidden thing in the world */}
      {!locked && (
        <button
          type="button"
          className="gate-firefly"
          onClick={() => collect("firefly")}
          aria-label="Catch the firefly drifting by the gate"
          data-found={progress.collected.includes("firefly") ? "true" : "false"}
        >
          <span aria-hidden="true" />
        </button>
      )}

      <div className="gate-scene">
        <GateArt className="gate-arch" />
        <div className="gate-doors" aria-hidden="true">
          <div className="gate-door gate-door-l">
            <GateDoor side="left" />
          </div>
          <div className="gate-door gate-door-r">
            <GateDoor side="right" />
          </div>
        </div>

        {locked ? (
          <div className="gate-padlock">
            <Padlock />
          </div>
        ) : (
          <div className="gate-photo">
            <PhotoFrame
              src={site.heroPhoto.src}
              alt={site.heroPhoto.alt}
              placeholderNote="our photo goes here"
              priority
              fit="natural"
              variant={0}
            />
            <p className="gate-photo-caption">{site.heroPhoto.caption}</p>
            <span className="tape tape-a" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="gate-copy">
        {locked ? (
          <p className="kicker">{site.lock.kicker}</p>
        ) : (
          <p className="kicker">
            for {site.herName.toLowerCase()}, from {site.myName.toLowerCase()}
          </p>
        )}

        <h1 className="gate-title">{site.title}</h1>
        <p className="gate-subtitle">{locked ? site.lock.line : site.subtitle}</p>
        {!locked && <p className="gate-intro">{site.gateIntro}</p>}

        {locked
          ? !preview && <GateLock onOpen={() => setUnlocking(true)} onUnlock={() => onUnlock?.()} />
          : !preview && (
              <div className="gate-actions">
                <button type="button" className="button button-primary gate-enter" onClick={enter}>
                  {returning ? "Come back in" : site.gateInvitation}
                </button>
                <button type="button" className="gate-skip" onClick={openGate}>
                  skip straight to the map
                </button>
              </div>
            )}
      </div>

      <div className="gate-wash" aria-hidden="true" />
    </section>
  );
}
