'use client';

import { formatDurationToMinutes } from '@/utils/helper';
import React, { useEffect, useState } from 'react';
import {
  FaUser,
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaHeadphones,
} from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';
import SongDetailTable from '../common/SongDetailTable';
import { PlaylistDetailResponse } from '@/lib/action/PlaylistAction';
import usePlaylistStore from '@/stores/playlists';
import { useRouter } from 'next/navigation';
import PlaylistDetailSkeleton from './PlaylistDetailSkeleton';
import { likeDetail } from '@/utils/types';

interface Props {
  playlistResult: PlaylistDetailResponse;
}

const PlaylistDetailPageSection: React.FC<Props> = ({ playlistResult }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { playlistDetailPage: playlist, setplaylistDetailPage } =
    usePlaylistStore();

  useEffect(() => {
    setplaylistDetailPage(playlistResult);
    setLoading(false);
  }, [playlistResult, setplaylistDetailPage]);

  if (loading) {
    return <PlaylistDetailSkeleton />;
  }

  if (!playlist) {
    router.back();
    return null;
  }

  return (
    <div className="md:px-6 mx-auto">
      {/* Header */}
      <PlaylistHeader owner={playlist.owner} />

      {/* Playlist Info */}
      <PlaylistInfo title={playlist.title} owner={playlist.owner} />

      {/* Songs List */}
      <SongDetailTable songs={playlist.songs} loading={loading} />

      {/* Stats */}
      <PlaylistStats
        songCount={playlist.songCount}
        totalDuration={playlist.totalDuration}
        owner={playlist.owner}
        collaborations={playlist.collaborations}
      />

      {/* Likes Section */}
      {playlist.likes.length > 0 && <PlaylistLikes likes={playlist.likes} />}
    </div>
  );
};

// Sub-components for better organization
const PlaylistHeader = ({ owner }: { owner: string }) => (
  <header className="hidden md:flex justify-between items-center mb-8">
    <div className="flex items-center space-x-4">
      <MdLibraryMusic className="text-3xl text-purple-300" />
      <h1 className="text-2xl font-bold">Playlist Details</h1>
    </div>
    <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
      <FaUser className="text-purple-300" />
      <span>{owner}</span>
    </button>
  </header>
);

const PlaylistInfo = ({ title, owner }: { title: string; owner: string }) => (
  <section className="flex flex-col xs:flex-row items-center md:items-end space-y-6 xs:space-y-0 xs:space-x-8 mb-12">
    <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30 rounded-xl shadow-lg flex items-center justify-center">
      <MdLibraryMusic className="text-7xl md:text-9xl text-purple-300/50" />
    </div>

    <div className="flex-1 w-full px-2 xs:px-0">
      <p className="text-sm text-purple-200 mb-2">PLAYLIST</p>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
      <p className="text-purple-200 mb-6">Created by {owner}</p>

      <div className="flex space-x-4">
        <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
          <FaPlay className="mr-2" />
          Play
        </button>
        <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
          <FaHeart className="text-xl" />
        </button>
        <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
          <FaEllipsisH className="text-xl" />
        </button>
      </div>
    </div>
  </section>
);

const PlaylistStats = ({
  songCount,
  totalDuration,
  owner,
  collaborations,
}: {
  songCount: string;
  totalDuration: string;
  owner: string;
  collaborations: Array<{ fullname: string }>;
}) => (
  <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white/5 rounded-lg p-6 flex items-center">
      <StatCard
        icon={<FaHeadphones className="text-2xl text-purple-300" />}
        label="Total Songs"
        value={songCount.toString()}
        bgColor="bg-purple-500/20"
      />
    </div>
    <div className="bg-white/5 rounded-lg p-6 flex items-center">
      <StatCard
        icon={<MdLibraryMusic className="text-2xl text-indigo-300" />}
        label="Playlist Duration"
        value={formatDurationToMinutes(totalDuration)}
        bgColor="bg-indigo-500/20"
      />
    </div>

    <div className="bg-white/5 rounded-lg p-6 flex-col justify-center">
      <StatCard
        icon={<FaUser className="text-2xl text-blue-300" />}
        label="Contributors"
        value={owner}
        bgColor="bg-blue-500/20"
        isSmall
      />

      {collaborations.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-purple-200 mb-2">Collaborators</p>
          <div className="flex flex-wrap gap-2">
            {collaborations.map(({ fullname }, index) => (
              <span
                key={index}
                className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center"
              >
                <FaUser className="mr-1 text-xs opacity-70" />
                {fullname}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  </section>
);

const StatCard = ({
  icon,
  label,
  value,
  bgColor,
  isSmall = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  isSmall?: boolean;
}) => (
  <div className="flex items-center space-x-4">
    <div className={`${bgColor} p-4 rounded-full`}>{icon}</div>
    <div>
      <p className={`text-sm text-purple-200`}>{label}</p>
      <p
        className={`${isSmall ? 'text-lg font-medium' : 'text-2xl font-bold'}`}
      >
        {value}
      </p>
    </div>
  </div>
);

const PlaylistLikes = ({ likes }: { likes: likeDetail[] }) => (
  <section className="mt-8 bg-white/5 rounded-lg p-6">
    <StatCard
      icon={<FaHeart className="text-2xl text-pink-300" />}
      label="Liked By"
      value={`${likes.length} ${likes.length === 1 ? 'person' : 'people'}`}
      bgColor="bg-pink-500/20"
      isSmall
    />

    <div className="flex flex-wrap gap-3">
      {likes.map(({ fullname }, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full"
        >
          <FaUser className="text-xs opacity-70" />
          <span className="text-sm">{fullname}</span>
        </div>
      ))}
    </div>
  </section>
);

export default PlaylistDetailPageSection;
