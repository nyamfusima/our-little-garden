/**
 * ─────────────────────────────────────────────────────────────
 *  MEMORY LANE  (the scrapbook)
 *
 *  How to add a real photo:
 *   1. Drop the image into  public/photos/
 *      (e.g. public/photos/photo-1.jpg)
 *   2. Point `src` at it:   "/photos/photo-1.jpg"
 *   3. Write the `title`, `when`, `caption` (handwritten, under
 *      the polaroid), the optional longer `story`, and `alt`
 *      (a plain description, read out by screen readers).
 *
 *  Until a file exists at `src`, a drawn pressed-flower stand-in
 *  is shown instead — so you can add photos one at a time and
 *  nothing ever looks broken.
 *
 *  `shape` decides how much room it takes in the collage:
 *     "tall" | "wide" | "square"
 *  `tilt` is rotation in degrees (keep it between -4 and 4).
 *  `tape` adds paper tape: "top" | "corners" | "none"
 * ─────────────────────────────────────────────────────────────
 */

export type Memory = {
  id: string;
  src: string;
  alt: string;
  title: string;
  /** Free text — "a sunday in spring", "last winter", anything. */
  when?: string;
  /** The handwritten line under the photo. Keep it short. */
  caption: string;
  /** Optional longer memory, shown when she opens the photo. */
  story?: string;
  shape?: "tall" | "wide" | "square";
  /** Where the collage crop should favour, e.g. "center 30%" for a face near the top. */
  focus?: string;
  tilt?: number;
  tape?: "top" | "corners" | "none";
};

export const memories: Memory[] = [
  {
    id: "m1",
    src: "/photos/photo-1.jpg",
    alt: "The two of us close together, her eyes closed, resting against each other.",
    title: "The first one I want here",
    caption: "this one, first",
    story:
      "You, me, and no reason at all to move. If I could only keep one photograph out of all of them, it would be this one.",
    shape: "tall",
    tilt: -2,
    tape: "top",
  },
  {
    id: "m2",
    src: "/photos/photo-2.jpg",
    alt: "A close-up photo of Sisipho, looking towards the camera.",
    title: "This face, specifically",
    caption: "that look of yours",
    story:
      "A photo of you that makes me smile before I have even finished looking at it. Write what it is about this one.",
    shape: "tall",
    focus: "center 34%",
    tilt: 2,
    tape: "corners",
  },
  {
    id: "m3",
    src: "/photos/photo-3.jpg",
    alt: "Sunset over the sea, with her looking back at the camera from a red picnic table.",
    title: "Us being completely normal",
    caption: "nothing special, except everything",
    story:
      "The sun going down over the water, and you turning round to check whether I was looking at it or at you. I was looking at you.",
    shape: "wide",
    focus: "center 50%",
    tilt: -1,
    tape: "none",
  },
  {
    id: "m4",
    src: "/photos/photo-4.jpg",
    alt: "Her holding a bunch of pink roses and a happy birthday balloon.",
    title: "A good day, that one",
    when: "a birthday",
    caption: "a good day",
    story:
      "Roses, a balloon, and that face you pull. A very good day to have been born, and a very good day all round.",
    shape: "square",
    focus: "center 45%",
    tilt: 3,
    tape: "top",
  },
  {
    id: "m5",
    src: "/photos/photo-5.jpg",
    alt: "Her in a green cap, looking back over her shoulder, city windows behind her.",
    title: "Reminds me of you",
    caption: "yours now, apparently",
    story:
      "That cap has quietly changed owners and nobody consulted me about it. I have made my peace. It suits you better anyway.",
    shape: "tall",
    tilt: 1,
    tape: "corners",
  },
  {
    id: "m6",
    src: "/photos/photo-6.jpg",
    alt: "Her laughing with both hands up, in the same green cap.",
    title: "One for the memory book",
    caption: "keeping this one",
    story:
      "Both hands up, whole face going. This is exactly how I describe you to people who have not met you yet.",
    shape: "wide",
    focus: "center 42%",
    tilt: -2,
    tape: "top",
  },
];
