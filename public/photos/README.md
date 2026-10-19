# Photos

Drop image files in this folder and they appear in the site automatically.
Nothing to uncomment — until a file exists, a drawn pressed-flower
placeholder is shown instead.

All seven are in. To change one, drop a new file over the old one with the
same name — nothing else needs editing.

| File | Where it shows | Best shape |
| --- | --- | --- |
| `us-hero.jpg` ✓ | the opening gate, framed like a polaroid — shown whole, never cropped | any |
| `photo-1.jpg` ✓ | Memory Lane — "The first one I want here" | portrait |
| `photo-2.jpg` ✓ | Memory Lane — "This face, specifically" | portrait |
| `photo-3.jpg` ✓ | Memory Lane — "Us being completely normal" | landscape |
| `photo-4.jpg` ✓ | Memory Lane — "A good day, that one" | square-ish |
| `photo-5.jpg` ✓ | Memory Lane — "Reminds me of you" | portrait |
| `photo-6.jpg` ✓ | Memory Lane — "One for the memory book" | landscape |

Captions, titles, dates and the longer stories live in `data/memories.ts`.
The gate photo and its caption live in `data/site.ts`.

If a photo crops awkwardly in the collage, set `focus` on that entry in
`data/memories.ts` (e.g. `focus: "center 30%"` to favour a face near the top).
The opening gate photo and the lightbox always show photos whole.

Keep files reasonably small (under ~500 KB each) so the site stays quick
on a phone. `.jpg`, `.png` and `.webp` all work — just match the
file name in the data file if you use a different extension.
