'use client';

import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaMusic, FaClock, FaPlay } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';
import SongDetailTable from '../common/SongDetailTable';
import Image from 'next/image';
import { AlbumDetailResponse } from '@/lib/action/AlbumAction';
import useAlbumStore from '@/stores/album';
import ActionButton from '../common/ActionButton';
import { useRouter } from 'next/navigation';
import AlbumDetailPageSkeleton from './AlbumDetailPageSkeleton';

interface Props {
  albumResult: AlbumDetailResponse;
}

const AlbumDetailSection: React.FC<Props> = ({ albumResult }) => {
  const { setAlbumDetailPage, albumDetailPage: album } = useAlbumStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setAlbumDetailPage(albumResult);
    setLoading(false);
  }, [albumResult, setAlbumDetailPage]);

  if (loading) {
    return <AlbumDetailPageSkeleton />;
  }

  if (!album) {
    router.back();
    return null;
  }

  return (
    <div className="px-2 lg:px-6 mx-auto">
      <div className="flex flex-col xs:flex-row gap-8 items-start md:items-end mb-10">
        <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30 rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
          {album.coverUrl ? (
            <Image
              src={album.coverUrl}
              alt={album.title}
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          ) : (
            <MdLibraryMusic className="text-8xl text-purple-300" />
          )}
        </div>

        <div className="w-full flex-1">
          <div className=" flex">
            <div className="w-full">
              <p className="text-sm text-purple-200 mb-2">ALBUM</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {album.title}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{album.artist}</p>

              <div className="flex items-center gap-4 text-gray-400 mb-6">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt />
                  <span>{album.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaMusic />
                  <span>{album.songCount} songs</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaClock />
                  <span>
                    {/* {formatDurationToMinutes(album.totalDuration || '0')} */}
                    {album.totalDuration}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-800 text-white px-6 py-2 rounded-full flex items-center gap-2 transition">
                  <FaPlay /> Play
                </button>
              </div>
            </div>
            <ActionButton
              owner={album.userId}
              resourceId={album.id}
              type="album"
            />
          </div>
        </div>
      </div>

      <SongDetailTable
        owner={album.userId}
        resourceId={album.id}
        songs={album.songs}
        loading={false}
      />
    </div>
  );
};

export default AlbumDetailSection;
