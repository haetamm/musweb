'use client';

import { useHandleErrors } from '@/hooks/useHandleToast';
import { useModalStore } from '@/stores/modal';
import { AlbumFormData, albumFormSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import FormControllerInput from './FormControllerInput';
import { albumFields } from '@/utils/fields';
import { FiLoader } from 'react-icons/fi';
import useAlbumStore from '@/stores/album';

const AlbumForm = () => {
  const { hideModal } = useModalStore();
  const { createAlbum, loading, albumDetail, updateAlbum } = useAlbumStore();
  const { handleErrors } = useHandleErrors();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: albumDetail?.title ?? '',
      artist: albumDetail?.artist ?? '',
      year: albumDetail?.year.toString() ?? '',
    },
  });

  const onSubmit = async (data: AlbumFormData) => {
    try {
      if (albumDetail) {
        updateAlbum(albumDetail.id, data);
      } else {
        createAlbum(data);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <>
      <div className="w-full flex min-h-full justify-center p-3 items-center animate-[slide-down_0.3s]">
        <div className="transform rounded-lg overflow-hidden text-left shadow-xl transition-all w-full max-w-md bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
          <div className="flex justify-between items-center mb-3 pt-3 px-6">
            <p className="text-2xl">Add Album</p>
            <MdClose onClick={hideModal} className="h-6 w-6 cursor-pointer" />
          </div>
          <div className="px-6 pb-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-3">
                {albumFields.map((field, index) => (
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
              <button
                type="submit"
                disabled={!isValid || isSubmitting || loading}
                className="w-full disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer bg-purple-600 text-white font-semibold py-2 rounded"
              >
                <span className="inline-flex items-center justify-center">
                  {loading && (
                    <FiLoader className="animate-spin h-4 w-4 mr-2" />
                  )}
                  <span>{albumDetail ? 'Update' : 'Save'}</span>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumForm;
