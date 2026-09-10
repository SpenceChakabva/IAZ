import type { Metadata } from "next";

/**
 * Canonical origin for absolute URLs in metadata (OpenGraph, canonicals,
 * sitemap, robots).
 *
 *  1. NEXT_PUBLIC_SITE_URL          — set this once a custom domain is live
 *  2. VERCEL_PROJECT_PRODUCTION_URL — Vercel fills this in automatically
 *  3. the current deployment URL
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://iaz-omega.vercel.app")
).replace(/\/$/, "");

/**
 * The shared share card (app/opengraph-image.tsx, served at /opengraph-image).
 * Referenced explicitly because a route that sets its own `openGraph` object
 * does not otherwise inherit the file-convention image.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Institute of Architects of Zimbabwe — the register, the standard, the voice",
};

/** Per-page metadata — title + description feed the tab, search and share cards. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: "Institute of Architects of Zimbabwe",
      locale: "en_ZW",
      title,
      description,
      url: path,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
