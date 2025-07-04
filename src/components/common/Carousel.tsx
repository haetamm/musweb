import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface CarouselProps<T> {
  items: T[];
  itemsPerPage?: number;
  title: string;
  renderItem: (item: T) => ReactNode;
}

const Carousel = <T,>({
  items,
  itemsPerPage = 5,
  title,
  renderItem,
}: CarouselProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Detect mobile vs desktop based on screen width
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 <= items.length - itemsPerPage ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  // Smooth scroll for desktop button navigation
  useEffect(() => {
    if (carouselRef.current && !isMobile) {
      carouselRef.current.scrollTo({
        left: currentIndex * (carouselRef.current.offsetWidth / itemsPerPage),
        behavior: 'smooth',
      });
    }
  }, [currentIndex, isMobile, itemsPerPage]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mt-4 lg:mt-0 mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <div className="relative">
        <button
          onClick={prevSlide}
          className={`absolute left-2 md:left-1.5 xl:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
            currentIndex === 0 ? 'hidden' : ''
          }`}
          aria-label="Previous items"
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
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${isMobile ? 'snap-start' : ''}`}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={`absolute right-2 md:right-0 xl:right-3.5 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-3 rounded-full xs:bg-white/10 hover:bg-white/20 transition ${
            currentIndex >= items.length - itemsPerPage ? 'hidden' : ''
          }`}
          aria-label="Next items"
        >
          <FaChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
