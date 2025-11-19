import { GoalMeter } from './GoalMeter';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

interface Goal {
  current: number;
  target: number;
  category: string;
  daysLeft: number;
}

interface GoalCarouselProps {
  goals: Goal[];
}

export function GoalCarousel({ goals }: GoalCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 340; // width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative -mx-4 px-4">
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {goals.map((goal, index) => (
          <div key={index} className="flex-shrink-0">
            <GoalMeter
              current={goal.current}
              target={goal.target}
              category={goal.category}
              daysLeft={goal.daysLeft}
            />
          </div>
        ))}
      </div>
      
      {goals.length > 1 && (
        <>
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="前へ"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="次へ"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}
      
      {goals.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {goals.map((_, index) => (
            <div
              key={index}
              className="w-1.5 h-1.5 rounded-full bg-gray-300"
            />
          ))}
        </div>
      )}
    </div>
  );
}
