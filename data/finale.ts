/**
 * ─────────────────────────────────────────────────────────────
 *  THE FINAL SURPRISE
 *
 *  The sealed letter at the end of the Wish Tree. It appears
 *  once she has explored enough of the world (see
 *  lib/progress.ts for the exact milestone), and she can open
 *  it again as many times as she likes afterwards.
 *
 *  This is the one to write yourself. Everything below is a
 *  placeholder in your voice, not mine.
 *
 *  OPTIONAL MEDIA:
 *   - voice: record on your phone → public/audio/final-note.m4a
 *            then set  src: "/audio/final-note.m4a"
 *   - video: drop an mp4 → public/video/final-note.mp4
 *            then set  src: "/video/final-note.mp4"
 *  Leave either `src` as "" and that slot simply does not show.
 *  Nothing ever autoplays.
 * ─────────────────────────────────────────────────────────────
 */

export const finale = {
  /** Shown on the sealed envelope before she opens it. */
  sealLabel: "for the end of the garden",
  envelopeNote: "Only open this one when you have had a proper look around.",

  title: "The last one",
  greeting: "Sisipho,",
  paragraphs: [
    "You got to the end. I did wonder whether you would, or whether you would read two letters and go to bed, which honestly would also have been fine.",
    "I made this because I am better at this than I am at saying things out loud, and because you once asked me for love letters and deserved more than a text message. Every room in here is a different way of saying the same thing.",
    "Here is the plain version, with no garden around it: I love you. I am glad it is you. I would pick you again knowing everything I know now, including the parts that are hard.",
    "Distance is only a fact about where we are standing. It has never once been a fact about how I feel.",
    "Come back whenever you want. It is all still here — the flower will have grown, and I will still mean every word of this.",
  ],
  signoff: "all my love, always,",
  signature: "Sima",

  /** The quiet line on the very last screen. */
  closingLine: "and that is the whole garden.",

  voice: {
    label: "I recorded something for you",
    src: "", // e.g. "/audio/final-note.m4a"
  },
  video: {
    label: "and there is this, too",
    src: "", // e.g. "/video/final-note.mp4"
  },
};
