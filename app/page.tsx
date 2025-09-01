import { AuthorHero } from "@/components/author-hero";
import { BlogPosts } from "@/components/blog-posts";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <AuthorHero />
      <BlogPosts />
      <Footer />
    </main>
  );
}
