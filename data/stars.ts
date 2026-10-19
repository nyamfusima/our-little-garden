/**
 * ─────────────────────────────────────────────────────────────
 *  OUR LITTLE UNIVERSE  (the night sky)
 *
 *  Each star holds one small thing — a reason, a memory, a note.
 *  Tapping it reveals the text. Find them all and they join up
 *  into a heart.
 *
 *  Edit `title` and `text` freely. `x` and `y` are percentages
 *  across the sky (0–100) and are already arranged in the shape
 *  of a heart, so change them only if you want a new shape.
 *  Keep at least 8 stars or the constellation looks sparse.
 * ─────────────────────────────────────────────────────────────
 */

export type Star = {
  id: string;
  /** Percentage position in the sky. */
  x: number;
  y: number;
  /** Relative brightness, 1–3. Purely visual. */
  size?: 1 | 2 | 3;
  title: string;
  text: string;
};

export const stars: Star[] = [
  {
    id: "s1",
    x: 50,
    y: 29,
    size: 2,
    title: "Where it starts",
    text: "Every one of these stars is a different answer to the same question: why you. This one is just the question.",
  },
  {
    id: "s2",
    x: 38.5,
    y: 21,
    size: 1,
    title: "Your voice",
    text: "The way the whole day resets the moment I hear it. Nothing has to have gone well. It just lands differently afterwards.",
  },
  {
    id: "s3",
    x: 28,
    y: 23,
    size: 2,
    title: "How you listen",
    text: "You listen like the thing I am saying matters, even when it obviously does not. That is a rare way to treat a person.",
  },
  {
    id: "s4",
    x: 21,
    y: 32,
    size: 1,
    title: "Your stubbornness",
    text: "Yes, this one is on the list. You dig in about the things you care about, and I would rather have that than easy agreement.",
  },
  {
    id: "s5",
    x: 23,
    y: 44,
    size: 2,
    title: "The ordinary hours",
    text: "Not the big occasions. The long, uneventful stretches where nothing is happening and I still want you there.",
  },
  {
    id: "s6",
    x: 33,
    y: 56,
    size: 1,
    title: "Your kindness",
    text: "You are kind in small ways you never mention, to people who cannot do anything for you. I notice every time.",
  },
  {
    id: "s7",
    x: 50,
    y: 71,
    size: 3,
    title: "You, specifically",
    text: "Not the idea of someone. You — the exact, particular, occasionally impossible person you are. That is what I chose.",
  },
  {
    id: "s8",
    x: 67,
    y: 56,
    size: 1,
    title: "How you are with me",
    text: "You let me be unimpressive. Tired, quiet, in a mood, not funny. Nothing changes. Do you know how much that is worth?",
  },
  {
    id: "s9",
    x: 77,
    y: 44,
    size: 2,
    title: "Your laugh",
    text: "The real one. The one that catches you by surprise and that you cannot do on purpose. I collect those.",
  },
  {
    id: "s10",
    x: 79,
    y: 32,
    size: 1,
    title: "The future, vaguely",
    text: "I do not have it planned out. But every version of it I actually want has you somewhere in the room.",
  },
  {
    id: "s11",
    x: 72,
    y: 23,
    size: 2,
    title: "When we are apart",
    text: "Distance has not made you any less present. I have tested this thoroughly and the result keeps coming back the same.",
  },
  {
    id: "s12",
    x: 62,
    y: 21,
    size: 1,
    title: "One more",
    text: "I ran out of stars long before I ran out of reasons. Assume the rest of the sky.",
  },
];

/** Shown once every star has been found and the heart closes up. */
export const constellationComplete = {
  title: "There it is",
  text: "Twelve stars and they were always going to make this shape. I checked the maths. It only works out as a heart.",
};
