import React from 'react';

const AlbumCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse w-full aspect-square bg-indigo-900/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
        <div>
          <div className="h-4 w-32 bg-indigo-700/40 rounded mb-1"></div>
          <div className="h-3 w-20 bg-indigo-600/30 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCardSkeleton;
