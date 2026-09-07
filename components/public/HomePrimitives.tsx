import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function HomeLink({
  href,
  children,
  variant = "text",
}: {
  href: string;
  children: ReactNode;
  variant?: "text" | "teal" | "clay" | "white" | "outline";
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
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

export function HomeHeading({
  eyebrow,
  heading,
  body,
  id,
}: {
  eyebrow: string;
  heading: string;
  body?: string;
  id?: string;
}) {
  return (
    <div className="home-heading">
      <p className="home-eyebrow">{eyebrow}</p>
      <h2 id={id}>{heading}</h2>
      {body && <p className="home-body">{body}</p>}
    </div>
  );
}

export function HomeBrand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`home-brand ${footer ? "home-brand-footer" : ""}`}
      href="/"
      aria-label="Memory Health Life Center home"
    >
      <Image
        src="/assets/mhlc-brand-icon-512.png"
        alt=""
        width={38}
        height={58}
        sizes="38px"
      />
      <span>
        Memory Health Life Center
        <small>A project of the Wood County Health Care Foundation</small>
      </span>
    </a>
  );
}
