import { useState } from 'react';
import { FaCheck, FaPen, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlaylistFormData, playlistFormSchema } from '@/utils/validation';
import FormControllerInput from '../common/FormControllerInput';
import usePlaylistStore from '@/stores/playlists';
import { useHandleErrors } from '@/hooks/useHandleToast';

interface EditablePlaylistTitleProps {
  isOwner: boolean;
  title: string;
  playlistId: string;
}

export const EditablePlaylistTitle = ({
  isOwner,
  title,
  playlistId,
}: EditablePlaylistTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updatePlaylist } = usePlaylistStore();
  const { handleErrors } = useHandleErrors();

  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<PlaylistFormData>({
    defaultValues: {
      title,
    },
    resolver: zodResolver(playlistFormSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: PlaylistFormData) => {
    try {
      await updatePlaylist(playlistId, data);
      setIsEditing(false);
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div className="flex items-center space-x-4 md:space-x-6">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center space-x-3 md:space-x-4"
        >
          <FormControllerInput
            name="title"
            control={control}
            type="text"
            placeholder="Enter playlist title"
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white bg-transparent border-b-2 border-purple-300 focus:outline-none w-full max-w-[80vw] md:max-w-none"
          />

          <div className="flex space-x-3">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="p-2.5 md:p-3 rounded-full transition-all duration-200 bg-purple-600 text-white disabled:bg-gray-500"
              aria-label="Save changes"
            >
              <FaCheck className="text-xl md:text-2xl" />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2.5 md:p-3 rounded-full text-white bg-rose-500/90 hover:bg-rose-400 transition-all duration-200 shadow-lg "
              aria-label="Cancel editing"
            >
              <FaTimes className="text-xl md:text-2xl" />
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white">
            {title}
          </h1>
          {isOwner && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2.5 md:p-3 rounded-full text-white bg-indigo-400/80 hover:bg-indigo-300 transition-all duration-200 shadow-lg hover:shadow-indigo-300/40"
              aria-label="Edit playlist title"
            >
              <FaPen className="text-xl md:text-2xl" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
