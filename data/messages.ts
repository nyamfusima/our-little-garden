/**
 * ─────────────────────────────────────────────────────────────
 *  SWEET MESSAGES
 *
 *  Shown one at a time when she taps the button, on a little
 *  paper note. The `tone` decides which paper it lands on:
 *
 *    "sweet"      → cream notepaper
 *    "reassuring" → sage index card
 *    "playful"    → honey sticky note
 *    "secret"     → torn paper, slightly conspiratorial
 *
 *  Add as many as you like. Longer than ~160 characters starts
 *  to look less like a note and more like a paragraph.
 * ─────────────────────────────────────────────────────────────
 */

export type MessageTone = "sweet" | "reassuring" | "playful" | "secret";

export type SweetMessage = {
  text: string;
  tone: MessageTone;
};

export const sweetMessages: SweetMessage[] = [
  { tone: "sweet", text: "You crossed my mind, so I thought you should know." },
  { tone: "sweet", text: "If hugs travelled through screens, you’d be in one right now." },
  { tone: "sweet", text: "You make my world feel a little softer. You always have." },
  { tone: "sweet", text: "I’d choose you in the ordinary moments too. Especially those." },
  { tone: "sweet", text: "Somewhere, someone is smiling because they get to love you. It’s me. I’m someone." },
  { tone: "sweet", text: "You’re the part of the day I look forward to." },
  { tone: "sweet", text: "I like who I am around you. That’s a bigger compliment than it sounds." },
  { tone: "sweet", text: "Thinking about your laugh. Carry on." },
  { tone: "sweet", text: "I hope something makes you smile today. If not, consider this your something." },
  { tone: "sweet", text: "You don’t have to do anything to be worth all of this." },

  { tone: "reassuring", text: "In case nobody has told you today: you’re doing better than you think." },
  { tone: "reassuring", text: "Drink some water, unclench your shoulders, remember you’re adored." },
  { tone: "reassuring", text: "You’re allowed to rest before you’ve earned it." },
  { tone: "reassuring", text: "Whatever you’re worrying about, you don’t have to carry it alone." },
  { tone: "reassuring", text: "Still here. Still choosing you. Nothing has changed." },
  { tone: "reassuring", text: "You’re not behind. You’re just going at the pace of a real person." },
  { tone: "reassuring", text: "It’s okay if today was only survived and not won." },
  { tone: "reassuring", text: "You’re not too much. You never have been." },
  { tone: "reassuring", text: "Nothing you could tell me would make me want you less." },
  { tone: "reassuring", text: "Breathe out slowly. Longer than you breathed in. There you go." },

  { tone: "playful", text: "Official notice: you are very loved. No appeals accepted." },
  { tone: "playful", text: "Reminder that you’re my favourite person, and the competition isn’t close." },
  { tone: "playful", text: "Warning: thinking about you causes smiling. Known side effect." },
  { tone: "playful", text: "You’ve been randomly selected to receive this affection. There’s no opting out." },
  { tone: "playful", text: "If you’re reading this instead of doing something productive — good. Same." },
  { tone: "playful", text: "I’m legally obligated to tell you that you look good today. (I wrote the law.)" },
  { tone: "playful", text: "Current status: missing you, mildly dramatic about it." },
  { tone: "playful", text: "This note self-destructs in… no, actually, keep it." },
  { tone: "playful", text: "You, me, snacks, nothing to do. That’s the dream. That’s the whole dream." },
  { tone: "playful", text: "Tap again if you want more. I have an unreasonable amount of these." },

  { tone: "secret", text: "I wrote more of these than I’m willing to admit to." },
  { tone: "secret", text: "I reread our messages sometimes. That’s all. That’s the secret." },
  { tone: "secret", text: "I was nervous about showing you this whole thing. Worth it." },
  { tone: "secret", text: "There’s a version of this note that was much soppier. I spared you." },
  { tone: "secret", text: "I kept the first thing you ever said to me. Filed away. Safe." },
  { tone: "secret", text: "You’re the reason I learned how to make this website, by the way." },
];
