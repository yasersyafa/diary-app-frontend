import { useState, useEffect, useCallback, useMemo } from "react";
import { getPosts } from "../api";
import { Post, PostsQueryParams, PaginationMeta } from "../types";
import { extractYearFromDate, extractMonthFromDate } from "../utils";

interface UsePostsReturn {
  posts: Post[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedYear: string;
  selectedMonth: string;
  currentPage: number;
  setSearchQuery: (query: string) => void;
  setSelectedYear: (year: string) => void;
  setSelectedMonth: (month: string) => void;
  setCurrentPage: (page: number) => void;
  refetch: () => void;
  availableYears: number[];
  availableMonths: { value: number; label: string }[];
}

export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Available years and months for filters
  const availableYears = useMemo(() => {
    const years = [
      ...new Set(posts.map((post) => extractYearFromDate(post.createdAt))),
    ];
    return years.sort((a, b) => b - a);
  }, [posts]);

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

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params: PostsQueryParams = {
        page: currentPage,
        limit: 6, // Default limit as per API docs
        search: searchQuery || undefined,
        year: selectedYear !== "all" ? parseInt(selectedYear) : undefined,
        month: selectedMonth !== "all" ? parseInt(selectedMonth) : undefined,
      };

      const response = await getPosts(params);
      setPosts(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
      setPosts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedYear, selectedMonth]);

  // Fetch posts when dependencies change
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Reset to first page when filters change
  const handleFilterChange = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const refetch = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    pagination,
    loading,
    error,
    searchQuery,
    selectedYear,
    selectedMonth,
    currentPage,
    setSearchQuery: (query: string) => {
      setSearchQuery(query);
      handleFilterChange();
    },
    setSelectedYear: (year: string) => {
      setSelectedYear(year);
      handleFilterChange();
    },
    setSelectedMonth: (month: string) => {
      setSelectedMonth(month);
      handleFilterChange();
    },
    setCurrentPage,
    refetch,
    availableYears,
    availableMonths,
  };
}
