import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import SearchSongList from '@/components/search/SearchSongList';
import SearchNotFound from '@/components/search/SearchNotFound';
import { SongAction } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) => {
  const { page, q } = await searchParams;
  const currentPage = Number(page) || 1;
  const baseUrl = `${urlPage.SEARCH}?q=${q}`;

  const { data, error } = await SongAction.getSongByQuery(
    String(q),
    currentPage
  );

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { songs, _pagination } = data;
  const isEmpty = songs.length === 0;

  return (
    <>
      <div className="py-4 lg:py-0 xs:space-y-2 xl:space-y-7">
        <SearchSongList songsResult={songs} />
      </div>

      {isEmpty && <SearchNotFound q={q || ''} />}

      {_pagination.total > 10 && (
        <Pagination pagination={_pagination} baseUrl={baseUrl} />
      )}
    </>
  );
};

export default SearchPage;
