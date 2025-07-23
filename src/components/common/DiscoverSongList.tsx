'use client';

import React, { useEffect, useState } from 'react';
import SongCard from './SongCard';
import { SongDetail } from '@/utils/types';
import useSongStore from '@/stores/song';
import SongCardSkeleton from './SongCardSkeleton';
import ErrorMessageSection from '../layout/ErrorMessageSection';

interface Props {
  songsResult: SongDetail[] | undefined;
  error: string | undefined;
}

const DiscoverSongList: React.FC<Props> = ({ songsResult, error }) => {
  const [loading, setLoading] = useState(true);
  const { songs, setSongs } = useSongStore();

  useEffect(() => {
    setSongs(songsResult ?? []);
    setLoading(false);
  }, [setSongs, songsResult]);

  const skeletons = Array.from({ length: 8 });

  return (
    <>
      {error && <ErrorMessageSection error={error} />}

      <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6 xl:gap-y-10">
        {!error &&
          loading &&
          skeletons.map((_, index) => <SongCardSkeleton key={index} />)}

        {!error &&
          !loading &&
          songs.map((song) => <SongCard key={song.id} song={song} />)}
      </div>
    </>
  );
};

export default DiscoverSongList;
