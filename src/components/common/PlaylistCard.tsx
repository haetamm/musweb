import { PlaylistResponse } from '@/lib/action/PlaylistAction';
import { urlPage } from '@/utils/constans';
import { formatDurationToMinutes } from '@/utils/helper';
import Link from 'next/link';
import React from 'react';
import { FaMusic, FaClock, FaHeadphones } from 'react-icons/fa';

const PlaylistCard: React.FC<{ playlist: PlaylistResponse }> = ({
  playlist,
}) => {
  return (
    <div className="relative group overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 shadow-xl hover:shadow-2xl transition-all duration-500 h-full w-full">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 group-hover:opacity-15 transition-opacity duration-700" />

      {/* Animated gradient elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-indigo-700/40 to-purple-700/40 rounded-full blur-xl group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-700/40 to-indigo-700/40 rounded-full blur-xl group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000" />

      {/* Content container */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between">
        {/* Header section */}
        <div className="flex justify-between items-start">
          {/* Icon with floating effect */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
            <div className="relative p-3 rounded-lg bg-gradient-to-br from-indigo-800/50 to-purple-800/50 shadow-lg backdrop-blur-sm border border-indigo-700/30 group-hover:border-purple-400/30 transition-all">
              <FaMusic className="text-purple-300 text-xl group-hover:text-purple-100 transition-colors" />
            </div>
          </div>

          {/* Stats with matching colors */}
          <div className="flex space-x-3">
            <div className="flex items-center space-x-1 text-sm text-indigo-200/80 group-hover:text-indigo-100 transition-colors">
              <FaHeadphones className="text-current" />
              <span>{playlist.songCount}</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-purple-200/80 group-hover:text-purple-100 transition-colors">
              <FaClock className="text-current" />
              <span>{formatDurationToMinutes(playlist.totalDuration)}</span>
            </div>
          </div>
        </div>

        {/* Text section with subtle hover effects */}
        <div className="mt-6">
          <Link
            href={`${urlPage.PLAYLIST_DETAIL}/${playlist.id}`}
            className="block font-bold text-white text-2xl tracking-tight mb-1 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300"
          >
            {playlist.title}
          </Link>
          <p className="text-indigo-200/70 text-sm font-medium group-hover:text-indigo-100 transition-colors">
            {playlist.owner}
          </p>
        </div>

        {/* Hover effect elements */}
        <div className="absolute inset-0 border border-transparent group-hover:border-purple-400/20 pointer-events-none transition-all duration-500" />
        <div className="absolute inset-0 shadow-[inset_0_0_30px_0_rgba(139,92,246,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default PlaylistCard;
