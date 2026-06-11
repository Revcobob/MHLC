# Memory Health Life Center — Site Architecture & Homepage Spec

> Companion to `mockups/mhlc-homepage.html`.
> Source of truth: `MEMORY_HEALTH_LIFE_CENTER_WEBSITE_FOUNDATION.md` (repo root).
>
> This document defines the redesigned site's information architecture, navigation, donation path, progress structure, and content hierarchy. It is written so a designer, a CMS builder, and an engineering team can each ship from the same plan.
>
> **Confirmed-fact labels** (see foundation doc, Section 1 of that file) carry through here: `[CONFIRMED]`, `[INFERRED]`, `[PLACEHOLDER]`, `[NEEDS AUDIT]`.

---

## 1. Information Architecture

### 1.1 Page tree

```
/                                  Home
├─ /the-project/                   The Memory Health Life Center
│  ├─ /the-project/vision/         Vision & care model
│  ├─ /the-project/campus/         Site, renderings, services
│  ├─ /the-project/care-model/     Hogeweyk-inspired model, in plain English
│  └─ /the-project/faqs/           FAQs
├─ /the-need/                      Why this, why here, why now
├─ /give/                          Support the Campaign
│  ├─ /give/levels/                Giving levels & benefits
│  ├─ /give/major-gifts/           Major gifts & naming opportunities
│  ├─ /give/planned-giving/        Bequests, IRAs, DAFs, stock
│  └─ /give/corporate/             Corporate & community sponsorship
├─ /progress/                      Project progress
│  ├─ /progress/timeline/          Milestones (project + campaign)
│  ├─ /progress/updates/           Updates index (news feed)
│  └─ /progress/updates/[slug]/    Update detail
├─ /families/                      For families & caregivers
│  ├─ /families/resources/         Curated resources
│  └─ /families/events/            Events index + detail
├─ /partners/                      Partners & supporters
├─ /foundation/                    About the foundation
│  ├─ /foundation/board/           Board & leadership
│  └─ /foundation/financials/      990s, audits, accountability
├─ /news/                          Press releases & media coverage
└─ /contact/                       Contact
```

### 1.2 Primary navigation (header)

Six items + persistent **Donate** button.

| # | Label       | Destination       | Why it earns a spot |
|---|-------------|-------------------|----------------------|
| 1 | The Project | `/the-project/`   | Most-asked question — what is it? |
| 2 | The Need    | `/the-need/`      | The case for support; serves officials and grant makers. |
| 3 | Progress    | `/progress/`      | Live momentum; serves donors and the press. |
| 4 | Families    | `/families/`      | Serves the audience the project exists for. |
| 5 | Partners    | `/partners/`      | Credibility and partnership invitations. |
| 6 | Contact     | `/contact/`       | Talk to a real person. |
|   | **Donate**  | `/give/`          | Persistent CTA in every header (and footer). |

**About the Foundation** and **News** live in the footer and inside the **Contact** / **Progress** flows respectively, to keep the primary nav short. *Rationale: every extra nav item dilutes the Donate CTA. Six is the ceiling.*

### 1.3 Footer navigation

- Explore: The Project · The Need · Progress · Families · Partners · Contact
- About: About the Foundation · Board & Leadership · Financials · News
- Give: Donate · Major Gifts · Planned Giving · Corporate Sponsorship
- Legal: Privacy · Accessibility statement · 501(c)(3) badge with EIN

### 1.4 Persistent components

- Header: logo lockup, primary nav, **Donate** button (always visible).
- Footer: contact card, subscribe form, **Donate** button.
- Optional `AlertBanner` reserved for high-priority campaign moments (e.g., "State match unlocked — match every gift before [date]"). Off by default.

---

## 2. Homepage Section Plan

Section-by-section blueprint for `mockups/mhlc-homepage.html`. Each section maps 1:1 to the prototype.

| # | Section | Purpose | Headline (in prototype) | Primary CTA |
|---|---------|---------|--------------------------|-------------|
| 1 | Hero | 30-second pitch + trust strip | *A new kind of memory care, coming to East Texas.* | **Give to Build It** · See the Vision |
| 2 | The Vision | Tangible 3-card snapshot of the project | *A dementia care campus built around daily life.* | Learn about the need |
| 3 | Why Memory Care Matters | Statistical & human need | *Rural East Texas families are facing dementia alone.* | (in-section quote) |
| 4 | What the Center Will Provide | 6 service cards | *Care that looks like a life — not a hallway.* | (no CTA; informational) |
| 5 | A Regional Resource | Geography + partner logos | *Built in Quitman. Built for the region.* | Become a partner |
| 6 | Support the Campaign | Progress thermometer + giving levels | *Help build it.* | **Give Now** · Major gift |
| 7 | Project Progress | 5-step horizontal timeline | *Where we are right now.* | See full timeline · Read latest update |
| 8 | Families & Caregivers | Resources · Events · Subscribe | *If you're caring for someone with dementia — we see you.* | Subscribe |
| 9 | Community & Partner Support | Logo strip + quote cards | *Built together.* | (no CTA; social proof) |
| 10 | Latest Updates | 3 news cards (2 confirmed, 1 placeholder) | *News from the Memory Health Life Center* | All updates |
| 11 | Final Donate / Contact | Conversion before footer | *Every gift moves this closer to opening day.* | **Give Now** · Talk to a real person |

### 2.1 Above the fold (mobile)

Mobile-first priority: by the time a 5-inch screen has scrolled once, the user should have seen:

1. The project name + WCHCF parent brand.
2. The headline.
3. The Donate button.

Everything else — partners, progress, news — earns the scroll.

### 2.2 Visual hierarchy

- **Section eyebrow** (uppercase, clay): one-word category.
- **Gold marker line**: 56px tab under each eyebrow.
- **Serif H2**: 3–5 word emotive headline (Source Serif 4, 36–48px).
- **Sans subhead**: one sentence (Inter, 18–22px).
- **One primary CTA per section**, max two.

This rhythm repeats top to bottom so the page reads like a structured argument, not a list of blocks.

---

## 3. Donation Path

The donation path is the single most important user journey on the site. It must work end-to-end on a phone in two minutes or less.

### 3.1 Entry points (where a donor can start)

| Entry | Element | Lives on |
|---|---|---|
| A | Header `Donate` button | Every page |
| B | Hero `Give to Build It` CTA | Home |
| C | Section 6 `Give Now` (progress block) | Home, /give |
| D | Section 6 `Talk About a Major Gift` | Home, /give |
| E | Section 11 final CTA | Home, /the-project |
| F | Footer `Donate` button | Every page |
| G | News post in-line `Help us reach the next milestone` | Update pages |
| H | Event pages `Donate at the door / online` | Event detail |

All eight entries point to the same canonical `/give/` URL with UTM parameters so the team can see which entry converts.

### 3.2 The journey

```
1. Land  ───────►  Home (or Project page from a press link)
2. Read  ───────►  Vision · Need · What they'll provide
3. Trust ───────►  Partners · Foundation badge · 501(c)(3) · EIN
4. Believe ─────►  Timeline + Progress thermometer
5. Decide ─────►  Donate CTA tapped
6. Give  ───────►  /give → embedded donation form
7. Thank ──────►  Branded thank-you page with tax info, named contact
8. Follow-up ──►  Email within 7 days; monthly progress emails
```

### 3.3 `/give/` page anatomy

Mirrors Section 6 of the homepage and extends:

- **Hero** — *Build it with us.*
- **Progress block** — campaign goal, federal committed, community raised, state match status. Same component as homepage.
- **Give Now form** — embedded from the chosen processor. One-time / monthly toggle. Default to monthly suggested amounts (a known conversion lift).
- **Giving levels** — full grid with benefits and naming opportunities (`[PLACEHOLDER]` until campaign committee confirms).
- **Major Gifts** — named gift officer card (name, photo, email, phone, calendar link).
- **Planned Giving** — bequest language, IRA QCD, DAF, stock instructions.
- **Corporate & Community Sponsorship** — tiered sponsor benefits.
- **Other Ways to Give** — mail-a-check address; in-kind contributions.
- **Tax language** — EIN 75-2309177, 501(c)(3) status, deductibility language, link to financials.
- **FAQ** — accordion with the 8–10 most common donor questions.

### 3.4 Donor confidence cues (present on every Donate touch)

- Padlock + processor name ("Secure giving via Stripe / Givebutter / Network for Good").
- 501(c)(3) badge with EIN visible.
- Named human contact for questions.
- Public links to GuideStar, Charity Navigator, ProPublica Nonprofit Explorer profiles.
- One-line stewardship promise: *Every dollar is stewarded for one purpose: building and sustaining the Memory Health Life Center.* (Confirm wording with foundation.)

### 3.5 Anti-patterns to avoid

- Multiple competing CTAs above the fold.
- A primary CTA that opens a generic foundation site instead of the MHLC give page.
- A donation form that requires account creation.
- A donation form that doesn't fit on a phone without horizontal scroll.
- A "thank you" page that doesn't say what comes next.

---

## 4. Project-Progress Section

The Progress section is what turns this site from a brochure into a living project. It must update at least monthly.

### 4.1 Surfaces

| Surface | Purpose | Components |
|---|---|---|
| Homepage Section 7 (Timeline) | Show momentum at a glance | `TimelineSection` (5 milestones) |
| Homepage Section 10 (Latest Updates) | Show recency | `NewsCard` × 3 |
| `/progress/` (page) | Full progress dashboard | Thermometer + full timeline + updates index + events + media |
| `/progress/timeline/` | Detailed milestones | Project track + campaign track |
| `/progress/updates/` | News index | Filter by category + tag |
| `/progress/updates/[slug]/` | Single update | Headline · date · author · body · gallery · related |
| `/foundation/financials/` | Stewardship | Form 990s, audited statements, annual report |

### 4.2 Two timelines, one component

The same `TimelineSection` component renders both:

- **Project track:** vision → design → funding → permits → ground-breaking → construction → opening.
- **Campaign track:** silent phase → community phase → federal earmark → state match → public phase → goal met → endowment.

Each milestone uses the milestone content model from the foundation doc (Section 16):

```yaml
---
title: ""
date: ""
status: "completed | in-progress | upcoming"
track: "project | campaign"
summary: ""
icon: ""
order: 0
---
```

### 4.3 Update post structure

Reuse the foundation doc Section 16 update model verbatim:

```yaml
---
title: ""
date: ""
category: "milestone | construction | funding | community | press | event | donor-recognition"
summary: ""
image: ""
imageAlt: ""
tags: []
cta:
  label: ""
  url: ""
relatedLinks:
  - label: ""
    url: ""
ogImage: ""
status: "published"
---
```

### 4.4 Cadence

| Update type | Minimum cadence | Owner |
|---|---|---|
| Milestone | As they happen | Foundation comms |
| Construction | Monthly once active | Foundation comms + GC |
| Funding | Quarterly + on major gifts | Foundation comms + campaign |
| Community | Monthly | Foundation comms |
| Press | As published | Foundation comms |
| Event | 2 weeks in advance + recap | Foundation comms |
| Donor recognition | Quarterly (opt-in only) | Campaign |

A site that doesn't update for 60 days erodes donor trust faster than a missing button.

---

## 5. Content Hierarchy

### 5.1 The three-question test

Every page must answer three questions in the first viewport:

1. **What is this?** (project + place)
2. **Why does it matter?** (the need or the action)
3. **What can I do?** (CTA)

If a page can't answer all three above the fold, the hierarchy is wrong.

### 5.2 Headline rhythm

The site uses a deliberate three-tone rhythm to keep readers moving:

- **Vision tone** (serif, emotional, short): *"A dementia care campus built around daily life."*
- **Reality tone** (serif, plainspoken): *"Rural East Texas families are facing dementia alone."*
- **Action tone** (serif, imperative): *"Help build it."* / *"Build it with us."*

Never three Vision tones in a row. Never two Action tones adjacent. The rhythm should feel like a conversation: vision → reality → action → vision → reality → action.

### 5.3 Trust spine

A persistent "trust spine" runs vertically through every page in small, low-key UI:

- Header: parent brand lockup ("A project of the Wood County Health Care Foundation").
- Hero: 501(c)(3) · EIN · steward.
- Progress block: real dollar amounts with source notes.
- Footer: EIN, registry links, privacy & accessibility statements.

Donors notice all of these. None of them shout.

### 5.4 Plain-English rule

The model is technically inspired by the **Hogeweyk** dementia village (Netherlands), a Scandinavian/Dutch model. **[CONFIRMED]** That term appears on the site, but it is *always* introduced in plain English first: "a campus built around daily life — homes, gardens, animals, neighbors." The technical name is the second sentence, never the first.

### 5.5 Image and photography hierarchy

Order of preference for hero and section visuals:

1. Real, consented portraits of East Texas families and caregivers.
2. Project renderings (when available).
3. East Texas landscape (place, light, sky).
4. Construction photos (when active).
5. Iconography and diagrams.
6. Last resort: stylized illustration. **Never stock.**

### 5.6 Confirmed-fact prominence

Confirmed facts (54 beds · 29 acres · UT Tyler partnership · $6M federal earmark · 501(c)(3) · EIN) should always be visually anchored — never buried in body copy. They are the project's credibility.

---

## 6. Component Map (prototype → component library)

The prototype implements every component in a single HTML file. The recommended Next.js / Tailwind production system would lift them out as follows:

| Prototype block | Production component | Notes |
|---|---|---|
| Header + mobile drawer | `Header`, `MobileNavigation` | Sticky; donate persistent |
| Section 1 Hero | `HeroSection` | Variants: home, project, give |
| Section 2 Vision | `ProjectVisionSection` + `ImpactStats` | 3-card grid |
| Section 3 Need | `NeedSection` + `TestimonialCard` | Sourced stats required |
| Section 4 Services | `ServiceCard` grid | 6 cards, icon-led |
| Section 5 Region | `RegionalResourceSection` + `PartnerLogos` | Logo strip + map block |
| Section 6 Give | `DonateCTA` + `ProgressThermometer` + `GivingLevels` | All read from one content entry |
| Section 7 Timeline | `TimelineSection` | Horizontal desktop / vertical mobile |
| Section 8 Families | `ResourceCard` + `EventCard` + `SubscribeForm` | |
| Section 9 Logos & quotes | `PartnerLogos` + `TestimonialCard` | |
| Section 10 News | `NewsCard` × 3 | Pulls latest from CMS |
| Section 11 Final CTA | `DonateCTA` + `ContactSection` | |
| Footer | `Footer` + `SubscribeForm` | EIN + registry links |
| Prototype banner | (remove for production) | |

Every component is documented in Section 15 of the foundation document.

---

## 7. Design System Quick Reference

Implemented in the prototype's Tailwind config; codify in `tailwind.config.ts` for production.

### 7.1 Color tokens

| Token | Hex | Usage |
|---|---|---|
| `ink`        | `#1F2421` | Primary text on warm bg |
| `ink-soft`   | `#3B433E` | Body text |
| `ink-mute`   | `#6C736E` | Secondary text, eyebrows |
| `sand`       | `#F7F2EA` | Page background |
| `sand-deep`  | `#EFE6D7` | Section breaks, borders |
| `sand-card`  | `#FBF8F2` | Card background on sand |
| `teal`       | `#0F4C4A` | Primary brand, header lockup |
| `teal-deep`  | `#0A3A39` | Hover, dark sections |
| `teal-soft`  | `#1A6A66` | Secondary teal accents |
| `teal-pale`  | `#D8E6E4` | Icon backgrounds |
| `clay`       | `#B8553A` | **Donate CTA**, eyebrows, accents |
| `clay-deep`  | `#8E3F2A` | Donate hover |
| `clay-pale`  | `#F2D7CC` | Icon backgrounds |
| `gold`       | `#D4A04F` | Highlights, focus ring, marker line |
| `gold-deep`  | `#A5772E` | Subscribe button hover |
| `gold-pale`  | `#F4E4C1` | Accent text on dark |
| `sage`       | `#6F9C7A` | Progress/positive |
| `sage-deep`  | `#4F7559` | Sage hover |
| `sage-pale`  | `#DCE9DE` | Confirmed tag bg |

All combinations used in the prototype meet WCAG 2.2 AA on text ≥ 18px. Verify AAA on all body text once final palette is locked.

### 7.2 Typography

- **Headings:** Source Serif 4 (Google Fonts) — humanist serif; warmth + credibility.
- **Body:** Inter — high legibility at 18–22px.
- **Body minimum:** 18px (mobile), 20px (desktop).
- **Line-height:** 1.05 on display, 1.5–1.7 on body.

### 7.3 Layout & spacing

- Max content width: 1280px (`max-w-7xl`).
- Section padding: 80–112px vertical desktop, 64px mobile.
- Card radius: 16–24px (`rounded-2xl` / `rounded-3xl`).
- Button radius: pill (`rounded-full`) for CTAs.
- Shadows: `shadow-soft` (rest) and `shadow-lift` (hover / featured).

---

## 8. Accessibility Checklist (prototype-level)

The prototype already implements:

- Skip-to-content link.
- Semantic landmarks (`header`, `main`, `nav`, `footer`, `section`, `article`).
- Single `<h1>` (the hero headline). Subsequent sections use `<h2>` / `<h3>` in order.
- Visible focus ring (gold, 3px, 3px offset).
- `aria-controls` and `aria-expanded` on mobile menu button; `aria-hidden="true"` on decorative icons.
- Form labels (visible) with `for` + `id` pairing.
- Color contrast verified at ≥ AA on every text/background pair used.
- Reduced-motion media query honored.

To verify before production:

- Screen-reader pass (NVDA + VoiceOver).
- Keyboard-only completion of donation flow.
- Form error states with `aria-live` regions.
- Captions on any embedded video.
- Test at 320px, 375px, 414px, 768px, 1024px, 1440px.

---

## 9. Content That Still Needs to Be Gathered

The prototype carries `[PLACEHOLDER]` tags inline so reviewers can see exactly what is missing. The short list:

1. Current campaign **goal** (publishable) and current **totals** (community raised, state match status).
2. **Renderings, site plan, and a project fact sheet** (PDF, citable).
3. **Hero image** — commissioned, not stock.
4. **Need-section statistics** with sources.
5. **Caregiver / official / clinician quotes** with consent.
6. Full **board roster** with bios and photos.
7. **Named major-gift officer** with email, phone, and headshot.
8. **Confirmed partner logos** beyond UT Health Quitman and UT Tyler School of Medicine.
9. **Donation processor** decision and embed.
10. **Brand assets** — logo (vector), color palette, type if different from prototype.

This list mirrors Section 9 / Section 19 of the foundation document. Filling it unlocks ~80% of remaining prototype refinement.

---

## 10. How to Use This Prototype

1. Open `mockups/mhlc-homepage.html` in any modern browser. No build step required (Tailwind via CDN, Google Fonts).
2. Resize the window between 320px and 1440px to verify mobile-first behavior.
3. Read each section's eyebrow + headline + subhead in sequence — that's the site's narrative skeleton.
4. Tap every CTA and note where each one points (currently `#give`, `#contact`, or `#`).
5. Hand this file plus `MEMORY_HEALTH_LIFE_CENTER_WEBSITE_FOUNDATION.md` to a designer for visual refinement and a developer for the production scaffold.

### Recommended next prompt

> "Using `mockups/mhlc-homepage.html` and `MHLC_SITE_ARCHITECTURE.md` as the source of truth, scaffold a Next.js (App Router) + TypeScript + Tailwind project under `apps/mhlc-web`. Lift every prototype section into a component matching the names in Section 6 of the architecture doc. Wire an MDX content directory using the data models from foundation doc Section 16. Build the `/give/` and `/progress/` pages first. Do not invent any project facts, dollar amounts, dates, partners, or names beyond what is marked **[CONFIRMED]** — leave everything else as a labeled placeholder."
