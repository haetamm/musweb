'use client';

import { AlbumResponse } from '@/lib/action/AlbumAction';
import { useModalStore } from '@/stores/modal';
import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import useAlbumStore from '@/stores/album';
import AlbumCard from '../common/AlbumCard';
import AlbumCardSkeleton from '../common/AlbumCardSkeleton';

interface Props {
  albumResults: AlbumResponse[];
}
const MyAlbumList: React.FC<Props> = ({ albumResults }) => {
  const { showCreateAlbum } = useModalStore();
  const { setAlbums, albums } = useAlbumStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAlbums(albumResults);
    setLoading(false);
  }, [albumResults, setAlbums]);

  const skeletonArray = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-y-10">
      <button
        onClick={showCreateAlbum}
        className={`${
          albums?.length ? 'h-full' : 'min-h-[177px]'
        } w-full cursor-pointer glass-card bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg flex items-center justify-center`}
      >
        <FaPlus className="text-7xl text-purple-300/50" />
      </button>

      {loading
        ? skeletonArray.map((_, i) => <AlbumCardSkeleton key={i} />)
        : albums?.map((album) => <AlbumCard key={album.id} album={album} />)}
    </div>
  );
};

export default MyAlbumList;
