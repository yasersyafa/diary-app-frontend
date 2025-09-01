import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with TypeScript",
    excerpt:
      "Learn how to structure large React applications using TypeScript, focusing on maintainability, type safety, and developer experience.",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    category: "Development",
  },
  {
    id: 2,
    title: "The Future of Remote Work: Tools and Strategies",
    excerpt:
      "Exploring the evolution of remote work culture and the essential tools that make distributed teams successful in 2024.",
    readTime: "6 min read",
    date: "Dec 12, 2024",
    category: "Remote Work",
  },
  {
    id: 3,
    title: "Mastering Node.js Performance Optimization",
    excerpt:
      "Deep dive into Node.js performance bottlenecks and practical techniques to optimize your backend applications.",
    readTime: "12 min read",
    date: "Dec 10, 2024",
    category: "Backend",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use What",
    excerpt:
      "A comprehensive guide to choosing between CSS Grid and Flexbox for different layout scenarios with practical examples.",
    readTime: "10 min read",
    date: "Dec 8, 2024",
    category: "CSS",
  },
  {
    id: 5,
    title: "Building a Personal Brand as a Developer",
    excerpt:
      "Strategies for establishing your online presence, creating valuable content, and networking in the tech community.",
    readTime: "7 min read",
    date: "Dec 5, 2024",
    category: "Career",
  },
  {
    id: 6,
    title: "Introduction to Web3 Development",
    excerpt:
      "Getting started with blockchain development, smart contracts, and decentralized applications using modern tools.",
    readTime: "15 min read",
    date: "Dec 3, 2024",
    category: "Web3",
  },
];

export function BlogPosts() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Insights, tutorials, and thoughts on web development, productivity,
            and the tech industry.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {blogPosts.map((post, index) => (
            <article key={post.id} className="group relative overflow-hidden">
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

                  {/* Article number indicator */}
                  <div className="text-6xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors duration-500">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
