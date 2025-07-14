import ErrorMessage from '@/components/common/ErrorMessage';
import SongCard from '@/components/common/SongCard';
import { SongAction } from '@/lib/action/SongAction';
import React from 'react';

const SongLikesPage = async () => {
  const { data: songs, error } = await SongAction.getSongsLikedByCurrentUser();
  const isEmpty = songs?.length === 0;

  if (error) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="mb-13 lg:mb-0 lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your liked songs:</h2>

      {isEmpty && (
        <div className="text-sm text-gray-400">
          You haven’t liked any songs yet.
        </div>
      )}

      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 gap-y-6 xl:gap-y-10">
        {songs?.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SongLikesPage;
