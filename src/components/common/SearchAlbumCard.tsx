import { AlbumSection } from '@/utils/types';
import Image from 'next/image';
import { BsMusicNoteList } from 'react-icons/bs';
import { FaTimes, FaCheck } from 'react-icons/fa';

interface SearchAlbumCardProps {
  album: AlbumSection;
  isSelected?: boolean;
  loading: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
}

const SearchAlbumCard = ({
  album,
  isSelected = false,
  loading,
  onSelect,
  onRemove,
}: SearchAlbumCardProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRemove?.();
  };

  if (loading) {
    return (
      <div className="border rounded-lg p-3 mb-3 flex items-center gap-3 transition-all cursor-pointer backdrop-blur-sm animate-pulse">
        <div className="w-16 h-16 min-w-[64px] rounded-lg bg-gray-700/50"></div>

        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-700/50"></div>
          <div className="h-3 w-1/4 rounded bg-gray-700/50"></div>
          <div className="h-3 w-1/2 rounded bg-gray-700/50"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className="relative border rounded-lg p-3 mb-3 flex items-center gap-3 transition-all cursor-pointer hover:bg-white/10 backdrop-blur-sm group"
      style={{
        borderColor: isSelected
          ? 'rgba(129, 140, 248, 0.5)'
          : 'rgba(199, 210, 254, 0.2)',
        backgroundColor: isSelected
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {onRemove ? (
        <button
          onClick={handleClick}
          className="absolute -right-2 -top-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors z-10"
          aria-label="Remove album"
        >
          <FaTimes className="text-xs" />
        </button>
      ) : (
        <div
          className={`absolute right-2 top-2 w-4 h-4 border-2 flex items-center justify-center transition-all
          ${isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-indigo-300 bg-white/10'}`}
        >
          {isSelected && <FaCheck className="text-xs text-white" />}
        </div>
      )}

      <div className="w-16 h-16 min-w-[64px] overflow-hidden rounded-lg shadow-md flex items-center justify-center bg-indigo-900/50">
        {album.coverUrl ? (
          <Image
            src={album.coverUrl}
            alt={album.title}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        ) : (
          <BsMusicNoteList className="text-2xl text-indigo-300" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-sm truncate ${isSelected ? 'font-bold' : 'font-semibold'}`}
        >
          {album.title}
        </h3>
        <p className="text-xs text-indigo-200/90">{album.year}</p>
        <p className="text-xs text-indigo-200/90 truncate">{album.artist}</p>
      </div>
    </div>
  );
};

export default SearchAlbumCard;
