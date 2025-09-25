'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Maximize2, User, Calendar } from 'lucide-react';
import type { Artwork } from '@/types';
import { formatDateShort } from '@/lib/utils';

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-neutral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl border border-neutral-700 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/gallery/${artwork.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-700">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            priority={false}
          />
          
          {/* Loading placeholder */}
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
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
          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
            {artwork.title}
          </h3>
          
          {/* Artist info */}
          <div className="flex items-center text-sm text-neutral-300 mb-3">
            <User className="h-4 w-4 mr-1.5" />
            <span>{artwork.artist.name}</span>
          </div>
          
          {/* Description */}
          <p className="text-sm text-neutral-400 line-clamp-2 mb-3 leading-relaxed">
            {artwork.description}
          </p>
          
          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center space-x-3">
              <span className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
                {artwork.medium.name}
              </span>
              <span className="bg-neutral-700 text-neutral-300 px-2 py-1 rounded-full">
                {artwork.style.name}
              </span>
            </div>
            
            {artwork.publicationDate && (
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDateShort(artwork.publicationDate)}</span>
              </div>
            )}
          </div>
          
          {/* Themes */}
          {artwork.themes && artwork.themes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {artwork.themes.slice(0, 3).map((theme) => (
                <span
                  key={theme._id}
                  className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded-full"
                >
                  {theme.name}
                </span>
              ))}
              {artwork.themes.length > 3 && (
                <span className="text-xs text-neutral-400 bg-neutral-700 px-2 py-1 rounded-full">
                  +{artwork.themes.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}