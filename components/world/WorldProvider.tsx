"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { collectibles } from "@/data/collectibles";
import { MAX_STAGE, todayKey } from "@/lib/garden";
import {
  STORE_KEY,
  emptyProgress,
  migrateLegacyFlower,
  normaliseProgress,
  type PlaceId,
  type Progress,
  type SceneId,
} from "@/lib/progress";
import { readStore, writeStore } from "@/lib/storage";
import { useReducedMotion } from "@/lib/hooks";

export type WaterResult =
  | { status: "grew"; stage: number }
  | { status: "again" }
  | { status: "done-today" };

export type Discovery = { id: string; name: string; note: string; icon: string };

type WorldValue = {
  /** False until localStorage has been read — keeps the first paint identical on server and client. */
  ready: boolean;
  progress: Progress;
  scene: SceneId;
  /** "idle" | "leaving" | "entering" — drives the scene transition. */
  phase: string;
  goTo: (scene: SceneId) => void;
  openGate: () => void;
  openLetter: (id: string) => void;
  seeMemory: (id: string) => void;
  findStar: (id: string) => void;
  readWish: (id: string) => void;
  collect: (id: string) => void;
  waterFlower: () => WaterResult;
  openFinale: () => void;
  discovery: Discovery | null;
  dismissDiscovery: () => void;
  journalOpen: boolean;
  setJournalOpen: (open: boolean) => void;
};

const WorldContext = createContext<WorldValue | null>(null);

const SCENES: SceneId[] = ["gate", "map", "garden", "cottage", "memories", "universe", "tree"];

function sceneFromHash(): SceneId | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace("#", "");
  return SCENES.includes(hash as SceneId) ? (hash as SceneId) : null;
}

export function WorldProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [scene, setScene] = useState<SceneId>("gate");
  const [phase, setPhase] = useState("idle");
  const [discovery, setDiscovery] = useState<Discovery | null>(null);
  const [journalOpen, setJournalOpen] = useState(false);

  const progressRef = useRef(progress);
  const sceneRef = useRef<SceneId>(scene);
  const readyRef = useRef(false);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();

  const addTimer = useCallback((timer: number) => {
    timers.current.push(timer);
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    },
    [],
  );

  /** Every change goes through here: ref first (no stale reads), then state, then storage. */
  const update = useCallback((mutate: (current: Progress) => Progress) => {
    const next = mutate(progressRef.current);
    if (next === progressRef.current) return;
    progressRef.current = next;
    setProgress(next);
    if (readyRef.current) writeStore(STORE_KEY, next);
  }, []);

  // Hydrate once, on the client only.
  useEffect(() => {
    const stored = migrateLegacyFlower(normaliseProgress(readStore<unknown>(STORE_KEY, null)));
    progressRef.current = stored;
    setProgress(stored);
    readyRef.current = true;
    setReady(true);
    writeStore(STORE_KEY, stored);

    const fromHash = sceneFromHash();
    const start: SceneId = stored.gateOpened ? (fromHash && fromHash !== "gate" ? fromHash : "map") : "gate";
    sceneRef.current = start;
    setScene(start);

    // arriving straight at a place (a refresh, or a bookmarked hash) counts as a visit
    if (start !== "gate" && start !== "map" && !stored.visited.includes(start as PlaceId)) {
      const visited = { ...stored, visited: [...stored.visited, start as PlaceId] };
      progressRef.current = visited;
      setProgress(visited);
      writeStore(STORE_KEY, visited);
    }
  }, []);

  // Browser back/forward moves between scenes.
  useEffect(() => {
    const onPopState = () => {
      const next: SceneId =
        sceneFromHash() ?? (progressRef.current.gateOpened ? "map" : "gate");
      if (next !== "gate" && !progressRef.current.gateOpened) {
        update((current) => ({ ...current, gateOpened: true }));
      }
      sceneRef.current = next;
      setScene(next);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [update]);

  const goTo = useCallback(
    (next: SceneId) => {
      if (sceneRef.current === next) return;
      window.history.pushState(null, "", `#${next}`);

      const swap = () => {
        sceneRef.current = next;
        setScene(next);
        setPhase("entering");
        addTimer(window.setTimeout(() => setPhase("idle"), 420));
        if (next !== "gate" && next !== "map") {
          update((current) =>
            current.visited.includes(next as PlaceId)
              ? current
              : { ...current, visited: [...current.visited, next as PlaceId] },
          );
        }
        window.scrollTo({ top: 0, behavior: "auto" });
      };

      if (reduced) {
        swap();
        return;
      }

      setPhase("leaving");
      addTimer(window.setTimeout(swap, 340));
    },
    [addTimer, reduced, update],
  );

  const openGate = useCallback(() => {
    update((current) => (current.gateOpened ? current : { ...current, gateOpened: true }));
    goTo("map");
  }, [goTo, update]);

  const addToList = useCallback(
    (key: "lettersOpened" | "memoriesSeen" | "starsFound" | "wishesRead", id: string) => {
      update((current) =>
        current[key].includes(id) ? current : { ...current, [key]: [...current[key], id] },
      );
    },
    [update],
  );

  const openLetter = useCallback((id: string) => addToList("lettersOpened", id), [addToList]);
  const seeMemory = useCallback((id: string) => addToList("memoriesSeen", id), [addToList]);
  const findStar = useCallback((id: string) => addToList("starsFound", id), [addToList]);
  const readWish = useCallback((id: string) => addToList("wishesRead", id), [addToList]);

  const dismissDiscovery = useCallback(() => setDiscovery(null), []);

  const collect = useCallback(
    (id: string) => {
      if (progressRef.current.collected.includes(id)) return;
      const item = collectibles.find((entry) => entry.id === id);
      update((current) => ({ ...current, collected: [...current.collected, id] }));
      if (!item) return;
      setDiscovery({ id: item.id, name: item.name, note: item.note, icon: item.icon });
      addTimer(window.setTimeout(() => setDiscovery((shown) => (shown?.id === id ? null : shown)), 7000));
    },
    [addTimer, update],
  );

  const waterFlower = useCallback((): WaterResult => {
    const today = todayKey();
    const flower = progressRef.current.flower;
    if (flower.lastWatered === today) return { status: "done-today" };

    const stage = Math.min(MAX_STAGE, flower.stage + 1);
    const grew = stage > flower.stage;

    update((current) => ({
      ...current,
      flower: {
        stage,
        lastWatered: today,
        daysCaredFor: current.flower.daysCaredFor + 1,
      },
    }));

    return grew ? { status: "grew", stage } : { status: "again" };
  }, [update]);

  const openFinale = useCallback(() => {
    update((current) => (current.finaleOpened ? current : { ...current, finaleOpened: true }));
  }, [update]);

  const value = useMemo<WorldValue>(
    () => ({
      ready,
      progress,
      scene,
      phase,
      goTo,
      openGate,
      openLetter,
      seeMemory,
      findStar,
      readWish,
      collect,
      waterFlower,
      openFinale,
      discovery,
      dismissDiscovery,
      journalOpen,
      setJournalOpen,
    }),
    [
      collect,
      discovery,
      dismissDiscovery,
      findStar,
      goTo,
      journalOpen,
      openFinale,
      openGate,
      openLetter,
      phase,
      progress,
      readWish,
      ready,
      scene,
      seeMemory,
      waterFlower,
    ],
  );

  return <WorldContext.Provider value={value}>{children}</WorldContext.Provider>;
}

export function useWorld(): WorldValue {
  const value = useContext(WorldContext);
  if (!value) throw new Error("useWorld must be used inside <WorldProvider>");
  return value;
}
