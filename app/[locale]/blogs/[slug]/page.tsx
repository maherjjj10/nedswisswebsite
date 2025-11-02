import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateBlogPostMetadata } from '@/lib/seo/metadata';
import { BlogDetailClient } from '@/components/blogs/BlogDetailClient';

interface BlogDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface BlogItem {
  slug: string;
  status: number;
  title: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
  coverImage?: string;
}

// Remove Next.js ISR - React Query will handle all caching and revalidation
// This approach gives us more control over caching strategies and makes the app more responsive

// Simple blog fetching without Next.js caching - React Query handles this
async function getBlogBySlug(slug: string) {
  try {
    const response = await fetch(`https://nedsite.runasp.net/api/Blog/slug/${slug}`, {
      cache: 'no-store', // Let React Query handle caching
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    return {
      title: 'Blog Post Not Found | NED Swiss',
      description: 'The blog post you are looking for could not be found.',
    };
  }

  const t = await getTranslations({ locale, namespace: 'BlogDetail' });
  
  return {
    title: `${blog.title} | NED Swiss Blog`,
    description: blog.excerpt || blog.title,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || blog.title,
      type: 'article',
      publishedTime: blog.publishedAt,
      tags: blog.tags,
      images: blog.coverImage ? [`https://nedsite.runasp.net${blog.coverImage}`] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt || blog.title,
      images: blog.coverImage ? [`https://nedsite.runasp.net${blog.coverImage}`] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) {
    notFound();
  }

  return <BlogDetailClient initialBlog={blog} />;
} 