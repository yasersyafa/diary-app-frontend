"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, BookOpen } from "lucide-react";
import Link from "next/link";

// Mock post data - in a real app, this would come from a CMS or database
const getPostBySlug = (slug: string) => {
  const posts = {
    "building-scalable-react-applications-with-typescript": {
      id: 1,
      title: "Building Scalable React Applications with TypeScript",
      excerpt:
        "Learn how to structure large React applications using TypeScript, focusing on maintainability, type safety, and developer experience.",
      content: `
        <p>Building scalable React applications is one of the most challenging aspects of modern web development. When you add TypeScript to the mix, you get powerful type safety that can help prevent bugs and improve developer experience, but it also introduces complexity that needs to be managed carefully.</p>

        <h2>Why TypeScript for React?</h2>
        <p>TypeScript brings several key benefits to React development:</p>
        <ul>
          <li><strong>Type Safety:</strong> Catch errors at compile time rather than runtime</li>
          <li><strong>Better IDE Support:</strong> Enhanced autocomplete, refactoring, and navigation</li>
          <li><strong>Self-Documenting Code:</strong> Types serve as inline documentation</li>
          <li><strong>Easier Refactoring:</strong> Confident code changes across large codebases</li>
        </ul>

        <h2>Project Structure</h2>
        <p>A well-organized project structure is crucial for scalability. Here's a recommended approach:</p>
        <pre><code>src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form-specific components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── services/         # API calls and external services
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── pages/            # Page components</code></pre>

        <h2>Component Design Patterns</h2>
        <p>When building components with TypeScript, consider these patterns:</p>

        <h3>1. Props Interface Definition</h3>
        <p>Always define clear interfaces for your component props:</p>
        <pre><code>interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  size = 'medium', 
  disabled = false, 
  onClick, 
  children 
}) => {
  // Component implementation
};</code></pre>

        <h3>2. Generic Components</h3>
        <p>Use generics for reusable components that work with different data types:</p>
        <pre><code>interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}</code></pre>

        <h2>State Management</h2>
        <p>For complex applications, consider using a state management solution like Redux Toolkit or Zustand with proper TypeScript integration:</p>
        <pre><code>// Using Zustand with TypeScript
interface AppState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));</code></pre>

        <h2>Performance Considerations</h2>
        <p>TypeScript compilation can impact build times in large applications. Here are some optimization strategies:</p>
        <ul>
          <li>Use <code>React.memo()</code> for expensive components</li>
          <li>Implement proper code splitting with <code>React.lazy()</code></li>
          <li>Configure TypeScript compiler options for optimal performance</li>
          <li>Use incremental compilation in development</li>
        </ul>

        <h2>Testing Strategy</h2>
        <p>A comprehensive testing strategy should include:</p>
        <ul>
          <li><strong>Unit Tests:</strong> Test individual components and functions</li>
          <li><strong>Integration Tests:</strong> Test component interactions</li>
          <li><strong>Type Tests:</strong> Ensure TypeScript types work as expected</li>
          <li><strong>E2E Tests:</strong> Test complete user workflows</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Building scalable React applications with TypeScript requires careful planning, consistent patterns, and attention to both developer experience and application performance. By following these guidelines and continuously refactoring as your application grows, you can maintain a codebase that's both robust and enjoyable to work with.</p>

        <p>Remember that scalability isn't just about handling more users or data—it's also about maintaining code quality and developer productivity as your team and codebase grow.</p>
      `,
      readTime: "8 min read",
      date: "Dec 15, 2024",
      category: "Development",
      author: {
        name: "Alex Johnson",
        bio: "Full-stack developer with 8+ years of experience building scalable web applications.",
        avatar: "/professional-author-headshot.png",
      },
      tags: ["React", "TypeScript", "Architecture", "Best Practices"],
    },
  };

  return posts[slug as keyof typeof posts] || null;
};

export default function PostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link href="/posts">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-6 py-20">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/posts">
            <Button
              variant="ghost"
              className="p-0 h-auto text-primary hover:text-primary/80 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Articles
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {post.category}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time>{post.date}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Article</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 text-balance leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed text-pretty max-w-3xl mb-8">
            {post.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between border-t border-b border-primary/10 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                <img
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">
                  {post.author.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {post.author.bio}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground bg-transparent"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-primary border-primary/20 hover:bg-primary/10"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-primary prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
            prose-ul:text-muted-foreground prose-ul:mb-6
            prose-li:mb-2
            prose-strong:text-card-foreground prose-strong:font-semibold
            prose-code:bg-primary/10 prose-code:text-primary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
            prose-pre:bg-muted prose-pre:border prose-pre:border-primary/10 prose-pre:rounded-lg prose-pre:p-4
            prose-pre:overflow-x-auto prose-pre:text-sm
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-muted-foreground mb-2">
                Enjoyed this article?
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  Follow for more
                </Button>
              </div>
            </div>

            <div className="text-center sm:text-right">
              <p className="text-sm text-muted-foreground">
                Published on {post.date}
              </p>
              <p className="text-sm text-muted-foreground">
                {post.readTime} • {post.category}
              </p>
            </div>
          </div>
        </footer>

        {/* Navigation to other posts */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="text-center">
            <Link href="/posts">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
