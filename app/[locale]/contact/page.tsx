import type { Metadata } from "next";

const BASE = "https://www.ned-swiss.ch";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const locale = params.locale;
  const self = `${BASE}/${locale}/about`;

  return {
    alternates: {
      canonical: self,
      languages: {
        en: `${BASE}/en/about`,
        de: `${BASE}/de/about`,
        fr: `${BASE}/fr/about`,
        "x-default": `${BASE}/`,
      },
    },
  };
}
