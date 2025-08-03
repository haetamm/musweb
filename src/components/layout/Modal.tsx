'use client';
import { useModalStore } from '@/stores/modal';
import { MODAL_TYPES } from '@/utils/constans';
import React from 'react';
import SmallModalSection from '../modal/SmallModalSection';
import LoginSection from '../modal/LoginSection';
import CreateSongForm from '../modal/CreateSongForm';
import AlbumForm from '../modal/AlbumForm';
import UpdateSongForm from '../modal/UpdateSongForm';
import PlaylistSection from '../modal/PlaylistSection';
import PlaylistActivities from '../modal/PlaylistActivities';
import PlaylistCollaborationForm from '../modal/PlaylistCollaborationForm';

const Modal = () => {
  const {
    isVisible,
    type,
    hideModal,
    loading,
    executeCallback,
    desc,
    showPlaylistCollaborationForm,
  } = useModalStore();

  const cancelAction = desc?.toLowerCase().includes('collaborators')
    ? showPlaylistCollaborationForm
    : hideModal;

  if (!isVisible) return null;

  return (
    <>
      <div
        className="relative z-100 "
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity overflow-y-scroll"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          {(type === MODAL_TYPES.LOGIN_FORM ||
            type === MODAL_TYPES.GOOGLE_LOGIN_FORM) && (
            <LoginSection type={type} />
          )}

          {type === MODAL_TYPES.LOGOUT && (
            <SmallModalSection
              title="Logout Confirmation"
              desc="Are you sure you want to logout?"
              buttonLabel="Logout"
              handleButton={executeCallback}
              cancelButton={hideModal}
              loading={loading}
            />
          )}

          {type === MODAL_TYPES.DELETE && (
            <SmallModalSection
              title="Delete Confirmation"
              desc={desc}
              buttonLabel="Delete"
              handleButton={executeCallback}
              cancelButton={cancelAction}
              loading={loading}
            />
          )}

          {type === MODAL_TYPES.CREATE_SONG_FORM && <CreateSongForm />}

          {type === MODAL_TYPES.UPDATE_SONG_FORM && (
            <UpdateSongForm fetchSong={executeCallback} />
          )}

          {(type === MODAL_TYPES.CREATE_ALBUM_FORM ||
            type === MODAL_TYPES.UPDATE_ALBUM_FORM) && <AlbumForm />}

          {type === MODAL_TYPES.PLAYLIST_FORM && <PlaylistSection />}

          {type === MODAL_TYPES.PLAYLIST_ACTIVITIES && (
            <PlaylistActivities fetchPlaylist={executeCallback} />
          )}

          {type === MODAL_TYPES.PLAYLIST_COLLABORATION_FORM && (
            <PlaylistCollaborationForm />
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
