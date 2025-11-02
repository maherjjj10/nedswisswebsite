import type { Metadata } from 'next'
import ClientAbout from './ClientAbout'

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.ned-swiss.ch'

export async function generateMetadata(): Promise<Metadata> {
  const self = `${BASE}/en/about`
  return {
    alternates: {
      canonical: self,
      languages: {
        de: `${BASE}/de/about`,
        en: `${BASE}/en/about`,
        fr: `${BASE}/fr/about`,
        'x-default': `${BASE}/`,
      },
    },
  }
}

export default function Page() {
  return <ClientAbout />
}
