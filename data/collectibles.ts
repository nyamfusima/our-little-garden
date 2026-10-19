/**
 * ─────────────────────────────────────────────────────────────
 *  HIDDEN THINGS
 *
 *  Seven little objects tucked around the world. Some are easy
 *  to spot, some take a bit of poking at the scenery. Each one
 *  found is remembered on her device and lands in the journal.
 *
 *  `where` is only used for the gentle hint in the journal.
 *  Edit `note` — that is the line she reads when she finds it.
 * ─────────────────────────────────────────────────────────────
 */

export type CollectibleIcon = "firefly" | "mushroom" | "petal" | "seal" | "pressed" | "comet" | "lantern";

export type Collectible = {
  id: string;
  name: string;
  icon: CollectibleIcon;
  /** The hint shown in the journal before it is found. */
  where: string;
  /** The little note she gets when she finds it. */
  note: string;
};

export const collectibles: Collectible[] = [
  {
    id: "firefly",
    name: "A firefly",
    icon: "firefly",
    where: "drifting near the gate, before you come in",
    note: "You caught it. I left it by the gate because I wanted the first thing you found in here to be alive.",
  },
  {
    id: "mushroom",
    name: "A little mushroom",
    icon: "mushroom",
    where: "somewhere beside the path on the map",
    note: "A small and completely pointless mushroom. It is here purely because I thought you would like it.",
  },
  {
    id: "petal",
    name: "A fallen petal",
    icon: "petal",
    where: "near the pot in the Flower Garden",
    note: "The flower dropped this one. Keep it — it is proof of a day you looked after something of ours.",
  },
  {
    id: "seal",
    name: "A spare wax seal",
    icon: "seal",
    where: "on the desk in the Letter Cottage",
    note: "I sealed a lot of letters in here. This one is spare, for whenever you want to write me back.",
  },
  {
    id: "pressed",
    name: "A pressed flower",
    icon: "pressed",
    where: "tucked into the scrapbook in Memory Lane",
    note: "Pressed flat between two photos. I like that it had to be flattened a bit to be kept. Most good things do.",
  },
  {
    id: "comet",
    name: "A passing comet",
    icon: "comet",
    where: "crossing the sky in Our Little Universe",
    note: "You looked up at exactly the right moment. That is the entire trick to catching one of these.",
  },
  {
    id: "lantern",
    name: "A paper lantern",
    icon: "lantern",
    where: "hanging in the branches of the Wish Tree",
    note: "Light it and leave it in the tree. It stays on now, in case you ever come back here in the dark.",
  },
];

export const COLLECTIBLE_TOTAL = collectibles.length;
