'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MediaDisplay from '@/components/ui/MediaDisplay';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { getMockArtworkBySlug, getArtworkNavigation } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import type { Artwork } from '@/types';

export default function ArtworkPage() {
  const params = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
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
    const fetchArtwork = async () => {
      try {
        setIsLoading(true);
        const slug = params.slug as string;
        const foundArtwork = getMockArtworkBySlug(slug);
        
        if (!foundArtwork) {
          setArtwork(null);
          return;
        }

        setArtwork(foundArtwork);
        
        // Get navigation context
        const nav = getArtworkNavigation(slug, foundArtwork.contentType);
        setNavigation(nav);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.slug) {
      fetchArtwork();
    }
  }, [params.slug]);

  // Enable keyboard navigation
  useKeyboardNavigation({
    prevUrl: navigation?.prev ? `${navigation.baseUrl}/${navigation.prev.slug}` : undefined,
    nextUrl: navigation?.next ? `${navigation.baseUrl}/${navigation.next.slug}` : undefined,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-400 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading artwork...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/gallery" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Media with Navigation */}
          <div className="relative">
            <div className="relative rounded-lg shadow-lg bg-neutral-100 overflow-hidden" style={{ height: 'min(80vh, 800px)' }}>
              <MediaDisplay
                src={artwork.imageUrl}
                alt={artwork.title}
                fill={true}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
                controls={true}
              />
            </div>
            
            {artwork.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="bg-neutral-900 text-white text-sm px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            )}

            {/* Navigation Arrows */}
            {navigation && (navigation.prev || navigation.next) && (
              <>
                {/* Previous Arrow */}
                {navigation.prev && (
                  <Link 
                    href={`${navigation.baseUrl}/${navigation.prev.slug}`}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ArrowLeft className="h-6 w-6" />
                  </Link>
                )}

                {/* Next Arrow */}
                {navigation.next && (
                  <Link 
                    href={`${navigation.baseUrl}/${navigation.next.slug}`}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-neutral-700 hover:text-neutral-900 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <ArrowLeft className="h-6 w-6 rotate-180" />
                  </Link>
                )}
              </>
            )}

            {/* Collection Info - Bottom of Image */}
            {navigation && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-neutral-700 text-sm px-3 py-1 rounded-full shadow-lg">
                {navigation.currentIndex} of {navigation.total} in {navigation.collection}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center text-neutral-700 mb-6">
                <User className="h-5 w-5 mr-2" />
                <Link 
                  href={`/artists/${artwork.artist.slug}`}
                  className="text-lg font-medium hover:text-neutral-900 transition-colors"
                >
                  {artwork.artist.name}
                </Link>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-6">
              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artwork.yearCreated && (
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Created</div>
                    <div className="font-medium text-neutral-900">{artwork.yearCreated}</div>
                  </div>
                )}
                {artwork.publicationDate && (
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-neutral-500" />
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Published</div>
                      <div className="font-medium text-neutral-900">
                        {formatDate(artwork.publicationDate)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200">
              <Button className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share Artwork
              </Button>
              <Link href={`/gallery?artist=${artwork.artist.slug}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View More by Artist
                </Button>
              </Link>
            </div>

            {/* Keyboard Navigation Hint */}
            <div className="flex items-center justify-center text-xs text-neutral-400 pt-4">
              <kbd className="px-2 py-1 bg-neutral-100 rounded text-neutral-600 text-xs mr-1">←</kbd>
              <kbd className="px-2 py-1 bg-neutral-100 rounded text-neutral-600 text-xs mr-2">→</kbd>
              Use arrow keys to navigate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}