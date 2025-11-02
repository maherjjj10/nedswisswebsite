'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Blog } from '@/lib/types/blog';
import { blogAPI } from '@/lib/api/blog';
import { PlaceholderImage } from './PlaceholderImage';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

export const BlogCard = ({ blog, className = '' }: BlogCardProps) => {
  const t = useTranslations('BlogCard');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder-blog.jpg';
    return blogAPI.formatImageUrl(imagePath);
  };

  const getCategoryFromTags = (tags: string[]) => {
    if (tags.length === 0) return 'General';
    return tags[0];
  };

  const backgroundStyle = blog.coverImage && blog.coverImage !== '/placeholder-blog.jpg' 
    ? {
        backgroundImage: `url(${getImageUrl(blog.coverImage)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }
    : {};

  return (
    <Link 
      href={`/blogs/${blog.slug}`}
      className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl bg-cover bg-center bg-no-repeat hover:bg-[length:110%] ${className}`}
      style={{
        ...backgroundStyle,
        transition: 'all 0.5s ease, background-size 0.7s ease',
      }}
    >
      {/* Fallback for blogs without images */}
      {(!blog.coverImage || blog.coverImage === '/placeholder-blog.jpg') && (
        <div className="absolute inset-0">
          <PlaceholderImage 
            title={blog.title}
            className="w-full h-full"
          />
        </div>
      )}
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50 transition-all duration-700 group-hover:from-black/90 group-hover:via-black/30" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-xs font-semibold text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
          {getCategoryFromTags(blog.tags)}
        </span>
      </div>

      {/* Status Indicator */}
      {blog.status === 1 && (
        <div className="absolute top-4 right-4 z-10">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
      )}

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight group-hover:text-blue-300 transition-colors duration-300">
          {blog.title}
        </h3>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
          <span className="font-medium">
            {getCategoryFromTags(blog.tags)}
          </span>
          <span>
            {formatDate(blog.publishedAt)}
          </span>
        </div>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-2 mb-4">
            {blog.excerpt}
          </p>
        )}

        {/* Read More Button */}
        <div className="flex items-center text-blue-300 font-semibold text-sm group-hover:text-blue-200 transition-colors duration-300">
          <span className="mr-2">{t('readMore', { default: 'Read More' })}</span>
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </Link>
  );
}; 