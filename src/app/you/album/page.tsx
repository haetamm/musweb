import ErrorMessage from '@/components/common/ErrorMessage';
import MyAlbumList from '@/components/common/MyAlbumList';
import Pagination from '@/components/common/Pagination';
import { AlbumAction } from '@/lib/action/AlbumAction';
import { urlPage } from '@/utils/constans';
import React from 'react';

const MyAlbumPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data, error } = await AlbumAction.getAlbumByUserCurrent(currentPage);

  if (error || !data) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  const { albums, _pagination } = data;
  const isEmpty = albums.length === 0;

  return (
    <div className="lg:px-4 mb-13 lg:mb-0">
      <h2 className="text-lg font-bold mt-4 lg:mt-0 mb-2">Your Albums:</h2>

      <MyAlbumList albumResults={albums} />

      {isEmpty && (
        <div className="col-span-full text-sm text-gray-400 mt-2">
          You haven’t uploaded any albums yet.
        </div>
      )}

      {_pagination.total > 10 && (
        <Pagination pagination={_pagination} baseUrl={urlPage.LIBRARY_ALBUM} />
      )}
    </div>
  );
};

export default MyAlbumPage;
