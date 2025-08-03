const PlaylistActivitiesSkeleton = () => {
  const ActivitySkeletonItem = () => (
    <div className="p-3 sm:p-4 rounded-lg bg-indigo-800/30">
      <div className="flex justify-between">
        <div className="space-y-2 w-2/3">
          <div className="h-4 sm:h-5 bg-indigo-800/50 rounded-full animate-pulse" />
          <div className="h-3 sm:h-4 bg-indigo-800/50 rounded-full w-1/2 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-indigo-800/50 rounded-full animate-pulse" />
          <div className="h-3 w-12 sm:h-4 sm:w-16 bg-indigo-800/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-6 sm:h-8 bg-indigo-800/50 rounded-full w-48 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-4 bg-indigo-800/50 rounded-full w-24 animate-pulse" />
            <div className="h-4 bg-indigo-800/50 rounded-full w-24 animate-pulse" />
          </div>
        </div>
        <div className="h-6 w-6 sm:h-8 sm:w-8 bg-indigo-800/50 rounded-full animate-pulse" />
      </div>

      <div className="pt-4">
        <div className="h-5 sm:h-6 bg-indigo-800/50 rounded-full w-32 mb-4 animate-pulse" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <ActivitySkeletonItem key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistActivitiesSkeleton;
