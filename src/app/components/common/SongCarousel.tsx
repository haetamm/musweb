'use client';

import { songs } from '@/app/utils/data';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const SongCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Ganti window.innerWidth
  const itemsPerPage: number = 5;
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 <= songs.length - itemsPerPage ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  // Smooth scroll untuk desktop
  useEffect(() => {
    if (carouselRef.current && !isMobile) {
      carouselRef.current.scrollTo({
        left: currentIndex * (carouselRef.current.offsetWidth / itemsPerPage),
        behavior: 'smooth',
      });
    }
  }, [currentIndex, isMobile]);

  return (
    <div className="relative mt-10">
      <h2 className="text-lg font-bold mt-4 mb-2">More of what you like</h2>
      <div className="relative">
        <button
          onClick={prevSlide}
          className={`absolute left-2 md:left-1.5 xl:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
            currentIndex === 0 ? 'hidden' : ''
          }`}
          aria-label="Previous songs"
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
          {songs.map(({ id, cover, title, artist }) => (
            <div
              key={id}
              className={`flex-shrink-0 w-[156px] h-[260px] xs:w-[188px] xs:h-[292px] md:w-[240px] md:h-[344px] lg:w-[190px] lg:h-[294px] xl:w-[210px] xl:h-[314px] transition-transform ${
                isMobile ? 'snap-start' : ''
              } flex flex-col`}
            >
              <div className="w-[156px] h-[156px] xs:w-[188px] xs:h-[188px] md:w-[240px] md:h-[240px] lg:w-[190px] lg:h-[190px] xl:w-[210px] xl:h-[210px] flex-shrink-0">
                <Image
                  src={cover || '/images/fallback.jpg'}
                  alt={`${title || 'Unknown'} Cover`}
                  className="w-full h-full object-cover"
                  width={156}
                  height={156}
                  loading="lazy"
                />
              </div>
              <div className="p-2 flex-grow relative z-10">
                <p className="font-medium truncate text-lg">
                  {title || 'Unknown Title'}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {artist || 'Unknown Artist'}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={`absolute right-2 md:right-0 xl:right-3.5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
            currentIndex >= songs.length - itemsPerPage ? 'hidden' : ''
          }`}
          aria-label="Next songs"
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SongCarousel;
