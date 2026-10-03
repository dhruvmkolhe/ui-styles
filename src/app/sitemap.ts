import type { MetadataRoute } from "next";
import { STYLE_LIST } from "@/lib/styles/registry";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: siteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: siteUrl("/explore"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: siteUrl("/components"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...STYLE_LIST.map((s) => ({
      url: siteUrl(`/style/${s.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
