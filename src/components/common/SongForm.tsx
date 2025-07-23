'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { songFields } from '@/utils/fields';
import { songFormSchema, SongFormData } from '@/utils/validation';
import FormControllerInput from './FormControllerInput';
import { FiLoader } from 'react-icons/fi';
import { useHandleErrors } from '@/hooks/useHandleToast';
import { SongMetadata } from '@/utils/types';
import useSongStore from '@/stores/song';

interface SongFormProps {
  metadata: SongMetadata;
  onCancel: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ metadata, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const { handleErrors } = useHandleErrors();
  const { createSong, updateSongById } = useSongStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<SongFormData>({
    defaultValues: {
      title: metadata.title ?? '',
      year: metadata.year ?? '',
      performer: metadata.performer ?? '',
      genre: metadata.genre ?? '',
      duration: metadata.duration ?? '',
      albumId: metadata.albumId ?? '',
    },
    resolver: zodResolver(songFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: SongFormData) => {
    setLoading(true);
    try {
      if (metadata.id) {
        await updateSongById(metadata.id, data);
      } else {
        await createSong(data);
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <div className="my-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {songFields.map((field, index) => (
            <div key={index}>
              <FormControllerInput
                name={field.name}
                control={control}
                type={field.type}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => {
              metadata.id ? onCancel() : handleCancel();
            }}
            className="w-full bg-gray-600 text-white font-semibold py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isValid || isSubmitting || loading}
            className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer bg-purple-600 text-white font-semibold py-2 rounded"
          >
            <span className="inline-flex items-center justify-center">
              {loading && <FiLoader className="animate-spin h-4 w-4 mr-2" />}
              <span>{metadata.id ? 'Update' : 'Save'}</span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
