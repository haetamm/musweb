import ErrorMessage from '@/components/common/ErrorMessage';
import PlaylistCard from '@/components/common/PlaylistCard';
import { PlaylistAction } from '@/lib/action/PlaylistAction';
import React from 'react';

const PlaylistLikesPage = async () => {
  const { data: playlists, error } =
    await PlaylistAction.getPlaylistLikedByUserCurrent();
  const isEmpty = playlists?.length === 0;

  if (error) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="mb-13 lg:mb-0 lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">
        Your liked playlists:
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {isEmpty && (
          <div className="col-span-full text-sm text-gray-400 mt-2">
            You haven’t liked any playlists yet.
          </div>
        )}

        {playlists?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default PlaylistLikesPage;
