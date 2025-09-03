export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  readTime: number;
  createdAt: string;
  updatedAt?: string;
  categoryId?: number;
  category: Category;
  tags: Tag[];
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PostsResponse {
  data: Post[];
  pagination: PaginationMeta;
}

export interface PostResponse {
  data: Post;
}

export interface PostsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  month?: number;
  year?: number;
  categoryId?: number;
  tagId?: number;
}

export interface ApiError {
  message: string;
  status: number;
}
