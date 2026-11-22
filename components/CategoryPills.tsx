'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

type CategoryPillsProps = {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategoryPills({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="sticky top-14 z-40 flex items-center bg-[#0f0f0f] h-14 px-4 sm:px-6 text-[#f1f1f1] relative">
      {/* Left shadow and arrow button */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 flex items-center bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent pr-8 pl-4 z-10">
          <button
            onClick={() => scroll('left')}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#272727] text-white shrink-0 cursor-pointer"
            title="Previous"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Pills Container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex items-center gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`shrink-0 h-8 rounded-lg px-3 text-[14px] transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#f1f1f1] text-[#0f0f0f] font-semibold'
                  : 'bg-[#272727] text-[#f1f1f1] hover:bg-[#3f3f3f] font-normal'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Right shadow and arrow button */}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 flex items-center bg-gradient-to-l from-[#0f0f0f] via-[#0f0f0f]/90 to-transparent pl-8 pr-4 z-10">
          <button
            onClick={() => scroll('right')}
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-[#272727] text-white shrink-0 cursor-pointer"
            title="Next"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
