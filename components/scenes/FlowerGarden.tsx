"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  MAX_STAGE,
  bloomingAgainMessages,
  extraBlooms,
  stages,
  timeUntilTomorrow,
  todayKey,
  welcomeBack,
} from "@/lib/garden";
import { useBurst, useReducedMotion } from "@/lib/hooks";
import { PetalField } from "../art/Decor";
import Flower, { WateringCan } from "../art/Flower";
import { Butterfly, Fireflies, Hills } from "../art/Scenery";
import SceneFrame from "../world/SceneFrame";
import { useWorld } from "../world/WorldProvider";

const DROPS = [0, 1, 2, 3, 4, 5];

export default function FlowerGarden() {
  const { progress, waterFlower, collect } = useWorld();
  const flower = progress.flower;
  const reduced = useReducedMotion();
  const { particles, fire } = useBurst("sparkles");

  const [message, setMessage] = useState("");
  const [milestone, setMilestone] = useState("");
  const [pouring, setPouring] = useState(false);
  const [growing, setGrowing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [waitCopy, setWaitCopy] = useState("");

  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    },
    [],
  );

  const wateredToday = flower.lastWatered === todayKey();

  // The countdown is only ever computed on the client, after mount.
  useEffect(() => {
    if (!wateredToday) {
      setWaitCopy("");
      return;
    }
    const tick = () => setWaitCopy(timeUntilTomorrow());
    tick();
    const interval = window.setInterval(tick, 60000);
    return () => window.clearInterval(interval);
  }, [wateredToday]);

  useEffect(() => {
    setMessage(welcomeBack(flower));
    // only on arrival
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const apply = useCallback(() => {
    const result = waterFlower();

    if (result.status === "done-today") {
      setMessage("It has had its water for today. Flowers are not in a hurry, and neither are we.");
      return;
    }

    if (result.status === "again") {
      const line = bloomingAgainMessages[Math.floor(Math.random() * bloomingAgainMessages.length)];
      setMessage(line);
      fire(8);
      return;
    }

    const stage = stages[result.stage];
    setMessage(stage.afterWatering);
    setMilestone(stage.milestone ?? "");
    setGrowing(true);
    fire(result.stage >= MAX_STAGE ? 16 : 8);
    timers.current.push(window.setTimeout(() => setGrowing(false), 1400));
  }, [fire, waterFlower]);

  const water = useCallback(() => {
    if (busy) return;

    if (wateredToday) {
      setMessage(
        `Already watered today. It will be thirsty again ${timeUntilTomorrow()} — that is the deal with this flower.`,
      );
      return;
    }

    if (reduced) {
      apply();
      return;
    }

    setBusy(true);
    setPouring(true);
    timers.current.push(
      window.setTimeout(() => {
        apply();
        setPouring(false);
        setBusy(false);
      }, 900),
    );
  }, [apply, busy, reduced, wateredToday]);

  const extras = extraBlooms(flower);
  const stageInfo = stages[Math.min(MAX_STAGE, flower.stage)];

  return (
    <SceneFrame
      title="The Flower Garden"
      intro="One watering a day, and only one. It grows the way most things worth having grow — slowly, and because somebody kept coming back."
      tone="day"
    >
      <div className="garden">
        <div className="garden-sky" aria-hidden="true">
          <Hills tone="day" />
          <Fireflies count={3} />
          {flower.stage >= 3 ? <Butterfly className="garden-butterfly" /> : null}
          {flower.stage >= MAX_STAGE ? <PetalField tone="rose" /> : null}
        </div>

        <div className="garden-plot">
          <div className="flower-holder" data-pouring={pouring ? "true" : "false"}>
            <Flower stage={flower.stage} extras={extras} growing={growing} />

            <div className="droplets" aria-hidden="true" data-on={pouring ? "true" : "false"}>
              {DROPS.map((drop) => (
                <span key={drop} style={{ animationDelay: `${drop * 90}ms`, left: `${44 + drop * 3}%` }} />
              ))}
            </div>

            <span className="sparkle-layer" aria-hidden="true">
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

            {/* a petal the flower dropped */}
            <button
              type="button"
              className="garden-petal"
              onClick={() => collect("petal")}
              aria-label="Pick up the fallen petal"
              data-found={progress.collected.includes("petal") ? "true" : "false"}
            >
              <span aria-hidden="true">❀</span>
            </button>
          </div>

          <button
            type="button"
            className="can-button"
            onClick={water}
            disabled={busy}
            aria-label={wateredToday ? "Already watered today" : "Water the flower"}
            data-watered={wateredToday ? "true" : "false"}
          >
            <WateringCan pouring={pouring} />
          </button>
        </div>

        <div className="garden-panel">
          <p className="kicker">day {flower.daysCaredFor} of looking after it</p>
          <h2 className="garden-stage-name">{stageInfo.name}</h2>
          <p className="garden-blurb">{stageInfo.blurb}</p>

          <ol className="growth-vine" aria-label={`Growth: stage ${flower.stage} of ${MAX_STAGE}`}>
            {stages.map((stage, index) => (
              <li key={stage.name} data-done={index <= flower.stage ? "true" : "false"} data-current={index === flower.stage ? "true" : "false"}>
                <span className="vine-node" aria-hidden="true" />
                <span className="sr-only">{stage.name}</span>
              </li>
            ))}
          </ol>

          <button type="button" className="button button-primary" onClick={water} disabled={busy || wateredToday}>
            {wateredToday ? "Watered for today" : "Give it some water"}
          </button>

          <p className="garden-when">
            {wateredToday
              ? `Come back tomorrow — thirsty again ${waitCopy || "after midnight"}.`
              : "It can be watered once a day, in your own time zone."}
          </p>

          {message ? (
            <p className="garden-message" role="status" key={message}>
              {message}
            </p>
          ) : null}

          {milestone ? <p className="garden-milestone">{milestone}</p> : null}

          {flower.stage >= MAX_STAGE ? (
            <p className="garden-unlocked">
              A letter appeared in the Letter Cottage the day this bloomed. It is still there.
            </p>
          ) : null}
        </div>
      </div>
    </SceneFrame>
  );
}
