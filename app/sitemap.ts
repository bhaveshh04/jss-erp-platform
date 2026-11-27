import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { ALL_LANDING_PAGES, landingPath } from "@/lib/landing-pages";

const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.6, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  // search-targeted landing pages (lib/landing-pages.ts)
  ...ALL_LANDING_PAGES.map((p) => ({ path: landingPath(p), priority: 0.9, changeFrequency: "monthly" as const })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
