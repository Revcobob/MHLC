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
