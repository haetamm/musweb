import PlaylistCard from '@/components/common/PlaylistCard';
import { playlists } from '@/utils/data';
import React from 'react';

const Playlist = () => {
  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold mt-2 mb-3">Playlist</h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-6">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};

export default Playlist;
