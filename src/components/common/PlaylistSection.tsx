'use client';
import React, { useEffect, useState } from 'react';
import PlaylistCard from './PlaylistCard';
import usePlaylistStore from '@/stores/playlists';
import { PlaylistResponse } from '@/lib/action/PlaylistAction';
import PlaylistSkeletonCard from '../layout/PlaylistSkeletonCard';

interface Props {
  playlistResults: PlaylistResponse[];
}

const PlaylistSection: React.FC<Props> = ({ playlistResults }) => {
  const { setPlaylists, playlists } = usePlaylistStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPlaylists(playlistResults);
    setLoading(false);
  }, [playlistResults, setPlaylists]);

  const skeletonArray = Array.from({ length: 8 });

  return (
    <>
      {loading
        ? skeletonArray.map((_, i) => <PlaylistSkeletonCard key={i} />)
        : playlists?.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
    </>
  );
};

export default PlaylistSection;
