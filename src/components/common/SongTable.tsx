'use client';

import { urlPage } from '@/utils/constans';
import { songs } from '@/utils/data';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaPlay, FaEllipsisH } from 'react-icons/fa';

const SongTable = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="lg:sticky lg:top-[83px] lg:h-[calc(100vh-218px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mt-2 lg:mt-0 mb-2">
        <h2 className="text-lg font-bold">Tranding Right Nows</h2>
      </div>

      {/* Scrollable Song List */}
      <div className="flex-1 lg:overflow-auto no-scrollbar h-full">
        <div className="space-y-1 divide-y divide-white/5 glass-card py-2">
          {songs.slice(0, 7).map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
            >
              {/* Album Cover */}
              <div className="relative">
                <Image
                  width={6}
                  height={6}
                  src={song.cover}
                  alt={`${song.title} cover`}
                  className="w-14 h-14 object-cover"
                />
                <button className="absolute inset-0 m-auto w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <FaPlay className="text-white text-xs" />
                </button>
              </div>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`${urlPage.SONG}/${song.id}`}
                  className="text-white font-medium truncate"
                >
                  {song.title}
                </Link>
                <p className="text-indigo-300 text-sm truncate">
                  {song.performer}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-white/70 text-sm">{song.duration}</span>
                <button className="text-indigo-300 hover:text-white">
                  <FaEllipsisH size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto text-sm hidden lg:block pt-6">
        <p>Terms of Service | Privacy Policy | Cookie Policy</p>
        <p>© 2025 Musweb.</p>
      </div>
    </div>
  );
};

export default SongTable;
