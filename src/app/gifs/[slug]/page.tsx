'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import MediaDisplay from '@/components/ui/MediaDisplay';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { getMockGifBySlug, getArtworkNavigation } from '@/lib/mock-data';
import type { Artwork } from '@/types';

export default function GifPage() {
  const params = useParams();
  const [gif, setGif] = useState<Artwork | null>(null);
  const [navigation, setNavigation] = useState<{
    prev: Artwork | null;
    next: Artwork | null;
    baseUrl: string;
    collection: string;
    currentIndex: number;
    total: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        const foundGif = getMockGifBySlug(params.slug as string);
        setGif(foundGif);
        
        if (foundGif) {
          const nav = getArtworkNavigation(foundGif.slug, 'gif');
          setNavigation(nav);
        }
      } catch (error) {
        console.error('Error fetching gif:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchGif();
    }
  }, [params.slug]);

  // Enable keyboard navigation
  useKeyboardNavigation({
    prevUrl: navigation?.prev ? `${navigation.baseUrl}/${navigation.prev.slug}` : undefined,
    nextUrl: navigation?.next ? `${navigation.baseUrl}/${navigation.next.slug}` : undefined,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-400 mx-auto mb-4"></div>
              <p className="text-neutral-300">Loading gif...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gif) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="container py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-light text-white mb-4">GIF not found</h1>
            <p className="text-neutral-400 mb-8">The GIF you&apos;re looking for doesn&apos;t exist.</p>
            <Link 
              href="/gifs" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to GIFs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="container py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/gifs" 
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to GIFs
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Media with Navigation */}
          <div className="relative bg-neutral-800 rounded-lg overflow-hidden" style={{ height: 'min(80vh, 800px)' }}>
            <MediaDisplay
              src={gif.imageUrl}
              alt={gif.title}
              fill={true}
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              controls={false}
            />

            {/* Navigation Arrows */}
            {navigation && (navigation.prev || navigation.next) && (
              <>
                {/* Previous Arrow */}
                {navigation.prev && (
                  <Link 
                    href={`${navigation.baseUrl}/${navigation.prev.slug}`}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-neutral-800/90 hover:bg-neutral-700/90 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </Link>
                )}

                {/* Next Arrow */}
                {navigation.next && (
                  <Link 
                    href={`${navigation.baseUrl}/${navigation.next.slug}`}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-neutral-800/90 hover:bg-neutral-700/90 text-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ArrowLeft className="h-6 w-6 rotate-180" />
                  </Link>
                )}
              </>
            )}

            {/* Collection Info - Bottom of Image */}
            {navigation && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-neutral-800/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full shadow-lg">
                {navigation.currentIndex} of {navigation.total} in {navigation.collection}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Artist Info */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white font-medium">{gif.artist.name}</p>
                <p className="text-neutral-400 text-sm">Artist</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4 pt-4 border-t border-neutral-700">
              <div className="flex items-center gap-3 text-neutral-300">
                <Calendar className="h-4 w-4" />
                <span>Created {gif.yearCreated}</span>
              </div>
              
              {gif.publicationDate && (
                <div className="flex items-center gap-3 text-neutral-300">
                  <Calendar className="h-4 w-4" />
                  <span>Published {new Date(gif.publicationDate).getFullYear()}</span>
                </div>
              )}
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="flex items-center justify-center text-xs text-neutral-400 pt-4">
              <kbd className="px-2 py-1 bg-neutral-800 rounded text-neutral-300 text-xs mr-1">←</kbd>
              <kbd className="px-2 py-1 bg-neutral-800 rounded text-neutral-300 text-xs mr-2">→</kbd>
              Use arrow keys to navigate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}