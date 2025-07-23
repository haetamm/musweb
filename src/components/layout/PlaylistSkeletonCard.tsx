const PlaylistSkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-2xl bg-gradient-to-br from-indigo-900 to-purple-800 shadow-xl h-full w-full p-6 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="w-10 h-10 rounded-lg bg-indigo-800/50" />
        <div className="flex space-x-3">
          <div className="w-10 h-4 rounded bg-indigo-700/50" />
          <div className="w-10 h-4 rounded bg-purple-700/50" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        <div className="h-6 w-3/4 rounded bg-indigo-700/60" />
        <div className="h-4 w-1/2 rounded bg-indigo-600/50" />
      </div>
    </div>
  );
};

export default PlaylistSkeletonCard;
