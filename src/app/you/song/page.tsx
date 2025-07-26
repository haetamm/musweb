import ErrorMessage from '@/components/common/ErrorMessage';
import MySongList from '@/components/you/MySongList';
import Pagination from '@/components/common/Pagination';
import SongCreateButton from '@/components/you/SongCreateButton';
import { SongAction } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const MySongPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, error } = await SongAction.getSongByCurrentUser(currentPage);

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { songs, _pagination } = data;
  const isEmpty = songs.length === 0;

  return (
    <div className="lg:px-4 mb-13 lg:mb-0">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Songs:</h2>

      <MySongList songsResult={songs}>
        <SongCreateButton />
      </MySongList>

      {isEmpty && (
        <div className="col-span-full text-sm text-gray-400 mt-4">
          You haven’t uploaded any songs yet.
        </div>
      )}

      {_pagination.total > 10 && (
        <Pagination pagination={_pagination} baseUrl={urlPage.LIBRARY_SONG} />
      )}
    </div>
  );
};

export default MySongPage;
