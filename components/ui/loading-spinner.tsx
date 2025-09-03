export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted rounded ${className}`} />;
}

export function PostSkeleton() {
  return (
    <div className="group relative overflow-hidden">
      <div className="pl-8 pr-4 py-8 border-l-4 border-transparent">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <LoadingSkeleton className="w-16 h-6" />
            <div className="hidden sm:block w-2 h-2 bg-muted-foreground/30 rounded-full" />
            <LoadingSkeleton className="w-20 h-4" />
          </div>
          <LoadingSkeleton className="w-20 h-6" />
        </div>

        <LoadingSkeleton className="w-3/4 h-8 mb-4" />
        <LoadingSkeleton className="w-full h-6 mb-6" />

        <div className="flex items-center justify-between">
          <LoadingSkeleton className="w-32 h-6" />
          <LoadingSkeleton className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
}
