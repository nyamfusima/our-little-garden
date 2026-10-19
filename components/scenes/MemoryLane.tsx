"use client";

import { useCallback, useState } from "react";
import { memories } from "@/data/memories";
import { PressedFlower } from "../art/Decor";
import Lightbox from "../ui/Lightbox";
import PhotoFrame from "../ui/PhotoFrame";
import Reveal from "../ui/Reveal";
import SceneFrame from "../world/SceneFrame";
import { useWorld } from "../world/WorldProvider";

export default function MemoryLane() {
  const { progress, seeMemory, collect } = useWorld();
  const [index, setIndex] = useState<number | null>(null);

  const open = useCallback(
    (next: number) => {
      setIndex(next);
      const memory = memories[next];
      if (memory) seeMemory(memory.id);
    },
    [seeMemory],
  );

  return (
    <SceneFrame
      title="Memory Lane"
      intro="Photographs, tape, and the stories that go underneath them. Tap any one to read what I remember about it."
      tone="paper"
      footer={
        <p className="scene-foot-note">
          {progress.memoriesSeen.length} of {memories.length} looked at.
        </p>
      }
    >
      <div className="scrapbook">
        {memories.map((memory, position) => (
          <Reveal
            key={memory.id}
            as="div"
            variant="tilt"
            delay={position % 3}
            className={`polaroid polaroid-${memory.shape ?? "square"}`}
            style={{ ["--tilt" as string]: `${memory.tilt ?? 0}deg` }}
          >
            <button type="button" className="polaroid-button" onClick={() => open(position)}>
              <PhotoFrame
                src={memory.src}
                alt={memory.alt}
                placeholderNote="a photo goes here"
                variant={position % 4}
                focus={memory.focus}
              />
              <span className="polaroid-caption">{memory.caption}</span>
              {memory.when ? <span className="polaroid-date">{memory.when}</span> : null}
              <span className="sr-only">Open this memory: {memory.title}</span>
            </button>

            {memory.tape === "corners" ? (
              <>
                <span className="tape tape-corner tape-tl" aria-hidden="true" />
                <span className="tape tape-corner tape-br" aria-hidden="true" />
              </>
            ) : null}
            {memory.tape !== "none" && memory.tape !== "corners" ? (
              <span className="tape tape-top" aria-hidden="true" />
            ) : null}

            {progress.memoriesSeen.includes(memory.id) ? (
              <span className="polaroid-seen" aria-hidden="true">
                ♡
              </span>
            ) : null}
          </Reveal>
        ))}

        {/* a pressed flower, slipped between two pages */}
        <button
          type="button"
          className="scrapbook-pressed"
          onClick={() => collect("pressed")}
          aria-label="Lift the pressed flower tucked between the photos"
          data-found={progress.collected.includes("pressed") ? "true" : "false"}
        >
          <PressedFlower variant={2} />
        </button>
      </div>

      <Lightbox items={memories} index={index} onClose={() => setIndex(null)} onMove={open} />
    </SceneFrame>
  );
}
