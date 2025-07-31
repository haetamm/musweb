'use client';

import React, { useEffect, useState } from 'react';
import SongDetailTable from '../common/SongDetailTable';
import { PlaylistDetailResponse } from '@/lib/action/PlaylistAction';
import usePlaylistStore from '@/stores/playlists';
import { useRouter } from 'next/navigation';
import PlaylistDetailSkeleton from './PlaylistDetailSkeleton';
import PlaylistHeader from './PlaylistHeader';
import PlaylistInfo from './PlaylistInfo';
import PlaylistLikes from './PlaylistLikes';
import PlaylistStats from './PlaylistStats';
import { useModalStore } from '@/stores/modal';

interface Props {
  playlistResult: PlaylistDetailResponse;
}

const PlaylistDetailPageSection: React.FC<Props> = ({ playlistResult }) => {
  const [loading, setLoading] = useState(true);
  const { hideModal } = useModalStore();
  const router = useRouter();
  const { playlistDetailPage: playlist, setplaylistDetailPage } =
    usePlaylistStore();

  useEffect(() => {
    hideModal();
    setplaylistDetailPage(playlistResult);
    setLoading(false);
  }, [hideModal, playlistResult, setplaylistDetailPage]);

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
      <PlaylistInfo
        id={playlist.id}
        userId={playlist.userId}
        title={playlist.title}
        owner={playlist.owner}
      />

      {/* Songs List */}
      <SongDetailTable
        owner={playlist.userId}
        resourceId={playlist.id}
        songs={playlist.songs}
        loading={loading}
        type="playlist"
        collaborations={playlist.collaborations}
      />

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

export default PlaylistDetailPageSection;
