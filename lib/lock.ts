/**
 * ─────────────────────────────────────────────────────────────
 *  THE LOCK ON THE GATE
 *
 *  Six numbers before the world will show itself. Once she has
 *  typed them, her browser remembers, and she is only ever asked
 *  again if the code in data/site.ts changes.
 *
 *  What this is, honestly: the code ships to the browser along
 *  with the page, so it is a closed gate, not a safe. It keeps
 *  the world private from anyone who wanders past the link — a
 *  friend borrowing her phone, someone glancing over a shoulder,
 *  a link forwarded on. It would not hold against someone who
 *  really went looking. Nothing here needs it to.
 * ─────────────────────────────────────────────────────────────
 */

import { site } from "@/data/site";
import { readStore, writeStore } from "./storage";

const LOCK_KEY = "garden.key.v1";

/** How many boxes the gate draws — it follows the code you set. */
export const CODE_LENGTH = digitsOnly(site.lock.code).length;

/** Set `code` to "" in data/site.ts and the gate simply isn't locked. */
const LOCKED = CODE_LENGTH > 0;

/** Keeps only the numbers, so "02/06/10" and "02 06 10" both work. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "").slice(0, 12);
}

export function isCode(entered: string): boolean {
  return digitsOnly(entered) === digitsOnly(site.lock.code);
}

/**
 * A small fingerprint of the code — never the code itself — so a
 * browser holding an old key is asked for the new one instead of
 * being let in on something you have since changed.
 */
function fingerprint(value: string): string {
  let hash = 5381;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash + value.charCodeAt(index)) >>> 0;
  }
  return `k${hash.toString(36)}`;
}

/** Call from inside an effect only — it reads localStorage. */
export function isUnlocked(): boolean {
  if (!LOCKED) return true;
  return readStore<string>(LOCK_KEY, "") === fingerprint(digitsOnly(site.lock.code));
}

export function rememberUnlocked(): void {
  if (!LOCKED) return;
  writeStore(LOCK_KEY, fingerprint(digitsOnly(site.lock.code)));
}
