import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import SearchPlaylistSection from '@/components/search/SearchPlaylistSection';
import SearchNotFound from '@/components/search/SearchNotFound';
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
      <div className="py-4 lg:py-0 space-y-6">
        <SearchPlaylistSection playlistResults={playlists} />
      </div>

      {isEmpty && <SearchNotFound q={q || ''} />}

      {_pagination.total > 10 && (
        <Pagination pagination={_pagination} baseUrl={baseUrl} />
      )}
    </>
  );
};

export default SearchPalylistPage;
