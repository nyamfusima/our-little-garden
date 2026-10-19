"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** True when the visitor has asked for less movement. Updates live. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Adds `data-revealed` once the element scrolls into view, so the
 * reveal animation lives in CSS. Content is visible either way —
 * the animation only ever adds movement, never visibility.
 */
export function useInView<T extends HTMLElement>(options?: { once?: boolean; margin?: string }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const once = options?.once ?? true;
  const margin = options?.margin ?? "0px 0px -12% 0px";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin: margin, threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, margin]);

  return { ref, inView };
}

/** Locks page scrolling while a dialog is open, without the layout jumping. */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [active]);
}

export type Particle = {
  id: number;
  glyph: string;
  x: number;
  drift: number;
  rotate: number;
  scale: number;
  delay: number;
};

const PARTICLE_GLYPHS: Record<string, string[]> = {
  hearts: ["♡", "♥", "♡"],
  petals: ["❀", "✿", "❁", "♡"],
  sparkles: ["✦", "✧", "·", "✦"],
};

/**
 * A short, contained burst of little glyphs for special moments.
 * Timers are cleared on unmount, and nothing fires when the
 * visitor prefers reduced motion.
 */
export function useBurst(kind: keyof typeof PARTICLE_GLYPHS = "hearts") {
  const [particles, setParticles] = useState<Particle[]>([]);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();
  const seed = useRef(0);

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    },
    [],
  );

  const fire = useCallback(
    (count = 10) => {
      if (reduced) return;
      const glyphs = PARTICLE_GLYPHS[kind];
      const batch: Particle[] = Array.from({ length: count }, (_, index) => {
        seed.current += 1;
        return {
          id: seed.current,
          glyph: glyphs[index % glyphs.length],
          x: 10 + Math.random() * 80,
          drift: -40 + Math.random() * 80,
          rotate: -140 + Math.random() * 280,
          scale: 0.65 + Math.random() * 0.7,
          delay: Math.random() * 0.26,
        };
      });

      setParticles((current) => [...current, ...batch]);
      const ids = new Set(batch.map((particle) => particle.id));
      const timer = window.setTimeout(() => {
        setParticles((current) => current.filter((particle) => !ids.has(particle.id)));
      }, 2000);
      timers.current.push(timer);
    },
    [kind, reduced],
  );

  return { particles, fire };
}
