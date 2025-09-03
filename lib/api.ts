import { PostsResponse, PostResponse, PostsQueryParams } from "./types";

const API_BASE_URL = "https://blog-app-backend-three-dusky.vercel.app/api";

class ApiClientError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new ApiClientError(
      response.status,
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  return response.json();
}

export async function getPosts(
  params: PostsQueryParams = {}
): Promise<PostsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.append("page", params.page.toString());
  if (params.limit) searchParams.append("limit", params.limit.toString());
  if (params.search) searchParams.append("search", params.search);
  if (params.month) searchParams.append("month", params.month.toString());
  if (params.year) searchParams.append("year", params.year.toString());
  if (params.categoryId)
    searchParams.append("categoryId", params.categoryId.toString());
  if (params.tagId) searchParams.append("tagId", params.tagId.toString());

  const url = `${API_BASE_URL}/posts${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  return handleResponse<PostsResponse>(response);
}

export async function getPostById(id: string): Promise<PostResponse> {
  const url = `${API_BASE_URL}/posts/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  return handleResponse<PostResponse>(response);
}

export async function getPostBySlug(slug: string): Promise<PostResponse> {
  // Since the API doesn't have a slug endpoint, we'll need to search for it
  // This is a fallback approach - ideally the backend should support slug-based queries
  const response = await getPosts({ search: slug, limit: 100 });

  const post = response.data.find((p) => p.slug === slug);
  if (!post) {
    throw new ApiClientError(404, "Post not found");
  }

  return { data: post };
}
