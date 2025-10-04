'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import type { Artwork } from '@/types';

interface ArtworkNavigationProps {
  prev: Artwork | null;
  next: Artwork | null;
  baseUrl: string;
  collection: string;
  currentIndex: number;
  total: number;
  isDark?: boolean;
}

export default function ArtworkNavigation({
  prev,
  next,
  baseUrl,
  collection,
  currentIndex,
  total,
  isDark = false
}: ArtworkNavigationProps) {
  // Enable keyboard navigation
  useKeyboardNavigation({
    prevUrl: prev ? `${baseUrl}/${prev.slug}` : undefined,
    nextUrl: next ? `${baseUrl}/${next.slug}` : undefined,
  });

  const borderClass = isDark ? 'border-neutral-700' : 'border-neutral-200';
  const textClass = isDark ? 'text-neutral-400' : 'text-neutral-400';
  const titleClass = isDark ? 'text-neutral-300' : 'text-neutral-700';

  return (
    <div className="space-y-3">
      {/* Keyboard hint */}
      <div className={`flex items-center justify-center text-xs ${textClass}`}>
        <Keyboard className="h-3 w-3 mr-1" />
        Use ← → arrow keys to navigate
      </div>
      
      <div className={`flex items-center justify-between pt-3 border-t ${borderClass}`}>
      {/* Previous Button */}
      <div className="flex-1">
        {prev ? (
          <Link href={`${baseUrl}/${prev.slug}`}>
            <Button 
              variant="outline" 
              className="w-full justify-start text-left"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-2 flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-xs text-neutral-500 mb-1">Previous</div>
                <div className="truncate font-medium">{prev.title}</div>
              </div>
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>

      {/* Collection Info */}
      <div className="px-4 text-center">
        <div className={`text-xs mb-1 ${textClass}`}>{collection}</div>
        <div className={`text-sm font-medium ${titleClass}`}>
          {currentIndex} of {total}
        </div>
      </div>

      {/* Next Button */}
      <div className="flex-1">
        {next ? (
          <Link href={`${baseUrl}/${next.slug}`}>
            <Button 
              variant="outline" 
              className="w-full justify-end text-right"
              size="sm"
            >
              <div className="min-w-0">
                <div className="text-xs text-neutral-500 mb-1">Next</div>
                <div className="truncate font-medium">{next.title}</div>
              </div>
              <ChevronRight className="h-4 w-4 ml-2 flex-shrink-0" />
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
    </div>
  );
}