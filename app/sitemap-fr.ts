import { MetadataRoute } from "next";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ned-swiss.ch";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/fr`,          changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/fr/about`,    changeFrequency: "yearly",  priority: 0.6 },
    { url: `${BASE}/fr/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/fr/contact`,  changeFrequency: "yearly",  priority: 0.5 },
    { url: `${BASE}/fr/blogs`,    changeFrequency: "weekly",  priority: 0.5 },
  ];
}
