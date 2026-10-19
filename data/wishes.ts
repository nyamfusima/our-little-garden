/**
 * ─────────────────────────────────────────────────────────────
 *  THE WISH TREE
 *
 *  Little paper wishes tied to the branches. Each one is a hope,
 *  a promise, or something you would like for the two of you.
 *
 *  Keep these honest and small — things you actually mean are
 *  more moving than grand promises. Edit the text freely; the
 *  `kind` only changes the colour of the paper.
 * ─────────────────────────────────────────────────────────────
 */

export type WishKind = "wish" | "promise" | "hope" | "someday";

export type Wish = {
  id: string;
  kind: WishKind;
  /** The short label on the folded paper. */
  label: string;
  text: string;
};

export const wishes: Wish[] = [
  {
    id: "w1",
    kind: "wish",
    label: "a wish",
    text: "That you get a long, boring, uninterrupted stretch of good days. No drama. Nothing to survive. Just easy ones, for a while.",
  },
  {
    id: "w2",
    kind: "promise",
    label: "a promise",
    text: "That I will keep telling you things instead of assuming you already know them. The second one is the easier habit and I am choosing the first.",
  },
  {
    id: "w3",
    kind: "hope",
    label: "a hope",
    text: "That you keep going after the things you are quietly ambitious about. I would like a front row seat for all of it.",
  },
  {
    id: "w4",
    kind: "someday",
    label: "someday",
    text: "An ordinary evening, in the same place, with nothing planned. That is the one I want most and it is not a very impressive wish.",
  },
  {
    id: "w5",
    kind: "promise",
    label: "a promise",
    text: "That when something is hard between us, I will stay in the conversation. I would rather do the uncomfortable version properly than the easy version badly.",
  },
  {
    id: "w6",
    kind: "wish",
    label: "a wish",
    text: "That you see yourself the way I describe you to other people. I am not exaggerating when I do it, you know.",
  },
  {
    id: "w7",
    kind: "hope",
    label: "a hope",
    text: "That we keep being this silly with each other. However long this goes on for, I do not want us to get solemn about it.",
  },
  {
    id: "w8",
    kind: "someday",
    label: "someday",
    text: "I will read these back to you out loud, badly, and you will tell me I am being dramatic. Looking forward to it.",
  },
];
