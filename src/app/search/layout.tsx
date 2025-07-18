import SearchNavLayout, {
  TitleSearchNavLayout,
} from '@/components/layout/SearchNavLayout';
import { Suspense } from 'react';

interface Props {
  children: React.ReactNode;
}

const SearchLayout = async ({ children }: Props) => {
  return (
    <>
      {/* Title */}
      <Suspense>
        <TitleSearchNavLayout />
      </Suspense>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,25%)_1fr] min-h-[100vh-2px]">
        <Suspense>
          <SearchNavLayout />
        </Suspense>

        {/* Main Content */}
        <div className="px-4 overflow-auto">{children}</div>
      </div>
    </>
  );
};

export default SearchLayout;
