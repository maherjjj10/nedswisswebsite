'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('BlogError');

  useEffect(() => {
    console.error('Blog page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg 
            className="w-10 h-10 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {t('title', { default: 'Something went wrong' })}
        </h1>
        
        <p className="text-gray-600 mb-6">
          {t('message', { 
            default: 'We encountered an error while loading the blog posts. Please try again.' 
          })}
        </p>
        
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            {t('retry', { default: 'Try Again' })}
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium"
          >
            {t('goHome', { default: 'Go to Homepage' })}
          </button>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
} 