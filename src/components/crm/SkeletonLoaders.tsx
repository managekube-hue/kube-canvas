export function SkeletonCard() {
  return (
    <div className="border border-border rounded-lg p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-muted rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-1/3" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
        <div className="h-6 w-16 bg-muted rounded" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonKPI() {
  return (
    <div className="border border-border rounded-lg p-4 animate-pulse">
      <div className="h-8 bg-muted rounded w-20 mb-2" />
      <div className="h-3 bg-muted rounded w-24" />
    </div>
  );
}
