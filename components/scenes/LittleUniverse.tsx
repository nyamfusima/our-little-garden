"use client";

import { useMemo, useState } from "react";
import { constellationComplete, stars } from "@/data/stars";
import { Moon } from "../art/Scenery";
import Reveal from "../ui/Reveal";
import SceneFrame from "../world/SceneFrame";
import { useWorld } from "../world/WorldProvider";

export default function LittleUniverse() {
  const { progress, findStar, collect } = useWorld();
  const [active, setActive] = useState<string | null>(null);

  const found = progress.starsFound;
  const complete = found.length >= stars.length;

  /** A segment is drawn once both of its stars are lit. */
  const segments = useMemo(
    () =>
      stars.map((star, index) => {
        const next = stars[(index + 1) % stars.length];
        return {
          id: `${star.id}-${next.id}`,
          x1: star.x,
          y1: star.y,
          x2: next.x,
          y2: next.y,
          on: found.includes(star.id) && found.includes(next.id),
        };
      }),
    [found],
  );

  const activeStar = stars.find((star) => star.id === active) ?? null;

  return (
    <SceneFrame
      title="Our Little Universe"
      intro="Every star up there is one reason. Touch them and see — when they are all lit, they make a shape I did not have to force."
      tone="night"
      footer={
        <p className="scene-foot-note">
          {found.length} of {stars.length} stars lit.
        </p>
      }
    >
      <div className="universe">
        <div className="sky" data-complete={complete ? "true" : "false"}>
          <Moon className="sky-moon" />

          <svg className="sky-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {segments.map((segment) => (
              <line
                key={segment.id}
                x1={segment.x1}
                y1={segment.y1}
                x2={segment.x2}
                y2={segment.y2}
                data-on={segment.on ? "true" : "false"}
              />
            ))}
          </svg>

          {stars.map((star) => {
            const lit = found.includes(star.id);
            return (
              <button
                key={star.id}
                type="button"
                className="sky-star"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                data-lit={lit ? "true" : "false"}
                data-size={star.size ?? 1}
                data-active={active === star.id ? "true" : "false"}
                onClick={() => {
                  findStar(star.id);
                  setActive((current) => (current === star.id ? null : star.id));
                }}
                aria-label={lit ? `${star.title} — read again` : "An unlit star"}
                aria-pressed={active === star.id}
              >
                <span className="sky-star-dot" aria-hidden="true" />
              </button>
            );
          })}

          {/* a comet, if she happens to look */}
          <button
            type="button"
            className="sky-comet"
            onClick={() => collect("comet")}
            aria-label="Catch the comet crossing the sky"
            data-found={progress.collected.includes("comet") ? "true" : "false"}
          >
            <span aria-hidden="true" />
          </button>
        </div>

        <div className="sky-panel" aria-live="polite">
          {activeStar ? (
            <article className="star-note" key={activeStar.id}>
              <p className="kicker">a reason</p>
              <h2>{activeStar.title}</h2>
              <p>{activeStar.text}</p>
              <button type="button" className="button button-quiet" onClick={() => setActive(null)}>
                back to the sky
              </button>
            </article>
          ) : (
            <p className="star-empty">
              {complete
                ? `${constellationComplete.title} — ${constellationComplete.text}`
                : "Touch a star. Each one holds something."}
            </p>
          )}
        </div>

        {complete ? (
          <Reveal className="constellation-done" variant="fade">
            <p>{constellationComplete.text}</p>
          </Reveal>
        ) : null}
      </div>
    </SceneFrame>
  );
}
