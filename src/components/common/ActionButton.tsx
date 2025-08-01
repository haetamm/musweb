'use client';

import { useHandleErrors } from '@/hooks/useHandleToast';
import useAlbumStore from '@/stores/album';
import useAuthStore from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import usePlaylistStore from '@/stores/playlists';
import useSongStore from '@/stores/song';
import { collaborationDetail } from '@/utils/types';
import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

interface Props {
  owner?: string;
  resourceId: string;
  type: 'song' | 'album' | 'playlist' | 'playlist-detail';
  children?: React.ReactNode;
  collaborations?: collaborationDetail[]; // Accept collaborationDetail[]
}

const ActionButton: React.FC<Props> = ({
  owner,
  resourceId,
  type,
  children,
  collaborations = [],
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const { handleErrors } = useHandleErrors();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showUpdateSong, showUpdateAlbum, showDelete, showPlaylistForm } =
    useModalStore();
  const { getSongById, deleteSongById } = useSongStore();
  const { setAlbumDetail, deleteAlbumById } = useAlbumStore();
  const { setPlaylistSong } = usePlaylistStore();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isShow = type === 'song';

  // Check if user is owner or collaborator
  const isOwner =
    type === 'playlist'
      ? owner === user?.id ||
        collaborations.some((collab) => collab.userId === user?.id)
      : owner === user?.id;

  const canOpen =
    isAuthenticated &&
    (type === 'song' || isOwner || type === 'playlist-detail');

  const toggleDropdown = () => {
    if (canOpen) setOpen(!open);
  };

  const handleUpdate = () => {
    if (type === 'song') {
      showUpdateSong(async () => {
        try {
          await getSongById(resourceId);
        } catch (error) {
          handleErrors(error);
        }
      });
    } else {
      showUpdateAlbum();
      setAlbumDetail(resourceId);
    }
  };

  const handlePlaylist = () => {
    setPlaylistSong(resourceId);
    showPlaylistForm();
  };

  const handleDelete = () => {
    showDelete(`Are you sure you want to delete this ${type}?`, async () => {
      try {
        if (type === 'song') {
          await deleteSongById(resourceId);
        } else {
          await deleteAlbumById(resourceId);
        }
      } catch (error) {
        handleErrors(error);
      }
    });
  };

  return (
    <div className="inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`${canOpen ? 'text-white hover:text-white/20 cursor-pointer' : 'text-white/20'} `}
      >
        <FaEllipsisH className="text-lg" />
      </button>

      {open && (
        <div className="absolute right-2 z-100 mt-0 w-36 bg-gradient-to-tr from-indigo-800 to-purple-700 rounded-md shadow-lg ring-1 ring-white/10">
          {children ? (
            <div className="py-1 text-sm text-white">{children}</div>
          ) : (
            <div className="py-1 text-sm text-white">
              {isShow && (
                <button
                  onClick={handlePlaylist}
                  className="w-full text-left px-4 py-2 hover:bg-white/20 rounded"
                >
                  Add to Playlist
                </button>
              )}
              {isOwner && (
                <>
                  <button
                    onClick={handleUpdate}
                    className="w-full block text-left px-4 py-2 hover:bg-white/20 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-white/20 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActionButton;
