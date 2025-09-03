import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PostSkeleton } from "@/components/ui/loading-spinner";
import { getPosts } from "@/lib/api";
import { formatDate, formatReadTime } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

export async function BlogPosts() {
  try {
    const response = await getPosts({ limit: 3 });
    const posts = response.data;

    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Insights, tutorials, and thoughts on web development, game
              development, productivity, and the tech industry.
            </p>
          </div>

          <Suspense fallback={<BlogPostsSkeleton />}>
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  No articles found. Check back soon!
                </p>
              </div>
            ) : (
              <div className="space-y-8 mb-12">
                {posts.map((post, index) => (
                  <article
                    key={post.id}
                    className="group relative overflow-hidden"
                  >
                    {/* Background accent line */}
                    <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />

                    <div className="pl-8 pr-4 py-8 hover:bg-accent/5 rounded-r-2xl transition-all duration-300 border-l-4 border-transparent hover:border-primary/20">
                      {/* Header with category and meta */}
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
                        <span className="text-sm font-medium text-primary/70 bg-primary/5 px-3 py-1 w-fit rounded-full">
                          {formatReadTime(post.readTime)}
                        </span>
                      </div>

                      {/* Title with enhanced typography */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-4 text-balance leading-tight">
                        <span className="relative">
                          {post.title}
                          <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500" />
                        </span>
                      </h3>

                      {/* Excerpt with better spacing */}
                      <p className="text-muted-foreground text-lg leading-relaxed text-pretty mb-6 max-w-3xl">
                        {post.excerpt}
                      </p>

                      {/* Read more with enhanced aesthetic hover effects */}
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

                        {/* Article number indicator */}
                        <div className="text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center">
              <Link href="/posts">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                >
                  View All Articles
                </Button>
              </Link>
            </div>
          </Suspense>
        </div>
      </section>
    );
  } catch (error) {
    return (
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Insights, tutorials, and thoughts on web development,
              productivity, and the tech industry.
            </p>
          </div>
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Failed to load articles. Please try again later.
            </p>
          </div>
        </div>
      </section>
    );
  }
}

function BlogPostsSkeleton() {
  return (
    <>
      <div className="space-y-8 mb-12">
        {Array.from({ length: 3 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
      <div className="text-center">
        <div className="w-32 h-10 bg-muted rounded animate-pulse mx-auto" />
      </div>
    </>
  );
}
