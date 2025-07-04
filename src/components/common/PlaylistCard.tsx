import { urlPage } from '@/utils/constans';
import Link from 'next/link';
import React from 'react';
import { FaMusic } from 'react-icons/fa';

interface Playlist {
  id: string;
  name: string;
  username: string;
  songCount?: number;
}

const PlaylistCard: React.FC<{ playlist: Playlist }> = ({ playlist }) => {
  return (
    <div className="relative glass-card bg-black rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1  group w-full h-full">
      {/* Glowing accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-700/20 group-hover:opacity-80 opacity-60 transition-opacity" />

      {/* Pulsing center element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full bg-pink-600/10 group-hover:bg-pink-600/20 blur-xl transition-all" />
      </div>

      {/* Tightly packed content */}
      <div className="relative p-4 h-full flex flex-col justify-between space-y-3">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg">
            <FaMusic className="text-white text-xl" />
          </div>
          <div className="text-xs bg-black/50 text-white/80 px-2 py-1 rounded-full border border-white/10">
            {playlist.songCount || 0}
          </div>
        </div>

        {/* Bottom text */}
        <div>
          <Link
            href={`${urlPage.PLAYLIST}/${playlist.id}`}
            className="font-bold text-white text-xl line-clamp-1 drop-shadow-md"
          >
            {playlist.name}
          </Link>
          <p className="text-indigo-300 text-lg">@{playlist.username}</p>
        </div>
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 shadow-[0_0_30px_0_rgba(236,72,153,0.5)] opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
    </div>
  );
};

export default PlaylistCard;
