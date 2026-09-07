import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAnon } from "@/lib/supabase/server";
import { supabaseConfigured } from "@/lib/env";
import type {
  PageRow,
  PageSection,
  SiteSettings,
  TimelineMilestone,
} from "@/lib/resources/types";

export const homeCopy = {
  hero: {
    eyebrow: "Quitman, Texas / A community in development",
    heading: "A better way for a region to respond to dementia.",
    body: "Memory Health Life Center is being developed as more than a place to live. The vision connects residential life, family support, caregiver learning, healthcare partnership, and regional memory-health capacity.",
  },
  need: {
    eyebrow: "The larger purpose",
    heading: "The Center is one answer to several connected needs.",
    body: "Dementia changes life for the person diagnosed, the family around them, the caregivers beside them, and the rural health systems trying to help. MHLC gives the region a visible place to gather that work.",
  },
  vision: {
    eyebrow: "The residential-community idea",
    heading: "A day at MHLC.",
    body: "Imagine a day shaped by familiar routines and shared moments. This is the everyday life our proposed community is designed around.",
  },
  services: {
    eyebrow: "A different approach",
    heading: "Designed around living.",
    body: "Inspired by the Hogeweyk model, the proposed campus brings homes, outdoor spaces, and shared places together in a familiar neighborhood setting.",
  },
  partners: {
    eyebrow: "Rooted here. Reaching further.",
    heading: "Rooted in Quitman. For all of East Texas.",
    body: "The proposed campus has a purpose beyond its homes: a place for caregiver education and healthcare training, connecting the residential vision with the needs of the wider region.",
  },
  progress: {
    eyebrow: "The path forward",
    heading: "Where the project stands.",
    body: "MHLC remains in development. The Foundation is the point of contact for current plans, funding needs, and the next steps toward opening.",
  },
  support: {
    eyebrow: "Build it with us",
    heading: "Help make everyday life the heart of memory care.",
    body: "Support a residential-community vision for East Texas. Begin with a gift, or talk with the Foundation about a larger commitment and the project's current needs.",
  },
  families: {
    eyebrow: "For families & caregivers",
    heading: "You do not have to find your way alone.",
    body: "Exploring the future is one thing. Finding support today is another. Our family and caregiver resources are a place to begin now.",
  },
  final_cta: {
    eyebrow: "The next chapter starts together",
    heading: "Help build a place where life continues.",
    body: "For our families. For our neighbors. For East Texas.",
  },
};

export type HomeCopyKey = keyof typeof homeCopy;

export function safeHomeHref(
  value: string | null | undefined,
  fallback: string,
): string {
  if (!value || /[\s\\\u0000-\u001f]/.test(value)) return fallback;
  if (
    value.startsWith("#") ||
    (value.startsWith("/") && !value.startsWith("//"))
  )
    return value;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : fallback;
  } catch {
    return fallback;
  }
}

// Read existing CMS records directly; no HTML injection or new database schema.
export const getHomeContent = cache(async () => {
  const empty = {
    sections: [] as PageSection[],
    page: null as PageRow | null,
    settings: null as SiteSettings | null,
    milestones: [] as TimelineMilestone[],
  };
  if (!supabaseConfigured()) return empty;
  noStore();
  try {
    const sb = supabaseAnon();
    const [sections, page, settings, milestones] = await Promise.all([
      sb
        .from("page_sections")
        .select("*")
        .eq("page_slug", "homepage")
        .abortSignal(AbortSignal.timeout(3000)),
      sb
        .from("pages")
        .select("*")
        .eq("slug", "homepage")
        .abortSignal(AbortSignal.timeout(3000))
        .maybeSingle(),
      sb
        .from("site_settings")
        .select("*")
        .eq("id", 1)
        .abortSignal(AbortSignal.timeout(3000))
        .maybeSingle(),
      sb
        .from("timeline_milestones")
        .select("*")
        .order("order_index")
        .abortSignal(AbortSignal.timeout(3000)),
    ]);
    if ([sections, page, settings, milestones].some((result) => result.error)) {
      console.warn(
        "Homepage CMS read incomplete; using local defaults for unavailable records.",
      );
    }
    return {
      sections: (sections.data ?? []) as PageSection[],
      page: page.data as PageRow | null,
      settings: settings.data as SiteSettings | null,
      milestones: (milestones.data ?? []) as TimelineMilestone[],
    };
  } catch {
    console.warn("Homepage CMS unavailable; using local content.");
    return empty;
  }
});

export function sectionCopy(key: HomeCopyKey, sections: PageSection[]) {
  const row = sections.find((section) => section.section_key === key);
  const fallback = homeCopy[key];
  return {
    eyebrow: row?.eyebrow || fallback.eyebrow,
    heading: row?.heading || fallback.heading,
    body: row?.body || fallback.body,
  };
}
