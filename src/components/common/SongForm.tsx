'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { songFormSchema, SongFormData } from '@/utils/validation';
import FormControllerInput from './FormControllerInput';
import { FiLoader } from 'react-icons/fi';
import { useHandleErrors } from '@/hooks/useHandleToast';
import { SongMetadata, AlbumSection } from '@/utils/types';
import useSongStore from '@/stores/song';
import { songFields } from '@/utils/fields';
import SearchAlbumCard from './SearchAlbumCard';
import useAlbumStore from '@/stores/album';

interface SongFormProps {
  metadata: SongMetadata;
  onCancel: () => void;
}

const SongForm: React.FC<SongFormProps> = ({ metadata, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AlbumSection[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumSection | null>(
    metadata.album || null
  );
  const { handleErrors } = useHandleErrors();
  const { createSong, updateSongById } = useSongStore();
  const { searchAlbums, loading: searchLoading } = useAlbumStore();

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
      albumId: metadata.album?.id ?? '',
    },
    resolver: zodResolver(songFormSchema),
    mode: 'onChange',
  });

  // Handle album search on Enter key
  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const query = e.currentTarget.value.trim();
      if (query) {
        e.preventDefault();
        setSearchQuery(query); // Update state searchQuery saat Enter
        try {
          const albums = await searchAlbums(query);
          setSearchResults(albums);
        } catch (error) {
          handleErrors(error);
        }
      }
    }
  };

  // Handle album selection
  const handleAlbumSelect = (album: AlbumSection) => {
    setSelectedAlbum(album);
    setSearchResults([]); // Clear search results after selection
    setSearchQuery(''); // Clear search input
  };

  const onSubmit = async (data: SongFormData) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        albumId: selectedAlbum?.id || '', // Include selected album ID
      };
      if (metadata.id) {
        await updateSongById(metadata.id, payload);
      } else {
        await createSong(payload);
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    setSelectedAlbum(null);
    setSearchQuery('');
    setSearchResults([]);
    onCancel();
  };

  return (
    <div className="my-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
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
          {/* Album Search Input */}
          <div className="relative">
            <input
              type="text"
              defaultValue={searchQuery}
              onKeyDown={handleSearch}
              placeholder="Search for an album..."
              className="w-full p-3 focus:bg-white focus:text-black bg-gray-900 rounded-lg focus:outline-none text-white placeholder-gray-400"
            />
          </div>
        </div>
        {/* Search Results and Selected Album Cards */}
        <div className="col-span-1 md:col-span-2">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {selectedAlbum && (
              <SearchAlbumCard
                album={selectedAlbum}
                loading={searchLoading}
                isSelected={true}
                onRemove={() => setSelectedAlbum(null)}
              />
            )}
            {!searchResults.length && searchQuery && !searchLoading ? (
              <div className="flex items-center justify-center col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5">
                <p className=" font-semibold">Album tidak ditemukan</p>
              </div>
            ) : (
              searchResults.map((album) => (
                <SearchAlbumCard
                  key={album.id}
                  album={album}
                  loading={searchLoading}
                  isSelected={selectedAlbum?.id === album.id}
                  onSelect={() => handleAlbumSelect(album)}
                />
              ))
            )}
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full bg-gray-600 cursor-pointer text-white font-semibold py-2 rounded"
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
