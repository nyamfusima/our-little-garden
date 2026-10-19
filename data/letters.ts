/**
 * ─────────────────────────────────────────────────────────────
 *  THE LETTERS  (The Letter Cottage)
 *
 *  This is the heart of the whole site. The text below is a
 *  starter — written to sound like a person rather than a card —
 *  but it should end up in your own words.
 *
 *  To edit one: change `greeting`, the strings in `paragraphs`
 *  (each is its own paragraph), `signoff`, `signature`, `ps`.
 *
 *  To add one: copy a block, give it a new `id`, pick any
 *  `theme` and `motif` from the types below. The order here is
 *  the order they appear on the cottage shelf.
 *
 *  `unlock: "bloom"` means the letter only appears once the
 *  flower in the Flower Garden has fully bloomed.
 *
 *  Use curly apostrophes (’) — they typeset better here.
 * ─────────────────────────────────────────────────────────────
 */

export type LetterTheme = "rose" | "sage" | "honey" | "lavender" | "blush" | "clay" | "twilight";
export type StampMotif = "heart" | "leaf" | "sun" | "moon" | "flower" | "bird";

export type Letter = {
  id: string;
  /** On the envelope and at the top of the letter. */
  title: string;
  /** The teaser line on the envelope. */
  prompt: string;
  /** Tiny label printed on the stamp. */
  stamp: string;
  motif: StampMotif;
  theme: LetterTheme;
  greeting: string;
  paragraphs: string[];
  signoff: string;
  signature: string;
  ps?: string;
  unlock?: "bloom";
};

export const letters: Letter[] = [
  {
    id: "miss-me",
    title: "Open when you miss me",
    prompt: "For the evenings that feel a little too long",
    stamp: "no. 01",
    motif: "heart",
    theme: "rose",
    greeting: "Hey you,",
    paragraphs: [
      "If you’re reading this, today probably feels a bit too quiet, and I’m not where you want me to be. So come here for a second. Imagine the hug — the proper one, the kind where I don’t let go first.",
      "I miss you too. Not in a dramatic way, just constantly, somewhere in the background of everything. I save things to tell you. I notice things you’d like. There’s a running commentary in my head and most of it is addressed to you.",
      "Missing someone isn’t a sign that something is wrong. It just means there’s someone worth missing, and you happen to be mine.",
      "Put this down, drink some water, and know that I’m thinking about you at the same time you’re thinking about me. We’re not as far apart as it feels.",
    ],
    signoff: "always yours,",
    signature: "Sima",
  },
  {
    id: "need-a-hug",
    title: "Open when you need a hug",
    prompt: "A placeholder until I can do it properly",
    stamp: "no. 02",
    motif: "heart",
    theme: "blush",
    greeting: "Come here,",
    paragraphs: [
      "Both arms. One hand behind your head, the other across your back. Your face somewhere in my shoulder. We stay there until your breathing slows down, and neither of us says anything useful.",
      "That’s what this letter is. I know it isn’t the same thing. But I wanted you to have something to hold on to in the meantime.",
      "Whatever made you come looking for a hug — it’s allowed to have gotten to you. You don’t have to be tough about it with me.",
      "I’ve got you. Stay as long as you want.",
    ],
    signoff: "still holding on,",
    signature: "Sima",
  },
  {
    id: "hard-day",
    title: "Open when you’re having a difficult day",
    prompt: "For when it has all been a bit much",
    stamp: "no. 03",
    motif: "leaf",
    theme: "sage",
    greeting: "My girl,",
    paragraphs: [
      "You don’t have to be okay right now. You don’t have to explain it, or fix it, or be graceful about it. You’re allowed to just have a hard day.",
      "Do this with me: shoulders down. Breathe out slowly, longer than you breathed in. Drink some water — actually do it, I’ll wait.",
      "Whatever today took out of you, it didn’t take you. You can do the absolute bare minimum today and I will still be proud of you. A hard day is not a verdict on who you are.",
      "If you want to talk, I’m here. If you want to be quiet, I’ll be quiet with you. If you want distracting, you know I’m good at that.",
      "Tomorrow is allowed to be a completely different day. Let it be.",
    ],
    signoff: "with you in it,",
    signature: "Sima",
    ps: "Eat something warm. That’s the whole advice.",
  },
  {
    id: "cant-sleep",
    title: "Open when you can’t sleep",
    prompt: "For 2am, when your brain won’t be quiet",
    stamp: "no. 04",
    motif: "moon",
    theme: "twilight",
    greeting: "Can’t sleep?",
    paragraphs: [
      "Okay. Nothing has to be solved tonight. Whatever your head is turning over at this hour will be smaller in the morning — it always is, and tonight is not the night to argue with it.",
      "So let’s do something easier. Put your phone face down in a minute. Unclench your jaw. Let your shoulders drop into the bed. Breathe out for longer than you breathe in, four or five times.",
      "Then think about something small and good instead. The sound of rain when you’re already inside. A hot shower when you’re cold. Me, somewhere out there, asleep and almost certainly dreaming about something ridiculous.",
      "If it helps, imagine I’m there with a hand on your back, telling you that it can wait until morning. Because it can.",
      "Goodnight, love. I’ll be here when you wake up.",
    ],
    signoff: "sleep, please,",
    signature: "Sima",
  },
  {
    id: "reassurance",
    title: "Open when you need a reminder of how loved you are",
    prompt: "Read it as many times as you need to",
    stamp: "no. 05",
    motif: "flower",
    theme: "lavender",
    greeting: "Listen,",
    paragraphs: [
      "I’m not going anywhere. That’s really the whole letter, but let me say it properly.",
      "You are not too much. You’re not difficult to love. Needing to hear something more than once doesn’t make it any less true, and it doesn’t make you tiring.",
      "I’m not keeping score. I didn’t choose you in some rush of feeling that I’ll come down from — I chose you clear-headed, and I’d choose you again today, and I’ll probably choose you again tomorrow before I’ve even had coffee.",
      "If you ever feel unsure, you’re allowed to come and ask me. I would much rather tell you a hundred times than have you sit with the question once.",
      "You’re safe with me. Keep this one where you can find it.",
    ],
    signoff: "not going anywhere,",
    signature: "Sima",
  },
  {
    id: "want-to-smile",
    title: "Open when you want to smile",
    prompt: "No emotional heavy lifting in this one, promise",
    stamp: "no. 06",
    motif: "sun",
    theme: "honey",
    greeting: "Right. Nothing serious in here.",
    paragraphs: [
      "Things I think about that make me laugh, for no reason other than that they involve you:",
      "The face you make when you’re pretending not to find something funny. It has never worked once.",
      "How confidently you say things that you are only about forty percent sure about.",
      "That I will take your side in an argument before I have heard a single detail of it. Loyalty over accuracy.",
      "And the fact that somebody out there is having a perfectly ordinary day while I sit here building an entire website about you, like a Victorian man writing letters by candlelight.",
      "Anyway. Smile achieved, hopefully. Go on with your day.",
    ],
    signoff: "being ridiculous about you,",
    signature: "Sima",
  },
  {
    id: "things-i-love",
    title: "Things I love about you",
    prompt: "A list that was never going to fit on one page",
    stamp: "no. 07",
    motif: "flower",
    theme: "rose",
    greeting: "In no particular order:",
    paragraphs: [
      "The way your face gives you away a full second before you say anything.",
      "How you notice small things that everyone else walks straight past.",
      "That you care out loud, even when it would be easier not to.",
      "Your laugh when something catches you off guard — not the polite one, the real one.",
      "How you let me be unimpressive around you. Tired, quiet, ridiculous, and nothing changes.",
      "The things you aren’t trying to be good at. Those might be my favourite.",
      "And the parts of you that you’d call unremarkable. Those most of all.",
      "This list is unfinished on purpose. I keep finding new entries.",
    ],
    signoff: "still adding to it,",
    signature: "Sima",
  },
  {
    id: "our-future",
    title: "Open when you think about our future",
    prompt: "To be read slowly, and maybe again later",
    stamp: "no. 08",
    motif: "bird",
    theme: "clay",
    greeting: "To us, later —",
    paragraphs: [
      "I’m not going to pretend I know exactly how everything goes from here. But I know the shape of what I want, and you’re in all of it.",
      "Mornings that start slowly. Terrible jokes that we keep telling anyway. A place that smells like something cooking. Plans we make badly and somehow pull off. Being someone you can be unglamorous and honest with for a very long time.",
      "I want to keep choosing this on purpose — on the ordinary days, not only the good ones. That’s the part I’m actually promising.",
      "Whatever it ends up looking like, I would like to find out with you.",
    ],
    signoff: "saving you a seat,",
    signature: "Sima",
    ps: "Keep this one. We’ll see how we did.",
  },
  {
    id: "havent-said-enough",
    title: "One more thing I haven’t told you enough",
    prompt: "The one I should have written first",
    stamp: "no. 09",
    motif: "heart",
    theme: "rose",
    greeting: "One more thing —",
    paragraphs: [
      "I don’t say this enough: you make my life easier to live. Not in a grand, cinematic way. In a small, daily, practical way. Things are lighter because you’re in them.",
      "You asked me once to write you love letters. I kept putting it off because I wanted them to be good enough to deserve you. That’s the honest reason. So here they are — imperfect, and actually written, which I think counts for more.",
      "Thank you for being patient with me. And for all the ways you’re kind to me that you probably don’t even register as kindness.",
      "I’m glad it’s you, Sisipho. I’ll keep telling you, and you can keep pretending you didn’t already know.",
    ],
    signoff: "all my love,",
    signature: "Sima",
  },
  {
    id: "the-bloom",
    title: "For the day our flower bloomed",
    prompt: "Hidden until the flower blooms — and you got it there",
    stamp: "in bloom",
    motif: "flower",
    theme: "sage",
    greeting: "You kept it alive.",
    paragraphs: [
      "You came back day after day for something that gave you almost nothing in return except a little more green each time. That is a very you thing to do.",
      "I made that flower slow on purpose. I wanted one thing in here that couldn’t be rushed — something that only happened because you kept showing up for it.",
      "That’s the whole metaphor and I’m not going to be subtle about it: this is what we’re doing too. Small amounts of care, repeated, until one day the thing is unmistakably alive.",
      "Thank you for watering it. Thank you for watering us.",
    ],
    signoff: "proudly yours,",
    signature: "Sima",
    unlock: "bloom",
  },
];
