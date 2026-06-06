export function TableSkeleton({ rows = 8 }) {
  return (
    <div className="divide-y divide-slate-100 dark:divide-slate-800">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3.5" style={{ opacity: 1 - i * 0.07 }}>
          <div className="shimmer h-3.5 rounded w-24" />
          <div className="shimmer h-3.5 rounded w-32" />
          <div className="shimmer h-3.5 rounded w-24" />
          <div className="shimmer h-3.5 rounded w-16 ml-auto" />
          <div className="shimmer h-3.5 rounded w-10" />
          <div className="shimmer h-3.5 rounded w-20" />
          <div className="shimmer h-5 rounded-full w-16" />
          <div className="shimmer h-3.5 rounded w-20" />
          <div className="shimmer h-3.5 rounded w-20" />
        </div>
      ))}
    </div>
  );
}

export function CardSkeleton({ className = '' }) {
  return (
    <div className={`card p-5 space-y-3 ${className}`}>
      <div className="shimmer h-3.5 rounded w-20" />
      <div className="shimmer h-7 rounded w-32" />
      <div className="shimmer h-px rounded w-full mt-4" />
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center gap-4">
        <div className="shimmer w-16 h-16 rounded-2xl shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="shimmer h-5 rounded w-40" />
          <div className="shimmer h-4 rounded w-28" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shimmer h-20 rounded-xl" />
        ))}
      </div>
      <div className="shimmer h-48 rounded-xl" />
    </div>
  );
}
