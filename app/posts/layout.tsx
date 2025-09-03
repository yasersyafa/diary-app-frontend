import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles | Blog",
  description:
    "Explore all articles on web development, productivity, and technology insights. Find in-depth guides, tutorials, and industry insights.",
  keywords: [
    "blog",
    "articles",
    "web development",
    "technology",
    "programming",
    "tutorials",
  ],
  openGraph: {
    title: "All Articles | Blog",
    description:
      "Explore all articles on web development, productivity, and technology insights.",
    type: "website",
    url: "/posts",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Articles | Blog",
    description:
      "Explore all articles on web development, productivity, and technology insights.",
  },
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
