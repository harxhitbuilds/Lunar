const FeaturedSectionSkeleton = () => {
  return (
    <div className="my-6 flex flex-col gap-4">
      {/* Title Skeleton */}
      <div className="mb-4 flex items-center justify-between">
        <div className="h-9 w-48 animate-pulse rounded-md bg-zinc-800"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 overflow-hidden">
            {/* Image Skeleton */}
            <div className="h-12 w-12 flex-shrink-0 animate-pulse rounded-xs bg-zinc-800"></div>

            {/* Text Skeleton */}
            <div className="min-w-0 flex-1 flex-col gap-2 pl-4">
              <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-zinc-800"></div>
              <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-800"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSectionSkeleton;
