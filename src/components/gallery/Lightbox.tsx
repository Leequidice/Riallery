'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  User, 
  Calendar,
  Tag,
  Share2,
  ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Artwork } from '@/types';
import { formatDateShort, generateSocialShareUrls, createShareUrl } from '@/lib/utils';

interface LightboxProps {
  artwork: Artwork;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export default function Lightbox({ 
  artwork, 
  onClose, 
  onPrevious, 
  onNext, 
  hasPrevious = false, 
  hasNext = false 
}: LightboxProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrevious, onNext, hasPrevious, hasNext]);

  const shareUrl = createShareUrl(artwork.slug, 'artwork');
  const shareUrls = generateSocialShareUrls(shareUrl, `${artwork.title} by ${artwork.artist.name}`);

  const handleShare = (platform: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setShowShareMenu(false);
      // You could add a toast notification here
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
      setShowShareMenu(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation buttons */}
      {hasPrevious && onPrevious && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Previous artwork"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Next artwork"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Content container */}
      <div
        className="flex items-center justify-center min-h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Image */}
          <div className="lg:col-span-2 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="relative aspect-[4/5] max-h-[80vh]">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className={`object-contain transition-opacity duration-300 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                  priority
                />
                
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-lg p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="space-y-4 mb-6">
              <h1 className="text-2xl font-bold text-neutral-900">
                {artwork.title}
              </h1>
              
              {/* Artist */}
              <div className="flex items-center text-neutral-700">
                <User className="h-5 w-5 mr-2" />
                <Link 
                  href={`/artists/${artwork.artist.slug}`}
                  className="font-medium hover:text-neutral-900 transition-colors"
                >
                  {artwork.artist.name}
                </Link>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm prose-neutral max-w-none mb-6">
              <p className="text-neutral-600 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="space-y-4 mb-6">
              {/* Medium and Style */}
              <div className="flex flex-wrap gap-2">
                <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {artwork.medium.name}
                </span>
                <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm font-medium">
                  {artwork.style.name}
                </span>
              </div>

              {/* Themes */}
              {artwork.themes && artwork.themes.length > 0 && (
                <div>
                  <div className="flex items-center text-sm text-neutral-600 mb-2">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>Themes</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {artwork.themes.map((theme) => (
                      <span
                        key={theme._id}
                        className="bg-neutral-50 text-neutral-600 px-2 py-1 rounded-full text-xs"
                      >
                        {theme.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Year and Date */}
              <div className="flex items-center justify-between text-sm text-neutral-600">
                {artwork.yearCreated && (
                  <span>Created: {artwork.yearCreated}</span>
                )}
                {artwork.publicationDate && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Published: {formatDateShort(artwork.publicationDate)}</span>
                  </div>
                )}
              </div>

              {/* Event */}
              {artwork.event && (
                <div className="p-3 bg-neutral-50 rounded-lg">
                  <div className="text-sm font-medium text-neutral-900 mb-1">
                    Part of: {artwork.event.name}
                  </div>
                  {artwork.event.description && (
                    <div className="text-xs text-neutral-600">
                      {artwork.event.description}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {/* View Full Page */}
              <Link href={`/gallery/${artwork.slug}`} onClick={onClose}>
                <Button variant="outline" className="w-full justify-center">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Page
                </Button>
              </Link>

              {/* Share */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="w-full justify-center"
                  onClick={() => setShowShareMenu(!showShareMenu)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>

                {showShareMenu && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-neutral-200 rounded-lg shadow-lg p-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 rounded"
                    >
                      Share on Twitter
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 rounded"
                    >
                      Share on Facebook
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-neutral-50 rounded"
                    >
                      Copy Link
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Artist Bio Preview */}
            {artwork.artist.bio && (
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="font-medium text-neutral-900 mb-2">
                  About {artwork.artist.name}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {artwork.artist.bio}
                </p>
                <Link
                  href={`/artists/${artwork.artist.slug}`}
                  className="text-sm text-neutral-900 hover:underline mt-1 inline-block"
                  onClick={onClose}
                >
                  View full profile →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}