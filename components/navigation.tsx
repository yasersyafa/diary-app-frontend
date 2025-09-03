import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              Narrativa.
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="/posts"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Articles
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
