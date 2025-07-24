'use client';

import React from 'react';
import { Upload } from 'antd';
import type { UploadProps } from 'antd';
import { FiUploadCloud } from 'react-icons/fi';
import * as musicMetadata from 'music-metadata-browser';
import toast from 'react-hot-toast';
import { SongMetadata } from '@/utils/types';

const { Dragger } = Upload;

interface SongInputFileProps {
  onMetadataExtracted: (metadata: SongMetadata) => void;
}

const SongInputFile: React.FC<SongInputFileProps> = ({
  onMetadataExtracted,
}) => {
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: undefined,
    onChange(info) {
      const { originFileObj } = info.file;
      if (originFileObj) {
        musicMetadata
          .parseBlob(originFileObj, { duration: true })
          .then((meta) => {
            const { common, format } = meta;
            onMetadataExtracted({
              title: common.title || info.file.name || '',
              year: common.year?.toString() || '',
              performer: common.artist || '',
              genre: common.genre?.[0] || '',
              duration: format.duration
                ? Math.floor(format.duration).toString()
                : '',
              album: null,
              id: null,
            });
          })
          .catch((err) => {
            console.log('Error parsing metadata:', err);
            toast.error('Failed. Please try another file.');
          });
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: false,
  };

  return (
    <div className="my-10">
      <Dragger {...props}>
        <div className="p-4">
          <p className="ant-upload-drag-icon text-white flex justify-center">
            <FiUploadCloud className="w-14 h-14 lg:h-20 lg:w-20" />
          </p>
          <p className="text-white font-semibold text-xs lg:text-lg">
            Drag and drop audio files to get started.
          </p>
          <button className="mt-4 px-4 py-2 cursor-pointer bg-white text-black rounded-full font-medium">
            Choose files
          </button>
        </div>
      </Dragger>
    </div>
  );
};

export default SongInputFile;
