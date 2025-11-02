import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["de", "en", "fr"],
    defaultLocale: "de"
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'nedsite.runasp.net'],
  },
};

export default withNextIntl(nextConfig);
