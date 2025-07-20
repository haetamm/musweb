'use client';
import { useModalStore } from '@/stores/modal';
import React, { useEffect } from 'react';

const CreateSongPage = () => {
  const { showCreateSong } = useModalStore();

  useEffect(() => {
    showCreateSong();
  }, [showCreateSong]);

  return <></>;
};

export default CreateSongPage;
