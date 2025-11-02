'use client';

import DOMPurify from 'isomorphic-dompurify';

interface HtmlContentProps {
  content: string;
  className?: string;
}

export const HtmlContent = ({ content, className = '' }: HtmlContentProps) => {
  // Configure DOMPurify to allow common React Quill elements
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Text formatting
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'sub', 'sup', 'mark',
      // Lists
      'ol', 'ul', 'li',
      // Links and media
      'a', 'img', 'video', 'audio', 'source',
      // Code
      'code', 'pre',
      // Quotes and dividers
      'blockquote', 'hr',
      // Tables
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      // Inline containers
      'span', 'div',
      // React Quill specific
      'ql-editor', 'ql-container'
    ],
    ALLOWED_ATTR: [
      // Links
      'href', 'target', 'rel',
      // Media
      'src', 'alt', 'width', 'height', 'controls', 'poster',
      // Styling (limited)
      'class', 'style',
      // Tables
      'colspan', 'rowspan',
      // General
      'id', 'title'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    // Allow data URLs for images
    ADD_DATA_URI_TAGS: ['img'],
  });

  return (
    <article 
      className={`
        prose prose-xl lg:prose-2xl max-w-none
        
        /* PREVENT HORIZONTAL OVERFLOW */
        w-full overflow-hidden
        
        /* Responsive text sizing */
        prose-base sm:prose-xl lg:prose-2xl
        
        /* Headings - with word wrapping */
        prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
        prose-headings:break-words prose-headings:hyphens-auto
        prose-h1:text-3xl sm:prose-h1:text-4xl lg:prose-h1:text-5xl prose-h1:mb-5 prose-h1:mt-7
        prose-h2:text-2xl sm:prose-h2:text-6xl lg:prose-h2:text-6xl prose-h2:mb-5 prose-h2:mt-7
        prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl prose-h3:mb-4 prose-h3:mt-6
        prose-h4:text-lg sm:prose-h4:text-xl lg:prose-h4:text-2xl prose-h4:mb-4 prose-h4:mt-5
        prose-h5:text-base sm:prose-h5:text-lg lg:prose-h5:text-xl prose-h5:mb-3 prose-h5:mt-5
        prose-h6:text-sm sm:prose-h6:text-base lg:prose-h6:text-lg prose-h6:mb-3 prose-h6:mt-5
        
        /* Paragraphs - with proper wrapping */
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 
        prose-p:text-base sm:prose-p:text-lg lg:prose-p:text-xl
        prose-p:break-words prose-p:hyphens-auto
        
        /* Links - with wrapping */
        prose-a:text-blue-600 prose-a:no-underline prose-a:font-medium 
        prose-a:transition-colors prose-a:duration-200 prose-a:break-words
        hover:prose-a:text-blue-800 hover:prose-a:underline
        
        /* Strong/Bold text */
        prose-strong:text-gray-900 prose-strong:font-semibold prose-strong:break-words
        
        /* Inline code - with proper wrapping */
        prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 
        prose-code:rounded prose-code:text-sm sm:prose-code:text-base 
        prose-code:font-mono prose-code:font-medium prose-code:break-all
        before:prose-code:content-none after:prose-code:content-none
        
        /* Pre-formatted code blocks - FIXED OVERFLOW */
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg 
        prose-pre:p-3 sm:prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:overflow-y-hidden
        prose-pre:text-sm sm:prose-pre:text-base prose-pre:leading-relaxed
        prose-pre:shadow-lg prose-pre:border prose-pre:border-gray-200
        prose-pre:max-w-full prose-pre:whitespace-pre prose-pre:break-normal
        
        /* Blockquotes - with proper wrapping */
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 sm:prose-blockquote:pl-6 
        prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-600 
        prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:my-4 sm:prose-blockquote:my-6
        prose-blockquote:font-medium prose-blockquote:relative prose-blockquote:break-words
        
        /* Lists - with proper spacing */
        prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 prose-li:mb-2
        prose-ul:space-y-2 prose-ol:space-y-2 prose-li:leading-relaxed prose-li:break-words
        prose-li:text-base sm:prose-li:text-lg lg:prose-li:text-xl
        
        /* Tables - FIXED OVERFLOW */
        prose-table:w-full prose-table:overflow-x-auto prose-table:block prose-table:whitespace-nowrap
        sm:prose-table:table sm:prose-table:whitespace-normal
        prose-table:border prose-table:border-gray-300 prose-table:rounded-lg 
        prose-table:shadow-sm prose-table:my-6 sm:prose-table:my-8
        prose-th:bg-gray-50 prose-th:font-semibold prose-th:text-gray-900 
        prose-th:px-2 sm:prose-th:px-4 prose-th:py-2 sm:prose-th:py-3
        prose-th:text-left prose-th:border-b prose-th:border-gray-300 prose-th:text-base
        prose-td:text-gray-700 prose-td:px-2 sm:prose-td:px-4 prose-td:py-2 sm:prose-td:py-3 
        prose-td:border-b prose-td:border-gray-200 prose-td:text-base
        prose-tbody:bg-white
        
        /* Images - FIXED OVERFLOW */
        prose-img:rounded-lg prose-img:shadow-lg prose-img:my-6 sm:prose-img:my-8 
        prose-img:w-full prose-img:max-w-full prose-img:h-auto prose-img:object-cover 
        prose-img:border prose-img:border-gray-200
        
        /* Horizontal rules */
        prose-hr:border-gray-300 prose-hr:my-6 sm:prose-hr:my-8
        
        /* Responsive spacing */
        space-y-4 sm:space-y-5 lg:space-y-7
        
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      style={{
        // Override any problematic inline styles from React Quill
        fontSize: 'inherit',
        fontFamily: 'inherit',
        lineHeight: 'inherit',
        // Ensure proper text rendering
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    />
  );
}; 