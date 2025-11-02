'use client';

interface BlogSkeletonProps {
  className?: string;
}

export const BlogSkeleton = ({ className = '' }: BlogSkeletonProps) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gray-200 animate-pulse ${className}`}>
      {/* Image Skeleton */}
      <div className="h-64 md:h-72 lg:h-80 bg-gray-300" />
      
      {/* Content Skeleton */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-800 to-transparent">
        {/* Category and Date */}
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-400 rounded w-20" />
          <div className="h-4 bg-gray-400 rounded w-24" />
        </div>
        
        {/* Title */}
        <div className="space-y-2 mb-4">
          <div className="h-6 bg-gray-300 rounded w-full" />
          <div className="h-6 bg-gray-300 rounded w-3/4" />
        </div>
        
        {/* Excerpt */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-400 rounded w-full" />
          <div className="h-4 bg-gray-400 rounded w-2/3" />
        </div>
        
        {/* Read More Button */}
        <div className="h-4 bg-gray-400 rounded w-24" />
      </div>
    </div>
  );
};

export const BlogGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, index) => (
        <BlogSkeleton 
          key={index}
          className="h-80 md:h-96"
        />
      ))}
    </div>
  );
}; 