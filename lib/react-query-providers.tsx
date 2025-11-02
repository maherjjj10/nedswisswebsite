'use client';

import { QueryClient, QueryClientProvider, HydrationBoundary, dehydrate, DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode } from 'react';

// Optimized React Query configuration for ISR-like behavior
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // ISR-like settings: 5 minutes stale time with background refetching
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
        retry: 3,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5 * 60 * 1000, // Background refetch every 5 minutes
        refetchIntervalInBackground: true,
      },
      mutations: {
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

interface ReactQueryProvidersProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

export function ReactQueryProviders({ children, dehydratedState }: ReactQueryProvidersProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

// Server-side prefetching utilities for ISR-like behavior
export async function getServerSideProps() {
  const queryClient = makeQueryClient();
  
  // Prefetch blogs on server for better initial load
  await queryClient.prefetchQuery({
    queryKey: ['blogs', 'list', {}],
    queryFn: async () => {
      const response = await fetch('https://nedsite.runasp.net/api/Blog', {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch blogs');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    dehydratedState: dehydrate(queryClient),
  };
}

// Prefetch specific blog by slug for server-side rendering
export async function prefetchBlogBySlug(slug: string) {
  const queryClient = makeQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['blogs', 'detail', 'slug', slug],
    queryFn: async () => {
      const response = await fetch(`https://nedsite.runasp.net/api/Blog/slug/${slug}`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch blog');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    dehydratedState: dehydrate(queryClient),
  };
}

// Prefetch blog by ID for server-side rendering
export async function prefetchBlogById(id: number) {
  const queryClient = makeQueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['blogs', 'detail', id],
    queryFn: async () => {
      const response = await fetch(`https://nedsite.runasp.net/api/Blog/${id}`, {
        cache: 'no-store',
      });
      if (!response.ok) throw new Error('Failed to fetch blog');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    dehydratedState: dehydrate(queryClient),
  };
} 