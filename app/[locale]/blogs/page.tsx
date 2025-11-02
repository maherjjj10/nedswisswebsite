import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Allblogs from '@/components/blogs/Allblogs';

interface BlogsPageProps {
  params: Promise<{ locale: string }>;
}

// Remove ISR - let React Query handle all caching and revalidation
// This makes the page fully dynamic and lets React Query control the caching strategy

export async function generateMetadata({ params }: BlogsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AllBlogs' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  };
}

const BlogsPage = async ({ params }: BlogsPageProps) => {
  return <Allblogs />;
};

export default BlogsPage; 