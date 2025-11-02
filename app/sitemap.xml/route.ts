import { NextResponse } from "next/server";

const BASE = "https://www.ned-swiss.ch";
const LOCALES = ["de","en","fr"];
const PAGES = ["", "/about", "/services", "/contact", "/blogs"];

export const dynamic = "force-static";

export function GET() {
  const now = new Date().toISOString();

  const urls = PAGES.flatMap(path =>
    LOCALES.map(lang => `
<url>
  <loc>${BASE}/${lang}${path}</loc>
  <lastmod>${now}</lastmod>
  <xhtml:link rel="alternate" hreflang="de" href="${BASE}/de${path}" />
  <xhtml:link rel="alternate" hreflang="en" href="${BASE}/en${path}" />
  <xhtml:link rel="alternate" hreflang="fr" href="${BASE}/fr${path}" />
  <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}/de${path}" />
</url>`));

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ` +
    `xmlns:xhtml="http://www.w3.org/1999/xhtml">` +
    urls.join("") +
    `</urlset>`;

  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}
