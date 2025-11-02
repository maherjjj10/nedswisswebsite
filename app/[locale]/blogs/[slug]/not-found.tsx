/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
          <Search className="w-10 h-10 text-blue-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Blog Post Not Found
        </h1>
        
        <p className="text-gray-600 mb-6">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        
        <div className="space-y-3">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-2 w-full justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Blog</span>
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 rounded-lg transition-colors duration-200 font-medium"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 