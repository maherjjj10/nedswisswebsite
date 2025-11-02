import { MetadataRoute } from "next";
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ned-swiss.ch";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: [
      `${BASE}/sitemap-de.xml`,
      `${BASE}/sitemap-en.xml`,
      `${BASE}/sitemap-fr.xml`,
    ],
  };
}
