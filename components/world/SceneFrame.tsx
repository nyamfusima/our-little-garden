"use client";

import type { ReactNode } from "react";
import { Sprig } from "../art/Decor";
import Reveal from "../ui/Reveal";
import { useWorld } from "./WorldProvider";

/** Shared chrome for the five destinations. */
export default function SceneFrame({
  title,
  intro,
  tone = "day",
  children,
  footer,
}: {
  title: string;
  intro: string;
  tone?: "day" | "dusk" | "night" | "paper";
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { goTo } = useWorld();

  return (
    <section className={`scene scene-${tone}`}>
      <Reveal className="scene-head" variant="fade">
        <h1 className="scene-title">{title}</h1>
        <Sprig className="scene-sprig" />
        <p className="scene-intro">{intro}</p>
      </Reveal>

      {children}

      <Reveal className="scene-foot" variant="fade">
        {footer}
        <button type="button" className="button button-quiet" onClick={() => goTo("map")}>
          back to the map
        </button>
      </Reveal>
    </section>
  );
}
