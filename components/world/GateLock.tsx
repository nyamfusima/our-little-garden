"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { site } from "@/data/site";
import { useBurst, useReducedMotion } from "@/lib/hooks";
import { CODE_LENGTH, digitsOnly, isCode, rememberUnlocked } from "@/lib/lock";

type Status = "idle" | "wrong" | "open";

const SLOTS = Array.from({ length: CODE_LENGTH }, (_, index) => index);

/**
 * Six numbers at the gate. Nothing of hers is on the page until
 * they are right — the world is not hidden behind this, it is
 * simply not rendered yet. How much that is worth: lib/lock.ts.
 */
export default function GateLock({ onOpen, onUnlock }: { onOpen: () => void; onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [misses, setMisses] = useState(0);
  const input = useRef<HTMLInputElement | null>(null);
  const opened = useRef(false);
  /** The small pause between her last number and the gate's answer. */
  const answer = useRef<number | null>(null);
  const timers = useRef<number[]>([]);
  const reduced = useReducedMotion();
  const { particles, fire } = useBurst("sparkles");

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current = [];
    },
    [],
  );

  const waitFor = useCallback((timer: number) => {
    timers.current.push(timer);
  }, []);

  const clearAnswer = useCallback(() => {
    if (answer.current !== null) window.clearTimeout(answer.current);
    answer.current = null;
  }, []);

  const tryCode = useCallback(
    (entered: string) => {
      if (opened.current) return;

      if (!isCode(entered)) {
        setStatus("wrong");
        setMisses((count) => count + 1);
        // let the shake land, then empty the boxes so she can start clean
        waitFor(window.setTimeout(() => setValue(""), reduced ? 0 : 480));
        input.current?.focus();
        return;
      }

      opened.current = true;
      setStatus("open");
      rememberUnlocked();
      fire(16);
      onOpen();
      waitFor(window.setTimeout(onUnlock, reduced ? 220 : 1250));
    },
    [fire, onOpen, onUnlock, reduced, waitFor],
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (opened.current) return;
      const next = digitsOnly(event.target.value).slice(0, CODE_LENGTH);
      clearAnswer();
      setValue(next);
      setStatus((current) => (current === "wrong" ? "idle" : current));
      if (next.length === CODE_LENGTH) {
        answer.current = window.setTimeout(() => {
          answer.current = null;
          tryCode(next);
        }, 220);
        waitFor(answer.current);
      }
    },
    [clearAnswer, tryCode, waitFor],
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      clearAnswer();
      if (value.length === CODE_LENGTH) tryCode(value);
    },
    [clearAnswer, tryCode, value],
  );

  const message =
    status === "open"
      ? site.lock.welcome
      : status === "wrong"
        ? misses >= 2
          ? site.lock.wrongAgain
          : site.lock.wrong
        : "";

  return (
    <form className="lock" onSubmit={onSubmit} data-status={status} noValidate>
      <label className="lock-label" htmlFor="garden-code">
        {site.lock.label}
      </label>

      <div className="lock-field">
        <input
          ref={input}
          id="garden-code"
          className="lock-input"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={onChange}
          disabled={status === "open"}
          aria-describedby="garden-code-hint"
          aria-invalid={status === "wrong" ? true : undefined}
        />
        <div className="lock-slots" aria-hidden="true">
          {SLOTS.map((slot) => (
            <span
              key={slot}
              className="lock-slot"
              data-filled={value[slot] ? "true" : "false"}
              data-next={slot === value.length ? "true" : "false"}
            >
              {value[slot] ?? ""}
            </span>
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
      </div>

      <p className="lock-hint" id="garden-code-hint">
        {site.lock.hint}
      </p>

      <p className="lock-message" data-tone={status} role="status">
        {message}
      </p>

      <button
        type="submit"
        className="button button-primary gate-enter lock-button"
        disabled={value.length < CODE_LENGTH || status === "open"}
      >
        {site.lock.button}
      </button>
    </form>
  );
}
