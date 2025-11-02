import type { Metadata } from "next";
import AboutPage from "./AboutPage";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ned-swiss.ch";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
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

export default function Page() {
  return <AboutPage />;
}
