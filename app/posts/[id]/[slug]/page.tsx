import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { getPostById } from "@/lib/api";
import { Post } from "@/lib/types";
import { formatDate, formatReadTime } from "@/lib/utils";
import { redirect } from "next/navigation";

interface PostDetailPageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id, slug } = await params;

  try {
    const response = await getPostById(id);
    const post = response.data;

    // Redirect if slug doesn't match
    if (post.slug !== slug) {
      redirect(`/posts/${id}/${post.slug}`);
    }

    return (
      <div className="min-h-screen bg-background">
        <article className="max-w-3xl mx-auto px-6 py-20">
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
                {post.category.name}
              </Badge>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <time>{formatDate(post.createdAt)}</time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatReadTime(post.readTime)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Article</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl text-pretty font-bold text-primary mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed text-balanced max-w-3xl mb-8">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="text-primary border-primary/20 hover:bg-primary/10"
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          {post.content ? (
            <div
              className="prose max-w-none prose-headings:text-card-foreground prose-p:text-muted-foreground prose-strong:text-card-foreground prose-code:text-primary prose-pre:bg-muted prose-pre:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Content not available
              </p>
            </div>
          )}

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
                </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm text-muted-foreground">
                  Published on {formatDate(post.createdAt)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatReadTime(post.readTime)} • {post.category.name}
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
  } catch (error) {
    // If post not found, redirect to posts page
    redirect("/posts");
  }
}
