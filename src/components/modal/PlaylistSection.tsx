import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import CreatePlaylistForm from './CreatePlaylistForm';
import UpdatePlaylistForm from './UpdatePlaylistForm';
import { useModalStore } from '@/stores/modal';
import { useHandleErrors } from '@/hooks/useHandleToast';
import usePlaylistStore from '@/stores/playlists';

const PlaylistSection = () => {
  const { hideModal } = useModalStore();
  const [activeTab, setActiveTab] = useState('create');
  const { handleErrors } = useHandleErrors();
  const { getPlaylistWithSongs } = usePlaylistStore();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        await getPlaylistWithSongs();
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchPlaylists();
  }, []);

  const tabs = [
    { key: 'add', label: 'Add to Playlist' },
    { key: 'create', label: 'Create a Playlist' },
  ];

  return (
    <div className="w-full min-h-full p-3 items-center animate-[slide-down_0.3s]">
      <div className="flex w-full justify-end mx-auto mb-3 max-w-xl">
        <MdClose onClick={hideModal} className="h-6 w-6 cursor-pointer" />
      </div>

      <div className="flex justify-center items-center">
        <div className="transform rounded-lg overflow-hidden text-left shadow-xl transition-all w-full max-w-lg bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
          {/* Tabs */}
          <div className=" pt-4 px-3 lg:px-6 mb-4">
            <div className="flex space-x-8 text-lg lg:text-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  className={`pb-1 border-b-2 cursor-pointer ${
                    activeTab === tab.key
                      ? ' border-white text-white'
                      : 'border-transparent hover:opacity-100 text-slate-200'
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-3 lg:px-6 pb-6">
            {activeTab === 'create' ? (
              <CreatePlaylistForm />
            ) : (
              <UpdatePlaylistForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSection;
