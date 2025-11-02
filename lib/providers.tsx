'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Lenis from 'lenis';

// Extend Window interface for ScrollTrigger
declare global {
  interface Window {
    ScrollTrigger?: {
      update: () => void;
      scrollerProxy: (element: Element, config: Record<string, unknown>) => void;
    };
  }
}

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, unknown>;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Integrate with GSAP ScrollTrigger if available
    if (typeof window !== 'undefined' && window.ScrollTrigger) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value?: number) {
          return arguments.length ? lenis.scrollTo(value || 0, { immediate: true }) : lenis.scroll;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.body.style.transform ? 'transform' : 'fixed'
      });
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // ISR-like behavior with React Query
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 30 * 60 * 1000, // 30 minutes
        retry: 3,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchInterval: 5 * 60 * 1000, // Background refetch every 5 minutes
        refetchIntervalInBackground: true,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider 
        locale={locale} 
        messages={messages}
        timeZone="Europe/Zurich" // Using Swiss timezone since it's NED Swiss
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </NextIntlClientProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}