"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { finaleRatio, isPlaceUnlocked, places, type PlaceId } from "@/lib/progress";
import { Butterfly, Cottage, Fireflies, Hills, Mushroom, WishTreeArt } from "../art/Scenery";
import { Motif, Sprig } from "../art/Decor";
import Flower from "../art/Flower";
import Reveal from "../ui/Reveal";
import { useWorld } from "./WorldProvider";

/** A tiny illustration for each destination on the map. */
function PlaceArt({ id, stage }: { id: PlaceId; stage: number }) {
  switch (id) {
    case "garden":
      return <Flower stage={stage} className="map-flower" />;
    case "cottage":
      return <Cottage className="map-cottage" />;
    case "memories":
      return (
        <svg viewBox="0 0 160 140" className="map-polaroids" aria-hidden="true">
          <g transform="rotate(-8 60 70)">
            <rect x="18" y="30" width="72" height="84" rx="3" fill="var(--ivory)" stroke="var(--line)" />
            <rect x="24" y="36" width="60" height="58" fill="var(--blush)" />
            <path d="M24 82l16-16 12 12 10-8 22 24H24Z" fill="var(--sage)" opacity="0.6" />
          </g>
          <g transform="rotate(7 100 74)">
            <rect x="70" y="36" width="72" height="84" rx="3" fill="var(--ivory)" stroke="var(--line)" />
            <rect x="76" y="42" width="60" height="58" fill="var(--lavender-soft)" />
            <circle cx="106" cy="66" r="13" fill="var(--gold-soft)" />
          </g>
          <rect x="88" y="28" width="30" height="12" rx="2" fill="var(--clay)" opacity="0.35" transform="rotate(-6 103 34)" />
        </svg>
      );
    case "universe":
      return (
        <svg viewBox="0 0 160 140" className="map-observatory" aria-hidden="true">
          <circle cx="112" cy="36" r="18" fill="var(--moonlight)" opacity="0.9" />
          <circle cx="104" cy="31" r="4" fill="var(--parchment)" opacity="0.5" />
          <path d="M20 120h120" stroke="var(--sage-deep)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
          <path d="M44 120 70 62l26 58Z" fill="var(--twilight)" opacity="0.85" />
          <path d="M70 62l-8 18h16Z" fill="var(--gold-soft)" />
          {[
            [28, 38],
            [50, 24],
            [136, 72],
            [20, 78],
            [92, 30],
          ].map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r="2.4" fill="var(--moonlight)" />
          ))}
        </svg>
      );
    case "tree":
    default:
      return <WishTreeArt className="map-tree" />;
  }
}

export default function MapScene() {
  const { progress, goTo, collect } = useWorld();
  const [hovered, setHovered] = useState<PlaceId | null>(null);
  const ratio = finaleRatio(progress);

  return (
    <section className="map-scene">
      <Reveal className="map-head" variant="fade">
        <p className="kicker">
          <span className="kicker-rule" aria-hidden="true" />
          {site.subtitle.toLowerCase()}
        </p>
        <h1 className="map-title">Where would you like to go?</h1>
        <p className="map-lede">
          Five places. Wander in any order — the world remembers what you have found.
        </p>
      </Reveal>

      <div className="map-canvas">
        <div className="map-paper" aria-hidden="true" />
        <Hills tone="dusk" />
        <Fireflies count={5} />

        <svg className="map-paths" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M24 70C34 62 40 54 48 46 56 38 68 42 76 48 84 54 88 40 82 30"
            fill="none"
            stroke="var(--clay)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="2.6 2.4"
            opacity="0.6"
          />
          <path
            d="M48 46C40 40 30 36 22 30"
            fill="none"
            stroke="var(--clay)"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="2.6 2.4"
            opacity="0.6"
          />
        </svg>

        <Butterfly className="map-butterfly" />

        {/* a pointless and much-loved mushroom */}
        <button
          type="button"
          className="map-mushroom"
          onClick={() => collect("mushroom")}
          aria-label="Look at the little mushroom beside the path"
          data-found={progress.collected.includes("mushroom") ? "true" : "false"}
        >
          <Mushroom />
        </button>

        {places.map((place, index) => {
          const unlocked = isPlaceUnlocked(place, progress);
          const visited = progress.visited.includes(place.id);
          return (
            <div
              key={place.id}
              className="map-pin"
              /* the map only pins these by hand on a wide screen; on a
                 phone they stack into a list and the spots go unused */
              style={{
                ["--pin-x" as string]: `${place.x}%`,
                ["--pin-y" as string]: `${place.y}%`,
                ["--pin-delay" as string]: `${index * 110}ms`,
              }}
              data-unlocked={unlocked ? "true" : "false"}
              data-active={hovered === place.id ? "true" : "false"}
            >
              <button
                type="button"
                className="map-pin-button"
                onClick={() => (unlocked ? goTo(place.id) : undefined)}
                onMouseEnter={() => setHovered(place.id)}
                onMouseLeave={() => setHovered((current) => (current === place.id ? null : current))}
                onFocus={() => setHovered(place.id)}
                onBlur={() => setHovered((current) => (current === place.id ? null : current))}
                aria-disabled={!unlocked}
                aria-describedby={`pin-note-${place.id}`}
              >
                <span className="map-pin-art">
                  <PlaceArt id={place.id} stage={progress.flower.stage} />
                </span>
                <span className="map-pin-label">
                  <span className="map-pin-name">{place.name}</span>
                  {visited ? (
                    <span className="map-pin-badge" aria-hidden="true">
                      <Motif motif="heart" size={11} />
                    </span>
                  ) : null}
                </span>
              </button>
              <span className="map-pin-note" id={`pin-note-${place.id}`}>
                {unlocked ? place.teaser : place.requirementHint}
              </span>
            </div>
          );
        })}
      </div>

      <Reveal className="map-foot" variant="fade" delay={1}>
        <Sprig className="map-foot-sprig" />
        <p className="map-foot-note">
          {ratio >= 1
            ? "You have found everything there is. There is a last letter waiting in the Wish Tree."
            : "Something is waiting at the end of all this. Keep looking around."}
        </p>
        <p className="map-foot-sign">{site.footerNote}</p>
      </Reveal>
    </section>
  );
}
