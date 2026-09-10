import type { MetadataRoute } from "next";
import { NEWS } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/practice", priority: 0.8, changeFrequency: "yearly" },
    { path: "/register", priority: 0.9, changeFrequency: "weekly" },
    { path: "/education", priority: 0.8, changeFrequency: "yearly" },
    { path: "/news", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.6, changeFrequency: "yearly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...NEWS.map((n) => ({
      url: `${SITE_URL}/news/${n.slug}`,
      lastModified: new Date(n.date + "T00:00:00Z"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
