'use client';

import React, { useEffect, useState } from 'react';
import SongCard from '../common/SongCard';
import { SongDetail } from '@/utils/types';
import useSongStore from '@/stores/song';
import SongCardSkeleton from '../common/SongCardSkeleton';

interface MySongListProps {
  songsResult: SongDetail[];
  children?: React.ReactNode;
}

const MySongList: React.FC<MySongListProps> = ({ songsResult, children }) => {
  const { setSongs, songs } = useSongStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSongs(songsResult);
    setLoading(false);
  }, [songsResult, setSongs]);

  const skeletonArray = Array.from({ length: 10 });

  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 xl:gap-y-10">
      {children}

      {loading &&
        skeletonArray.map((_, index) => <SongCardSkeleton key={index} />)}

      {!loading && songs.map((song) => <SongCard key={song.id} song={song} />)}
    </div>
  );
};

export default MySongList;
