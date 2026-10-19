/**
 * ─────────────────────────────────────────────────────────────
 *  THE FLOWER
 *
 *  Six stages, one watering per local calendar day. All of the
 *  copy the flower says to her lives here, so it is easy to
 *  rewrite in your own words.
 * ─────────────────────────────────────────────────────────────
 */

export const MAX_STAGE = 5;

export type GardenStage = {
  /** Shown under the little progress vine. */
  name: string;
  /** What it looks like right now, in a few words. */
  blurb: string;
  /** Said after the watering that reached this stage. */
  afterWatering: string;
  /** A longer, more personal line at the big milestones. */
  milestone?: string;
};

export const stages: GardenStage[] = [
  {
    name: "a seed",
    blurb: "Tucked into the soil, waiting for you.",
    afterWatering: "",
  },
  {
    name: "a tiny sprout",
    blurb: "Something green has broken the surface.",
    afterWatering: "Look — something is happening. Everything good starts about this small.",
    milestone: "You came back. That is the entire mechanic of this thing, and of most things.",
  },
  {
    name: "first leaves",
    blurb: "Two small leaves, turned towards the light.",
    afterWatering: "First proper leaves. It only needed someone to keep showing up for it.",
  },
  {
    name: "standing taller",
    blurb: "Taller than yesterday, and steadier.",
    afterWatering: "Taller than yesterday. Patience looks good on you.",
    milestone: "Three days of a small, unglamorous kindness. This is what I love about you, by the way.",
  },
  {
    name: "almost, nearly, a bud",
    blurb: "There is a bud at the top, still holding itself closed.",
    afterWatering: "There is a bud up there. I think tomorrow is the day.",
  },
  {
    name: "in full bloom",
    blurb: "Open, and rather pleased with itself.",
    afterWatering: "It bloomed. You did that — a little at a time, on days it would have been easier not to.",
    milestone: "Something new appeared in the Letter Cottage because of this. Go and look when you are ready.",
  },
];

/** Said when she waters a flower that has already bloomed. */
export const bloomingAgainMessages = [
  "Already blooming, and still pleased to see you.",
  "It does not need the water now. It just likes the company.",
  "Fully bloomed and thoroughly spoiled. Thank you for keeping it alive.",
  "The garden is getting a bit carried away. That is your fault, and I like it.",
];

/** Extra blossoms that appear around the flower after it blooms. */
export const MAX_EXTRAS = 4;

export function extraBlooms(flower: { stage: number; daysCaredFor: number }): number {
  if (flower.stage < MAX_STAGE) return 0;
  return Math.min(MAX_EXTRAS, Math.max(0, flower.daysCaredFor - MAX_STAGE));
}

/** `YYYY-MM-DD` in her own timezone, so “today” means her today. */
export function todayKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Friendly countdown to the next local midnight. */
export function timeUntilTomorrow(now: Date = new Date()): string {
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const minutes = Math.max(1, Math.round((midnight.getTime() - now.getTime()) / 60000));
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours >= 2) return `in about ${hours} hours`;
  if (hours === 1) return mins > 5 ? `in about an hour and ${mins} minutes` : "in about an hour";
  return `in ${mins} ${mins === 1 ? "minute" : "minutes"}`;
}

/** A warm line for someone coming back on a later day. */
export function welcomeBack(flower: { stage: number; daysCaredFor: number }): string {
  if (flower.daysCaredFor === 0) return "There is a seed in this pot. It has been waiting for you.";
  if (flower.stage >= MAX_STAGE) return "Still blooming. It held on perfectly well while you were gone.";
  return "It is exactly where you left it, waiting for today’s water.";
}
