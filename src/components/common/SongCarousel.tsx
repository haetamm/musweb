'use client';

import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCarousel } from '@/hooks/useCarousel';
import SongCard from './SongCard';
import { SongDetail } from '@/utils/types';
import useSongStore from '@/stores/song';
import SongCardSkeleton from './SongCardSkeleton';
import ErrorMessageSection from '../layout/ErrorMessageSection';

interface SongCarouselProps {
  songsResult: SongDetail[] | undefined;
  error: string | undefined;
}

const SongCarousel: React.FC<SongCarouselProps> = ({ songsResult, error }) => {
  const { songs, setSongs } = useSongStore();
  const [loading, setLoading] = useState(true);
  const { carouselRef, currentIndex, isMobile, next, prev, mounted } =
    useCarousel(songs, 5);

  const skeletons = Array.from({ length: 7 });

  useEffect(() => {
    setSongs(songsResult ?? []);
    setLoading(false);
  }, [setSongs, songsResult]);

  if (!mounted || loading) {
    return (
      <div className="flex gap-4 overflow-x-auto no-scrollbar mt-18">
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[156px] h-[260px] xs:w-[188px] xs:h-[292px] md:w-[240px] md:h-[344px] lg:w-[190px] lg:h-[294px] xl:w-[210px]"
          >
            <SongCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative mt-10">
      <h2 className="text-lg font-bold mt-4 mb-2">New Songs</h2>

      {error ? (
        <ErrorMessageSection error={error} />
      ) : (
        <div className="relative">
          {/* Prev Button */}
          <button
            onClick={prev}
            className={`absolute left-2 md:left-1.5 xl:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
              currentIndex === 0 ? 'hidden' : ''
            }`}
            aria-label="Previous songs"
          >
            <FaChevronLeft className="text-white" />
          </button>

          {/* Carousel */}
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
            {songs.map((song) => (
              <div
                key={song.id}
                className={`flex-shrink-0 w-[156px] h-[260px] xs:w-[188px] xs:h-[292px] md:w-[240px] md:h-[344px] lg:w-[190px] lg:h-[294px] xl:w-[210px] transition-transform ${
                  isMobile ? 'snap-start' : ''
                } flex flex-col`}
              >
                <SongCard song={song} />
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={next}
            className={`absolute right-2 md:right-0 xl:right-3.5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
              currentIndex >= songs.length - 5 ? 'hidden' : ''
            }`}
            aria-label="Next songs"
          >
            <FaChevronRight className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SongCarousel;
