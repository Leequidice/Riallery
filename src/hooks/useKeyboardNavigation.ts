'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseKeyboardNavigationProps {
  prevUrl?: string;
  nextUrl?: string;
}

export function useKeyboardNavigation({ prevUrl, nextUrl }: UseKeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only trigger if no input elements are focused
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }

      if (event.key === 'ArrowLeft' && prevUrl) {
        event.preventDefault();
        router.push(prevUrl);
      } else if (event.key === 'ArrowRight' && nextUrl) {
        event.preventDefault();
        router.push(nextUrl);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevUrl, nextUrl, router]);
}