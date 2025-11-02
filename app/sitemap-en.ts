import { MetadataRoute } from "next";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ned-swiss.ch";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/en`,          changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/en/about`,    changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/en/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/en/contact`,  changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/en/blogs`,    changeFrequency: "weekly",  priority: 0.5 },
  ];
}
