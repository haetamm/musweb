import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useCarousel = <T>(data: T[], itemsPerPage: number = 5) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (carouselRef.current && !isMobile) {
      carouselRef.current.scrollTo({
        left: currentIndex * (carouselRef.current.offsetWidth / itemsPerPage),
        behavior: 'smooth',
      });
    }
  }, [currentIndex, isMobile, itemsPerPage]);

  const next = () => {
    setCurrentIndex((prev) =>
      prev + 1 <= data.length - itemsPerPage ? prev + 1 : prev
    );
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return {
    mounted,
    carouselRef,
    currentIndex,
    isMobile,
    next,
    prev,
  };
};
