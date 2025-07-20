'use client';
import { useModalStore } from '@/stores/modal';
import React, { useEffect } from 'react';

const CreateAlbumPage = () => {
  const { showCreateAlbum } = useModalStore();

  useEffect(() => {
    showCreateAlbum();
  }, [showCreateAlbum]);

  return <></>;
};

export default CreateAlbumPage;
