"use client";

import { places } from "@/lib/progress";
import { Motif } from "../art/Decor";
import MusicPlayer from "../ui/MusicPlayer";
import { useWorld } from "./WorldProvider";

const sceneNames: Record<string, string> = {
  map: "the map",
  ...Object.fromEntries(places.map((place) => [place.id, place.name])),
};

export default function WorldBar({ onWish }: { onWish: () => void }) {
  const { scene, goTo, setJournalOpen, progress } = useWorld();
  const onMap = scene === "map";
  const found = progress.collected.length;

  return (
    <div className="world-bar">
      <div className="world-bar-inner">
        <button
          type="button"
          className="bar-button bar-back"
          onClick={() => goTo("map")}
          disabled={onMap}
          aria-label={onMap ? "You are on the map" : "Back to the map"}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="bar-button-text">{onMap ? "the map" : "back to the map"}</span>
        </button>

        <p className="world-bar-title">{sceneNames[scene] ?? "little garden of us"}</p>

        <div className="world-bar-tools">
          <button
            type="button"
            className="bar-button bar-wish"
            onClick={onWish}
            aria-label="I wish you were here"
          >
            <span className="bar-wish-icon" aria-hidden="true">
              <Motif motif="heart" size={14} />
            </span>
            <span className="bar-button-text">I wish you were here</span>
          </button>

          <MusicPlayer />

          <button
            type="button"
            className="bar-button bar-journal"
            onClick={() => setJournalOpen(true)}
            aria-label={`Open your journal — ${found} hidden things found`}
          >
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3Z" strokeLinejoin="round" />
              <path d="M5 4v16M9 9h6" strokeLinecap="round" />
            </svg>
            <span className="bar-button-text">journal</span>
            {found > 0 ? <span className="bar-count">{found}</span> : null}
          </button>
        </div>
      </div>
    </div>
  );
}
