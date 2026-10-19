# Audio

Nothing in here autoplays. Ever. She always presses play herself.

| What | Where to put it | Then set |
| --- | --- | --- |
| Ambient music for the whole world | `public/audio/our-song.mp3` | `music.src` in `data/site.ts` |
| A voice note for "I wish you were here" | `public/audio/voice-note.m4a` | `voiceNote.src` in `data/site.ts` |
| A voice note attached to the final letter | `public/audio/final-note.m4a` | `voice.src` in `data/finale.ts` |

Leave a `src` as an empty string and that player simply does not appear.
If a file is missing or the browser refuses to play it, the player hides
itself rather than showing an error.

Voice notes recorded on a phone are usually `.m4a`; both `.m4a` and
`.mp3` work in every current browser.
