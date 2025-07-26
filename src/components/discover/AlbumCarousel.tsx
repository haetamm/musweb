'use client';

import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCarousel } from '@/hooks/useCarousel';
import AlbumCard from '../common/AlbumCard';
import { AlbumResponse } from '@/lib/action/AlbumAction';
import useAlbumStore from '@/stores/album';
import ErrorMessageSection from '../layout/ErrorMessageSection';
import AlbumCardSkeleton from '../common/AlbumCardSkeleton';

interface AlbumCarouselProps {
  albumResults: AlbumResponse[] | undefined;
  error: string | undefined;
}

const AlbumCarousel: React.FC<AlbumCarouselProps> = ({
  albumResults,
  error,
}) => {
  const { albums, setAlbums } = useAlbumStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAlbums(albumResults ?? []);
    setLoading(false);
  }, [setAlbums, albumResults]);

  const { carouselRef, currentIndex, isMobile, next, prev, mounted } =
    useCarousel(albums, 5);

  const skeletons = Array.from({ length: 7 });

  if (!mounted || loading) {
    return (
      <div className="flex space-x-4 overflow-x-auto no-scrollbar mt-10">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[156px] h-[156px] xs:w-[188px] xs:h-[188px] md:h-[240px] md:w-[240px] lg:w-[190px] lg:h-[190px] xl:h-[210px] xl:w-[210px]"
          >
            <AlbumCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={` ${albums.length ? 'mb-10' : 'mb-0'} relative mt-10 lg:mt-0`}
    >
      {albums.length > 0 && (
        <div className="flex items-center justify-between mt-4 lg:mt-0 mb-2">
          <h2 className="text-lg font-bold">New Albums</h2>
        </div>
      )}

      {error ? (
        <ErrorMessageSection error={error} />
      ) : (
        <div className="relative">
          <button
            onClick={prev}
            className={`absolute left-2 md:left-1.5 xl:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 transition ${
              currentIndex === 0 ? 'hidden' : ''
            }`}
            aria-label="Previous albums"
          >
            <FaChevronLeft className="text-white" />
          </button>

          <div
            ref={carouselRef}
            className={`flex gap-4 overflow-x-auto no-scrollbar ${
              isMobile ? 'snap-x snap-mandatory' : ''
            }`}
            style={{
              scrollBehavior: isMobile ? 'auto' : 'smooth',
              touchAction: isMobile ? 'pan-x' : 'auto',
              WebkitOverflowScrolling: isMobile ? 'touch' : 'auto',
            }}
          >
            {albums.map((album) => (
              <div
                key={album.id}
                className={`flex-shrink-0 glass-card overflow-hidden w-[156px] h-[156px] xs:w-[188px] xs:h-[188px] md:h-[240px] md:w-[240px] lg:w-[190px] lg:h-[190px] xl:h-[210px] xl:w-[210px] transition-transform ${
                  isMobile ? 'snap-start' : ''
                }`}
              >
                <AlbumCard album={album} />
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className={`absolute right-2 md:right-0 xl:right-3.5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
              currentIndex >= albums.length - 5 ? 'hidden' : ''
            }`}
            aria-label="Next albums"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AlbumCarousel;
