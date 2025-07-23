import React from 'react';

const SongCardSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-2 w-full">
      <div className="bg-gray-300 aspect-square w-full" />
      <div className="h-3 bg-gray-300 rounded w-4/5" />
      <div className="h-3 bg-gray-300 rounded w-3/5" />
    </div>
  );
};

export default SongCardSkeleton;
