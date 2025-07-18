import ErrorMessage from '@/components/common/ErrorMessage';
import Pagination from '@/components/common/Pagination';
import SongCard from '@/components/common/SongCard';
import { SongAction } from '@/lib/action/SongAction';
import { urlPage } from '@/utils/constans';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

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

      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-y-10">
        <div className="min-h-[177px] w-full glass-card bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition">
          <FaPlus className="text-7xl text-purple-300/50" title="Add Song" />
        </div>

        {isEmpty && (
          <div className="col-span-full text-sm text-gray-400 mt-2">
            You haven’t uploaded any songs yet.
          </div>
        )}

        {songs?.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {_pagination.total > 0 && (
        <Pagination pagination={_pagination} baseUrl={urlPage.LIBRARY_SONG} />
      )}
    </div>
  );
};

export default MySongPage;
