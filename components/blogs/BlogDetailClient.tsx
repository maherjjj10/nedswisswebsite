'use client';

import { useState } from 'react';
import { Blog } from '@/lib/types/blog';
import { BlogDetail } from './BlogDetail';

interface BlogDetailClientProps {
  initialBlog: Blog;
}

export const BlogDetailClient = ({ initialBlog }: BlogDetailClientProps) => {
  const [blog] = useState(initialBlog);

  return <BlogDetail blog={blog} />;
}; 