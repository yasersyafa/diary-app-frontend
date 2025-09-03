import { AuthorHero } from "@/components/author-hero";
import { BlogPosts } from "@/components/blog-posts";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <BlogPosts />
      <AuthorHero />
    </main>
  );
}
