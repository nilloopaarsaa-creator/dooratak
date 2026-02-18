/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Door } from '../types';
import ObjectCard from './ObjectCard';

interface DoorSelectorProps {
    doors: Door[];
    onSelect: (door: Door) => void;
    onAddOwnProductClick: () => void;
}

const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const DoorSelector: React.FC<DoorSelectorProps> = ({ doors, onSelect, onAddOwnProductClick }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = useCallback(() => {
        const el = scrollContainerRef.current;
        if (el) {
            const atStart = el.scrollLeft < 10;
            const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
            setCanScrollLeft(!atStart);
            setCanScrollRight(!atEnd);
        }
    }, []);
    
    useEffect(() => {
        const el = scrollContainerRef.current;
        if (!el) return;

        // Initial check
        checkScrollButtons();
        
        // Handle case where items don't fill the container
        if (el.scrollWidth <= el.clientWidth) {
            setCanScrollRight(false);
        }

        el.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        return () => {
            el.removeEventListener('scroll', checkScrollButtons);
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, [doors, checkScrollButtons]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-zinc-800">Choose a Door</h2>
            <p className="text-zinc-600 mb-8 max-w-2xl mx-auto">Select one of our models from the list below, or upload your own to get started.</p>
            <div className="relative flex items-center">
                <button 
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="absolute -left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Scroll left"
                >
                    <ArrowLeftIcon />
                </button>
                <div
                    ref={scrollContainerRef}
                    className="flex space-x-6 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-hide"
                >
                    {doors.map(door => (
                         <div key={door.id} className="snap-center shrink-0 w-52 md:w-64">
                            <ObjectCard
                                door={door}
                                isSelected={false}
                                onClick={() => onSelect(door)}
                            />
                        </div>
                    ))}
                </div>
                 <button 
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className="absolute -right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-zinc-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Scroll right"
                >
                    <ArrowRightIcon />
                </button>
            </div>
            <div className="mt-8">
                <button
                    onClick={onAddOwnProductClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-sm"
                >
                    Upload Your Own Door
                </button>
            </div>
        </div>
    );
};

export default DoorSelector;