import ErrorMessage from '@/components/common/ErrorMessage';
import NotFoundMessage from '@/components/common/NotFoundMessage';
import PlaylistDetailPageSection from '@/components/playlist/PlaylistDetailPageSection';
import { PlaylistAction } from '@/lib/action/PlaylistAction';

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
    return <NotFoundMessage label="Playlist" />;
  }

  if (error || !playlist) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="px-4">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 pt-5 text-white mb-13 lg:mb-0">
        <PlaylistDetailPageSection playlistResult={playlist} />
      </div>
    </div>
  );
};

export default PlaylistDetailPage;
