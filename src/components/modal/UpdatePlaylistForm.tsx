'use client';

import React, { useState } from 'react';
import usePlaylistStore, { PlaylistWithSongs } from '@/stores/playlists';

const SkeletonCard = () => (
  <div className="glass-card h-[58px] flex justify-between px-2 py-1 items-center rounded-lg shadow-md animate-pulse bg-gray-800">
    <div className="flex flex-col space-y-2 w-3/4">
      <div className="h-4 bg-gray-700 rounded w-1/2" />
      <div className="h-3 bg-gray-700 rounded w-1/4" />
    </div>
    <div className="h-8 w-24 bg-gray-700 rounded" />
  </div>
);

interface Props {
  loading: boolean;
  playlists: PlaylistWithSongs[];
}

const UpdatePlaylistForm: React.FC<Props> = ({ loading, playlists }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { playlistSong } = usePlaylistStore();

  const filteredPlaylists =
    searchTerm.trim() === ''
      ? playlists
      : playlists.filter((playlist) =>
          playlist.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const getButtonCondition = (playlist: PlaylistWithSongs, songId: string) => {
    const isSongInPlaylist = playlist.songs.some((song) => song.id === songId);
    return isSongInPlaylist ? 'Remove' : 'Add to Playlist';
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="font-medium text-lg">Filter:</label>
        <input
          type="search"
          placeholder="Search for a playlist..."
          className="w-full mt-0.5 p-2.5 focus:bg-white focus:text-black bg-gray-900 rounded-lg focus:outline-none text-white placeholder-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className={`${filteredPlaylists.length > 5 ? 'h-[calc(100vh-265px)] pr-2' : 'h-full'} space-y-4 overflow-auto`}
      >
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filteredPlaylists.length === 0 ? (
          <div className="text-center text-gray-400 mt-4">
            No playlists found.
          </div>
        ) : (
          filteredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className="glass-card h-[58px] flex justify-between px-2 py-1 items-center rounded-lg shadow-md hover:bg-gray-700 transition-all"
            >
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">{playlist.title}</h3>
                <p className="text-sm text-gray-300">
                  {playlist.songCount} songs
                </p>
              </div>
              <button
                className="px-2 py-1.5 text-sm font-medium bg-white text-black rounded hover:bg-gray-200 transition"
                disabled={!playlistSong}
              >
                {playlistSong
                  ? getButtonCondition(playlist, playlistSong.id)
                  : 'Select a song'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UpdatePlaylistForm;
