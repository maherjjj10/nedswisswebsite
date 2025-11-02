'use client';

import Script from 'next/script';

interface StructuredDataProps {
  data: object;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema for NED Swiss
export function OrganizationSchema({ locale = 'en' }: { locale?: string }) {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.ned-swiss.ch#organization',
    name: 'NED Swiss',
    alternateName: 'NED Swiss Digital Agency',
    description: 'Swiss digital agency delivering exceptional web development, design, and digital marketing services with Swiss precision and excellence.',
    url: 'https://www.ned-swiss.ch',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.ned-swiss.ch/logo.png',
      width: 200,
      height: 60,
    },
    image: {
      '@type': 'ImageObject',
      url: 'https://www.ned-swiss.ch/nedswiss.jpg',
      width: 1200,
      height: 630,
    },
    sameAs: [
      'https://www.linkedin.com/company/ned-swiss',
      'https://www.instagram.com/nedswiss',
      'https://www.facebook.com/nedswiss',
      'https://twitter.com/nedswiss',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+41-44-123-45-67',
      contactType: 'customer service',
      email: 'Info@ned-swiss.ch',
      availableLanguage: ['en', 'de', 'fr'],
      areaServed: ['CH', 'DE', 'AT', 'FR', 'IT'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstrasse 123',
      addressLocality: 'Zürich',
      postalCode: '8001',
      addressCountry: 'CH',
      addressRegion: 'Zürich',
    },
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: '10-25',
    },
    knowsAbout: [
      'Web Development',
      'Graphic Design',
      'Digital Marketing',
      'SEO Services',
      'Social Media Management',
      'Software Solutions',
      'Advertising Solutions',
      'Brand Identity',
      'User Experience Design',
      'E-commerce Development',
    ],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Digital Agency Services',
        description: 'Comprehensive digital solutions including web development, design, and marketing',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Switzerland',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '50',
      bestRating: '5',
      worstRating: '1',
    },
  };

  return <StructuredData data={organizationData} />;
}

// Website Schema
export function WebsiteSchema({ locale = 'en' }: { locale?: string }) {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.ned-swiss.ch#website',
    name: 'NED Swiss',
    description: 'Digital excellence with Swiss precision - Web development, design, and marketing services',
    url: 'https://www.ned-swiss.ch',
    inLanguage: locale,
    publisher: {
      '@id': 'https://www.ned-swiss.ch#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.ned-swiss.ch/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    mainEntity: {
      '@id': 'https://www.ned-swiss.ch#organization',
    },
  };

  return <StructuredData data={websiteData} />;
}

// Service Schema
interface ServiceSchemaProps {
  serviceName: string;
  serviceDescription: string;
  serviceUrl: string;
  price?: string;
  locale?: string;
}

export function ServiceSchema({
  serviceName,
  serviceDescription,
  serviceUrl,
  price,
  locale = 'en',
}: ServiceSchemaProps) {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@id': 'https://www.ned-swiss.ch#organization',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Switzerland',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${serviceName} Services`,
      itemListElement: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: serviceName,
          description: serviceDescription,
        },
        ...(price && { price: price }),
        priceCurrency: 'CHF',
      },
    },
    category: 'Digital Services',
    audience: {
      '@type': 'BusinessAudience',
      name: 'Swiss Businesses',
    },
  };

  return <StructuredData data={serviceData} />;
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <StructuredData data={breadcrumbData} />;
}

// Article Schema for Blog Posts
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  locale?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  authorName = 'NED Swiss Team',
  imageUrl,
  locale = 'en',
}: ArticleSchemaProps) {
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: 'https://www.ned-swiss.ch',
    },
    publisher: {
      '@id': 'https://www.ned-swiss.ch#organization',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(imageUrl && {
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630,
      },
    }),
    inLanguage: locale,
  };

  return <StructuredData data={articleData} />;
}

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <StructuredData data={faqData} />;
}

// Local Business Schema (if NED Swiss has physical location)
export function LocalBusinessSchema({ locale = 'en' }: { locale?: string }) {
  const localBusinessData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.ned-swiss.ch#local-business',
    name: 'NED Swiss',
    description: 'Swiss digital agency delivering exceptional web development, design, and digital marketing services',
    url: 'https://www.ned-swiss.ch',
    telephone: '+41-44-123-45-67',
    email: 'Info@ned-swiss.ch',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstrasse 123',
      addressLocality: 'Zürich',
      postalCode: '8001',
      addressCountry: 'CH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '47.3769',
      longitude: '8.5417',
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 10:00-16:00',
    ],
    priceRange: '$$',
    currenciesAccepted: 'CHF, EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    hasMap: 'https://maps.google.com/?q=Bahnhofstrasse+123,+Zürich',
  };

  return <StructuredData data={localBusinessData} />;
} 