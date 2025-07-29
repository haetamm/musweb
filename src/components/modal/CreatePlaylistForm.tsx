'use client';

import { useHandleErrors } from '@/hooks/useHandleToast';
import { PlaylistFormData, playlistFormSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CustomButton from '../common/CustomButton';
import { playlistFields } from '@/utils/fields';
import FormControllerInput from '../common/FormControllerInput';
import usePlaylistStore, { PlaylistSong } from '@/stores/playlists';
import { MdClose } from 'react-icons/md';

const CreatePlaylistForm = () => {
  const [loading, setLoading] = useState(false);
  const { handleErrors } = useHandleErrors();
  const { playlistSong, createPlaylist } = usePlaylistStore();
  const [selectedSong, setSelectedSong] = useState<PlaylistSong | null>(
    playlistSong
  );

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PlaylistFormData>({
    defaultValues: {
      title: '',
    },
    resolver: zodResolver(playlistFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: PlaylistFormData) => {
    setLoading(true);
    try {
      await createPlaylist(data, selectedSong?.id || null);
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="w-full">
          {playlistFields.map((field, index) => (
            <div key={index} className="space-y-1.5">
              <label className="block">{field.placeholder}:</label>
              <FormControllerInput
                name={field.name}
                control={control}
                type={field.type}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
        {selectedSong && (
          <div className="glass-card h-[58px] flex justify-between px-2 py-1 items-center rounded-lg shadow-md hover:bg-gray-700 transition-all">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium truncate">
                {selectedSong.title}
              </h3>
              <p className="text-sm text-gray-300">{selectedSong.performer}</p>
            </div>
            <MdClose
              onClick={() => setSelectedSong(null)}
              className="h-6 w-6 cursor-pointer"
            />
          </div>
        )}
        <CustomButton
          type="submit"
          loading={loading}
          disabled={!isValid || isSubmitting || loading}
        >
          Save
        </CustomButton>
      </form>
    </div>
  );
};

export default CreatePlaylistForm;
