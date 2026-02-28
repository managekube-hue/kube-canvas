interface Props {
  lines?: number;
  className?: string;
}

export function IdeLoadingSkeleton({ lines = 6, className = "" }: Props) {
  return (
    <div className={`space-y-2 px-3 py-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="flex items-center gap-2 animate-pulse">
          <div className="w-4 h-4 rounded bg-white/5" />
          <div
            className="h-3 rounded bg-white/5"
            style={{ width: `${40 + Math.random() * 50}%` }}
          />
        </div>
      ))}
    </div>
  );
}

export function IdeEditorSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden animate-pulse">
      {/* Tab bar skeleton */}
      <div className="h-9 border-b border-white/5 flex items-center px-2 gap-2">
        <div className="h-5 w-24 rounded bg-white/5" />
        <div className="h-5 w-20 rounded bg-white/5" />
      </div>
      {/* Breadcrumb skeleton */}
      <div className="h-6 border-b border-white/[0.03] flex items-center px-3 gap-2">
        <div className="h-2.5 w-48 rounded bg-white/[0.03]" />
      </div>
      {/* Code lines skeleton */}
      <div className="flex-1 p-4 space-y-1.5">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-6 h-3 rounded bg-white/[0.03]" />
            <div className="h-3 rounded bg-white/[0.03]" style={{ width: `${20 + Math.random() * 60}%` }} />
          </div>
        ))}
      </div>
      {/* Status bar skeleton */}
      <div className="h-6 bg-blue-600/30 flex items-center px-3 gap-4">
        <div className="h-2.5 w-16 rounded bg-white/10" />
        <div className="flex-1" />
        <div className="h-2.5 w-12 rounded bg-white/10" />
      </div>
    </div>
  );
}
