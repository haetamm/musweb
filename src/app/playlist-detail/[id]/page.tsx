import ErrorMessage from '@/components/common/ErrorMessage';
import NotFoundMessage from '@/components/common/NotFoundMessage';
import SongDetailTable from '@/components/common/SongDetailTable';
import { PlaylistAction } from '@/lib/action/PlaylistAction';
import { formatDurationToMinutes } from '@/utils/helper';
import {
  FaPlay,
  FaHeart,
  FaEllipsisH,
  FaHeadphones,
  FaUser,
} from 'react-icons/fa';
import { MdLibraryMusic } from 'react-icons/md';

const PlaylistDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const {
    data: playlist,
    error,
    status,
  } = await PlaylistAction.getPlaylistById(id);

  if (status === 404) {
    return <NotFoundMessage label="Album" />;
  }

  if (error || !playlist) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="px-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 pt-5 text-white mb-13 lg:mb-0">
        <div className="md:px-6 mx-auto">
          {/* Header */}
          <header className="hidden md:flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <MdLibraryMusic className="text-3xl text-purple-300" />
              <h1 className="text-2xl font-bold">Playlist Details</h1>
            </div>
            <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition">
              <FaUser className="text-purple-300" />
              <span>{playlist.owner}</span>
            </button>
          </header>

          {/* Playlist Info */}
          <section className="flex flex-col xs:flex-row items-center md:items-end space-y-6 xs:space-y-0 xs:space-x-8 mb-12">
            <div className="w-full xs:w-48 h-48 md:w-64 md:h-64 bg-indigo-800/30 rounded-xl shadow-lg flex items-center justify-center">
              <MdLibraryMusic className="text-7xl md:text-9xl text-purple-300/50" />
            </div>

            <div className="flex-1 w-full px-2 xs:px-0">
              <p className="text-sm text-purple-200 mb-2">PLAYLIST</p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {playlist.title}
              </h1>
              <p className="text-purple-200 mb-6">
                Created by {playlist.owner}
              </p>

              <div className="flex space-x-4">
                <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-medium transition transform hover:scale-105">
                  <FaPlay className="mr-2" />
                  Play
                </button>
                <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
                  <FaHeart className="text-xl" />
                </button>
                <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition">
                  <FaEllipsisH className="text-xl" />
                </button>
              </div>
            </div>
          </section>

          {/* Songs List */}
          <SongDetailTable songs={playlist.songs} />

          {/* Stats */}
          <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-6 flex items-center space-x-4">
              <div className="bg-purple-500/20 p-4 rounded-full">
                <FaHeadphones className="text-2xl text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-purple-200">Total Songs</p>
                <p className="text-2xl font-bold">{playlist.songCount}</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 flex items-center space-x-4">
              <div className="bg-indigo-500/20 p-4 rounded-full">
                <MdLibraryMusic className="text-2xl text-indigo-300" />
              </div>
              <div>
                <p className="text-sm text-purple-200">Playlist Duration</p>
                <p className="text-2xl font-bold">
                  {formatDurationToMinutes(playlist.totalDuration)}
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-blue-500/20 p-4 rounded-full">
                  <FaUser className="text-2xl text-blue-300" />
                </div>
                <div>
                  <p className="text-sm text-purple-200">Contributors</p>
                  <p className="text-lg font-medium">{playlist.owner}</p>
                </div>
              </div>

              {/* Collaborators List */}
              {playlist.collaborations.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-purple-200 mb-2">Collaborators</p>
                  <div className="flex flex-wrap gap-2">
                    {playlist.collaborations.map(({ fullname }, index) => (
                      <span
                        key={index}
                        className="bg-white/10 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <FaUser className="mr-1 text-xs opacity-70" />
                        {fullname}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Likes Section */}
          {playlist.likes.length > 0 && (
            <section className="mt-8 bg-white/5 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-pink-500/20 p-4 rounded-full">
                  <FaHeart className="text-2xl text-pink-300" />
                </div>
                <div>
                  <p className="text-sm text-purple-200">Liked By</p>
                  <p className="text-lg font-medium">
                    {playlist.likes.length}{' '}
                    {playlist.likes.length === 1 ? 'person' : 'people'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {playlist.likes.map(({ fullname }, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full"
                  >
                    <FaUser className="text-xs opacity-70" />
                    <span className="text-sm">{fullname}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailPage;
