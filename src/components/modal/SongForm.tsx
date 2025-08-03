'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { songFormSchema, SongFormData } from '@/utils/validation';
import FormControllerInput from '../common/FormControllerInput';
import { useHandleErrors } from '@/hooks/useHandleToast';
import { SongMetadata, AlbumSection } from '@/utils/types';
import useSongStore from '@/stores/song';
import { songFields } from '@/utils/fields';
import SearchAlbumCard from './SearchAlbumCard';
import useAlbumStore from '@/stores/album';
import Link from 'next/link';
import { urlPage } from '@/utils/constans';
import CustomButton from '../common/CustomButton';

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
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        className=""
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {songFields.map((field, index) => (
            <div key={index}>
              <label className="-mb-3 block mt-3">{field.placeholder}:</label>
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
            <label className="-mb-3 block mt-3">Search Album:</label>
            <input
              type="search"
              defaultValue={searchQuery}
              onKeyDown={handleSearch}
              placeholder="Search for an album"
              className="w-full mt-3 p-2.5 focus:bg-white focus:text-black bg-gray-900 rounded-lg focus:outline-none text-white placeholder-gray-400"
            />
          </div>
        </div>
        {/* Search Results and Selected Album Cards */}
        <div className="col-span-1 md:col-span-2 mt-2 md:mt-3">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4">
            {selectedAlbum && (
              <div className="flex-col">
                <p>Album: </p>
                <SearchAlbumCard
                  album={selectedAlbum}
                  loading={searchLoading}
                  isSelected={true}
                  onRemove={() => setSelectedAlbum(null)}
                />
              </div>
            )}
            {!searchResults.length && searchQuery && !searchLoading ? (
              <div
                className={`${searchResults.length ? 'flex items-center justify-center' : 'inline-block mb-3 mt-auto '} col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-5 flex  `}
              >
                <div className="flex-col text-center border-red-300 border-[1px] p-5 rounded-lg">
                  <p className="text-red-300">Album tidak ditemukan</p>
                  <Link
                    href={urlPage.LIBRARY_ALBUM}
                    target="_blank"
                    className="font-bold "
                  >
                    <span className="hover:underline cursor-pointer">
                      Tambah Album
                    </span>
                  </Link>
                </div>
              </div>
            ) : (
              searchResults.map((album) => (
                <div key={album.id} className="flex-col">
                  <p className="text-transparent">Album: </p>
                  <SearchAlbumCard
                    key={album.id}
                    album={album}
                    loading={searchLoading}
                    isSelected={selectedAlbum?.id === album.id}
                    onSelect={() => handleAlbumSelect(album)}
                  />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex space-x-4 mt-4">
          <CustomButton
            type="button"
            onClick={handleCancel}
            variant="secondary"
          >
            Cancel
          </CustomButton>
          <CustomButton
            type="submit"
            loading={loading}
            disabled={!isValid || isSubmitting || loading}
          >
            {metadata.id ? 'Update' : 'Save'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SongForm;
