import { BlogGridSkeleton } from '@/components/blogs/BlogSkeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="animate-pulse">
            {/* Title Skeleton */}
            <div className="h-12 md:h-16 bg-gray-300 rounded-lg mb-6 mx-auto max-w-2xl" />
            {/* Subtitle Skeleton */}
            <div className="h-6 bg-gray-300 rounded-lg mb-8 mx-auto max-w-xl" />
            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-gray-300 rounded-full w-40" />
              <div className="h-12 bg-gray-300 rounded-full w-40" />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header Skeleton */}
          <div className="text-center mb-12 animate-pulse">
            <div className="h-10 bg-gray-300 rounded-lg mb-4 mx-auto max-w-md" />
            <div className="h-6 bg-gray-300 rounded-lg mx-auto max-w-2xl" />
          </div>

          {/* Category Filter Skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-pulse">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-10 bg-gray-300 rounded-full w-20" />
            ))}
          </div>

          {/* Blog Grid Skeleton */}
          <BlogGridSkeleton />
        </div>
      </section>
    </div>
  );
} 