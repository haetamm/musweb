import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import PlaylistCard from '@/components/common/PlaylistCard';
import { PlaylistAction } from '@/lib/action/PlaylistAction';
import { urlPage } from '@/utils/constans';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const PlaylistPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, error } =
    await PlaylistAction.getPlaylistByUserCurrent(currentPage);

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { playlists, _pagination } = data;
  const isEmpty = playlists.length === 0;

  return (
    <div className="mb-13 lg:mb-0 lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Playlist:</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        <div className="w-full glass-card h-[152px] bg-gradient-to-br from-indigo-900 to-purple-800 rounded-xl shadow-lg flex items-center justify-center">
          <FaPlus className="text-7xl text-purple-300/50" />
        </div>

        {isEmpty && (
          <div className="col-span-full text-sm text-gray-400 mt-2">
            You haven’t uploaded any playlists yet.
          </div>
        )}

        {playlists?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
      {_pagination.total > 0 && (
        <Pagination pagination={_pagination} baseUrl={urlPage.PLAYLIST} />
      )}
    </div>
  );
};

export default PlaylistPage;
