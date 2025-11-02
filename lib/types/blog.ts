export interface BlogContent {
  type: string;
  body: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: BlogContent;
  tags: string[];
  publishedAt: string;
  status: number;
}

export interface BlogResponse {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  status?: number;
  page?: number;
  limit?: number;
} 