const SectionGridSkeleton = () => {
  return (
    <div className="mb-8">
      <div className="mb-4 h-8 w-48 animate-pulse rounded bg-zinc-800" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse rounded-md bg-zinc-800/40 p-4">
            <div className="mb-4 aspect-square rounded-md bg-zinc-700" />
            <div className="mb-2 h-4 w-3/4 rounded bg-zinc-700" />
            <div className="h-4 w-1/2 rounded bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
};
export default SectionGridSkeleton;
