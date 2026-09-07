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
| `public/assets/home-campus.webp` | Optimized from `hero-campus-rendering-web.jpg`. Labeled a concept illustration, not a completed facility or architect-approved rendering. Original authorship/approval needs owner verification. |
| `public/assets/home-woodland.webp` | Optimized from the existing `foundation-hero-pond-web.jpg`. Landscape imagery, not evidence of construction or completion. |
| `public/assets/home-daily-life.webp` | Original AI-generated editorial illustration, explicitly captioned as an envisioned day. Does not depict actual residents. |
| `public/assets/mhlc-brand-icon-512.png` | Existing brand mark, retained. |
| `public/assets/Brief Overview MHLC project.pdf` | Existing project document, linked without alteration. Confirm revision date and current applicability with the Foundation. |

### Daily-Life Illustration Prompt

Use case: illustration-story. Create one polished editorial illustration for the Memory Health Life Center website: an envisioned residential community for adults living with dementia in East Texas. Wide panoramic composition, 3:2 landscape. Warm welcoming dignified scene at human scale: a modest timber and stone home with broad shaded porch at left, gently curving accessible garden path through native plantings and tall pine and oak trees in center, raised garden beds and a small shared outdoor table at right. A few adult older neighbors with varied skin tones are tending a raised garden, walking together and sharing tea; natural respectful adult proportions, not cartoon caricatures. Hand-painted gouache and pencil architectural editorial illustration on very light warm-white paper, restrained forest teal, sage greens, muted clay red, pale sky blue, warm natural timber. Delicate fine line detail, sophisticated contemporary magazine illustration, calm daylight and generous breathing room. Fill the whole composition, no card frame, no text, no lettering, no logos, no labels, no separate panels. Clearly an illustration, never photorealistic, not a claim about actual residents or an actual completed campus. Prioritize buildings, garden and ordinary connection rather than exaggerated facial expressions. Render excellent quality at 1536 by 1024 or higher.

## Validation and Deployment Notes

- `npm run build` passed compilation, lint/type validation, and generation of all 33 static pages. Homepage first-load JavaScript: 98.4 kB including shared framework code.
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
