# Homepage Redesign and Design-Director Review

Scope: Phases 3-5 of `MEMORY_HEALTH_LIFE_CENTER_REDESIGN.md`, homepage only.
Review date: September 6, 2026.

## Implementation

- Replace the root HTML rewrite with a Next.js server-rendered homepage.
- Preserve secondary HTML pages and redirect legacy homepage URLs to `/`.
- Add scoped design tokens, reusable headings/links/brand components, mobile navigation, restrained reveal motion, family disclosures, and a subscription form using the existing API.
- Read homepage copy, metadata, donation URL, and milestones from existing CMS tables when configured. No database schema or remote content changes.
- Preserve the original brand mark and East Texas imagery, with optimized WebP assets and responsive image delivery.
- Keep Clerk middleware on admin routes; public pages and forms do not depend on Clerk configuration. The existing protected-route list is unchanged.

## Design-Director Findings and Revisions

- **Conventional care-home tone:** the dark hero hid the residential setting. The revised hero uses a light contrast treatment, dark type, and an unobscured campus view below the copy on mobile.
- **Repetition:** values, daily-life descriptions, model principles, and closing appeals repeated the same ideas. Merge the model explanation into the illustrated day, remove redundant icon lists, shorten copy, and eliminate the extra donation banner.
- **Family uncertainty:** add development status in the opening and a family-support entry directly after the hero. Retain explicit answers about opening, availability, updates, and resources today.
- **Weak donor differentiation:** give significant-gift conversations a prominent, separate route to the Foundation, distinct from the personal-gift link.
- **Insufficient evidence:** expose the existing project brief alongside dated reporting and letters of support. Do not claim the brief is the latest approved version.
- **Misleading visual weight:** replace the generic fallback timeline with an honest current-status block. Only CMS-supplied milestones receive timeline treatment.
- **Mobile imbalance:** compress daily-life moments into a readable two-column sequence, adjust the narrow hero, and prevent footer headings from inheriting section-scale typography.
- **Readability:** increase key caption/label sizes and retain focus visibility, reduced-motion support, semantic landmarks, and native disclosure behavior.
- **Approved message refinement:** update the homepage thesis from a better memory-care facility to a broader regional response to dementia, then demonstrate that response through paths for the person living with dementia, families, caregivers and healthcare workers, healthcare and universities, East Texas, and philanthropic partners.
- **Header alignment:** bring the homepage header closer to the secondary-page identity system with the larger brand mark, cream background, serif project name, all-caps Foundation relationship, clay underline, and matching navigation labels.

## Asset Provenance

Original source assets remain unchanged.

| Asset | Source and treatment |
| --- | --- |
| `public/assets/home-campus-aerial.webp` | Optimized from `hero-campus-rendering-web2.png` (1672x941, 2.9 MB PNG to 312 KB WebP). The hero rendering. Labeled a concept rendering, not a completed facility or architect-approved drawing. Original authorship/approval needs owner verification. Supersedes `home-campus.webp`, which is kept in place in case a CMS row still points at it. |
| `public/assets/home-woodland.webp` | Optimized from the existing `foundation-hero-pond-web.jpg`. Landscape imagery, not evidence of construction or completion. |
| `public/assets/home-daily-life.webp` | Original AI-generated editorial illustration, explicitly captioned as an envisioned day. Does not depict actual residents. |
| `public/assets/trail-path.png` | **Placeholder.** A torn strip generated from `home-woodland.webp` standing in for the supplied trail artwork, which has never been available to the build as a file. Replace it in place: a PNG with a transparent ground and a deckled edge, portrait, roughly 470x1536 or larger. Landscape imagery, not evidence of construction or completion. |
| `public/assets/mhlc-brand-icon-512.png` | Existing brand mark, retained. |
| `public/assets/Brief Overview MHLC project.pdf` | Existing project document, linked without alteration. Confirm revision date and current applicability with the Foundation. |

### Daily-Life Illustration Prompt

Use case: illustration-story. Create one polished editorial illustration for the Memory Health Life Center website: an envisioned residential community for adults living with dementia in East Texas. Wide panoramic composition, 3:2 landscape. Warm welcoming dignified scene at human scale: a modest timber and stone home with broad shaded porch at left, gently curving accessible garden path through native plantings and tall pine and oak trees in center, raised garden beds and a small shared outdoor table at right. A few adult older neighbors with varied skin tones are tending a raised garden, walking together and sharing tea; natural respectful adult proportions, not cartoon caricatures. Hand-painted gouache and pencil architectural editorial illustration on very light warm-white paper, restrained forest teal, sage greens, muted clay red, pale sky blue, warm natural timber. Delicate fine line detail, sophisticated contemporary magazine illustration, calm daylight and generous breathing room. Fill the whole composition, no card frame, no text, no lettering, no logos, no labels, no separate panels. Clearly an illustration, never photorealistic, not a claim about actual residents or an actual completed campus. Prioritize buildings, garden and ordinary connection rather than exaggerated facial expressions. Render excellent quality at 1536 by 1024 or higher.

### Visitor-Path Tree Treatment

The visitor-path section uses a CSS-drawn path with animated waypoints and small pine SVG accents placed around the rail. The accents should stay quiet: no full background image, no dense woodland texture, and no documentary-looking photography.

## Validation and Deployment Notes

- `npm run build` passed compilation, lint/type validation, and generation of all 33 static pages. Homepage first-load JavaScript: 98.6 kB including shared framework code.
- Browser review covers widths 1440, 1024, 768, 390, 360, and 320. Checks include overflow, image loading, anchors, mobile navigation, FAQ disclosures, reduced motion, skip navigation, no-JavaScript content, and legacy routes.
- Final production browser checks passed at all six widths, with no horizontal overflow, broken homepage images/anchors, or runtime errors. Legacy redirects and secondary routes returned expected responses; the project-brief link returned a valid PDF.
- Automated axe scans targeting WCAG 2.2 AA returned zero violations at 1440 and 390 pixels. These checks are not complete accessibility certification or real-device assistive-technology testing.
- The local environment has no live Supabase configuration. The existing API's queued response is treated as unavailable, not subscription success. Success/failure presentation can be tested with mocked responses; live persistence and delivery require configured-environment validation.
- hCaptcha is supported when configured; its live challenge remains unverified locally.
- Existing CMS text overrides local defaults. Review it before deployment. Legacy CMS image/CTA fields are not all mapped into the new composition; narrative actions and image selection currently live in the homepage components.
- Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying.
- Major-gift interest goes to the existing contact page; no payment processor or dedicated donor intake was added.
- No new funding amounts, opening dates, partnerships, clinical claims, or construction milestones were introduced. Current funding need, project-brief revision, land/design status, and next milestones require Foundation verification.
- The existing Next.js 14.2.33 dependency has a reported security advisory. An appropriate framework/security update remains separate from this homepage-only change.

---

## Design-Director Critique and Revision — Pass 2

Review date: September 7, 2026. Scope: homepage only. No secondary pages changed.

### Reported problems, and what was done

- **The hero fade fought the image and the type.** The previous hero laid the
  headline over the campus rendering behind a horizontal cream wash that was
  fully opaque across 43% of the frame and then feathered out through the
  middle of the building. The rendering dissolved and the copy sat on a
  gradient. Replaced with an editorial split: the copy occupies a solid warm
  sand field, the rendering occupies its own column with a hard edge, at full
  strength. Nothing is scrimmed and no text sits on an image. On narrow
  screens the rendering leads and the headline follows on solid ground.
- **The page title bar did not match the other pages.** The extra utility
  strip above the header (which no other page has) is gone. The lockup,
  height, cream ground, serif project name, all-caps Foundation line with the
  clay underline, primary-navigation labels, and the clay **Donate** pill now
  match the secondary HTML pages item for item. Navigation reads The Project ·
  The Need · Progress · Families · Partners · Foundation · Contact, the same
  seven labels the other pages use.
- **Function links were missing.** `#partners` and `#need` anchors are
  restored, so inbound links from the secondary pages resolve again. Project
  overview, Family resources, Events, Letters of support, Honor roll, and Ways
  to give are back in the footer, and the mobile menu carries the full set
  under a "More from the Foundation" group.
- **The Foundation CMS login was missing.** `Foundation Login` → `/admin` is
  restored in the footer bottom bar, alongside the EIN, 501(c)(3) status, and
  the all-rights-reserved line the other pages carry.

### Design-director findings addressed in this pass

- **Off-brand palette.** The homepage used its own teal, clay, sand, and ink
  values that did not match `tailwind.config.ts` or any other page. Retokenized
  to the exact brand palette; buttons are pills, matching `donate-cta`.
- **Card grids.** The six-tile bordered icon grid became a numbered editorial
  list with no boxes and no icons. The six campus places keep icons but lose
  their frames.
- **Missing signature idea.** Added the institution-versus-community contrast
  the specification asks for, as an aligned two-column comparison that becomes
  a "Usually / In Quitman" pair sequence on mobile. Framed around design
  patterns, with an explicit note that it is not a comment on the people
  providing dementia care today.
- **Insufficient credibility; weak for major donors.** Added a fact bar under
  the hero and a funding block in the giving section, using only figures
  already published on the project-overview page. Added the site ownership,
  hospital adjacency, and education relationship to the proof section.
- **Visually disconnected from East Texas.** Added an original schematic
  locator diagram (inline SVG, brand palette, no external library) built from
  the distances published on the overview page, with the same figures repeated
  as text beside it. The landscape photograph is recropped away from the
  parked cars and outbuildings in the source frame.
- **Typography.** Consolidated to one display ramp and one text ramp; removed
  the flat `letter-spacing: 0` that was suppressing the brand's tracked
  eyebrows.
- **Mobile composition.** The campus becomes a snap-scrolling rail rather than
  six more stacked blocks; the comparison becomes paired statements; the brand
  lockup compacts to two lines and the Foundation line moves to the menu and
  footer where it can be read. Page height at 390px is materially shorter than
  the previous stacked version despite three additional sections.
- **Accessibility.** Contrast raised on eyebrows, muted text, the funding note,
  the mobile comparison tags, and the footer login; brand links given 24px
  targets; the scrollable campus rail is focusable and labeled.

### Verification

- `npm run build` compiles; homepage first-load JavaScript unchanged at 98.6 kB.
- Browser checks at 1600, 1440, 1280, 1024, 768, 600, 414, 390, 360, and 320:
  no horizontal overflow, no console errors, no failed images.
- axe-core WCAG 2.2 AA scans return zero violations at all ten widths. This is
  not a substitute for real assistive-technology testing.
- All internal links and in-page anchors resolve (verified by request).
- Page content renders fully with JavaScript disabled.

### Facts and provenance

No new funding amounts, partnerships, dates, clinical claims, or construction
milestones were introduced. Every figure on the page — 54 residences, 29 acres,
adjacency to UT Health Quitman, the $6,000,000 federal earmark, the $60,000,000
estimated build cost, $833,500+ in community gifts, the regional distances, the
2020 origin, the Hogeweyk lineage and the Zeisel principles, and the UT Tyler
School of Medicine relationship — is already published on
`cms-pages/mhlc-overview.html` and is labeled here as planned or as of the most
recent Foundation update, with a link back to that page.

**For Foundation verification before publishing:** the community-gift total and
the estimated build cost are point-in-time figures and should be confirmed as
current. The federal earmark is described as secured, matching the overview
page; `MEMORY_HEALTH_LIFE_CENTER_WEBSITE_FOUNDATION.md` notes it is contingent
on a state match whose status needs an audit. Confirm which framing is correct
before launch.

### Follow-up — visitor-first ordering (September 7, 2026)

Owner review found the page still opened on project statistics and that the
audience section described the project rather than routing anyone anywhere.
Both were fair against section 3 of the specification, which asks for an
architecture organised around visitor intent.

- **The audience list is now a wayfinding device, not copy.** Each of the six
  rows is a link with a stated destination — a day at MHLC, for families, the
  campus, the care model, location and region, ways to give — and the audience
  labels are written in the first person ("I am caring for someone") so a
  visitor recognises themselves. The section heading is now the prompt itself:
  "Every visitor arrives with a different question."
- **It moved to first position after the hero.** Orientation now precedes
  narrative, so the second thing a visitor meets is a door rather than data.
- **The fact bar moved down** to sit immediately above the proof section,
  where the numbers answer "is this real?" instead of leading with the
  project's dimensions. Its cells are also inset from the dividers, which had
  the values sitting hard against the rules.
- Section grounds were re-alternated for the new order (wayfinding on white,
  the need on sand).

No figures, facts, or destinations outside the existing site were introduced.

### The trail (September 7, 2026)

Concept A from the visitor-path explorations, built into the existing
"Start where you are" section — the same six rows and destinations, drawn as
a garden path.

- The trail is one seamlessly tiling S-curve set as a repeating background,
  so it stretches to whatever height the rows take rather than assuming a
  fixed row height. CMS copy of any length keeps it intact.
- Waypoints are a `::before` on each row, centred on the row at the trail's
  horizontal midline. The meander amplitude is deliberately smaller than the
  ribbon's half-width so a waypoint always sits within the path.
- Both ends fade out under a mask rather than being cut off.
- On narrow screens the ribbon and waypoints scale down together and the rows
  stack; the trail keeps running down the left edge.
- Motion: the trail draws downward over 1.2s and the waypoints land in
  sequence as it passes them, triggered by the section's existing reveal
  observer (or immediately when the section is already in view or JavaScript
  is off). The file's reduced-motion block disables both; the resting state
  is the visible one.

The trail is decorative — an `aria-hidden` span and CSS pseudo-elements — so
nothing in the routing depends on seeing it.

### The piney woods (September 7, 2026)

The trail is drawn more prominently and the path now runs through a wood.

- **The ribbon** widened from a 26px band to 48px with a soft inner edge in
  place of the earlier dashed centre line, which read as ladder rungs at that
  width. The meander widened with it. Amplitude is still deliberately smaller
  than the ribbon's half-width so a waypoint always sits on the path — that
  constraint is what keeps the trail adaptive to variable row heights instead
  of needing fixed rows.
- **The pines** are four SVG assets in `public/assets/pine-1..4.svg`. The
  first attempt drew them as flat vector wedges in two greens, which read as
  cartoonish next to the watercolour campus rendering, and varying their
  scale made the wood look arbitrary rather than deep. They are now built the
  way a watercolour is: many small, low-opacity needle dabs that build tone
  where they overlap, under a turbulence displacement filter that gives every
  edge a ragged painted quality instead of a geometric curve. Every tree is
  the same size and weight — only the drawing varies across four seeds — and
  they alternate either side of the path in an even rhythm. Each is 16-19 KB
  and cached separately, so nothing is added to the HTML payload.
- **Gauges.** Full width above 980px; a 140px wood between 720 and 980, where
  the rows also stack; a 104px wood below 720. The 980 breakpoint exists
  because the three-column row was squeezing its body column to nothing in the
  740-860 range and inflating the section to nearly 6000px.
- Motion is unchanged — the trail draws downward, the waypoints land in
  sequence, and the wood fades in with them. The reduced-motion block still
  disables all three.

The section copy is untouched: same six rows, same wording, same destinations.

### A photographed trail (September 8, 2026)

The drawn pines are gone. Two attempts at illustrating the wood — flat vector
wedges, then watercolour needle dabs under a turbulence filter — both read as
cartoonish beside the campus rendering, so the section now uses a photograph
of an East Texas trail instead of a drawing of one.

- **The photograph** (`public/assets/trail-path.webp`) is a full-height column
  bleeding to the left edge of the viewport, sized
  `clamp(200px, 19vw, 292px)`. The section is a two-column grid rather than a
  container, and only the right column carries the shell's padding, so the
  photo reaches the viewport edge while the copy still lines up with the
  1280px shell used everywhere else. A gradient foot and a gold rule carry the
  white serif caption, "A brighter path for East Texas."
- **The moving block.** `PathHighlight` measures which choice sits nearest the
  reading line (45% of viewport height) on each scroll frame and writes
  `--marker-top` and `--marker-height` onto the list wrapper. A translucent
  teal block with a gold left edge eases between those positions, and the
  matching row slides 6px right — so the six choices read as walked rather
  than skimmed. It is decorative only: without JavaScript, or under reduced
  motion, nothing is drawn, the tracking class is never applied, and the rows
  behave exactly as they do without it. Rows fade up in sequence on reveal.
- **Gauges.** Photo and rows side by side above 980px; below 980 the row's
  three columns stack and the photo narrows to `clamp(150px, 21vw, 210px)`;
  below 720 the photo becomes a full-width 2.15 band leading the section, with
  the choices following it.
- **Ground.** The section stays white. Sand above (hero) and sand below (the
  need section) means a cream ground here would run the three together.

The ribbon, waypoint, and pine CSS was removed with the assets. The section
copy is untouched: same six rows, same wording, same destinations.

> The image currently committed at `public/assets/trail-path.webp` is a
> placeholder cropped from `home-woodland.webp`. Replace it with the supplied
> trail photograph at roughly 760x1080 or larger; the crop is anchored at
> `object-position: 62% center` so the trail stays in frame.

### Hero rendering swapped (September 8, 2026)

The hero now shows the aerial campus rendering supplied as
`hero-campus-rendering-web2.png` rather than the earlier ground-level concept
illustration.

- Optimized to `public/assets/home-campus-aerial.webp` (1672x941, 312 KB) so
  the priority LCP image matches the weight of the one it replaces. The 2.9 MB
  PNG source stays in `public/assets` untouched.
- `object-position` moved from `58% 50%` to `48% 50%`. At the desktop panel's
  ~1.1 aspect the crop is horizontal, and 48% keeps the commons building, the
  creek and footbridge, and the entry sign in frame while trimming the parking
  lot on the right.
- Alt text describes what the rendering actually shows, including the entry
  sign's wording, and the caption reads "Campus concept rendering — not a
  completed facility." The claim is unchanged: still a concept, still not a
  completed building.
- The Open Graph and Twitter card images point at the new file with its own
  dimensions.

`home-campus.webp` is now unreferenced in the codebase but left in place, since
a `site_settings` or `page_sections` row could still point at it.

### The trail strip is a torn cut-out, not a cropped panel (September 8, 2026)

The visitor-path artwork is a photograph with a **transparent ground and a
deckled, torn edge**, so it is placed as a cut-out laid on the page rather
than a photo filling a rectangle. Three things in the previous build would
have destroyed that, and all three are gone:

- **The figure's fill and scrim.** `background: var(--teal-deep)` and the
  `::after` gradient foot both drew inside the figure's box, so they showed
  through wherever the artwork is transparent. The figure now paints nothing.
- **`object-fit: cover`.** Filling a ~280x1264 column from a portrait strip
  cropped the sides away — precisely the torn edges. The image now keeps its
  natural proportions (`height: auto`, capped by `max-height` so it scales
  down rather than crops) and is inset from the viewport edge by one gutter,
  so the deckle on both sides is fully visible.
- **The caption over the image.** White type needs something to sit on. It
  now sits on the page below the strip, in teal over a gold rule, and the
  figure is no longer `aria-hidden` so the caption is read out.

The strip is `position: sticky` and travels with the reader while the six
choices scroll past it. On mobile it leads the section, capped at 240px wide
and 44vh tall so it stays a strip rather than becoming a band.

> `public/assets/trail-path.png` is a **placeholder**, generated from
> `home-woodland.webp` with a synthetic torn alpha edge to prove the layout.
> It is not the supplied artwork — that file has never reached the build.
> Dropping the real PNG in at the same path is the only change needed.
