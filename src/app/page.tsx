import AlbumCarousel from '@/components/common/AlbumCarousel';
import ListSong from '@/components/common/ListSong';
import SongCarousel from '@/components/common/SongCarousel';
import SongTable from '@/components/common/SongTable';
import React from 'react';

const Home = () => {
  return (
    <div className="mx-auto kontener">
      <main className="mb-16 grid grid-cols-1 lg:grid-cols-[65%_35%] xl:grid-cols-[73%_27%] lg:mb-0 md:px-3 xl:px-0">
        <div className="order-2 lg:order-1 lg:pr-5">
          <AlbumCarousel />
          <SongCarousel />
          <ListSong />
        </div>
        <div className="relative order-1 lg:order-2 ">
          <SongTable />
        </div>
      </main>
    </div>
  );
};

export default Home;
