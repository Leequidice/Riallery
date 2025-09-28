'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Maximize2, User, Calendar } from 'lucide-react';
import type { Artwork } from '@/types';
import { formatDateShort } from '@/lib/utils';
import MediaDisplay from '@/components/ui/MediaDisplay';

interface ArtworkCardProps {
  artwork: Artwork;
  onViewLarge?: (artwork: Artwork) => void;
}

export default function ArtworkCard({ artwork, onViewLarge }: ArtworkCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleViewLarge = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onViewLarge?.(artwork);
  };

  // Generate the correct URL based on content type
  const getArtworkUrl = () => {
    switch (artwork.contentType) {
      case 'meme':
        return `/memes/${artwork.slug}`;
      case 'gif':
        return `/gifs/${artwork.slug}`;
      default:
        return `/gallery/${artwork.slug}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-neutral-700 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={getArtworkUrl()} className="block">
        {/* Media Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-700">
          <MediaDisplay
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105`}
            onLoad={() => setIsImageLoaded(true)}
            priority={false}
          />
          
          {/* Loading placeholder */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-neutral-700 animate-pulse" />
          )}
          
          {/* Overlay with actions */}
          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute top-3 right-3">
              <button
                onClick={handleViewLarge}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-neutral-700 hover:bg-white hover:text-neutral-900 transition-all duration-200"
                aria-label="View large image"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Featured badge */}
          {artwork.isFeatured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary-400 text-neutral-900 text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Artist info */}
          <div className="flex items-center text-sm text-neutral-300 mb-3">
            <User className="h-4 w-4 mr-1.5" />
            <span>{artwork.artist.name}</span>
          </div>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center">
              <span>Created {artwork.yearCreated}</span>
            </div>
            
            {artwork.publicationDate && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDateShort(artwork.publicationDate)}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}