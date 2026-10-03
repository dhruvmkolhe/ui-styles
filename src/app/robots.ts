import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Fully public gallery: no auth, admin or private routes exist,
// so everything is crawlable. Update `SITE_URL` (src/lib/site.ts)
// before deploying so the sitemap URL below is correct.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: siteUrl("/sitemap.xml"),
  };
}
