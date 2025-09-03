import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getPosts } from "@/lib/api";
import { formatDate, formatReadTime } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { PostsClient } from "./posts-client";

interface PostsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    search?: string;
    month?: string;
    year?: string;
    categoryId?: string;
    tagId?: string;
  };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 6;
  const search = searchParams.search || "";
  const month = searchParams.month ? parseInt(searchParams.month) : undefined;
  const year = searchParams.year ? parseInt(searchParams.year) : undefined;
  const categoryId = searchParams.categoryId
    ? parseInt(searchParams.categoryId)
    : undefined;
  const tagId = searchParams.tagId ? parseInt(searchParams.tagId) : undefined;

  try {
    const response = await getPosts({
      page,
      limit,
      search,
      month,
      year,
      categoryId,
      tagId,
    });

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 py-20">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-primary mb-4">
              All Articles
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore all my writings on web development, productivity, and
              technology insights.
            </p>
          </div>

          <Suspense fallback={<PostsSkeleton />}>
            <PostsClient
              initialPosts={response.data}
              initialPagination={response.pagination}
              initialSearch={search}
              initialYear={year?.toString() || "all"}
              initialMonth={month?.toString() || "all"}
              initialPage={page}
            />
          </Suspense>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <h1 className="text-2xl font-bold text-card-foreground mb-4">
            Failed to Load Articles
          </h1>
          <p className="text-muted-foreground mb-8">
            An error occurred while loading the articles. Please try again
            later.
          </p>
          <Link href="/posts">
            <Button>Try Again</Button>
          </Link>
        </div>
      </div>
    );
  }
}

function PostsSkeleton() {
  return (
    <>
      {/* Search and Filters Skeleton */}
      <div className="mb-12 space-y-6">
        {/* Search Bar Skeleton */}
        <div className="relative max-w-md mx-auto">
          <div className="w-full h-10 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Filter by:
            </span>
          </div>

          <div className="w-32 h-10 bg-muted rounded-md animate-pulse" />
          <div className="w-36 h-10 bg-muted rounded-md animate-pulse" />
        </div>

        {/* Results count Skeleton */}
        <div className="text-center">
          <div className="w-48 h-4 bg-muted rounded animate-pulse mx-auto" />
        </div>
      </div>

      {/* Posts List Skeleton */}
      <div className="space-y-8 mb-12">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="group relative overflow-hidden">
            <div className="pl-8 pr-4 py-8 border-l-4 border-transparent">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-6 bg-muted rounded animate-pulse" />
                  <div className="hidden sm:block w-2 h-2 bg-muted-foreground/30 rounded-full" />
                  <div className="w-20 h-4 bg-muted rounded animate-pulse" />
                </div>
                <div className="w-20 h-6 bg-muted rounded animate-pulse" />
              </div>

              <div className="w-3/4 h-8 bg-muted rounded animate-pulse mb-4" />
              <div className="w-full h-6 bg-muted rounded animate-pulse mb-6" />

              <div className="flex items-center justify-between">
                <div className="w-32 h-6 bg-muted rounded animate-pulse" />
                <div className="w-12 h-12 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-center gap-4">
        <div className="w-20 h-8 bg-muted rounded animate-pulse" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-8 h-8 bg-muted rounded animate-pulse" />
          ))}
        </div>
        <div className="w-16 h-8 bg-muted rounded animate-pulse" />
      </div>
    </>
  );
}
