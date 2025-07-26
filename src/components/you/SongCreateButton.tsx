'use client';
import { useModalStore } from '@/stores/modal';
import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const SongCreateButton = () => {
  const { showCreateSong } = useModalStore();
  return (
    <>
      <button
        onClick={showCreateSong}
        className="min-h-[177px] w-full glass-card bg-gradient-to-br from-indigo-900 to-purple-800 shadow-lg flex items-center justify-center cursor-pointer hover:opacity-80 transition"
      >
        <FaPlus className="text-7xl text-purple-300/50" title="Add Song" />
      </button>
    </>
  );
};

export default SongCreateButton;
