'use client';
import { useModalStore } from '@/stores/modal';
import usePlaylistStore from '@/stores/playlists';
import { formatDate } from '@/utils/helper';
import React, { useEffect } from 'react';
import { FiMusic, FiClock, FiPlus, FiTrash2 } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';

const PlaylistActivitiesSkeleton = () => {
  const ActivitySkeletonItem = () => (
    <div className="p-4 rounded-lg bg-indigo-800/30">
      <div className="flex justify-between">
        <div className="space-y-2 w-2/3">
          <div className="h-5 bg-indigo-800/50 rounded-full animate-pulse" />
          <div className="h-4 bg-indigo-800/50 rounded-full w-1/2 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-indigo-800/50 rounded-full animate-pulse" />
          <div className="h-4 bg-indigo-800/50 rounded-full w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between">
        <div className="space-y-3 w-2/3">
          <div className="h-8 bg-indigo-800/50 rounded-full w-3/4 animate-pulse" />
          <div className="h-5 bg-indigo-800/50 rounded-full w-1/2 animate-pulse" />
        </div>
        <div className="h-8 w-8 bg-indigo-800/50 rounded-full animate-pulse" />
      </div>

      {/* Date Info Skeleton */}
      <div className="flex gap-4">
        <div className="h-4 bg-indigo-800/50 rounded-full w-1/3 animate-pulse" />
        <div className="h-4 bg-indigo-800/50 rounded-full w-1/3 animate-pulse" />
      </div>

      {/* Activities Skeleton */}
      <div className="space-y-4 pt-4">
        {[...Array(4)].map((_, i) => (
          <ActivitySkeletonItem key={i} />
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="flex justify-between pt-4">
        <div className="h-4 bg-indigo-800/50 rounded-full w-1/4 animate-pulse" />
        <div className="flex gap-4">
          <div className="h-4 bg-indigo-800/50 rounded-full w-16 animate-pulse" />
          <div className="h-4 bg-indigo-800/50 rounded-full w-16 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

const PlaylistActivities: React.FC<{ fetchPlaylist: () => void }> = ({
  fetchPlaylist,
}) => {
  const {
    playlistActivities: playlist,
    loading,
    resetPlaylistActivities,
  } = usePlaylistStore();
  const { hideModal } = useModalStore();

  const handleClose = () => {
    hideModal();
    resetPlaylistActivities();
  };

  useEffect(() => {
    fetchPlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!playlist && !loading) {
    return null;
  }

  return (
    <div className="w-full flex min-h-screen justify-center p-3 items-center animate-[slide-down_0.3s]">
      <div className="relative transform rounded-lg overflow-hidden text-left shadow-xl transition-all w-lg bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
        {loading && <PlaylistActivitiesSkeleton />}

        {!loading && playlist && (
          <>
            <div className="px-6 pt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <FiMusic className="text-purple-300" />
                    {playlist.title}
                  </h2>
                </div>
                <button
                  onClick={handleClose}
                  className="text-purple-200 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>

              <div className="flex gap-4 mt-4 text-sm text-purple-200">
                <div className="flex items-center gap-1">
                  <span>Created:</span>
                  <span className="font-medium text-white">
                    {formatDate(playlist.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Updated:</span>
                  <span className="font-medium text-white">
                    {formatDate(playlist.updated_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-2  bg-gradient-to-b from-indigo-900/30 to-purple-800/30">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-3">
                <FiClock className="text-purple-300" />
                Recent Activities
              </h3>

              <div className="space-y-3 max-h-[calc(100vh-230px)] overflow-auto pr-2">
                {playlist.activities.map((activity, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg backdrop-blur-sm ${
                      activity.action === 'add'
                        ? 'bg-green-900/30 border-l-4 border-green-400'
                        : 'bg-red-900/30 border-l-4 border-red-400'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-white">
                          {activity.title}
                        </p>
                        <p className="text-sm text-purple-100 mt-1">
                          {activity.fullname}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {activity.action === 'add' ? (
                          <FiPlus className="text-green-300" />
                        ) : (
                          <FiTrash2 className="text-red-300" />
                        )}
                        <span className="text-xs text-purple-200">
                          {formatDate(activity.time)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 bg-gradient-to-r from-indigo-900/50 to-purple-800/50 flex justify-between text-sm text-white">
              <div>
                <span className="text-purple-200">Total Activities: </span>
                <span className="font-medium">
                  {playlist.activities.length}
                </span>
              </div>
              <div className="flex gap-4">
                <div>
                  <span className="text-purple-200">Added: </span>
                  <span className="font-medium text-green-300">
                    {
                      playlist.activities.filter((a) => a.action === 'add')
                        .length
                    }
                  </span>
                </div>
                <div>
                  <span className="text-purple-200">Removed: </span>
                  <span className="font-medium text-red-300">
                    {
                      playlist.activities.filter((a) => a.action === 'delete')
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlaylistActivities;
