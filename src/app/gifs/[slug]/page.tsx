'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import MediaDisplay from '@/components/ui/MediaDisplay';
import { getMockGifBySlug } from '@/lib/mock-data';
import type { Artwork } from '@/types';

export default function GifPage() {
  const params = useParams();
  const [gif, setGif] = useState<Artwork | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        const foundGif = getMockGifBySlug(params.slug as string);
        setGif(foundGif);
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
            <p className="text-neutral-400 mb-8">The GIF you're looking for doesn't exist.</p>
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
          {/* Media */}
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
          </div>
        </div>
      </div>
    </div>
  );
}