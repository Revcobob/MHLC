import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { homeLinks } from "@/lib/homeLinks";

export function HomeLink({
  href,
  children,
  variant = "text",
}: {
  href: string;
  children: ReactNode;
  variant?: "text" | "teal" | "clay" | "white" | "outline" | "outline-light";
}) {
  return (
    <a
      href={href}
      className={
        variant === "text"
          ? "home-text-link"
          : `home-button home-button-${variant}`
      }
    >
      {children}
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

export function HomeHeading({
  eyebrow,
  heading,
  body,
  id,
  level = 2,
}: {
  eyebrow: string;
  heading: string;
  body?: string;
  id?: string;
  level?: 2 | 3;
}) {
  const Tag = (level === 3 ? "h3" : "h2") as "h2" | "h3";
  return (
    <div className="home-heading">
      <p className="home-eyebrow">{eyebrow}</p>
      <div className="home-rule" aria-hidden="true" />
      <Tag id={id}>{heading}</Tag>
      {body && <p className="home-lead">{body}</p>}
    </div>
  );
}

/**
 * Brand lockup. Two sibling links — the project name and the Foundation
 * relationship — matching the header used on every secondary page.
 */
export function HomeBrand({ footer = false }: { footer?: boolean }) {
  return (
    <div className="home-brand">
      <a href="/" aria-label="Memory Health Life Center, home">
        <Image
          src="/assets/mhlc-brand-icon-512.png"
          alt=""
          width={52}
          height={76}
          sizes={
            footer
              ? "44px"
              : "(max-width: 640px) 34px, (max-width: 1080px) 42px, 64px"
          }
          priority={!footer}
        />
      </a>
      <span className="home-brand-text">
        {footer ? (
          <span className="home-brand-name">Memory Health Life Center</span>
        ) : (
          <a className="home-brand-name" href="/">
            Memory Health Life Center
          </a>
        )}
        <a className="home-brand-foundation" href={homeLinks.foundation}>
          A project of the Wood County Health Care Foundation
        </a>
      </span>
    </div>
  );
}

/**
 * Original schematic locator diagram. Straight-line distances are the figures
 * published on the project-overview page; the list beside it carries the same
 * data as text, so nothing here depends on reading the drawing.
 */
export function HomeRegionMap() {
  const C = { x: 430, y: 210 };
  const label = "#6C736E";
  const marker = (
    x: number,
    y: number,
    text: string,
    anchor: "start" | "middle" | "end",
    ly: number,
    lx = x,
  ) => (
    <g key={text}>
      <line x1={C.x} y1={C.y} x2={x} y2={y} stroke="#D3C9B6" strokeWidth={1} />
      <circle cx={x} cy={y} r={7} fill="#FBF8F2" />
      <circle cx={x} cy={y} r={4.5} fill="#0F4C4A" />
      <text
        x={lx}
        y={ly}
        textAnchor={anchor}
        fill={label}
        fontSize={13}
        fontWeight={600}
        letterSpacing="1.3"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {text}
      </text>
    </g>
  );
  return (
    <svg
      viewBox="158 100 626 248"
      role="img"
      aria-labelledby="home-map-title home-map-desc"
    >
      <title id="home-map-title">
        Straight-line distances from the Quitman project site
      </title>
      <desc id="home-map-desc">
        A schematic diagram centered on Quitman, Texas, with distance rings at
        25 and 50 miles. Interstate 30 lies 25 miles north, Interstate 20 lies
        25 miles south, the UT Tyler School of Medicine is 35 miles away, the
        Dallas-Fort Worth metro is 90 miles west, and Shreveport, Louisiana is
        116 miles east. The same figures are listed beside this diagram.
      </desc>
      <text
        x={196}
        y={332}
        textAnchor="start"
        fill="#EDE3D2"
        fontSize={30}
        fontWeight={700}
        letterSpacing="9"
        fontFamily="Inter, system-ui, sans-serif"
      >
        EAST TEXAS
      </text>
      {[55, 110].map((r) => (
        <circle
          key={r}
          cx={C.x}
          cy={C.y}
          r={r}
          fill="none"
          stroke="#DED4C1"
          strokeWidth={1}
          strokeDasharray="3 6"
        />
      ))}
      <text
        x={372}
        y={182}
        textAnchor="middle"
        fill="#B0A48F"
        fontSize={11}
        letterSpacing="1"
        fontFamily="Inter, system-ui, sans-serif"
      >
        25 MI
      </text>
      <text
        x={333}
        y={143}
        textAnchor="middle"
        fill="#B0A48F"
        fontSize={11}
        letterSpacing="1"
        fontFamily="Inter, system-ui, sans-serif"
      >
        50 MI
      </text>
      {marker(430, 155, "I-30", "middle", 140)}
      {marker(430, 265, "I-20", "end", 272, 412)}
      {marker(450, 284, "TYLER", "start", 296, 464)}
      {marker(232, 218, "DFW METRO", "middle", 198)}
      {marker(685, 238, "SHREVEPORT", "middle", 218)}
      <g>
        <circle cx={C.x} cy={C.y} r={12} fill="#F2D7CC" />
        <circle cx={C.x} cy={C.y} r={6} fill="#B8553A" />
        <text
          x={C.x + 22}
          y={C.y - 16}
          textAnchor="start"
          fill="#1F2421"
          fontSize={14}
          fontWeight={700}
          letterSpacing="1.5"
          fontFamily="Inter, system-ui, sans-serif"
        >
          QUITMAN, TX
        </text>
      </g>
      <g transform="translate(766 148)">
        <path
          d="M0 20 L0 -12 M-6 -4 L0 -14 L6 -4"
          fill="none"
          stroke="#B0A48F"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        <text
          x={0}
          y={-20}
          textAnchor="middle"
          fill="#B0A48F"
          fontSize={11}
          fontWeight={600}
          fontFamily="Inter, system-ui, sans-serif"
        >
          N
        </text>
      </g>
    </svg>
  );
}
