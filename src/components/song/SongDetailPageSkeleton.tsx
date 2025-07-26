const SkeletonBox = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-700/50 animate-pulse rounded ${className}`} />
);

const SongDetailPageSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-8 mb-10">
    <div className="w-full lg:w-80 h-80 rounded-2xl bg-gray-700 animate-pulse" />
    <div className="flex-1 space-y-6">
      <SkeletonBox className="h-10 w-3/4" />
      <SkeletonBox className="h-6 w-1/2" />
      <SkeletonBox className="h-5 w-1/3" />
      <div className="flex gap-4 mt-4">
        <SkeletonBox className="h-12 w-12 rounded-full" />
        <SkeletonBox className="h-12 w-12 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonBox key={idx} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  </div>
);

export default SongDetailPageSkeleton;
