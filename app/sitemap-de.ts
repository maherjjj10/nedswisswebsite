import { MetadataRoute } from "next";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ned-swiss.ch";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/de`,          changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/de/about`,    changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/de/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/de/contact`,  changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/de/blogs`,    changeFrequency: "weekly",  priority: 0.5 },
  ];
}
