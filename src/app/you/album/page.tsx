import AlbumCard from '@/components/common/AlbumCard';
import ErrorMessage from '@/components/common/ErrorMessage';
import { AlbumAction } from '@/lib/action/AlbumAction';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

const MyAlbumPage = async () => {
  const { data: albums, error } = await AlbumAction.getAlbumByUserCurrent();
  const isEmpty = albums?.length === 0;

  if (error) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="lg:px-4 mb-13 lg:mb-0">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Albums:</h2>
      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-y-10">
        <div
          className={`${albums?.length ? 'h-full' : 'min-h-[177px]'} w-full glass-card bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg flex items-center justify-center`}
        >
          <FaPlus className="text-7xl  text-purple-300/50" />
        </div>

        {isEmpty && (
          <div className="col-span-full text-sm text-gray-400 mt-2">
            You haven’t uploaded any albums yet.
          </div>
        )}

        {albums?.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default MyAlbumPage;
