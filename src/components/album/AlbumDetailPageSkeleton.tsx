import React from 'react';
import SongDetailTable from '../common/SongDetailTable';

const AlbumDetailPageSkeleton = () => {
  return (
    <>
      <div className="px-2 lg:px-6 mx-auto animate-pulse">
        <div className="flex flex-col xs:flex-row gap-8 items-start md:items-end mb-10">
          <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-gray-700/50 rounded-2xl shadow-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-4 w-24 bg-gray-700 rounded" />
            <div className="h-8 w-3/4 bg-gray-600 rounded" />
            <div className="h-6 w-1/2 bg-gray-700 rounded" />
            <div className="flex gap-4">
              <div className="h-5 w-20 bg-gray-700 rounded" />
              <div className="h-5 w-24 bg-gray-700 rounded" />
              <div className="h-5 w-16 bg-gray-700 rounded" />
            </div>
            <div className="flex gap-4 mt-4">
              <div className="h-10 w-28 bg-gray-600 rounded-full" />
            </div>
          </div>
        </div>
        <SongDetailTable songs={[]} loading={true} />
      </div>
    </>
  );
};

export default AlbumDetailPageSkeleton;
