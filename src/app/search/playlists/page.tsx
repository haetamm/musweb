import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import PlaylistCard from '@/components/common/PlaylistCard';
import { PlaylistAction } from '@/lib/action/PlaylistAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const SearchPalylistPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) => {
  const { page, q } = await searchParams;
  const currentPage = Number(page) || 1;
  const baseUrl = `${urlPage.SEARCH_PLAYLIST}?q=${q}`;

  const { data, error } = await PlaylistAction.getPlaylistsByQuery(
    String(q),
    currentPage
  );

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { playlists, _pagination } = data;
  const isEmpty = playlists.length === 0;
  return (
    <>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
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

export default SearchPalylistPage;
