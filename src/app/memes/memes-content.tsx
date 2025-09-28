'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Filters from '@/components/gallery/Filters';
import { 
  getMockMemes, 
  mockMediums, 
  mockStyles, 
  mockThemes, 
  mockEvents, 
  mockArtists 
} from '@/lib/mock-data';
import type { GalleryFilters, GalleryResponse } from '@/types';
import { Loader2 } from 'lucide-react';

export default function MemesContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<GalleryFilters>({});
  const [memesData, setMemesData] = useState<GalleryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize filters from URL parameters
  useEffect(() => {
    const initialFilters: GalleryFilters = {};
    
    const artist = searchParams.get('artist');
    const medium = searchParams.getAll('medium');
    const style = searchParams.getAll('style');
    const themes = searchParams.getAll('theme');
    const event = searchParams.get('event');
    const year = searchParams.getAll('year');
    const sortBy = searchParams.get('sort') as GalleryFilters['sortBy'];

    if (artist) initialFilters.artist = artist;
    if (medium.length) initialFilters.medium = medium;
    if (style.length) initialFilters.style = style;
    if (themes.length) initialFilters.themes = themes;
    if (event) initialFilters.event = event;
    if (year.length) initialFilters.yearCreated = year;
    if (sortBy) initialFilters.sortBy = sortBy;

    // Set content type filter to only show memes
    initialFilters.contentType = 'meme';
    setFilters(initialFilters);
  }, [searchParams]);

  // Fetch memes data based on filters
  useEffect(() => {
    const fetchMemesData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call with filters
        const data = getMockMemes(1, 12);
        
        setMemesData({
          artworks: data.artworks,
          total: data.total,
          page: data.page,
          limit: data.limit,
          hasMore: data.hasMore,
        });
      } catch (error) {
        console.error('Error fetching memes data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemesData();
  }, [filters]);

  const handleFiltersChange = (newFilters: GalleryFilters) => {
    // Ensure content type is always set to meme
    setFilters({ ...newFilters, contentType: 'meme' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="container py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-400" />
              <p className="text-neutral-300">Loading memes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-white">m e m e s</h1>
          <p className="text-neutral-300 text-lg">
            discover the funniest creations from the rialo community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <Filters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            artists={mockArtists}
            mediums={mockMediums}
            styles={mockStyles}
            themes={mockThemes}
            events={mockEvents}
          />
        </div>

        {/* Memes Grid */}
        {memesData && (
          <GalleryGrid 
            initialData={memesData}
            onLoadMore={async (page: number) => {
              // In a real app, this would load more memes
              console.log('Load more memes, page:', page);
              return getMockMemes(page, 12);
            }}
          />
        )}

        {memesData && memesData.artworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-300 text-lg mb-4">No memes found</p>
            <p className="text-neutral-400">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}