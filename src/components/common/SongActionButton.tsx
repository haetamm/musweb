'use client';
import { useHandleErrors } from '@/hooks/useHandleToast';
import useAuthStore from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import useSongStore from '@/stores/song';
import React, { useState, useRef, useEffect } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

interface SongActionButtonProps {
  owner: string;
  songId: string;
}
const SongActionButton: React.FC<SongActionButtonProps> = ({
  owner,
  songId,
}) => {
  const { isAuthenticated, user } = useAuthStore();
  const { handleErrors } = useHandleErrors();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { showUpdateSong } = useModalStore();
  const { getSongById } = useSongStore();

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

  const toggleDropdown = () => {
    if (isAuthenticated) {
      setOpen(!open);
    }
  };

  const isOwner = () => {
    return owner === user?.id;
  };

  const handleUpdateSong = () => {
    showUpdateSong(async () => {
      try {
        await getSongById(songId);
      } catch (error) {
        handleErrors(error);
      }
    });
  };

  return (
    <div className=" inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-white hover:text-white/20 cursor-pointer"
      >
        <FaEllipsisH className="text-lg" />
      </button>

      {open && (
        <div className="absolute right-2 z-100 mt-0 w-36 bg-gradient-to-br from-indigo-900 to-purple-800 rounded-md shadow-lg ring-opacity-5">
          <div className="py-1 text-sm text-white">
            <button className="w-full text-left px-4 py-2 hover:bg-white/20 rounded">
              Add to Playlist
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-white/20 rounded">
              Add to Album
            </button>
            {isOwner() && (
              <>
                <button
                  onClick={handleUpdateSong}
                  className="w-full block text-left px-4 py-2 hover:bg-white/20 rounded"
                >
                  Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-white/20 rounded">
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongActionButton;
