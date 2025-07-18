import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import SearchSongCard from '@/components/common/SearchSongCard';
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
        {songs.map((song) => (
          <SearchSongCard key={song.id} song={song} />
        ))}
      </div>

      {isEmpty && (
        <div className="flex justify-center w-full items-center h-[calc(100vh-255px)] xl:h-[calc(100vh-280px)] px-4">
          <div className="flex-col text-center">
            <p className="text-xl">
              {`Sorry we didn't find any results for “${q}”.`}
            </p>
            <p>Check the spelling, or try a different search.</p>
          </div>
        </div>
      )}

      {_pagination.total > 0 && (
        <Pagination pagination={_pagination} baseUrl={baseUrl} />
      )}
    </>
  );
};

export default SearchPage;
