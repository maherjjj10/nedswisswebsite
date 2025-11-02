import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getDirection, locales, type Locale } from '@/app/i18n';
import { Providers } from '@/lib/providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import SimpleVisitorTracker from '@/components/SimpleVisitorTracker';
import WhatsAppButton from '@/components/contact/WhatsAppButton';
import { VisitorTrackerTestButton } from '@/components/test/VisitorTrackerTest';
import { OrganizationSchema, WebsiteSchema, LocalBusinessSchema } from '@/components/seo/StructuredData';

const inter = Inter({ subsets: ['latin'] });

// This metadata will be overridden by page-specific metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://nedswiss.com'),
  title: {
    default: 'NED Swiss | Digital Excellence, Swiss Precision',
    template: '%s | NED Swiss',
  },
  description: 'Leading Swiss digital agency delivering exceptional web development, design, and digital marketing services with Swiss precision and excellence.',
  keywords: 'NED Swiss, Swiss digital agency, web development, graphic design, digital marketing, SEO services, Swiss precision',
  authors: [{ name: 'NED Swiss Team', url: 'https://nedswiss.com' }],
  creator: 'NED Swiss',
  publisher: 'NED Swiss',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nedswiss.com',
    siteName: 'NED Swiss',
    title: 'NED Swiss | Digital Excellence, Swiss Precision',
    description: 'Leading Swiss digital agency delivering exceptional web development, design, and digital marketing services.',
    images: [
      {
        url: 'https://nedswiss.com/nedswiss.jpg',
        width: 1200,
        height: 630,
        alt: 'NED Swiss - Digital Excellence, Swiss Precision',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NED Swiss | Digital Excellence, Swiss Precision',
    description: 'Leading Swiss digital agency delivering exceptional web development, design, and digital marketing services.',
    site: '@nedswiss',
    creator: '@nedswiss',
    images: ['https://nedswiss.com/nedswiss.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    return null; // or redirect to 404
  }

  const direction = getDirection(locale as Locale);
  // Load messages for next-intl client components
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={direction}>
      <head>
        <OrganizationSchema locale={locale} />
        <WebsiteSchema locale={locale} />
        <LocalBusinessSchema locale={locale} />
      </head>
      <body className={inter.className}>
        <Providers locale={locale} messages={messages}>
          <LayoutWrapper>
            <Header />
            <WhatsAppButton />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <SimpleVisitorTracker />
            <VisitorTrackerTestButton />
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}