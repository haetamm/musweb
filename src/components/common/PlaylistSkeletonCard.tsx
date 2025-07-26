const PlaylistSkeletonCard = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 shadow-xl h-full w-full animate-pulse">
      <div className="absolute inset-0 bg-gray-700/20" />

      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gray-700/30 rounded-full blur-xl" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gray-700/30 rounded-full blur-xl" />

      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="relative">
            <div className="p-3 rounded-lg bg-gray-700/50 shadow-lg backdrop-blur-sm border border-gray-600/30">
              <div className="w-5 h-5 bg-gray-600 rounded" />
            </div>
          </div>

          <div className="flex space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-600 rounded-full" />
              <div className="w-8 h-4 bg-gray-600 rounded" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-4 h-4 bg-gray-600 rounded-full" />
              <div className="w-12 h-4 bg-gray-600 rounded" />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-7 w-3/4 bg-gray-600 rounded-lg" />
          <div className="h-4 w-1/2 bg-gray-600/80 rounded-lg" />
        </div>

        <div className="absolute inset-0 border border-gray-600/20 rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
};

export default PlaylistSkeletonCard;
