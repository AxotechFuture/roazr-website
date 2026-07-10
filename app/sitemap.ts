import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/demo`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/data-deletion`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
