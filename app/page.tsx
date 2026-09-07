import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Home,
  MapPin,
  MessageCircle,
  Sprout,
  Stethoscope,
  Users,
  Waves,
} from "lucide-react";
import {
  HomeBrand,
  HomeHeading,
  HomeLink,
  HomeRegionMap,
} from "@/components/public/HomePrimitives";
import {
  HomeMotion,
  MobileNavigation,
  SubscribeForm,
} from "@/components/public/HomeInteractions";
import { getHomeContent, safeHomeHref, sectionCopy } from "@/lib/homepage";
import { homeLinks } from "@/lib/homeLinks";
import { env } from "@/lib/env";
import "./home.css";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getHomeContent();
  const title =
    page?.seo_title || "Memory Health Life Center | A Community in the Making";
  const description =
    page?.seo_description ||
    "Memory Health Life Center is a planned 54-residence memory-care, education, and brain-health campus on 29 acres in Quitman, Texas, developed by the Wood County Health Care Foundation.";
  return {
    metadataBase: new URL(env.siteUrl),
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_US",
      title,
      description,
      url: "/",
      siteName: "Memory Health Life Center",
      images: [
        {
          url: "/assets/home-campus.webp",
          width: 1400,
          height: 763,
          alt: "Concept illustration of a residential campus among gardens and trees",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/home-campus.webp"],
    },
    icons: { icon: "/assets/mhlc-brand-icon-512.png" },
  };
}

/* Figures below are the ones already published on the project-overview page.
   Nothing here introduces a new funding, partnership, or schedule claim. */
const heroFacts = [
  { value: "54", label: "Planned residences" },
  { value: "29", label: "Acres, next to the hospital" },
  { value: "$6M", label: "Federal earmark secured" },
  { value: "2020", label: "The year the vision began" },
];

/* Each row is a door, not a description: every visitor type gets a
   destination that answers the question they arrived with. */
const responsePaths = [
  {
    audience: "I am living with dementia",
    title: "See what a day here looks like.",
    text: "Homes, gardens, paths, and shared places planned around the shape of an ordinary day.",
    href: "#vision",
    cue: "A day at MHLC",
  },
  {
    audience: "I am caring for someone",
    title: "Find help today, and answers about later.",
    text: "Whether the Center is open, when families can ask about availability, and where to turn right now.",
    href: "#families",
    cue: "For families",
  },
  {
    audience: "I work in dementia care",
    title: "See where training would happen.",
    text: "A clinic, classrooms, and student housing are planned so caregivers and clinicians can learn on site.",
    href: "#campus",
    cue: "The campus",
  },
  {
    audience: "I am a clinician or educator",
    title: "Read the care model in full.",
    text: "The Hogeweyk lineage, the five principles behind it, and the education wing the European models do not have.",
    href: `${homeLinks.center}#care-model`,
    cue: "The care model",
  },
  {
    audience: "I live in East Texas",
    title: "See what this means for the region.",
    text: "Where the campus sits, what it is near, and why the location was chosen.",
    href: "#partners",
    cue: "Location & region",
  },
  {
    audience: "I want to help build it",
    title: "See where the project stands, and what it needs.",
    text: "What is funded, what is not, and how to talk with the Foundation about a larger commitment.",
    href: "#give",
    cue: "Ways to give",
  },
];

const dayMoments = [
  {
    time: "Morning",
    title: "The comfort of home",
    text: "Coffee, and a routine that belongs to you.",
  },
  {
    time: "Midday",
    title: "Room to move",
    text: "A walk along the paths, time in the garden.",
  },
  {
    time: "Afternoon",
    title: "Good company",
    text: "A shared meal, or a visit from family.",
  },
  {
    time: "Evening",
    title: "A sense of belonging",
    text: "A quiet evening in familiar surroundings.",
  },
];

const modelContrast = [
  {
    usual: "A single building of corridors and doors.",
    now: "54 apartment-style homes with open plans and large windows.",
  },
  {
    usual: "A day organized around the schedule of the floor.",
    now: "Routines a resident already knows — meals, walks, work in the garden.",
  },
  {
    usual: "Outdoor space tucked behind the building.",
    now: "A reflection lake, paths, and gardens at the center of the site.",
  },
  {
    usual: "Activity offered as a distraction.",
    now: "Purposeful daily life: a garden to tend, a barn to visit, neighbors to sit with.",
  },
];

const campusPlaces = [
  {
    icon: Home,
    title: "Resident homes",
    text: "54 apartment-style dwellings with open floor plans and large windows, rather than long hallways lined with doors.",
  },
  {
    icon: Stethoscope,
    title: "Clinic, education & research",
    text: "A medical clinic serving residents and the public, with education for physicians, nurses, allied-health professionals, and family caregivers.",
  },
  {
    icon: Waves,
    title: "Reflection lake & paths",
    text: "A reflection lake with groomed walking paths, trees, grass, and wildflowers at the center of the site.",
  },
  {
    icon: Sprout,
    title: "Working barn & garden",
    text: "Horses and tame animals housed separately for residents to visit, and a garden residents can grow and work in.",
  },
  {
    icon: Users,
    title: "Common spaces",
    text: "Dining, gathering, and entertainment areas — meals together, a movie, a porch in the afternoon.",
  },
  {
    icon: GraduationCap,
    title: "Student housing",
    text: "Housing for students, interns, residents, and faculty taking part in the living-laboratory experience.",
  },
];

const distances = [
  { place: "Interstate 30", miles: "25 mi" },
  { place: "Interstate 20", miles: "25 mi" },
  { place: "UT Tyler School of Medicine", miles: "35 mi" },
  { place: "Dallas–Fort Worth metro", miles: "90 mi" },
  { place: "Shreveport, Louisiana", miles: "116 mi" },
  { place: "UT Health Quitman", miles: "Adjacent" },
];

export default async function Homepage() {
  const { sections, settings, milestones } = await getHomeContent();
  const copy = (key: Parameters<typeof sectionCopy>[0]) =>
    sectionCopy(key, sections);
  const giveHref = safeHomeHref(settings?.donate_url, homeLinks.give);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Memory Health Life Center",
    url: new URL("/", env.siteUrl).href,
    description:
      "A planned 54-residence memory-care, education, and brain-health campus on 29 acres in Quitman, Texas.",
    publisher: {
      "@type": "NGO",
      name: "Wood County Health Care Foundation",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Quitman",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    about: {
      "@type": "Project",
      name: "Memory Health Life Center",
      description:
        "A project in development in Quitman, Texas. Not currently operating.",
    },
  };

  return (
    <div className="mhlc-home">
      <HomeMotion />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <a className="home-skip" href="#main">
        Skip to content
      </a>

      <header className="home-header">
        <div className="home-container home-header-inner">
          <HomeBrand />
          <nav className="home-nav" aria-label="Primary">
            <a href={homeLinks.center}>The Project</a>
            <a href="#need">The Need</a>
            <a href="#progress">Progress</a>
            <a href="#families">Families</a>
            <a href="#partners">Partners</a>
            <a href={homeLinks.foundation}>Foundation</a>
            <a href={homeLinks.contact}>Contact</a>
          </nav>
          <div className="home-header-actions">
            <a
              className="home-button home-button-clay home-header-donate"
              href={giveHref}
            >
              Donate
            </a>
            <MobileNavigation />
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {/* ---------- Hero ---------- */}
        <section className="home-hero" aria-labelledby="home-title">
          <div className="home-container home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-eyebrow">{copy("hero").eyebrow}</p>
              <h1 id="home-title">{copy("hero").heading}</h1>
              <p className="home-hero-body">{copy("hero").body}</p>
              <div className="home-actions">
                <HomeLink href={homeLinks.center} variant="teal">
                  Explore the Center
                </HomeLink>
                <HomeLink href="#give" variant="outline">
                  Help build it
                </HomeLink>
              </div>
              <p className="home-hero-family">
                <span>Looking for support today?</span>
                <a href={homeLinks.families}>
                  Start with family &amp; caregiver resources
                </a>
              </p>
            </div>
            <figure className="home-hero-figure">
              <Image
                src="/assets/home-campus.webp"
                alt="Concept illustration of homes, gardens, and walking paths in a wooded residential community"
                fill
                priority
                sizes="(max-width: 1080px) 100vw, 55vw"
                quality={86}
              />
              <figcaption>
                <a href="/assets/home-campus.webp">
                  Campus concept illustration
                </a>{" "}
                — not a completed facility.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Where to start: the first thing after the hero ---------- */}
        <section
          id="start"
          className="home-section home-paths"
          aria-labelledby="paths-heading"
        >
          <div className="home-container" data-home-reveal>
            <HomeHeading
              eyebrow="Start where you are"
              heading="Every visitor arrives with a different question."
              body="Choose the one closest to yours. Each goes straight to the part of the project that answers it."
              id="paths-heading"
            />
            <div className="home-paths-wrap">
              <span className="home-paths-wood" aria-hidden="true">
                <Image
                  src="/assets/home-response-path.webp"
                  alt=""
                  width={760}
                  height={1602}
                  sizes="(max-width: 720px) 104px, (max-width: 980px) 140px, 200px"
                />
              </span>
              <span className="home-paths-trail" aria-hidden="true" />
              <ul className="home-paths-list">
                {responsePaths.map((path, index) => (
                  <li key={path.audience}>
                    <a href={path.href}>
                      <p className="home-path-audience">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{path.audience}</span>
                      </p>
                      <span className="home-path-body">
                        <span className="home-path-title">{path.title}</span>
                        <span className="home-path-text">{path.text}</span>
                      </span>
                      <span className="home-path-cue">
                        {path.cue}
                        <ArrowRight aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- The need ---------- */}
        <section
          id="need"
          className="home-section home-need"
          aria-labelledby="need-heading"
        >
          <div className="home-container home-need-grid" data-home-reveal>
            <HomeHeading
              eyebrow={copy("need").eyebrow}
              heading={copy("need").heading}
              id="need-heading"
            />
            <div>
              <p className="home-need-statement">
                A family in Wood County should not have to leave East Texas to
                find good dementia care — and the people who provide that care
                should be able to learn how to do it well, here.
              </p>
              <p className="home-lead" style={{ marginTop: "1.5rem" }}>
                {copy("need").body}
              </p>
            </div>
          </div>
        </section>

        {/* ---------- A day ---------- */}
        <section
          id="vision"
          className="home-section home-day"
          aria-labelledby="day-heading"
        >
          <div className="home-container" data-home-reveal>
            <HomeHeading
              eyebrow={copy("vision").eyebrow}
              heading={copy("vision").heading}
              body={copy("vision").body}
              id="day-heading"
            />
            <figure className="home-day-art">
              <Image
                src="/assets/home-daily-life.webp"
                alt="Editorial illustration of neighbors on a shaded porch, a garden walk, and time together outdoors"
                width={1536}
                height={1024}
                sizes="(max-width: 720px) 100vw, 1240px"
              />
              <figcaption>
                An illustrated day, envisioned for MHLC. Spaces and activities
                are conceptual.
              </figcaption>
            </figure>
            <ol className="home-day-moments">
              {dayMoments.map((moment) => (
                <li key={moment.time}>
                  <span className="home-moment-time">{moment.time}</span>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- What makes the model different ---------- */}
        <section
          id="model"
          className="home-section home-contrast"
          aria-labelledby="model-heading"
        >
          <div className="home-container" data-home-reveal>
            <HomeHeading
              eyebrow={copy("services").eyebrow}
              heading={copy("services").heading}
              body={copy("services").body}
              id="model-heading"
            />
            <div className="home-contrast-table">
              <div className="home-contrast-head" aria-hidden="true">
                <span>The pattern most families have seen</span>
                <span>What is planned in Quitman</span>
              </div>
              <ul className="home-contrast-rows">
                {modelContrast.map((row) => (
                  <li key={row.now}>
                    <p className="home-contrast-was">
                      <span className="home-contrast-tag">Usually</span>
                      {row.usual}
                    </p>
                    <p className="home-contrast-now">
                      <span className="home-contrast-tag">In Quitman</span>
                      {row.now}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="home-contrast-note">
              <p>
                This compares two design patterns, not the people who provide
                dementia care today. The care model draws on the five principles
                developed by John Zeisel, PhD, alongside dementia-village
                programs the Foundation reviewed in the United States and
                Europe.
              </p>
              <HomeLink href={`${homeLinks.center}#care-model`}>
                Read the care model
              </HomeLink>
            </div>
          </div>
        </section>

        {/* ---------- The campus ---------- */}
        <section
          id="campus"
          className="home-section home-campus"
          aria-labelledby="campus-heading"
        >
          <div className="home-container" data-home-reveal>
            <HomeHeading
              eyebrow="More than a residential campus"
              heading="Six places, one campus."
              body="A village rather than a facility: homes, a clinic, a barn, gardens, reflection grounds, and student housing on 29 acres."
              id="campus-heading"
            />
            <ul
              className="home-campus-list"
              tabIndex={0}
              aria-label="Places planned on the campus"
            >
              {campusPlaces.map((place) => (
                <li key={place.title}>
                  <h3>
                    <place.icon aria-hidden="true" />
                    {place.title}
                  </h3>
                  <p>{place.text}</p>
                </li>
              ))}
            </ul>
            <p className="home-campus-hint" aria-hidden="true">
              Swipe for all six &rarr;
            </p>
            <div className="home-campus-footnote">
              <p className="home-note">
                These describe proposed project functions. None is a service
                currently available at the Center.
              </p>
              <HomeLink href={`${homeLinks.center}#campus`}>
                See the campus plans
              </HomeLink>
            </div>
          </div>
        </section>

        {/* ---------- Region ---------- */}
        <section
          id="partners"
          className="home-section home-region"
          aria-labelledby="region-heading"
        >
          <div className="home-container" data-home-reveal>
            <div className="home-region-grid">
              <figure className="home-region-photo">
                <Image
                  src="/assets/home-woodland.webp"
                  alt="Trees and still water along a wooded pond in Wood County, Texas"
                  fill
                  sizes="(max-width: 1080px) 100vw, 34vw"
                />
                <figcaption>
                  <MapPin size={15} aria-hidden="true" /> Quitman, Wood County,
                  Texas
                </figcaption>
              </figure>
              <div>
                <HomeHeading
                  eyebrow={copy("partners").eyebrow}
                  heading={copy("partners").heading}
                  body={copy("partners").body}
                  id="region-heading"
                />
                <ul className="home-region-distances">
                  {distances.map((item) => (
                    <li key={item.place}>
                      <span>{item.place}</span>
                      <b>{item.miles}</b>
                    </li>
                  ))}
                </ul>
                <HomeLink href={`${homeLinks.center}#site`}>
                  Explore the location &amp; site plans
                </HomeLink>
              </div>
            </div>
            <figure className="home-region-map">
              <HomeRegionMap />
              <figcaption>
                Straight-line distances from the project site. Schematic
                diagram, not to scale for road travel.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Families ---------- */}
        <section
          id="families"
          className="home-section home-families"
          aria-labelledby="families-heading"
        >
          <div className="home-container home-families-grid" data-home-reveal>
            <div>
              <HomeHeading {...copy("families")} id="families-heading" />
              <div className="home-actions" style={{ marginTop: "1.75rem" }}>
                <HomeLink href={homeLinks.families} variant="teal">
                  Find family &amp; caregiver resources
                </HomeLink>
              </div>
            </div>
            <div>
              <p className="home-eyebrow" style={{ marginBottom: "1.25rem" }}>
                A few things you may be wondering
              </p>
              <details open>
                <summary>
                  Is the Center open?<span aria-hidden="true">+</span>
                </summary>
                <p>
                  No. MHLC is a planned community in development. The campus and
                  daily-life images on this page describe a future vision, not
                  residential care available today.
                </p>
              </details>
              <details>
                <summary>
                  When can families learn about availability?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  An opening date and admissions process are not announced on
                  this site.{" "}
                  <a href="#stay-connected">Receive project updates</a> or{" "}
                  <a href={homeLinks.contact}>contact the Foundation</a> with
                  questions. Subscribing does not reserve a place.
                </p>
              </details>
              <details>
                <summary>
                  Where can I find help today?<span aria-hidden="true">+</span>
                </summary>
                <p>
                  Our{" "}
                  <a href={homeLinks.families}>
                    family and caregiver resources
                  </a>{" "}
                  connect you with organizations and information about dementia
                  and caregiving right now.
                </p>
              </details>
              <details>
                <summary>
                  Can I visit or attend something?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  The Foundation posts community gatherings and project
                  briefings on the <a href={homeLinks.events}>events page</a>.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* ---------- Credibility bar ---------- */}
        <div className="home-facts">
          <div className="home-container">
            <ul className="home-facts-list">
              {heroFacts.map((fact) => (
                <li key={fact.label}>
                  <span className="home-facts-value">{fact.value}</span>
                  <span className="home-facts-label">{fact.label}</span>
                </li>
              ))}
            </ul>
            <p className="home-facts-source">
              Planned figures for a project in development.{" "}
              <a href={homeLinks.center}>
                See the site, the model, and the numbers
              </a>
              .
            </p>
          </div>
        </div>

        {/* ---------- Proof ---------- */}
        <section
          id="evidence"
          className="home-section home-proof"
          aria-labelledby="evidence-heading"
        >
          <div className="home-container" data-home-reveal>
            <HomeHeading
              eyebrow="Is this real?"
              heading="Look at the project yourself."
              id="evidence-heading"
            />
            <div className="home-proof-grid">
              <a href="/assets/Brief%20Overview%20MHLC%20project.pdf">
                <span className="home-proof-type">
                  Project document · PDF · 4.2 MB
                </span>
                <h3>The MHLC project brief</h3>
                <p>
                  Mission, model, site, and funding at a glance. For the latest
                  plans and funding needs, speak with the Foundation.
                </p>
                <span className="home-proof-action">
                  Open the brief <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
              <a href="https://www.texastribune.org/2024/06/19/quitman-texas-memory-loss-care-center-alzehimers-dementia/">
                <span className="home-proof-type">
                  Independent reporting · June 2024
                </span>
                <h3>The Texas Tribune</h3>
                <p>
                  Reporting on the origins of the Quitman memory-care vision,
                  written by someone who does not work for us.
                </p>
                <span className="home-proof-action">
                  Read the story <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
              <a href={homeLinks.supporters}>
                <span className="home-proof-type">Voices of support</span>
                <h3>A community behind the idea</h3>
                <p>
                  Letters from cities, civic clubs, health organizations, and
                  elected officials across the region.
                </p>
                <span className="home-proof-action">
                  Read the letters <ArrowRight aria-hidden="true" />
                </span>
              </a>
            </div>
            <div className="home-proof-partners">
              <p>
                The 29-acre site is owned by the{" "}
                <strong>Wood County Central Hospital District</strong> and sits
                directly adjacent to <strong>UT Health Quitman</strong>. The
                education and workforce program is planned in partnership with
                the <strong>UT Tyler School of Medicine</strong>, 35 miles away.
              </p>
              <HomeLink href={homeLinks.foundation}>
                Meet the Foundation
              </HomeLink>
            </div>
          </div>
        </section>

        {/* ---------- Progress ---------- */}
        <section
          id="progress"
          className="home-section home-section-tight home-progress"
          aria-labelledby="progress-heading"
        >
          <div className="home-container" data-home-reveal>
            <div className="home-progress-head">
              <HomeHeading {...copy("progress")} id="progress-heading" />
              <HomeLink href={homeLinks.contact}>
                Ask about project progress
              </HomeLink>
            </div>
            {milestones.length > 0 ? (
              <ol className="home-timeline">
                {milestones.map((item) => (
                  <li key={item.id} className={`home-milestone-${item.status}`}>
                    <span className="home-milestone-label">
                      {item.status === "completed"
                        ? "Completed"
                        : item.status === "active"
                          ? "Underway"
                          : "Next"}
                      {item.date_label ? ` · ${item.date_label}` : ""}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="home-status">
                <span className="home-status-label">
                  <span className="home-status-dot" /> In development
                </span>
                <p>
                  An opening date and admissions process are not announced on
                  this site. The Foundation is the point of contact for current
                  plans, funding needs, and next steps.
                </p>
                <HomeLink href="#stay-connected">
                  Receive project updates
                </HomeLink>
              </div>
            )}
          </div>
        </section>

        {/* ---------- Giving ---------- */}
        <section
          id="give"
          className="home-section home-giving"
          aria-labelledby="giving-heading"
        >
          <div className="home-container home-giving-grid" data-home-reveal>
            <div>
              <p className="home-eyebrow">{copy("support").eyebrow}</p>
              <div className="home-rule" aria-hidden="true" />
              <h2 id="giving-heading">{copy("support").heading}</h2>
              <p className="home-giving-lead">{copy("support").body}</p>
              <div className="home-actions">
                <HomeLink href={giveHref} variant="white">
                  Make a gift
                </HomeLink>
              </div>
              <p className="home-giving-closing">{copy("final_cta").body}</p>
            </div>
            <div className="home-giving-side">
              <div className="home-major">
                <p className="home-eyebrow">Major gifts &amp; philanthropy</p>
                <h3>Considering a significant gift? Let&rsquo;s talk.</h3>
                <p>
                  Speak directly with the Wood County Health Care Foundation
                  about current funding priorities, naming and recognition, and
                  how a larger commitment advances a dementia response whose
                  impact reaches beyond the future campus.
                </p>
                <div className="home-actions">
                  <HomeLink href={homeLinks.contact} variant="white">
                    Start a conversation
                  </HomeLink>
                  <HomeLink href={homeLinks.recognition}>
                    See who is already standing with us
                  </HomeLink>
                </div>
              </div>
              <div className="home-funding">
                <p className="home-funding-title">Where the money stands</p>
                <div
                  className="home-funding-bar"
                  role="img"
                  aria-label="About 6.8 million dollars of an estimated 60 million dollar build cost is committed: 6 million from a federal earmark and 833,500 from community gifts."
                >
                  <span
                    className="home-funding-federal"
                    style={{ width: "10%" }}
                  />
                  <span
                    className="home-funding-community"
                    style={{ width: "1.4%" }}
                  />
                </div>
                <ul>
                  <li>
                    <span>
                      <i
                        className="home-key home-key-federal"
                        aria-hidden="true"
                      />
                      Federal earmark secured
                    </span>
                    <b>$6,000,000</b>
                  </li>
                  <li>
                    <span>
                      <i
                        className="home-key home-key-community"
                        aria-hidden="true"
                      />
                      Community gifts to date
                    </span>
                    <b>$833,500+</b>
                  </li>
                  <li>
                    <span>
                      <i
                        className="home-key home-key-goal"
                        aria-hidden="true"
                      />
                      Estimated total build cost
                    </span>
                    <b>$60,000,000</b>
                  </li>
                </ul>
                <p className="home-funding-note">
                  Figures as published in the most recent Foundation update.{" "}
                  <a href={`${homeLinks.center}#numbers`}>
                    See the full numbers
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Stay connected ---------- */}
        <section
          id="stay-connected"
          className="home-section home-section-tight home-subscribe"
          aria-labelledby="subscribe-heading"
        >
          <div className="home-container home-subscribe-grid" data-home-reveal>
            <HomeHeading
              eyebrow="Stay connected"
              heading="Be part of what comes next."
              body="Follow the project as it develops. News and progress updates from the Memory Health Life Center."
              id="subscribe-heading"
            />
            <SubscribeForm captchaSiteKey={env.hcaptchaSite} />
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-container">
          <div className="home-footer-main">
            <div>
              <HomeBrand footer />
              <p className="home-footer-about">
                A planned 54-residence, Hogeweyk-inspired memory care and
                education campus for East Texas, in Quitman. Stewarded by the{" "}
                <a href={homeLinks.foundation}>
                  Wood County Health Care Foundation
                </a>
                , a 501(c)(3) charitable organization.
              </p>
              <p className="home-footer-meta">
                EIN <span>75-2309177</span> · Quitman, Texas
              </p>
            </div>
            <nav aria-label="Explore">
              <h2>Explore</h2>
              <a href={homeLinks.center}>Project overview</a>
              <a href="#need">The need</a>
              <a href="#vision">A day at MHLC</a>
              <a href="#partners">Location &amp; region</a>
              <a href="#progress">Project progress</a>
              <a href={homeLinks.families}>Family resources</a>
            </nav>
            <nav aria-label="Foundation">
              <h2>Foundation</h2>
              <a href={homeLinks.foundation}>About the Foundation</a>
              <a href={homeLinks.events}>Events</a>
              <a href={homeLinks.supporters}>Letters of support</a>
              <a href={homeLinks.recognition}>Honor roll</a>
              <a href={giveHref}>Ways to give</a>
              <a href={homeLinks.contact}>Contact us</a>
            </nav>
            <div className="home-footer-connect">
              <h2>Good things begin together</h2>
              <p>
                Every gift moves the Memory Health Life Center closer to opening
                day.
              </p>
              <HomeLink href={giveHref} variant="clay">
                Donate
              </HomeLink>
              <a href={homeLinks.contact} className="home-footer-contact">
                <MessageCircle size={17} aria-hidden="true" />
                Talk with the Foundation
              </a>
            </div>
          </div>
          <div className="home-footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Wood County Health Care
              Foundation. All rights reserved.
            </p>
            <a className="home-footer-login" href={homeLinks.admin}>
              Foundation Login
            </a>
            <p>Memory Health Life Center is a project in development.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
