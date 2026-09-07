"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, LoaderCircle, Menu, X } from "lucide-react";
import Script from "next/script";
import { homeLinks } from "@/lib/homeLinks";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        !panel.current?.contains(event.target as Node) &&
        !trigger.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <div className="home-mobile-nav">
      <button
        ref={trigger}
        type="button"
        className="home-icon-button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="home-mobile-menu"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <div id="home-mobile-menu" ref={panel} hidden={!open}>
        <nav aria-label="Mobile navigation" onClick={() => setOpen(false)}>
          <a href={homeLinks.center}>
            The Project <ArrowRight />
          </a>
          <a href="#welcome-heading">
            The Need <ArrowRight />
          </a>
          <a href="#progress">
            Progress <ArrowRight />
          </a>
          <a href="#families">
            Families <ArrowRight />
          </a>
          <a href="#regional-impact">
            Regional Impact <ArrowRight />
          </a>
          <a href={homeLinks.foundation}>
            Foundation <ArrowRight />
          </a>
          <a href={homeLinks.contact}>
            Contact <ArrowRight />
          </a>
        </nav>
      </div>
    </div>
  );
}

export function HomeMotion() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    // Content remains visible without JavaScript; only off-screen sections are enhanced.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("home-reveal-pending");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll("[data-home-reveal]").forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add("home-reveal-pending");
        observer.observe(element);
      }
    });
    const revealAll = () =>
      document
        .querySelectorAll(".home-reveal-pending")
        .forEach((el) => el.classList.remove("home-reveal-pending"));
    const onFocus = (event: FocusEvent) =>
      (event.target as HTMLElement)
        ?.closest("[data-home-reveal]")
        ?.classList.remove("home-reveal-pending");
    media.addEventListener("change", revealAll);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer.disconnect();
      revealAll();
      media.removeEventListener("change", revealAll);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}

type CaptchaApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    hcaptcha?: CaptchaApi;
  }
}

export function SubscribeForm({ captchaSiteKey }: { captchaSiteKey: string }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const captchaToken = useRef("");
  const captchaElement = useRef<HTMLDivElement>(null);
  const captchaId = useRef<string>();
  useEffect(() => {
    if (
      !captchaReady ||
      !captchaSiteKey ||
      !captchaElement.current ||
      !window.hcaptcha
    )
      return;
    captchaId.current = window.hcaptcha.render(captchaElement.current, {
      sitekey: captchaSiteKey,
      size: "compact",
      callback: (token: string) => {
        captchaToken.current = token;
      },
      "expired-callback": () => {
        captchaToken.current = "";
      },
      "error-callback": () => {
        captchaToken.current = "";
        setState("error");
        setMessage(
          "The spam check could not load. Please try again or contact the Foundation.",
        );
      },
    });
    return () => {
      if (captchaId.current) window.hcaptcha?.remove(captchaId.current);
    };
  }, [captchaReady, captchaSiteKey]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    if (captchaSiteKey && !captchaToken.current) {
      setState("error");
      setMessage("Please complete the spam check.");
      return;
    }
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/public/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          email: data.get("email"),
          honeypot: data.get("website"),
          source: "homepage",
          source_label: "Homepage community updates",
          consent_text:
            "I agree to receive Memory Health Life Center project updates by email.",
          captchaToken: captchaToken.current,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok || result.queued) {
        throw new Error(
          result?.queued
            ? "Email updates are temporarily unavailable. Your email has not been saved. Please contact the Foundation."
            : result?.error ||
                "We could not save your email. Please try again.",
        );
      }
      setState("success");
      setMessage("Thank you. You are signed up for project updates.");
      form.reset();
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof TypeError
          ? "We could not connect. Please try again or contact the Foundation."
          : error instanceof Error && error.name !== "TimeoutError"
            ? error.message
            : "The request timed out. Please try again.",
      );
    } finally {
      captchaToken.current = "";
      if (captchaId.current) window.hcaptcha?.reset(captchaId.current);
    }
  }

  return (
    <form
      className="home-subscribe-form"
      method="post"
      action="/api/public/subscribe"
      onSubmit={submit}
      aria-label="Project updates signup"
    >
      <label htmlFor="home-email">Your email address</label>
      <div className="home-email-row">
        <input
          id="home-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={254}
          disabled={state === "sending"}
          aria-describedby="home-signup-message"
        />
        <button
          className="home-button home-button-teal"
          type="submit"
          disabled={state === "sending"}
        >
          {state === "sending" ? "Signing up" : "Keep me updated"}
          {state === "sending" ? (
            <LoaderCircle className="home-spin" aria-hidden="true" />
          ) : state === "success" ? (
            <Check aria-hidden="true" />
          ) : (
            <ArrowRight aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="home-honeypot" aria-hidden="true">
        <label htmlFor="home-website">Website</label>
        <input
          id="home-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="home-consent">
        <input name="consent" type="checkbox" required />{" "}
        <span>
          I agree to receive MHLC project updates by email. I can contact the
          Foundation to stop these emails at any time.
        </span>
      </label>
      {captchaSiteKey && (
        <>
          <Script
            src="https://js.hcaptcha.com/1/api.js?render=explicit"
            strategy="lazyOnload"
            onReady={() => setCaptchaReady(true)}
            onError={() => {
              setState("error");
              setMessage(
                "The spam check could not load. Please contact the Foundation.",
              );
            }}
          />
          <div ref={captchaElement} />
        </>
      )}
      <p
        id="home-signup-message"
        className={`home-form-message ${state === "error" ? "is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
      {state === "error" && (
        <a className="home-text-link" href={homeLinks.contact}>
          Contact the Foundation <ArrowRight aria-hidden="true" />
        </a>
      )}
    </form>
  );
}
