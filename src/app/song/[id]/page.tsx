import ErrorMessage from '@/components/common/ErrorMessage';
import NotFoundMessage from '@/components/common/NotFoundMessage';
import SongDetailPageSection from '@/components/song/SongDetailPageSection';
import ActionButton from '@/components/common/ActionButton';
import { SongAction } from '@/lib/action/SongAction';

const SongDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: song, error, status } = await SongAction.getSongById(id);

  if (status === 404) {
    return <NotFoundMessage label="Song" />;
  }

  if (error || !song) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="lg:px-5">
      <div className="text-white pt-6 xl:mt-2 rounded-xl mb-13 lg:mb-0">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
              Song Details
            </h1>
            <ActionButton
              owner={song.userId}
              resourceId={song.id}
              type="song"
            />
          </div>

          {/* Song Info */}
          <SongDetailPageSection songResult={song} />
        </div>
      </div>
    </div>
  );
};

export default SongDetailPage;
