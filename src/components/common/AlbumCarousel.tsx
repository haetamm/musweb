'use client';

import React from 'react';
import Image from 'next/image';
import { FaHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { albums } from '@/utils/data';
import { useCarousel } from '@/hooks/useCarousel';

interface Album {
  id: string | number;
  title: string;
  cover: string;
  songs: number;
  duration: string;
  likes: number;
}

const AlbumCarousel = () => {
  const { mounted, carouselRef, currentIndex, isMobile, next, prev } =
    useCarousel(albums, 5);

  if (!mounted) return null;

  return (
    <div className="relative mt-10 lg:mt-0">
      <div className="flex items-center justify-between mt-4 lg:mt-0 mb-2">
        <h2 className="text-lg font-bold">Your Albums</h2>
      </div>

      <div className="relative">
        <button
          onClick={prev}
          className={`absolute left-2 md:left-1.5 xl:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10transition ${
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
          {albums.map((album: Album) => (
            <div
              key={album.id}
              className={`flex-shrink-0 glass-card overflow-hidden no-scrollbar w-[156px] h-[156px] xs:w-[188px] xs:h-[188px] md:h-[240px] md:w-[240px] lg:w-[190px] lg:h-[190px] xl:h-[210px] xl:w-[210px] transition-transform ${
                isMobile ? 'snap-start' : ''
              }`}
            >
              <div className="relative h-full">
                <Image
                  src={album.cover}
                  alt={`${album.title} Cover`}
                  width={180}
                  height={180}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <h3 className="font-bold text-2xl line-clamp-1">
                      {album.title}
                    </h3>
                    <p className="text-indigo-200 text-xs">
                      {`${album.songs} Songs • ${album.duration}`}
                    </p>
                  </div>
                </div>
                <button
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition"
                  aria-label={`Like ${album.title}`}
                >
                  <FaHeart className="text-white text-xs" />
                </button>
              </div>
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
    </div>
  );
};

export default AlbumCarousel;
