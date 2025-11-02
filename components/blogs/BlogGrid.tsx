'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogCard } from './BlogCard';
import { BlogGridSkeleton } from './BlogSkeleton';
import { Blog } from '@/lib/types/blog';

interface BlogGridProps {
  blogs?: Blog[];
  isLoading?: boolean;
  error?: Error | null;
}

export const BlogGrid = ({ blogs = [], isLoading, error }: BlogGridProps) => {
  const t = useTranslations('BlogGrid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const allCategories = blogs.flatMap(blog => blog.tags);
    const uniqueCategories = Array.from(new Set(allCategories));
    return ['all', ...uniqueCategories];
  }, [blogs]);

  // Filter blogs based on selected category
  const filteredBlogs = useMemo(() => {
    // Only show published blogs (status === 1)
    const publishedBlogs = blogs.filter(blog => blog.status === 1);
    
    if (selectedCategory === 'all') {
      return publishedBlogs;
    }
    return publishedBlogs.filter(blog => 
      blog.tags.includes(selectedCategory)
    );
  }, [blogs, selectedCategory]);

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('error.title', { default: 'Unable to load blogs' })}
          </h3>
          <p className="text-gray-600 mb-4">
            {t('error.message', { default: 'There was an error loading the blog posts. Please try again later.' })}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            {t('error.retry', { default: 'Try Again' })}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t('title', { default: 'Latest Insights' })}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('subtitle', { default: 'Stay updated with the latest trends, insights, and stories from our digital experts.' })}
          </motion.p>
        </div>

        {/* Category Filter */}
        {/* <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {category === 'all' ? t('categories.all', { default: 'All' }) : category}
            </button>
          ))}
        </motion.div> */}

        {/* Loading State */}
        {isLoading && <BlogGridSkeleton />}

        {/* Blog Grid */}
        {!isLoading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredBlogs.map((blog, index) => {
                // First blog takes full width
                if (index === 0) {
                  return (
                    <motion.div
                      key={blog.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 0,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-full"
                    >
                      <BlogCard 
                        blog={blog} 
                        className="h-[400px] md:h-[500px] lg:h-[600px]"
                      />
                    </motion.div>
                  );
                }

                // Remaining blogs in pairs
                const pairIndex = Math.floor((index - 1) / 2);
                const isFirstInPair = (index - 1) % 2 === 0;

                if (isFirstInPair) {
                  const nextBlog = filteredBlogs[index + 1];
                  return (
                    <motion.div
                      key={`pair-${pairIndex}`}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: (pairIndex + 1) * 0.1,
                        ease: "easeOut"
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                      <BlogCard 
                        blog={blog} 
                        className="h-[350px] md:h-[400px]"
                      />
                      {nextBlog && (
                        <BlogCard 
                          blog={nextBlog} 
                          className="h-[350px] md:h-[400px]"
                        />
                      )}
                    </motion.div>
                  );
                }

                // Skip rendering for second item in pair as it's handled above
                return null;
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {/* Empty State */}
        {!isLoading && filteredBlogs.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('empty.title', { default: 'No articles found' })}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('empty.message', { 
                default: selectedCategory === 'all' 
                  ? 'No blog posts are currently available.' 
                  : `No articles found in the "${selectedCategory}" category.` 
              })}
            </p>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
              >
                {t('empty.viewAll', { default: 'View All Articles' })}
              </button>
            )}
          </motion.div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {!isLoading && filteredBlogs.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-3 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-semibold transition-all duration-300 hover:shadow-lg">
              {t('loadMore', { default: 'Load More Articles' })}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}; 