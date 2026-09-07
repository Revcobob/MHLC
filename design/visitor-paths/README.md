# Visitor paths — landing-page concepts

Three concepts for how the landing page routes visitors into the rest of the
site, drafted September 7, 2026. Source for the design canvas published at
https://claude.ai/code/artifact/bff3327f-d247-41ca-adbb-0ce5e2fd74e9

| Artboard | Concept | Axis |
| --- | --- | --- |
| `Main.dc.html` | A — The Path | Spatial metaphor: navigation drawn as a garden path |
| `Sentence.dc.html` | B — Finish the sentence | Conversational: the visitor completes a sentence about themselves |
| `TwoWorlds.dc.html` | C — Two ways in | Structural: the page forks into living-this and helping-build-it |

`*Mobile.dc.html` are the 390px reads of the same three. `canvas.json` places
them and carries the notes on each concept's motivation and tradeoff.

These are explorations, not decisions. Nothing here is wired into `app/`. The
global navigation bar stays identical to the secondary pages in all three —
the device lives in the page body, so the homepage can address the visitor
directly without breaking site-wide navigation.

Every link points at a destination that already exists, and the only project
figures shown (54 residences, 29 acres, 501(c)(3)) are ones already published
on `cms-pages/mhlc-overview.html`.

## Rebuilding the canvas

The published `.html` is a generated payload and is gitignored. Re-seed it
from these sources with the `/design` skill's helper, then republish to the
same artifact URL.
