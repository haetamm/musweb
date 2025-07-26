'use client';

import React, { useState } from 'react';
import { useModalStore } from '@/stores/modal';
import { MdClose } from 'react-icons/md';
import SongForm from './SongForm';
import SongInputFile from '../common/SongInputFile';
import { SongMetadata } from '@/utils/types';

const CreateSongForm = () => {
  const { hideModal } = useModalStore();
  const [metadata, setMetadata] = useState<SongMetadata | null>(null);

  return (
    <div className="w-full flex min-h-full justify-center p-3 items-center animate-[slide-down_0.3s]">
      <div className="transform rounded-lg overflow-hidden text-left shadow-xl transition-all w-full bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        <div className="flex justify-end pt-3 px-5">
          <MdClose onClick={hideModal} className="h-6 w-6 cursor-pointer" />
        </div>
        <div className="min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-200px)] kontener px-3 py-3 mx-auto">
          <div className="space-y-3">
            <p className="text-2xl lg:text-3xl">Upload your audio files.</p>
            <p className="text-xs lg:text-sm">
              For best quality, use WAV, FLAC, AIFF, or ALAC. The maximum file
              size is 4GB uncompressed. Learn more.
            </p>
          </div>
          {metadata ? (
            <SongForm metadata={metadata} onCancel={() => setMetadata(null)} />
          ) : (
            <SongInputFile onMetadataExtracted={setMetadata} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateSongForm;
