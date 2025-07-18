'use client';

import { useRouter } from 'next/navigation';
import { PaginationResponse } from '@/utils/types';

interface PaginationProps {
  pagination: PaginationResponse;
  baseUrl: string;
}

const Pagination = ({ pagination, baseUrl }: PaginationProps) => {
  const router = useRouter();
  const { page, totalPages, hasPreviousPage, hasNextPage } = pagination;

  // Calculate displayed pages (show 5 pages max, centered around current page)
  const getDisplayedPages = () => {
    const maxDisplayPages = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);

    if (endPage - startPage < maxDisplayPages - 1) {
      startPage = Math.max(1, endPage - maxDisplayPages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const displayedPages = getDisplayedPages();
  const canJumpBackward = page > 4;
  const canJumpForward = page <= totalPages - 4;

  // Handle navigation on button click
  const handleNavigation = (pageNum: number) => {
    const hasQuery = baseUrl.includes('?');
    const separator = hasQuery ? '&' : '?';
    router.push(`${baseUrl}${separator}page=${pageNum}`);
  };

  return (
    <div className="flex items-center justify-center gap-3 pt-5 pb-10 lg:pt-10 lg:pb-0">
      {/* Jump Backward Button */}
      <button
        onClick={() => handleNavigation(Math.max(1, page - 4))}
        disabled={!canJumpBackward}
        className={`px-3 py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed text-sm lg:text-base font-semibold transition-all duration-200
      ${
        !canJumpBackward
          ? 'bg-white/10 text-indigo-900 '
          : 'bg-white/20 text-white '
      }`}
      >
        ««
      </button>

      {/* Previous Button */}
      <button
        onClick={() => handleNavigation(page - 1)}
        disabled={!hasPreviousPage}
        className={`px-3 py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed text-sm lg:text-base font-semibold transition-all duration-200
      ${
        !hasPreviousPage
          ? 'bg-white/10 text-indigo-900 '
          : 'bg-white/20 text-white'
      }`}
      >
        «
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {displayedPages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handleNavigation(pageNum)}
            disabled={pageNum === page}
            className={`px-4 py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed text-sm lg:text-base font-semibold tracking-tight transition-all duration-200
          ${
            pageNum === page
              ? 'bg-white text-indigo-900 '
              : 'bg-white/20 text-white'
          }`}
          >
            {pageNum}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handleNavigation(page + 1)}
        disabled={!hasNextPage}
        className={`px-3 py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed text-sm lg:text-base font-semibold transition-all duration-200
      ${
        !hasNextPage ? 'bg-white/10 text-indigo-900 ' : 'bg-white/20 text-white'
      }`}
      >
        »
      </button>

      {/* Jump Forward Button */}
      <button
        onClick={() => handleNavigation(Math.min(totalPages, page + 4))}
        disabled={!canJumpForward}
        className={`px-3 py-1.5 rounded-lg cursor-pointer disabled:cursor-not-allowed text-sm lg:text-base font-semibold transition-all duration-200
      ${
        !canJumpForward
          ? 'bg-white/10 text-indigo-900 '
          : 'bg-white/20 text-white '
      }`}
      >
        »»
      </button>
    </div>
  );
};

export default Pagination;
