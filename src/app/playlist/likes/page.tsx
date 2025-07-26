import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import PlaylistSection from '@/components/search/SearchPlaylistSection';
import { PlaylistAction } from '@/lib/action/PlaylistAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const PlaylistLikesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, error } =
    await PlaylistAction.getPlaylistLikedByUserCurrent(currentPage);

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { playlists, _pagination } = data;
  const isEmpty = playlists.length === 0;

  return (
    <div className="lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">
        Your liked playlists:
      </h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        <PlaylistSection playlistResults={playlists} />
      </div>

      {isEmpty && (
        <div className="col-span-full text-sm text-gray-400 mt-2">
          You haven’t liked any playlists yet.
        </div>
      )}

      {_pagination.total > 10 && (
        <Pagination pagination={_pagination} baseUrl={urlPage.PLAYLIST_LIKES} />
      )}
    </div>
  );
};

export default PlaylistLikesPage;
