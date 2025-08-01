'use client';

import { FaHeart, FaPlay } from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';
import ActionButton from '../common/ActionButton';
import useAuthStore from '@/stores/auth';
import { EditablePlaylistTitle } from './EditablePlaylistTitle';
import { useModalStore } from '@/stores/modal';
import { useHandleErrors } from '@/hooks/useHandleToast';
import usePlaylistStore from '@/stores/playlists';

const PlaylistInfo = ({
  id,
  userId,
  title,
  owner,
}: {
  id: string;
  userId: string;
  title: string;
  owner: string;
}) => {
  const { user } = useAuthStore();
  const { showPlaylistActivities } = useModalStore();
  const { handleErrors } = useHandleErrors();
  const { getPlaylistActivities } = usePlaylistStore();

  const isOwner = user?.id === userId;

  const handleActivitiesPlaylist = () => {
    showPlaylistActivities(async () => {
      try {
        await getPlaylistActivities(id);
      } catch (error) {
        handleErrors(error);
      }
    });
  };
  return (
    <section className="flex px-2 flex-col xs:flex-row items-center md:items-end space-y-6 xs:space-y-0 xs:space-x-8 mb-12 relative">
      <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30 rounded-xl shadow-lg flex items-center justify-center relative">
        <MdLibraryMusic className="text-7xl md:text-9xl text-purple-300/50" />
      </div>

      <div className="flex-1 w-full relative">
        <div className="absolute top-0 xs:-top-5 md:-top-16 lg:-top-10 right-0">
          <ActionButton resourceId={id} type="playlist-detail">
            <button
              onClick={handleActivitiesPlaylist}
              className="w-full text-left px-4 py-2 hover:bg-white/20 rounded"
            >
              Activities
            </button>
            {isOwner && (
              <>
                <button className="w-full text-left px-4 py-2 hover:bg-white/20 rounded">
                  Collaborators
                </button>
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-white/20 rounded">
                  Delete
                </button>
              </>
            )}
          </ActionButton>
        </div>

        <div className="mt-5 xs:mt-0">
          <p className="text-sm text-purple-200 mb-2">PLAYLIST</p>
          <EditablePlaylistTitle
            isOwner={isOwner}
            title={title}
            playlistId={id}
          />
          <p className="text-purple-200 mb-6">Created by {owner}</p>
          <div className="flex space-x-4">
            <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
              <FaPlay className="mr-2" />
              Play
            </button>
            <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
              <FaHeart className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaylistInfo;
