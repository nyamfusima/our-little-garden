"use client";

import { useEffect, useState } from "react";
import { isUnlocked } from "@/lib/lock";
import FlowerGarden from "../scenes/FlowerGarden";
import LetterCottage from "../scenes/LetterCottage";
import LittleUniverse from "../scenes/LittleUniverse";
import MemoryLane from "../scenes/MemoryLane";
import WishTree from "../scenes/WishTree";
import WishYouWereHere from "../scenes/WishYouWereHere";
import DiscoveryToast from "./DiscoveryToast";
import Gate from "./Gate";
import Journal from "./Journal";
import MapScene from "./MapScene";
import WorldBar from "./WorldBar";
import { useWorld } from "./WorldProvider";

export default function World() {
  const { scene, phase, ready } = useWorld();
  const [wishOpen, setWishOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [keyChecked, setKeyChecked] = useState(false);

  // Read the key on the client only, so the first paint still matches
  // the server. Until then, and unless it is right, the locked gate is
  // the whole site — nothing else is rendered behind it.
  useEffect(() => {
    setUnlocked(isUnlocked());
    setKeyChecked(true);
  }, []);

  const inside = keyChecked && unlocked;

  const renderScene = () => {
    if (!inside) {
      return <Gate locked preview={!keyChecked} onUnlock={() => setUnlocked(true)} />;
    }
    if (!ready) return <Gate preview />;
    switch (scene) {
      case "gate":
        return <Gate />;
      case "garden":
        return <FlowerGarden />;
      case "cottage":
        return <LetterCottage />;
      case "memories":
        return <MemoryLane />;
      case "universe":
        return <LittleUniverse />;
      case "tree":
        return <WishTree />;
      case "map":
      default:
        return <MapScene />;
    }
  };

  const showBar = inside && ready && scene !== "gate";

  return (
    <div className="world" data-scene={inside && ready ? scene : "gate"} data-phase={phase}>
      <div className="world-ground" aria-hidden="true" />

      {showBar ? <WorldBar onWish={() => setWishOpen(true)} /> : null}

      <main className="world-stage" id="main">
        <div className="scene-swap" key={inside ? (ready ? scene : "loading") : "locked"}>
          {renderScene()}
        </div>
      </main>

      {inside ? (
        <>
          <Journal />
          <DiscoveryToast />
          <WishYouWereHere open={wishOpen} onClose={() => setWishOpen(false)} />
        </>
      ) : null}
    </div>
  );
}
