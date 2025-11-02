'use client';

import { useBlogs, useBlogCache } from '@/lib/hooks/useBlog';
import { BlogHero } from './BlogHero';
import { BlogGrid } from './BlogGrid';
import { useTranslations } from 'next-intl';

const Allblogs = () => {
  const t = useTranslations('AllBlogs');
  const { data: blogs = [], isLoading, error, refetch } = useBlogs();
  const { invalidateAllBlogs } = useBlogCache();

  const handleRefresh = async () => {
    try {
      // Invalidate the cache and refetch
      invalidateAllBlogs();
      await refetch();
    } catch (error) {
      console.error('Error refreshing blogs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
    
      
      
      
      {/* Blog Grid Section */}
      <BlogGrid 
        blogs={blogs}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default Allblogs;