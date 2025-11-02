'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export const MarkdownContent = ({ content, className = '' }: MarkdownContentProps) => {
  return (
    <div className={`prose prose-lg max-w-none prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight border-b border-gray-200 pb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold text-gray-800 mt-8 mb-4 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3 leading-tight">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold text-gray-800 mt-4 mb-2 leading-tight">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="text-gray-700 leading-relaxed mb-4">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 ml-4">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-gray-700 leading-relaxed">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mb-4 italic text-gray-600 bg-gray-50 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: (props: any) => {
            const { inline, children, ...rest } = props;
            return inline ? (
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono" {...rest}>
                {children}
              </code>
            ) : (
              <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...rest}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
              {children}
            </pre>
          ),
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          img: ({ src, alt }) => (
            <div className="my-6">
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-auto rounded-lg shadow-md object-cover max-h-96"
                loading="lazy"
              />
              {alt && (
                <p className="text-sm text-gray-500 text-center mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody>
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-800">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-4 py-2 text-gray-700">
              {children}
            </td>
          ),
          hr: () => (
            <hr className="my-8 border-t border-gray-300" />
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-gray-800">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-gray-700">
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}; 