/**
 * ─────────────────────────────────────────────────────────────
 *  WORLD PROGRESS
 *
 *  Everything she has discovered lives in one object, under one
 *  localStorage key, so nothing can get out of sync or reset by
 *  accident. Progress from the earlier version of this site
 *  (the old `garden-state` key) is migrated in automatically.
 * ─────────────────────────────────────────────────────────────
 */

import { MAX_STAGE, todayKey } from "./garden";
import { readStore } from "./storage";

export const STORE_KEY = "garden.world.v1";
const LEGACY_KEY = "garden-state";

export type PlaceId = "garden" | "cottage" | "memories" | "universe" | "tree";
export type SceneId = "gate" | "map" | PlaceId;

export type FlowerState = {
  stage: number;
  /** `YYYY-MM-DD` in her own timezone. */
  lastWatered: string;
  daysCaredFor: number;
};

export type Progress = {
  gateOpened: boolean;
  visited: PlaceId[];
  lettersOpened: string[];
  memoriesSeen: string[];
  starsFound: string[];
  wishesRead: string[];
  collected: string[];
  finaleOpened: boolean;
  flower: FlowerState;
};

export const emptyProgress: Progress = {
  gateOpened: false,
  visited: [],
  lettersOpened: [],
  memoriesSeen: [],
  starsFound: [],
  wishesRead: [],
  collected: [],
  finaleOpened: false,
  flower: { stage: 0, lastWatered: "", daysCaredFor: 0 },
};

const PLACE_IDS: PlaceId[] = ["garden", "cottage", "memories", "universe", "tree"];

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(new Set(value.filter((item): item is string => typeof item === "string")));
}

/** Clamps anything that comes out of storage into a usable shape. */
export function normaliseProgress(value: unknown): Progress {
  if (!value || typeof value !== "object") return emptyProgress;
  const raw = value as Record<string, unknown>;
  const flowerRaw = (raw.flower ?? {}) as Record<string, unknown>;
  const stage = Number(flowerRaw.stage);
  const days = Number(flowerRaw.daysCaredFor);

  return {
    gateOpened: raw.gateOpened === true,
    visited: stringList(raw.visited).filter((id): id is PlaceId => PLACE_IDS.includes(id as PlaceId)),
    lettersOpened: stringList(raw.lettersOpened),
    memoriesSeen: stringList(raw.memoriesSeen),
    starsFound: stringList(raw.starsFound),
    wishesRead: stringList(raw.wishesRead),
    collected: stringList(raw.collected),
    finaleOpened: raw.finaleOpened === true,
    flower: {
      stage: Number.isFinite(stage) ? Math.min(MAX_STAGE, Math.max(0, Math.floor(stage))) : 0,
      lastWatered: typeof flowerRaw.lastWatered === "string" ? flowerRaw.lastWatered : "",
      daysCaredFor: Number.isFinite(days) ? Math.max(0, Math.floor(days)) : 0,
    },
  };
}

/**
 * Brings across the flower from the first version of this site,
 * where it was `{ bloom, lastWatered }` with a `toDateString()`
 * date and only four stages. Her old progress is not lost.
 */
export function migrateLegacyFlower(current: Progress): Progress {
  if (current.flower.stage > 0 || current.flower.lastWatered) return current;

  const legacy = readStore<Record<string, unknown>>(LEGACY_KEY, {});
  const bloom = Number(legacy?.bloom);
  if (!Number.isFinite(bloom) || bloom <= 0) return current;

  const legacyDate = typeof legacy.lastWatered === "string" ? legacy.lastWatered : "";
  let lastWatered = "";
  if (legacyDate) {
    const parsed = new Date(legacyDate);
    lastWatered = Number.isNaN(parsed.getTime()) ? "" : todayKey(parsed);
  }

  // Old scale was 0–4, the new one is 0–5.
  const stage = Math.min(MAX_STAGE, Math.max(0, Math.round((bloom / 4) * MAX_STAGE)));

  return {
    ...current,
    flower: { stage, lastWatered, daysCaredFor: Math.max(stage, current.flower.daysCaredFor) },
  };
}

export type Place = {
  id: PlaceId;
  name: string;
  /** The tiny teaser on the map. */
  teaser: string;
  /** Where it sits on the map, as percentages. */
  x: number;
  y: number;
  /** What she has to do first, if anything. */
  requirement?: (progress: Progress) => boolean;
  requirementHint?: string;
};

export const places: Place[] = [
  {
    id: "garden",
    name: "The Flower Garden",
    teaser: "something of ours that only grows if you come back",
    x: 24,
    y: 62,
  },
  {
    id: "cottage",
    name: "The Letter Cottage",
    teaser: "the letters I owed you, finally written",
    x: 48,
    y: 38,
  },
  {
    id: "memories",
    name: "Memory Lane",
    teaser: "photographs, tape, and the stories underneath them",
    x: 74,
    y: 58,
  },
  {
    id: "universe",
    name: "Our Little Universe",
    teaser: "a sky where every star is a reason",
    x: 80,
    y: 22,
    requirement: (progress) => progress.lettersOpened.length >= 1,
    requirementHint: "opens once you have read one letter in the cottage",
  },
  {
    id: "tree",
    name: "The Wish Tree",
    teaser: "wishes, promises, and the last letter",
    x: 17,
    y: 24,
    requirement: (progress) =>
      ["garden", "cottage", "memories", "universe"].every((id) =>
        progress.visited.includes(id as PlaceId),
      ),
    requirementHint: "opens once you have been to the other four places",
  },
];

export function isPlaceUnlocked(place: Place, progress: Progress): boolean {
  return place.requirement ? place.requirement(progress) : true;
}

export type MilestoneStep = {
  label: string;
  value: number;
  target: number;
  done: boolean;
};

/** The gentle checklist that leads to the final letter. */
export function finaleSteps(progress: Progress): MilestoneStep[] {
  const step = (label: string, value: number, target: number): MilestoneStep => ({
    label,
    value: Math.min(value, target),
    target,
    done: value >= target,
  });

  return [
    step("places found", progress.visited.length, places.length),
    step("letters opened", progress.lettersOpened.length, 4),
    step("stars lit", progress.starsFound.length, 4),
    step("wishes read", progress.wishesRead.length, 3),
    step("hidden things", progress.collected.length, 3),
  ];
}

export function isFinaleUnlocked(progress: Progress): boolean {
  return finaleSteps(progress).every((step) => step.done);
}

export function finaleRatio(progress: Progress): number {
  const steps = finaleSteps(progress);
  const total = steps.reduce((sum, step) => sum + step.target, 0);
  const done = steps.reduce((sum, step) => sum + step.value, 0);
  return total === 0 ? 0 : done / total;
}
