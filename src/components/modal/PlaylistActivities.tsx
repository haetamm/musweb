'use client';
import { useModalStore } from '@/stores/modal';
import usePlaylistStore from '@/stores/playlists';
import { formatDate } from '@/utils/helper';
import React, { useEffect } from 'react';
import { FiClock, FiPlus, FiTrash2 } from 'react-icons/fi';
import { MdClose, MdLibraryMusic } from 'react-icons/md';

const PlaylistActivitiesSkeleton = () => {
  const ActivitySkeletonItem = () => (
    <div className="p-3 sm:p-4 rounded-lg bg-indigo-800/30">
      <div className="flex justify-between">
        <div className="space-y-2 w-2/3">
          <div className="h-4 sm:h-5 bg-indigo-800/50 rounded-full animate-pulse" />
          <div className="h-3 sm:h-4 bg-indigo-800/50 rounded-full w-1/2 animate-pulse" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 sm:h-5 sm:w-5 bg-indigo-800/50 rounded-full animate-pulse" />
          <div className="h-3 w-12 sm:h-4 sm:w-16 bg-indigo-800/50 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-6 sm:h-8 bg-indigo-800/50 rounded-full w-48 animate-pulse" />
          <div className="flex gap-3">
            <div className="h-4 bg-indigo-800/50 rounded-full w-24 animate-pulse" />
            <div className="h-4 bg-indigo-800/50 rounded-full w-24 animate-pulse" />
          </div>
        </div>
        <div className="h-6 w-6 sm:h-8 sm:w-8 bg-indigo-800/50 rounded-full animate-pulse" />
      </div>

      <div className="pt-4">
        <div className="h-5 sm:h-6 bg-indigo-800/50 rounded-full w-32 mb-4 animate-pulse" />
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <ActivitySkeletonItem key={i} />
          ))}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-xl bg-gradient-to-br from-indigo-900 to-purple-800 text-white shadow-2xl overflow-hidden flex flex-col">
        {loading && <PlaylistActivitiesSkeleton />}

        {!loading && playlist && (
          <>
            <div className="p-5 sm:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <MdLibraryMusic className="text-purple-300 text-4xl flex-shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {playlist.title}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm text-purple-200">
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
                <button
                  onClick={handleClose}
                  className="text-purple-200 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <MdClose className="text-xl" />
                </button>
              </div>
            </div>

            <div className="px-5 sm:px-6 py-3 bg-gradient-to-b from-indigo-900/30 to-purple-800/30 border-t border-indigo-800/50">
              <div className="flex items-center gap-3 mb-4">
                <FiClock className="text-purple-300 text-lg" />
                <h3 className="text-lg font-semibold text-white">
                  Recent Activities
                </h3>
              </div>

              <div className="space-y-3 overflow-y-auto pr-2 max-h-[50vh]">
                {playlist.activities.map((activity, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 p-3 rounded-lg backdrop-blur-sm transition-all ${
                      activity.action === 'add'
                        ? 'bg-green-900/20 hover:bg-green-900/30 border border-green-800/50'
                        : 'bg-red-900/20 hover:bg-red-900/30 border border-red-800/50'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0 ${
                        activity.action === 'add'
                          ? 'bg-green-900/40 text-green-300'
                          : 'bg-red-900/40 text-red-300'
                      }`}
                    >
                      {activity.action === 'add' ? (
                        <FiPlus className="text-lg" />
                      ) : (
                        <FiTrash2 className="text-lg" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-medium text-white truncate">
                        {activity.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1 text-xs text-purple-200">
                        <span>{activity.fullname}</span>
                        <span className="text-purple-200/50">•</span>
                        <span>{formatDate(activity.time)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 sm:px-6 py-3 bg-gradient-to-r from-indigo-900/50 to-purple-800/50 border-t border-indigo-800/50">
              <div className="flex flex-wrap justify-between gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-purple-200">Total:</span>
                  <span className="font-medium text-white">
                    {playlist.activities.length}
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-200">Added:</span>
                    <span className="font-medium text-green-300">
                      {
                        playlist.activities.filter((a) => a.action === 'add')
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-200">Removed:</span>
                    <span className="font-medium text-red-300">
                      {
                        playlist.activities.filter((a) => a.action === 'delete')
                          .length
                      }
                    </span>
                  </div>
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
