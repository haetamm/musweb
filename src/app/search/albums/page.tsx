import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import SearchAlbumList from '@/components/common/SearchAlbumList';
import SearchNotFound from '@/components/layout/SearchNotFound';
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
      <div className="py-4 lg:py-0 space-y-6 xl:space-y-7">
        <SearchAlbumList albumResults={albums} />
      </div>

      {isEmpty && <SearchNotFound q={q || ''} />}

      {_pagination.total > 10 && (
        <Pagination pagination={_pagination} baseUrl={baseUrl} />
      )}
    </>
  );
};

export default SearchAlbumPage;
