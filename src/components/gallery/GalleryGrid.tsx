'use client';

import { useState, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import Lightbox from './Lightbox';
import { Button } from '@/components/ui/Button';
import { Loader2 } from 'lucide-react';
import type { Artwork, GalleryResponse } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryGridProps {
  initialData: GalleryResponse;
  onLoadMore?: (page: number) => Promise<GalleryResponse>;
}

export default function GalleryGrid({ initialData, onLoadMore }: GalleryGridProps) {
  const [artworks, setArtworks] = useState<Artwork[]>(initialData.artworks);
  const [currentPage, setCurrentPage] = useState(initialData.page);
  const [hasMore, setHasMore] = useState(initialData.hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  const handleLoadMore = async () => {
    if (!onLoadMore || isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await onLoadMore(nextPage);
      
      setArtworks(prev => [...prev, ...response.artworks]);
      setCurrentPage(nextPage);
      setHasMore(response.hasMore);
    } catch (error) {
      console.error('Failed to load more artworks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewLarge = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleCloseLightbox = () => {
    setSelectedArtwork(null);
  };

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedArtwork) return;

      const currentIndex = artworks.findIndex(art => art._id === selectedArtwork._id);
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedArtwork(artworks[currentIndex - 1]);
      } else if (e.key === 'ArrowRight' && currentIndex < artworks.length - 1) {
        setSelectedArtwork(artworks[currentIndex + 1]);
      } else if (e.key === 'Escape') {
        handleCloseLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtwork, artworks]);

  if (artworks.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-neutral-900 mb-2">
            No artworks found
          </h3>
          <p className="text-neutral-600">
            Try adjusting your filters or check back later for new submissions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        <AnimatePresence>
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1 
              }}
            >
              <ArtworkCard 
                artwork={artwork} 
                onViewLarge={handleViewLarge}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={handleLoadMore}
            disabled={isLoading}
            size="lg"
            className="min-w-[160px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}

      {/* Results Count */}
      <div className="text-center text-sm text-neutral-500">
        Showing {artworks.length} of {initialData.total} artworks
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedArtwork && (
          <Lightbox 
            artwork={selectedArtwork}
            onClose={handleCloseLightbox}
            onPrevious={() => {
              const currentIndex = artworks.findIndex(art => art._id === selectedArtwork._id);
              if (currentIndex > 0) {
                setSelectedArtwork(artworks[currentIndex - 1]);
              }
            }}
            onNext={() => {
              const currentIndex = artworks.findIndex(art => art._id === selectedArtwork._id);
              if (currentIndex < artworks.length - 1) {
                setSelectedArtwork(artworks[currentIndex + 1]);
              }
            }}
            hasPrevious={artworks.findIndex(art => art._id === selectedArtwork._id) > 0}
            hasNext={artworks.findIndex(art => art._id === selectedArtwork._id) < artworks.length - 1}
          />
        )}
      </AnimatePresence>
    </div>
  );
}