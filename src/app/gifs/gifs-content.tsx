'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Filters from '@/components/gallery/Filters';
import { 
  getMockGifs, 
  mockMediums, 
  mockStyles, 
  mockThemes, 
  mockEvents, 
  mockArtists 
} from '@/lib/mock-data';
import type { GalleryFilters, GalleryResponse } from '@/types';
import { Loader2 } from 'lucide-react';

export default function GifsContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<GalleryFilters>({});
  const [gifsData, setGifsData] = useState<GalleryResponse | null>(null);
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

    // Set content type filter to only show gifs
    initialFilters.contentType = 'gif';
    setFilters(initialFilters);
  }, [searchParams]);

  // Fetch gifs data based on filters
  useEffect(() => {
    const fetchGifsData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call with filters
        const data = getMockGifs(1, 12);
        
        setGifsData({
          artworks: data.artworks,
          total: data.total,
          page: data.page,
          limit: data.limit,
          hasMore: data.hasMore,
        });
      } catch (error) {
        console.error('Error fetching gifs data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGifsData();
  }, [filters]);

  const handleFiltersChange = (newFilters: GalleryFilters) => {
    // Ensure content type is always set to gif
    setFilters({ ...newFilters, contentType: 'gif' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900">
        <div className="container py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-400" />
              <p className="text-neutral-300">Loading gifs...</p>
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
          <h1 className="text-4xl md:text-5xl font-light mb-6 tracking-wide text-white">g i f s</h1>
          <p className="text-neutral-300 text-lg">
            discover animated creations from the rialo community
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

        {/* Gifs Grid */}
        {gifsData && (
          <GalleryGrid 
            initialData={gifsData}
            onLoadMore={async (page: number) => {
              // In a real app, this would load more gifs
              console.log('Load more gifs, page:', page);
              return getMockGifs(page, 12);
            }}
          />
        )}

        {gifsData && gifsData.artworks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-300 text-lg mb-4">No gifs found</p>
            <p className="text-neutral-400">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}