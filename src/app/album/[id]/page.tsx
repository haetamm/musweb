import AlbumDetailPageSection from '@/components/album/AlbumDetailPageSection';
import ErrorMessage from '@/components/common/ErrorMessage';
import NotFoundMessage from '@/components/common/NotFoundMessage';
import { AlbumAction } from '@/lib/action/AlbumAction';

const AlbumDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: album, error, status } = await AlbumAction.getAlbumById(id);

  if (status === 404) {
    return <NotFoundMessage label="Album" />;
  }

  if (error || !album) {
    return <ErrorMessage message={error || 'Unknown error occurred'} />;
  }

  return (
    <div className="px-4">
      <div className="text-white py-8 xl:mt-2 rounded-xl ">
        <AlbumDetailPageSection albumResult={album} />
      </div>
    </div>
  );
};

export default AlbumDetailPage;
