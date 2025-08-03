'use client';
import React, { useEffect, useState } from 'react';
import useCollaboratorStore from '@/stores/collaboration';
import { useModalStore } from '@/stores/modal';
import { MdSearch, MdCheck } from 'react-icons/md';
import { collaborationDetail } from '@/utils/types';
import { ClientUserAction } from '@/lib/action/ClientUserAction';
import { useHandleErrors } from '@/hooks/useHandleToast';
import useAuthStore from '@/stores/auth';
import usePlaylistStore from '@/stores/playlists';

const PlaylistCollaborationForm = () => {
  const [loading, setLoading] = useState(false);
  const { hideModal, showDelete, showPlaylistCollaborationForm } =
    useModalStore();
  const { handleErrors } = useHandleErrors();
  const { user } = useAuthStore();
  const { createCollaboration, deleteCollaboration } = useCollaboratorStore();
  const {
    playlistDetailPage,
    addCollaborationsToPlaylist,
    removeCollaborationFromPlaylist,
  } = usePlaylistStore();

  const playlistId = playlistDetailPage?.id || '';
  const [collaborations, setCollaborations] = useState(
    playlistDetailPage?.collaborations || []
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<collaborationDetail[]>([]);
  const [selectedCollaborations, setSelectedCollaborations] = useState<
    collaborationDetail[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setCollaborations(playlistDetailPage?.collaborations || []);
  }, [playlistDetailPage?.collaborations]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await ClientUserAction.getUserByQuery(searchTerm);
      const filteredResults = results.filter(
        (u) =>
          u.userId !== user?.id && // exclude current user
          !collaborations.some((c) => c.userId === u.userId) &&
          !selectedCollaborations.some((s) => s.userId === u.userId)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelectUser = (user: collaborationDetail) => {
    setSelectedCollaborations((prev) => [...prev, user]);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleAddCollaborators = async () => {
    if (selectedCollaborations.length === 0) return;
    setLoading(true);
    try {
      await createCollaboration({
        playlistId,
        userIds: selectedCollaborations.map((u) => u.userId),
      });

      addCollaborationsToPlaylist(selectedCollaborations);

      // Reset form state
      setSelectedCollaborations([]);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCollaboration = async (userId: string) => {
    showDelete(
      `Are you sure you want to delete this collaborators?`,
      async () => {
        try {
          await deleteCollaboration({
            playlistId,
            userId,
          });
          removeCollaborationFromPlaylist(userId);
          showPlaylistCollaborationForm();
        } catch (error) {
          handleErrors(error);
        }
      }
    );
  };

  return (
    <div className="w-full min-h-full p-4 items-center animate-[slide-down_0.3s]">
      <div className="flex justify-center items-center">
        <div className="transform rounded-xl overflow-hidden shadow-xl transition-all w-full max-w-lg bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
          <div className="p-6 space-y-6">
            {/* Current collaborations */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Current Collaborators</h2>
              {collaborations.length > 0 ? (
                <ul className="space-y-2">
                  {collaborations.map((collab) => (
                    <div
                      key={collab.userId}
                      className="flex items-center bg-white/10 rounded-lg px-4 py-2"
                    >
                      <span className="flex-1">{collab.fullname}</span>
                      <span
                        onClick={() => handleRemoveCollaboration(collab.userId)}
                        className="text-red-400 hover:text-red-300 text-sm cursor-pointer rounded-full px-2 py-1"
                      >
                        Remove
                      </span>
                    </div>
                  ))}
                </ul>
              ) : (
                <p className="text-white/70 italic">No collaborators yet</p>
              )}
            </div>

            {/* Search section */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold">Add New Collaborators</h2>

              <div className="relative flex items-center">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search by name..."
                  className="w-full p-3 pr-12 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-white/50"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="absolute right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <MdSearch className="h-5 w-5" />
                </button>
              </div>

              {/* Search Results - appears below input like a select dropdown */}
              {searchResults.length > 0 && (
                <div className=" mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden">
                  <ul className="py-1">
                    {searchResults.map((user) => (
                      <li
                        key={user.userId}
                        className="px-4 py-2 hover:bg-purple-700/50 cursor-pointer flex items-center justify-between"
                        onClick={() => handleSelectUser(user)}
                      >
                        <span>{user.fullname}</span>
                        <button className="text-green-400 hover:text-green-300">
                          <MdCheck className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isSearching && (
                <div className="mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-3">
                  <p className="text-center text-white/70">Searching...</p>
                </div>
              )}

              {searchTerm && !isSearching && searchResults.length === 0 && (
                <div className=" mt-1 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-3">
                  <p className="text-center text-white/70">No users found</p>
                </div>
              )}
            </div>

            {/* Selected Collaborators */}
            {selectedCollaborations.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">
                  Selected for Addition:
                </h3>
                <ul className="space-y-2">
                  {selectedCollaborations.map((user) => (
                    <li
                      key={user.userId}
                      className="flex items-center bg-white/10 rounded-lg px-4 py-2"
                    >
                      <span className="flex-1">{user.fullname}</span>
                      <button
                        onClick={() =>
                          setSelectedCollaborations((prev) =>
                            prev.filter((u) => u.userId !== user.userId)
                          )
                        }
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="px-6 py-4 bg-white/10 flex justify-end space-x-3">
            <button
              onClick={hideModal}
              className="px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCollaborators}
              disabled={selectedCollaborations.length === 0}
              className={`px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors ${
                selectedCollaborations.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add Collaborators'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCollaborationForm;
