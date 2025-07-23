'use client';

import React, { useEffect } from 'react';
import { useModalStore } from '@/stores/modal';
import { MdClose } from 'react-icons/md';
import SongForm from './SongForm';
import useSongStore from '@/stores/song';

const SongFormSkeleton = () => {
  return (
    <div className="my-10 animate-pulse space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-10 bg-gray-600 rounded" />
        ))}
      </div>
      <div className="flex space-x-4 mt-4">
        <div className="w-full h-10 bg-gray-600 rounded" />
        <div className="w-full h-10 bg-gray-600 rounded" />
      </div>
    </div>
  );
};

type UpdateSongFormProps = {
  fetchSong: () => void;
};

const UpdateSongForm: React.FC<UpdateSongFormProps> = ({ fetchSong }) => {
  const { loadingDetail, songDetail } = useSongStore();
  const { hideModal } = useModalStore();

  useEffect(() => {
    fetchSong();
  }, []);

  const handleBack = () => {
    hideModal();
  };

  return (
    <div className="w-full flex min-h-full justify-center p-3 items-center animate-[slide-down_0.3s]">
      <div className="transform rounded-lg overflow-hidden text-left shadow-xl transition-all w-full bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="flex justify-end pt-3 px-5">
          <MdClose onClick={handleBack} className="h-6 w-6 cursor-pointer" />
        </div>
        <div className="min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-200px)] kontener px-8 py-3 mx-auto">
          <div className="space-y-3">
            <p className="text-2xl lg:text-3xl">Update your audio files.</p>
            <p className="text-xs lg:text-sm">
              For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file
              size is 4GB uncompressed. Learn more.
            </p>
          </div>

          {loadingDetail ? (
            <SongFormSkeleton />
          ) : songDetail ? (
            <SongForm metadata={songDetail} onCancel={handleBack} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UpdateSongForm;
