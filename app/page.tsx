import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Network,
  Stethoscope,
  Sprout,
  Sun,
  Users,
} from "lucide-react";
import {
  HomeBrand,
  HomeHeading,
  HomeLink,
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
    "Discover Memory Health Life Center, a project in development in Quitman, Texas, connecting residential dementia care, family support, training, and regional memory-health capacity.";
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

const dayMoments = [
  {
    time: "Morning",
    title: "The comfort of home",
    text: "Coffee and a familiar morning routine.",
    icon: Sun,
  },
  {
    time: "Midday",
    title: "Room to explore",
    text: "A garden walk and time in the sunshine.",
    icon: Sprout,
  },
  {
    time: "Afternoon",
    title: "Good company",
    text: "A shared meal or a visit with family.",
    icon: Users,
  },
  {
    time: "Evening",
    title: "A sense of belonging",
    text: "A quiet evening in familiar surroundings.",
    icon: Home,
  },
];

const responsePaths = [
  {
    audience: "For the person living with dementia",
    title: "A different residential model.",
    text: "Homes, gardens, paths, routines, and shared places are planned around daily life rather than an institutional hallway.",
    icon: Home,
  },
  {
    audience: "For the family",
    title: "Education, understanding, and support.",
    text: "Resources and updates help families understand what is being built, what is available now, and where to begin.",
    icon: Heart,
  },
  {
    audience: "For caregivers and healthcare workers",
    title: "Training and workforce development.",
    text: "The proposed campus is meant to support learning for the people who provide dementia care across East Texas.",
    icon: Stethoscope,
  },
  {
    audience: "For healthcare and universities",
    title: "Partnership and learning.",
    text: "MHLC can become a place where academic, medical, and community partners learn from a residential model in practice.",
    icon: GraduationCap,
  },
  {
    audience: "For East Texas",
    title: "Greater memory-health capacity.",
    text: "The project gives the region a shared point of focus for dementia care, family understanding, and community readiness.",
    icon: Network,
  },
  {
    audience: "For donors and foundations",
    title: "A model with broader impact.",
    text: "Philanthropy can help demonstrate an approach whose value extends beyond the people who ultimately live on campus.",
    icon: HandHeart,
  },
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
      "A project in development in Quitman, Texas, connecting residential dementia care, family support, training, and regional memory-health capacity.",
    publisher: {
      "@type": "Organization",
      name: "Wood County Health Care Foundation",
    },
    about: {
      "@type": "Thing",
      name: "Memory Health Life Center",
      description: "A project in development in Quitman, Texas.",
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
      <div className="home-utility">
        <div className="home-container">
          <span>A project of the Wood County Health Care Foundation</span>
          <a href={homeLinks.contact}>
            Get in touch <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
      <header className="home-header">
        <div className="home-container home-header-inner">
          <HomeBrand />
          <nav className="home-desktop-nav" aria-label="Main navigation">
            <a href={homeLinks.center}>The Project</a>
            <a href="#welcome-heading">The Need</a>
            <a href="#progress">Progress</a>
            <a href="#families">Families</a>
            <a href="#regional-impact">Regional Impact</a>
            <a href={homeLinks.foundation}>Foundation</a>
            <a href={homeLinks.contact}>Contact</a>
          </nav>
          <div className="home-header-actions">
            <a
              className="home-button home-button-clay home-header-give"
              href={giveHref}
            >
              <Heart size={16} aria-hidden="true" />
              Give
            </a>
            <MobileNavigation />
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="home-hero" aria-labelledby="home-title">
          <Image
            className="home-hero-image"
            src="/assets/home-campus.webp"
            alt="Concept illustration of homes, gardens, and walking paths in a wooded residential community"
            fill
            priority
            sizes="100vw"
            quality={85}
          />
          <div className="home-hero-shade" />
          <div className="home-container home-hero-inner">
            <div className="home-hero-copy">
              <p className="home-eyebrow">{copy("hero").eyebrow}</p>
              <h1 id="home-title">
                Memory Health{" "}
                <br />
                Life Center
              </h1>
              <p className="home-hero-tagline">{copy("hero").heading}</p>
              <p className="home-hero-description">{copy("hero").body}</p>
              <div className="home-actions">
                <HomeLink href={homeLinks.center} variant="teal">
                  Explore the Center
                </HomeLink>
                <HomeLink href="#give">Help build it</HomeLink>
              </div>
            </div>
            <div className="home-hero-bottom">
              <span>
                <a href="/assets/home-campus.webp">
                  Campus concept illustration
                </a>{" "}
                / Not a completed facility
              </span>
            </div>
          </div>
        </section>
        <div className="home-status-strip">
          <div className="home-container">
            <p>
              Looking for support today?{" "}
              <a href="#families">
                Start with family resources{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </p>
            <a href="#progress">
              Project status <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </div>

        <section
          className="home-section home-welcome"
          aria-labelledby="welcome-heading"
        >
          <div className="home-container home-welcome-grid" data-home-reveal>
            <HomeHeading
              eyebrow={copy("need").eyebrow}
              heading={copy("need").heading}
              id="welcome-heading"
            />
            <div className="home-welcome-aside">
              <p className="home-body">{copy("need").body}</p>
            </div>
          </div>
        </section>

        <section
          className="home-section home-response"
          aria-labelledby="response-heading"
        >
          <div className="home-container" data-home-reveal>
            <div className="home-response-lead">
              <HomeHeading
                eyebrow="What that means"
                heading="A regional response, shown through the people it serves."
                body="Each visitor comes with a different question. The vision is designed to meet people at those questions and connect them to the part of the work that matters most."
                id="response-heading"
              />
            </div>
            <div className="home-response-grid">
              {responsePaths.map((path) => (
                <article key={path.audience}>
                  <path.icon size={23} aria-hidden="true" />
                  <p className="home-response-audience">{path.audience}</p>
                  <h3>{path.title}</h3>
                  <p>{path.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="daily-life"
          className="home-section home-day"
          aria-labelledby="day-heading"
        >
          <div className="home-container">
            <div className="home-section-top" data-home-reveal>
              <HomeHeading
                eyebrow={copy("vision").eyebrow}
                heading={copy("vision").heading}
                id="day-heading"
              />
              <p className="home-body">{copy("vision").body}</p>
            </div>
            <figure className="home-day-art" data-home-reveal>
              <Image
                src="/assets/home-daily-life.webp"
                alt="Editorial illustration of neighbors enjoying a shaded porch, a garden walk, and time together outdoors"
                width={1536}
                height={1024}
                sizes="(max-width: 700px) 100vw, 1200px"
              />
              <figcaption>
                An illustrated day, envisioned for MHLC. Activities and spaces
                are conceptual.
              </figcaption>
            </figure>
            <ol className="home-day-moments" data-home-reveal>
              {dayMoments.map((moment, index) => (
                <li key={moment.time}>
                  <div className="home-moment-label">
                    <span>
                      0{index + 1} / {moment.time}
                    </span>
                    <moment.icon size={20} aria-hidden="true" />
                  </div>
                  <h3>{moment.title}</h3>
                  <p>{moment.text}</p>
                </li>
              ))}
            </ol>
            <div className="home-model-note" data-home-reveal>
              <div>
                <h3>{copy("services").heading}</h3>
                <p>{copy("services").body}</p>
              </div>
              <HomeLink href={homeLinks.center}>
                Discover the community model
              </HomeLink>
            </div>
          </div>
        </section>

        <section
          id="families"
          className="home-section home-families"
          aria-labelledby="families-heading"
        >
          <div className="home-container home-family-grid" data-home-reveal>
            <div>
              <span className="home-line-icon">
                <Heart size={27} aria-hidden="true" />
              </span>
              <HomeHeading {...copy("families")} id="families-heading" />
              <HomeLink href={homeLinks.families} variant="teal">
                Find family & caregiver resources
              </HomeLink>
            </div>
            <div className="home-family-questions">
              <p className="home-eyebrow">A few things you may be wondering</p>
              <details open>
                <summary>
                  Is the Center open?<span aria-hidden="true">+</span>
                </summary>
                <p>
                  MHLC is a planned community in development. The campus and
                  daily-life images on this page describe a future vision, not
                  currently available residential care.
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
                  and caregiving.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section
          id="regional-impact"
          className="home-section home-region"
          aria-labelledby="region-heading"
        >
          <div className="home-container">
            <div className="home-region-grid" data-home-reveal>
              <figure className="home-region-photo">
                <Image
                  src="/assets/home-woodland.webp"
                  alt="Trees and reflections along a wooded pond, from the Foundation's existing landscape collection"
                  fill
                  sizes="(max-width: 850px) 100vw, 50vw"
                />
                <figcaption>
                  <MapPin size={16} aria-hidden="true" /> Project location /
                  Quitman, Texas
                </figcaption>
              </figure>
              <div className="home-region-copy">
                <HomeHeading {...copy("partners")} id="region-heading" />
                <HomeLink href={`${homeLinks.center}#plans`}>
                  Explore the location & campus plans
                </HomeLink>
              </div>
            </div>
            <p className="home-caption home-region-disclaimer">
              These describe proposed project functions, not services currently
              available at the Center.
            </p>
          </div>
        </section>

        <section
          id="evidence"
          className="home-section home-evidence"
          aria-labelledby="evidence-heading"
        >
          <div className="home-container" data-home-reveal>
            <div className="home-section-top">
              <HomeHeading
                eyebrow="Get to know the project"
                heading="Look closer at the project."
                id="evidence-heading"
              />
              <HomeLink href={homeLinks.foundation}>
                Meet the Foundation
              </HomeLink>
            </div>
            <div className="home-evidence-list">
              <a
                href="/assets/Brief%20Overview%20MHLC%20project.pdf"
                className="home-project-brief"
              >
                <span className="home-evidence-type">
                  Project document / PDF / 4.2 MB
                </span>
                <BookOpen size={28} aria-hidden="true" />
                <h3>The MHLC project brief</h3>
                <p>
                  Explore the documented concept. For the latest plans and
                  funding needs, speak with the Foundation.
                </p>
                <span className="home-evidence-action">
                  Open the brief <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
              <a href="https://www.texastribune.org/2024/06/19/quitman-texas-memory-loss-care-center-alzehimers-dementia/">
                <span className="home-evidence-type">
                  Independent reporting / June 2024
                </span>
                <h3>The Texas Tribune</h3>
                <p>
                  Read reporting on the origins of the Quitman memory-care
                  vision.
                </p>
                <span className="home-evidence-action">
                  Read the story <ArrowUpRight aria-hidden="true" />
                </span>
              </a>
              <a href={homeLinks.supporters}>
                <span className="home-evidence-type">Voices of support</span>
                <h3>A community behind the idea.</h3>
                <p>
                  Explore letters of support from organizations and community
                  leaders.
                </p>
                <span className="home-evidence-action">
                  Read the letters <ArrowRight aria-hidden="true" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="progress"
          className="home-section home-progress"
          aria-labelledby="progress-heading"
        >
          <div className="home-container" data-home-reveal>
            <div className="home-section-top">
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
                      {item.date_label ? ` / ${item.date_label}` : ""}
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="home-current-status">
                <span className="home-status-label">
                  <span className="home-status-dot" /> In development
                </span>
                <p>
                  An opening date and admissions process are not announced on
                  this site.
                </p>
                <HomeLink href="#stay-connected">
                  Receive project updates
                </HomeLink>
              </div>
            )}
          </div>
        </section>

        <section
          id="give"
          className="home-section home-giving"
          aria-labelledby="giving-heading"
        >
          <div className="home-container home-giving-grid" data-home-reveal>
            <div>
              <p className="home-eyebrow">{copy("support").eyebrow}</p>
              <h2 id="giving-heading">{copy("support").heading}</h2>
              <p className="home-body">{copy("support").body}</p>
              <HomeLink href={giveHref} variant="clay">
                Make a gift
              </HomeLink>
            </div>
            <div className="home-major-gift">
              <p className="home-eyebrow">
                Major gifts & philanthropic partners
              </p>
              <h3>Help demonstrate a model for the wider region.</h3>
              <p>
                Discuss the current funding priorities, project plans, and how
                your support could help the Wood County Health Care Foundation
                advance a dementia response with impact beyond the future
                campus.
              </p>
              <HomeLink href={homeLinks.contact} variant="teal">
                Discuss a significant gift
              </HomeLink>
              <HomeLink href={homeLinks.foundation}>
                Meet the Foundation
              </HomeLink>
            </div>
          </div>
        </section>
        <section
          id="stay-connected"
          className="home-section home-subscribe"
          aria-labelledby="subscribe-heading"
        >
          <div className="home-container home-subscribe-grid" data-home-reveal>
            <HomeHeading
              eyebrow="Stay connected"
              heading="Be part of what comes next."
              body="Follow the vision as it develops. Receive news and project updates from the Memory Health Life Center."
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
              <p>
                A community in the making.
                <br />A vision for life with dementia.
              </p>
              <span className="home-footer-location">
                <MapPin size={15} aria-hidden="true" />
                Quitman, Texas
              </span>
            </div>
            <nav aria-label="Explore footer links">
              <h2>Explore</h2>
              <a href={homeLinks.center}>The Center</a>
              <a href="#families">For Families</a>
              <a href="#regional-impact">Regional Impact</a>
              <a href="#progress">Project Progress</a>
            </nav>
            <nav aria-label="Foundation footer links">
              <h2>Our Foundation</h2>
              <a href={homeLinks.foundation}>About the Foundation</a>
              <a href={homeLinks.supporters}>Letters of Support</a>
              <a href={homeLinks.recognition}>Donor Recognition</a>
              <a href={homeLinks.contact}>Contact Us</a>
            </nav>
            <div className="home-footer-connect">
              <h2>Good things begin together.</h2>
              <HomeLink href={giveHref}>Support the vision</HomeLink>
              <a href={homeLinks.contact} className="home-footer-contact">
                <MessageCircle size={18} aria-hidden="true" />
                Talk with the Foundation
              </a>
            </div>
          </div>
          <div className="home-footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Wood County Health Care
              Foundation.
            </p>
            <p>Memory Health Life Center is a project in development.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
