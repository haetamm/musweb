import SongDetailTable from '../common/SongDetailTable';

const PlaylistDetailSkeleton = () => {
  return (
    <div className="md:px-6 mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div className="hidden md:flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-purple-300/20 rounded-full"></div>
          <div className="h-8 w-48 bg-purple-300/20 rounded"></div>
        </div>
        <div className="h-10 w-32 bg-purple-300/20 rounded-full"></div>
      </div>

      {/* Playlist Info Skeleton */}
      <div className="flex flex-col xs:flex-row items-center md:items-end space-y-6 xs:space-y-0 xs:space-x-8 mb-12">
        <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/20 rounded-xl"></div>
        <div className="flex-1 w-full px-2 xs:px-0 space-y-4">
          <div className="h-4 w-24 bg-purple-200/20 rounded"></div>
          <div className="h-12 w-full md:w-3/4 bg-purple-200/20 rounded"></div>
          <div className="h-4 w-48 bg-purple-200/20 rounded"></div>
          <div className="flex space-x-4 pt-4">
            <div className="h-12 w-32 bg-purple-500/20 rounded-full"></div>
            <div className="h-12 w-12 bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Song Table Skeleton (assuming SongDetailTable has its own skeleton) */}
      <div className="mb-8">
        <SongDetailTable songs={[]} loading={true} />
      </div>

      {/* Stats Skeleton */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-300/20 p-4 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-purple-200/20 rounded"></div>
                <div className="h-6 w-12 bg-purple-200/20 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistDetailSkeleton;
