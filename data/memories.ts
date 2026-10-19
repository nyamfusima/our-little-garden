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
    alt: "A photo of us together.",
    title: "The first one I want here",
    when: "add the date",
    caption: "this one, first",
    story:
      "This spot is saved for the photo of us I always come back to. Replace this story with what you remember about it — what we had just been doing, what we said, why that one.",
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
    alt: "A photo of the two of us somewhere together.",
    title: "Us being completely normal",
    caption: "nothing special, except everything",
    story:
      "A silly photo belongs here just as much as a beautiful one. Possibly more. Put the story of an ordinary day here.",
    shape: "wide",
    tilt: -1,
    tape: "none",
  },
  {
    id: "m4",
    src: "/photos/photo-4.jpg",
    alt: "A photo from a day we spent together.",
    title: "A good day, that one",
    when: "add the date",
    caption: "a good day",
    story:
      "One of those days that did not seem like a big deal while it was happening, and then turned out to be one of the ones I think about.",
    shape: "square",
    tilt: 3,
    tape: "top",
  },
  {
    id: "m5",
    src: "/photos/photo-5.jpg",
    alt: "A photo of something that reminds me of you.",
    title: "Reminds me of you",
    caption: "yours now, apparently",
    story:
      "Not everything in here has to have us in it. Some things just belong to you now — a song, a street, a kind of weather.",
    shape: "tall",
    tilt: 1,
    tape: "corners",
  },
  {
    id: "m6",
    src: "/photos/photo-6.jpg",
    alt: "A photo I want to keep.",
    title: "One for the memory book",
    caption: "keeping this one",
    story:
      "A moment I would bottle up and put on a shelf if that were allowed. Tell her which one it is.",
    shape: "wide",
    tilt: -2,
    tape: "top",
  },
];
