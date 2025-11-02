'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { Blog } from '@/lib/types/blog';
import { blogAPI } from '@/lib/api/blog';
import { useBlogs } from '@/lib/hooks/useBlog';
import { MarkdownContent } from './MarkdownContent';
import { HtmlContent } from './HtmlContent';
import { PlaceholderImage } from './PlaceholderImage';
import { BlogCard } from './BlogCard';
import { useMemo } from 'react';

interface BlogDetailProps {
  blog: Blog;
}

export const BlogDetail = ({ blog }: BlogDetailProps) => {
  const t = useTranslations('BlogDetail');
  
  // Fetch all blogs to find related ones
  const { data: allBlogs = [], isLoading: blogsLoading } = useBlogs();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return null;
    return blogAPI.formatImageUrl(imagePath);
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Find related blogs based on shared tags
  const relatedBlogs = useMemo(() => {
    if (!allBlogs.length || !blog.tags.length) return [];
    
    const currentBlogTags = blog.tags.map(tag => tag.toLowerCase());
    
    const related = allBlogs
      .filter(b => 
        b.id !== blog.id && // Exclude current blog
        b.status === 1 && // Only published blogs
        b.tags.some(tag => currentBlogTags.includes(tag.toLowerCase())) // Has shared tags
      )
      .map(b => ({
        ...b,
        sharedTagsCount: b.tags.filter(tag => 
          currentBlogTags.includes(tag.toLowerCase())
        ).length
      }))
      .sort((a, b) => b.sharedTagsCount - a.sharedTagsCount) // Sort by relevance
      .slice(0, 2); // Take top 2 most relevant
    
    return related;
  }, [allBlogs, blog.id, blog.tags]);

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        {blog.coverImage ? (
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(blog.coverImage)!}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0">
            <PlaceholderImage 
              title={blog.title}
              className="w-full h-full"
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-end">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              {/* Back Button */}
              <Link
                href="/blogs"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white mb-6 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('backToBlog', { default: 'Back to Blog' })}</span>
              </Link>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-full border border-white/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {blog.title}
              </h1>

              {/* Excerpt */}
              {blog.excerpt && (
                <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed max-w-3xl">
                  {blog.excerpt}
                </p>
              )}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
                
                
               
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
                              {/* Content */}
                <div className="p-8 md:p-12 lg:p-16">
                  {blog.content.type === 'markdown' ? (
                    <MarkdownContent content={blog.content.body} className="text-lg lg:text-xl" />
                  ) : blog.content.type === 'html' ? (
                    <HtmlContent content={blog.content.body} className="text-2xl lg:text-3xl" />
                  ) : (
                    <div className="prose prose-xl lg:prose-2xl max-w-none">
                      <p className="text-gray-700 leading-relaxed text-xl lg:text-2xl whitespace-pre-wrap">
                        {blog.content.body}
                      </p>
                    </div>
                  )}
                </div>

            

              {/* Related Blogs Section */}
              <div className="mt-16 px-8 md:px-12 lg:px-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    Explore More <span className="text-red-500">Blogs</span>
                  </h2>
                </div>
                
                {/* Related Blog Cards Grid */}
                {blogsLoading ? (
                  // Loading skeleton for related blogs
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {[...Array(2)].map((_, index) => (
                      <div
                        key={index}
                        className="h-64 bg-gray-200 animate-pulse rounded-2xl"
                      />
                    ))}
                  </div>
                ) : relatedBlogs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {relatedBlogs.map((relatedBlog) => (
                      <motion.div
                        key={relatedBlog.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <BlogCard 
                          blog={relatedBlog}
                          className="h-[500px]"
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // No related blogs found
                  <div className="text-center py-12 mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Tag className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {t('noRelatedBlogs', { default: 'No Related Articles Found' })}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {t('noRelatedBlogsMessage', { 
                        default: 'Check out our blog page for more interesting articles.' 
                      })}
                    </p>
                    <Link
                      href="/blogs"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                    >
                      <span>{t('viewAllBlogs', { default: 'View All Blogs' })}</span>
                      <ArrowLeft className="w-5 h-5 rotate-180" />
                    </Link>
                  </div>
                )}

                
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </article>
  );
}; 