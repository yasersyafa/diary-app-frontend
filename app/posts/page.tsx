"use client";

import { useState, useMemo } from "react";
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

const allPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, focusing on maintainability, type safety, and developer experience.",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    category: "Development",
    year: 2024,
    month: 12,
  },
  {
    id: 2,
    title: "The Future of Remote Work: Tools and Strategies",
    excerpt:
      "Exploring the evolution of remote work culture and the essential tools that make distributed teams successful in 2024.",
    readTime: "6 min read",
    date: "Dec 12, 2024",
    category: "Remote Work",
    year: 2024,
    month: 12,
  },
  {
    id: 3,
    title: "Mastering Node.js Performance Optimization",
    excerpt:
      "Deep dive into Node.js performance bottlenecks and practical techniques to optimize your backend applications.",
    readTime: "12 min read",
    date: "Dec 10, 2024",
    category: "Backend",
    year: 2024,
    month: 12,
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt:
      "A comprehensive guide to choosing between CSS Grid and Flexbox for different layout scenarios with practical examples.",
    readTime: "10 min read",
    date: "Dec 8, 2024",
    category: "CSS",
    year: 2024,
    month: 12,
  },
  {
    id: 5,
    title: "Building a Personal Brand as a Developer",
    excerpt:
      "Strategies for establishing your online presence, creating valuable content, and networking in the tech community.",
    readTime: "7 min read",
    date: "Nov 28, 2024",
    category: "Career",
    year: 2024,
    month: 11,
  },
  {
    id: 6,
    title: "Introduction to Web3 Development",
    excerpt:
      "Getting started with blockchain development, smart contracts, and decentralized applications using modern tools.",
    readTime: "15 min read",
    date: "Nov 25, 2024",
    category: "Web3",
    year: 2024,
    month: 11,
  },
  {
    id: 7,
    title: "Advanced React Hooks Patterns",
    excerpt:
      "Explore advanced patterns with React hooks including custom hooks, context optimization, and performance considerations.",
    readTime: "11 min read",
    date: "Nov 20, 2024",
    category: "Development",
    year: 2024,
    month: 11,
  },
  {
    id: 8,
    title: "Database Design Best Practices",
    excerpt:
      "Essential principles for designing efficient, scalable databases with proper normalization and indexing strategies.",
    readTime: "9 min read",
    date: "Oct 15, 2024",
    category: "Backend",
    year: 2024,
    month: 10,
  },
  {
    id: 9,
    title: "Modern CSS Techniques for 2024",
    excerpt:
      "Latest CSS features including container queries, cascade layers, and modern layout techniques for responsive design.",
    readTime: "8 min read",
    date: "Oct 10, 2024",
    category: "CSS",
    year: 2024,
    month: 10,
  },
  {
    id: 10,
    title: "API Security Best Practices",
    excerpt:
      "Comprehensive guide to securing REST APIs including authentication, authorization, rate limiting, and data validation.",
    readTime: "13 min read",
    date: "Sep 22, 2024",
    category: "Backend",
    year: 2024,
    month: 9,
  },
];

const POSTS_PER_PAGE = 5;

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique years and months for filters
  const availableYears = [...new Set(allPosts.map((post) => post.year))].sort(
    (a, b) => b - a
  );
  const availableMonths = [
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
  ];

  // Filter posts based on search and filters
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesYear =
        selectedYear === "all" || post.year.toString() === selectedYear;
      const matchesMonth =
        selectedMonth === "all" || post.month.toString() === selectedMonth;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [searchQuery, selectedYear, selectedMonth]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">All Articles</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore all my writings on web development, productivity, and
            technology insights.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange();
              }}
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

            <Select
              value={selectedYear}
              onValueChange={(value) => {
                setSelectedYear(value);
                handleFilterChange();
              }}
            >
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

            <Select
              value={selectedMonth}
              onValueChange={(value) => {
                setSelectedMonth(value);
                handleFilterChange();
              }}
            >
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
              Showing {filteredPosts.length} article
              {filteredPosts.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        </div>

        {/* Posts List */}
        {paginatedPosts.length > 0 ? (
          <div className="space-y-8 mb-12">
            {paginatedPosts.map((post, index) => (
              <article key={post.id} className="group relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

                <div className="pl-8 pr-4 py-8 hover:bg-accent/5 rounded-r-2xl transition-all duration-300 border-l-4 border-transparent hover:border-primary/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                      >
                        {post.category}
                      </Badge>
                      <div className="hidden sm:block w-2 h-2 bg-muted-foreground/30 rounded-full" />
                      <time className="text-sm font-medium text-muted-foreground">
                        {post.date}
                      </time>
                    </div>
                    <span className="text-sm font-medium text-primary/70 bg-primary/5 px-3 py-1 rounded-full">
                      {post.readTime}
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

                      <div className="absolute -right-2 top-1/2 w-2 h-2 bg-primary rounded-full transform -translate-y-1/2 scale-0 group-hover/btn:scale-100 transition-transform duration-300 delay-200" />
                    </div>

                    <div className="text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                      {String(startIndex + index + 1).padStart(2, "0")}
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
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    }
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
