import { Blog } from '../types/blog';

const API_BASE_URL = '/api'; // Use local API routes

class BlogAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const response = await fetch(`${this.baseUrl}/blogs`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store', // Let React Query handle all caching
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Blog[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  }

  async getBlogById(id: number): Promise<Blog> {
    try {
      const response = await fetch(`${this.baseUrl}/blogs/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store', // Let React Query handle all caching
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Blog = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog by id:', error);
      throw error;
    }
  }

  async getBlogBySlug(slug: string): Promise<Blog> {
    try {
      const response = await fetch(`${this.baseUrl}/blogs/slug/${slug}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store', // Let React Query handle all caching
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Blog = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog by slug:', error);
      throw error;
    }
  }

  // Optimized helper method to get published blogs only with caching
  async getPublishedBlogs(): Promise<Blog[]> {
    try {
      const allBlogs = await this.getAllBlogs();
      return allBlogs.filter(blog => blog.status === 1);
    } catch (error) {
      console.error('Error fetching published blogs:', error);
      throw error;
    }
  }

  // Helper method to format image URL
  formatImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Return the full external API URL for images
    return `https://nedsite.runasp.net${imagePath}`;
  }

  // New method: Get blogs with client-side filtering for better performance
  async getBlogsWithFilters(filters: any): Promise<Blog[]> {
    try {
      const allBlogs = await this.getAllBlogs();
      
      // Apply filters client-side for better performance
      let filteredBlogs = allBlogs;
      
      if (filters.status !== undefined) {
        filteredBlogs = filteredBlogs.filter(blog => blog.status === filters.status);
      }
      
      if (filters.tag) {
        filteredBlogs = filteredBlogs.filter(blog => 
          blog.tags && blog.tags.includes(filters.tag)
        );
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredBlogs = filteredBlogs.filter(blog =>
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.excerpt.toLowerCase().includes(searchTerm)
        );
      }
      
      return filteredBlogs;
    } catch (error) {
      console.error('Error fetching blogs with filters:', error);
      throw error;
    }
  }
}

export const blogAPI = new BlogAPI();
export default BlogAPI; 