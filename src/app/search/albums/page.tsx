import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import SearchAlbumCard from '@/components/common/SearchAlbumCard';
import { AlbumAction } from '@/lib/action/AlbumAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const SearchAlbumPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) => {
  const { page, q } = await searchParams;
  const currentPage = Number(page) || 1;
  const baseUrl = `${urlPage.SEARCH_ALBUM}?q=${q}`;

  const { data, error } = await AlbumAction.getAlbumByQuery(
    String(q),
    currentPage
  );

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { albums, _pagination } = data;
  const isEmpty = albums.length === 0;
  return (
    <>
      <div className="py-8 lg:py-0 space-y-6 xl:space-y-7">
        {albums.map((album) => (
          <SearchAlbumCard key={album.id} album={album} />
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

export default SearchAlbumPage;
