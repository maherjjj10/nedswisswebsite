'use client';

import { useQuery, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { blogAPI } from '../api/blog';
import { Blog, BlogFilters } from '../types/blog';

// Query keys for consistent caching
export const blogQueryKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogQueryKeys.all, 'list'] as const,
  list: (filters: BlogFilters) => [...blogQueryKeys.lists(), filters] as const,
  details: () => [...blogQueryKeys.all, 'detail'] as const,
  detail: (id: number) => [...blogQueryKeys.details(), id] as const,
  slug: (slug: string) => [...blogQueryKeys.details(), 'slug', slug] as const,
};

// ISR-like behavior with React Query: Fresh data every 5 minutes, instant cache serving
export const useBlogs = (): UseQueryResult<Blog[], Error> => {
  return useQuery({
    queryKey: blogQueryKeys.list({}),
    queryFn: () => blogAPI.getAllBlogs(),
    staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for this duration
    gcTime: 30 * 60 * 1000, // 30 minutes - keep in cache longer for better UX
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true, // Refetch when user returns to tab
    refetchOnMount: true, // Always check for updates on mount
    refetchInterval: 5 * 60 * 1000, // Background refetch every 5 minutes (ISR-like)
    refetchIntervalInBackground: true, // Continue refetching even when tab is not active
  });
};

// ISR-like behavior for published blogs with optimized filtering
export const usePublishedBlogs = (): UseQueryResult<Blog[], Error> => {
  return useQuery({
    queryKey: blogQueryKeys.list({ status: 1 }),
    queryFn: async () => {
      const blogs = await blogAPI.getAllBlogs();
      return blogs.filter(blog => blog.status === 1);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes fresh time
    gcTime: 30 * 60 * 1000, // 30 minutes cache time
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 5 * 60 * 1000, // Background refetch every 5 minutes
    refetchIntervalInBackground: true,
  });
};

// ISR-like behavior for individual blog posts
export const useBlog = (id: number): UseQueryResult<Blog, Error> => {
  return useQuery({
    queryKey: blogQueryKeys.detail(id),
    queryFn: () => blogAPI.getBlogById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes fresh time
    gcTime: 60 * 60 * 1000, // 1 hour cache time (longer for individual posts)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 5 * 60 * 1000, // Background refetch every 5 minutes
    refetchIntervalInBackground: false, // Don't refetch individual posts in background
  });
};

// ISR-like behavior for blog by slug with enhanced caching
export const useBlogBySlug = (slug: string): UseQueryResult<Blog, Error> => {
  return useQuery({
    queryKey: blogQueryKeys.slug(slug),
    queryFn: () => blogAPI.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes fresh time
    gcTime: 60 * 60 * 1000, // 1 hour cache time (longer for individual posts)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 5 * 60 * 1000, // Background refetch every 5 minutes
    refetchIntervalInBackground: false, // Don't refetch individual posts in background
  });
};

// Hook for prefetching blogs (useful for server-side prefetching)
export const usePrefetchBlogs = () => {
  const queryClient = useQueryClient();

  const prefetchBlogs = async () => {
    await queryClient.prefetchQuery({
      queryKey: blogQueryKeys.list({}),
      queryFn: () => blogAPI.getAllBlogs(),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchBlogBySlug = async (slug: string) => {
    await queryClient.prefetchQuery({
      queryKey: blogQueryKeys.slug(slug),
      queryFn: () => blogAPI.getBlogBySlug(slug),
      staleTime: 5 * 60 * 1000,
    });
  };

  const prefetchBlogById = async (id: number) => {
    await queryClient.prefetchQuery({
      queryKey: blogQueryKeys.detail(id),
      queryFn: () => blogAPI.getBlogById(id),
      staleTime: 5 * 60 * 1000,
    });
  };

  return {
    prefetchBlogs,
    prefetchBlogBySlug,
    prefetchBlogById,
  };
};

// Hook for invalidating blog cache (useful for manual updates)
export const useBlogCache = () => {
  const queryClient = useQueryClient();

  const invalidateAllBlogs = () => {
    queryClient.invalidateQueries({ queryKey: blogQueryKeys.all });
  };

  const invalidateBlogLists = () => {
    queryClient.invalidateQueries({ queryKey: blogQueryKeys.lists() });
  };

  const invalidateBlog = (id: number) => {
    queryClient.invalidateQueries({ queryKey: blogQueryKeys.detail(id) });
  };

  const invalidateBlogBySlug = (slug: string) => {
    queryClient.invalidateQueries({ queryKey: blogQueryKeys.slug(slug) });
  };

  return {
    invalidateAllBlogs,
    invalidateBlogLists,
    invalidateBlog,
    invalidateBlogBySlug,
  };
}; 