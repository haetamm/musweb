'use client';

import { formatDurationToMinutes } from '@/utils/helper';
import { urlPage } from '@/utils/constans';
import Link from 'next/link';
import React from 'react';
import { SongSection } from '@/utils/types';
import ActionButton from './ActionButton';
import { useModalStore } from '@/stores/modal';
import { useHandleErrors } from '@/hooks/useHandleToast';
import useAlbumStore from '@/stores/album';

const RawSkeleton = () => {
  return (
    <tr className="border-b border-white/10 animate-pulse">
      <td className="py-4 px-4 text-gray-600"></td>
      <td className="py-4 px-2">
        <div className="h-4 w-32 bg-gray-600 rounded" />
      </td>
      <td className="py-4 px-2">
        <div className="h-4 w-24 bg-gray-600 rounded" />
      </td>
      <td className="py-4 px-2 text-right pr-4">
        <div className="h-4 w-12 bg-gray-600 rounded ml-auto" />
      </td>
      <td className="py-4"></td>
    </tr>
  );
};

interface SongDetailTableProps {
  owner?: string;
  resourceId?: string;
  songs: SongSection[];
  loading?: boolean;
}

const SongDetailTable: React.FC<SongDetailTableProps> = ({
  owner,
  resourceId,
  songs,
  loading,
}) => {
  const skeletonRows = Array.from({ length: 5 });
  const { showDelete } = useModalStore();
  const { handleErrors } = useHandleErrors();
  const { deleteSongFromAlbum } = useAlbumStore();

  const handleDelete = (songId: string) => {
    showDelete(
      `Are you sure you want to delete this song from album?`,
      async () => {
        try {
          await deleteSongFromAlbum(resourceId!, songId);
        } catch (error) {
          handleErrors(error);
        }
      }
    );
  };

  return (
    <section className="bg-white/5 backdrop-blur-sm rounded-xl xs:p-6">
      <div className="mb-6 flex justify-between items-center px-3 pt-3 xs:px-0 xs:pt-0">
        <h2 className="text-xl xl:text-2xl font-bold">Songs</h2>
        <p className="text-purple-200">
          {songs.length} {songs.length === 1 ? 'song' : 'songs'}
        </p>
      </div>

      <div className="overflow-x-auto pb-6">
        <table className="w-full text-sm md:text-lg">
          <thead>
            <tr className="border-b border-white/10 text-purple-200 text-left">
              <th className="pb-4 px-4 w-12">#</th>
              <th className="pb-4 px-2">Title</th>
              <th className="pb-4 px-2">Performer</th>
              <th className="pb-4 px-2 text-right pr-4 hidden xs:block">
                Duration
              </th>
              <th className="pb-4 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? skeletonRows.map((_, index) => <RawSkeleton key={index} />)
              : songs.map((song, index) => (
                  <tr
                    key={song.id}
                    className="border-b border-white/10 hover:bg-white/5 transition group"
                  >
                    <td className="py-4 px-4 text-gray-400 group-hover:text-white">
                      {index + 1}
                    </td>
                    <td className="py-4 px-2 text-purple-200">
                      <Link
                        href={`${urlPage.SONG}/${song.id}`}
                        className="hover:underline cursor-pointer"
                      >
                        {song.title}
                      </Link>
                    </td>
                    <td className="py-4 px-2 text-purple-200">
                      {song.performer}
                    </td>
                    <td className="py-4 px-2 text-right pr-4 text-gray-400 hidden xs:block">
                      {formatDurationToMinutes(song.duration)}
                    </td>
                    <td className="py-4 text-right px-4">
                      <ActionButton owner={owner!} resourceId="" type="album">
                        <button
                          onClick={() => {
                            handleDelete(song.id);
                          }}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-white/20 rounded"
                        >
                          Delete
                        </button>
                      </ActionButton>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SongDetailTable;
