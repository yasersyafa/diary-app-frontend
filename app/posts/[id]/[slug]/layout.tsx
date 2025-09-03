import type { Metadata } from "next";
import { getPostById } from "@/lib/api";
import { use } from "react";

interface PostLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: PostLayoutProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await getPostById(id);
    const post = response.data;

    return {
      title: `${post.title} | Blog`,
      description: post.excerpt,
      keywords: [
        ...post.tags.map((tag) => tag.name),
        post.category.name,
        "blog",
        "article",
        "web development",
        "technology",
      ],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        url: `/posts/${post.id}/${post.slug}`,
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: ["Blog Author"],
        tags: post.tags.map((tag) => tag.name),
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
      alternates: {
        canonical: `/posts/${post.id}/${post.slug}`,
      },
    };
  } catch (error) {
    return {
      title: "Post Not Found | Blog",
      description: "The article you're looking for doesn't exist.",
    };
  }
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
