export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back button skeleton */}
        <div className="mb-8">
          <div className="h-6 w-32 bg-primary/10 rounded animate-pulse" />
        </div>

        {/* Header skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-6 w-24 bg-primary/10 rounded animate-pulse" />
            <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>

          <div className="space-y-4 mb-6">
            <div className="h-12 w-full bg-primary/10 rounded animate-pulse" />
            <div className="h-12 w-4/5 bg-primary/10 rounded animate-pulse" />
          </div>

          <div className="space-y-2 mb-8">
            <div className="h-6 w-full bg-muted rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
          </div>

          {/* Author skeleton */}
          <div className="flex items-center gap-4 border-t border-b border-primary/10 py-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              <div className="h-4 w-4/5 bg-muted rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
