# Visitor paths — landing-page concepts

Source for the design canvas published at
https://claude.ai/code/artifact/bff3327f-d247-41ca-adbb-0ce5e2fd74e9

## Page 1 — the trail (chosen)

The visitor-path section drawn as a path through the East Texas piney woods.

| Artboard | What it shows |
| --- | --- |
| `Main.dc.html` | Desktop, 1440 |
| `PathMobile.dc.html` | Mobile, 390 |
| `Pines.dc.html` | The five pine illustrations on their own |

The section copy is identical to the live page — same six rows, same wording,
same destinations. Only the ribbon and the illustration around it are new:
a 46px band with a full S-curve meander, waypoints sitting on the path, and a
leader line out to each row. Both ends of the ribbon fade rather than stopping
dead, and the pines fade at the foot.

### The pines

`genpine.mjs` generates them. They are drawn to match
`public/assets/home-daily-life.webp`, the illustration already on the page:
loblolly form (tall bare trunks, high open crowns, drooping branch layers),
the same sage and olive greens, warm grey-brown trunks, soft edges and fine
needle texture. Deterministic per `seed`, so a given tree is reproducible.

Vector, so the whole wood adds nothing to page weight and stays crisp at any
size — which matters given the rural-mobile constraint in the redesign spec.
Scale and opacity vary per placement to give the wood depth.

## Page 2 — not chosen

`Sentence.dc.html` (complete a sentence about yourself) and
`TwoWorlds.dc.html` (the page forks into living-this and helping-build-it),
with their mobile companions. Kept as the record of the decision.

## Rebuilding

`node build.mjs` regenerates the three page-1 artboards from `genpine.mjs`
and the row data. Then re-seed with the `/design` skill's helper and
republish to the same artifact URL. The seeded `.html` is a generated payload
and is gitignored.

## Status

Explorations. Nothing here is wired into `app/` — the live page carries the
earlier, more restrained trail. Every link targets a destination that already
exists, and the only project figures shown are ones already published on
`cms-pages/mhlc-overview.html`.
