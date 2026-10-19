/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT ME FIRST — everything personal lives in these fields.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  /** Her name. Used on the gate, the final letter and a few quiet places. */
  herName: "Sisipho",
  /** Your name. Signs the letters and the footer. */
  myName: "Sima",

  title: "Little Garden of Us",
  subtitle: "A little world that belongs to us.",

  /** The short, tender introduction on the opening gate scene. */
  gateIntro:
    "You asked me once to write you love letters. I built you somewhere to keep them instead — a small world with a garden, a cottage, a sky full of us, and a few things hidden for you to find.",

  /** The invitation she taps to come inside. */
  gateInvitation: "Come into our little world",

  /**
   * ── THE GATE IS LOCKED ────────────────────────────────────
   * Six numbers before the gate shows her anything. `code` is
   * her birthday written ddmmyy — digits only, any length you
   * like. Change it here and every browser that remembered the
   * old one quietly asks again.
   *
   * Be honest with yourself about what this is: the code travels
   * to the browser along with the page, so it is a closed gate,
   * not a safe. It keeps the world private from anyone who
   * wanders past the link; it would not stop someone who really
   * went looking. See lib/lock.ts.
   */
  lock: {
    code: "020610",
    /** The small line above the title while it is locked. */
    kicker: "the gate is locked",
    /** Under the title, in her handwriting. */
    line: "Only one person has the key to this one.",
    /** Above the little boxes. */
    label: "the day the world got you",
    /** Under them, before anything has gone wrong. */
    hint: "six numbers — the day, then the month, then the year",
    /** When the code is wrong. */
    wrong: "That isn't it. Try once more?",
    /** When it has been wrong a few times, with more help in it. */
    wrongAgain: "Still not it. It is your birthday, as six numbers: day, month, year.",
    /** The button under the boxes. */
    button: "Unlock the gate",
    /** The moment it opens. */
    welcome: "It's you. Come in. ♡",
  },

  /**
   * The photo on the gate. Drop a file at public/photos/us-hero.jpg
   * and it appears by itself. Until then a drawn stand-in shows.
   */
  heroPhoto: {
    src: "/photos/us-hero.jpg",
    alt: "Two photos of us side by side: Sima in a cafe, and Sisipho by a window in the evening.",
    caption: "my favourite kind of happy",
  },

  /**
   * Optional ambient music for the whole world. Add a file to
   * public/audio/ and point `src` at it. Nothing ever autoplays.
   * Leave src as "" to hide the music button entirely.
   */
  music: {
    title: "our song",
    src: "", // e.g. "/audio/our-song.mp3"
  },

  /**
   * Optional voice note for the “I wish you were here” scene.
   * Record something on your phone, drop it in public/audio/,
   * and point `src` at it. Leave "" to hide the player.
   */
  voiceNote: {
    label: "a voice note, in case you need to hear me",
    src: "", // e.g. "/audio/voice-note.m4a"
  },

  /** What the “I wish you were here” scene says. */
  wishYouWereHere: {
    heading: "I wish you were here",
    lines: [
      "Right now, wherever you are, there is a version of this evening where you are next to me instead of on a screen.",
      "I think about that one a lot. Until then: this is me, closing the distance the only way I can tonight.",
      "You are not far from my mind for very long. Not once.",
    ],
    closing: "I will see you soon. I mean it.",
  },

  footerNote: "made by Sima, for Sisipho",
} as const;
