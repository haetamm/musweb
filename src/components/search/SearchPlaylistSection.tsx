'use client';
import React, { useEffect, useState } from 'react';
import PlaylistCard from '../common/PlaylistCard';
import usePlaylistStore from '@/stores/playlists';
import { PlaylistResponse } from '@/lib/action/PlaylistAction';
import PlaylistSkeletonCard from '../common/PlaylistSkeletonCard';

interface Props {
  playlistResults: PlaylistResponse[];
}

const SearchPlaylistSection: React.FC<Props> = ({ playlistResults }) => {
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

export default SearchPlaylistSection;
