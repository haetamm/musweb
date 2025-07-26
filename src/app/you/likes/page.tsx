import ErrorMessage from '@/components/common/ErrorMessage';
import MySongList from '@/components/you/MySongList';
import Pagination from '@/components/common/Pagination';
import { SongAction } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const SongLikesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, error } =
    await SongAction.getSongsLikedByCurrentUser(currentPage);

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { songs, _pagination } = data;
  const isEmpty = songs.length === 0;

  return (
    <div className="mb-13 lg:mb-0 lg:px-4">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your liked songs:</h2>

      {isEmpty && (
        <div className="text-sm text-gray-400">
          You haven’t liked any songs yet.
        </div>
      )}

      <MySongList songsResult={songs} />

      {_pagination.total > 10 && (
        <Pagination
          pagination={_pagination}
          baseUrl={urlPage.LIBRARY_SONG_LIKES}
        />
      )}
    </div>
  );
};

export default SongLikesPage;
