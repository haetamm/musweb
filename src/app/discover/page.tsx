import AlbumCarousel from '@/components/common/AlbumCarousel';
import ListSong from '@/components/common/ListSong';
import SongCarousel from '@/components/common/SongCarousel';
import SongTable from '@/components/common/SongTable';
import { AlbumAction } from '@/lib/action/AlbumAction';
import { SongAction } from '@/lib/action/SongAction';
import React from 'react';

const DiscoverPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const { data } = await AlbumAction.getAlbumByQuery('', currentPage);

  const { data: results } = await SongAction.getSongByQuery('', currentPage);
  const albums = data?.albums || [];
  const songs = results?.songs || [];

  return (
    <div className="mx-auto kontener px-4 lg:px-8">
      <main className="mb-16 grid grid-cols-1 lg:grid-cols-[65%_35%] xl:grid-cols-[73%_27%] lg:mb-0 md:px-3 xl:px-0">
        <div className="order-2 lg:order-1 lg:pr-5">
          <AlbumCarousel albums={albums} />
          <SongCarousel songs={songs} />
          <ListSong />
        </div>
        <div className="relative order-1 lg:order-2 ">
          <SongTable />
        </div>
      </main>
    </div>
  );
};

export default DiscoverPage;
