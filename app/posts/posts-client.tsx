"use client";

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
import { Post, PaginationMeta } from "@/lib/types";
import { formatDate, formatReadTime } from "@/lib/utils";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface PostsClientProps {
  initialPosts: Post[];
  initialPagination: PaginationMeta;
  initialSearch: string;
  initialYear: string;
  initialMonth: string;
  initialPage: number;
}

export function PostsClient({
  initialPosts,
  initialPagination,
  initialSearch,
  initialYear,
  initialMonth,
  initialPage,
}: PostsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get available years and months from posts
  const availableYears = useMemo(() => {
    const years = [
      ...new Set(
        initialPosts.map((post) => new Date(post.createdAt).getFullYear())
      ),
    ];
    return years.sort((a, b) => b - a);
  }, [initialPosts]);

  const availableMonths = useMemo(
    () => [
      { value: 1, label: "January" },
      { value: 2, label: "February" },
      { value: 3, label: "March" },
      { value: 4, label: "April" },
      { value: 5, label: "May" },
      { value: 6, label: "June" },
      { value: 7, label: "July" },
      { value: 8, label: "August" },
      { value: 9, label: "September" },
      { value: 10, label: "October" },
      { value: 11, label: "November" },
      { value: 12, label: "December" },
    ],
    []
  );

  const updateSearchParams = useCallback(
    (updates: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        if (value === "all" || value === "") {
          params.delete(key);
        } else {
          params.set(key, value.toString());
        }
      });

      // Reset to first page when filters change
      if (
        updates.search !== undefined ||
        updates.year !== undefined ||
        updates.month !== undefined
      ) {
        params.delete("page");
      }

      const queryString = params.toString();
      router.push(`/posts${queryString ? `?${queryString}` : ""}`);
    },
    [router, searchParams]
  );

  const handleSearch = useCallback(
    (search: string) => {
      updateSearchParams({ search });
    },
    [updateSearchParams]
  );

  const handleYearChange = useCallback(
    (year: string) => {
      updateSearchParams({ year });
    },
    [updateSearchParams]
  );

  const handleMonthChange = useCallback(
    (month: string) => {
      updateSearchParams({ month });
    },
    [updateSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateSearchParams({ page });
    },
    [updateSearchParams]
  );

  return (
    <>
      {/* Search and Filters */}
      <div className="mb-12 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search articles..."
            defaultValue={initialSearch}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-background border-primary/20 focus:border-primary"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Filter by:
            </span>
          </div>

          <Select value={initialYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-32 bg-background border-primary/20">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={initialMonth} onValueChange={handleMonthChange}>
            <SelectTrigger className="w-36 bg-background border-primary/20">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              {availableMonths.map((month) => (
                <SelectItem key={month.value} value={month.value.toString()}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Showing {initialPosts.length} article
            {initialPosts.length !== 1 ? "s" : ""}
            {initialPagination && ` of ${initialPagination.total}`}
            {initialSearch && ` for "${initialSearch}"`}
          </p>
        </div>
      </div>

      {/* Posts List */}
      {initialPosts.length > 0 ? (
        <div className="space-y-8 mb-12">
          {initialPosts.map((post, index) => (
            <article key={post.id} className="group relative overflow-hidden">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

              <div className="pl-8 pr-4 py-8 hover:bg-accent/5 rounded-r-2xl transition-all duration-300 border-l-4 border-transparent hover:border-primary/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                    >
                      {post.category.name}
                    </Badge>
                    <div className="hidden sm:block w-2 h-2 bg-muted-foreground/30 rounded-full" />
                    <time className="text-sm font-medium text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  <span className="text-sm font-medium text-primary/70 bg-primary/5 px-3 py-1 rounded-full">
                    {formatReadTime(post.readTime)}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-4 text-balance leading-tight">
                  <span className="relative">
                    {post.title}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                  </span>
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed text-pretty mb-6 max-w-3xl">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="relative group/btn">
                    <Link href={`/posts/${post.id}/${post.slug}`}>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-semibold text-primary hover:text-primary/80 text-lg relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-left rounded-lg" />

                        <span className="relative z-10 group-hover/btn:translate-x-2 transition-all duration-300 flex items-center">
                          Read Full Article
                          <span className="ml-3 group-hover/btn:ml-5 transition-all duration-300 transform group-hover/btn:scale-110">
                            <svg
                              className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </span>

                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover/btn:w-full transition-all duration-500 delay-100" />
                      </Button>
                    </Link>

                    <div className="absolute -right-2 top-1/2 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2 scale-0 group-hover/btn:scale-x-100 transition-transform duration-300 delay-200" />
                  </div>

                  <div className="text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">
            No articles found
          </p>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Pagination */}
      {initialPagination && initialPagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(initialPagination.page - 1)}
            disabled={!initialPagination.hasPrev}
            className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from(
              { length: initialPagination.totalPages },
              (_, i) => i + 1
            ).map((page) => (
              <Button
                key={page}
                variant={
                  initialPagination.page === page ? "default" : "outline"
                }
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  initialPagination.page === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                }
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(initialPagination.page + 1)}
            disabled={!initialPagination.hasNext}
            className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </>
  );
}
