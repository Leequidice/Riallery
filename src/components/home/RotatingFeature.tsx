'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MediaDisplay from '@/components/ui/MediaDisplay';
import type { Artwork } from '@/types';

interface RotatingFeatureProps {
  allFeatures: Artwork[];
}

export default function RotatingFeature({ allFeatures }: RotatingFeatureProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (allFeatures.length <= 1) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);
      
      // After fade out completes, change the feature and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allFeatures.length);
        setIsVisible(true);
      }, 300); // 300ms fade out duration
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [allFeatures.length]);

  if (!allFeatures.length) return null;

  const currentFeature = allFeatures[currentIndex];

  // Generate the correct URL based on content type
  const getFeatureUrl = () => {
    switch (currentFeature.contentType) {
      case 'meme':
        return `/memes/${currentFeature.slug}`;
      case 'gif':
        return `/gifs/${currentFeature.slug}`;
      default:
        return `/gallery/${currentFeature.slug}`;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Featured Artwork */}
      <div className="relative">
        <div 
          className={`aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg transition-opacity duration-300 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <MediaDisplay
            src={currentFeature.imageUrl}
            alt={currentFeature.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain"
            priority
          />
        </div>
        
        {/* Content type badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-primary-400 text-neutral-900 text-xs px-3 py-1 rounded-full font-medium capitalize">
            {currentFeature.contentType === 'gif' ? 'GIF' : currentFeature.contentType}
          </span>
        </div>
      </div>

      {/* Feature Content */}
      <div 
        className={`space-y-6 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>
          <h3 className="text-2xl font-bold mb-2" style={{color: '#e8e3d5'}}>
            {currentFeature.title}
          </h3>
          <p className="text-lg mb-4" style={{color: '#e8e3d5'}}>
            {currentFeature.description}
          </p>
          <p className="text-sm opacity-75" style={{color: '#e8e3d5'}}>
            Created {currentFeature.yearCreated}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Link href={getFeatureUrl()}>
            <Button>
              View {currentFeature.contentType === 'gif' ? 'GIF' : currentFeature.contentType}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/artists/${currentFeature.artist.slug}`}>
            <Button variant="ghost">
              <Eye className="mr-2 h-4 w-4" />
              View Artist
            </Button>
          </Link>
        </div>

        {/* Dots indicator */}
        {allFeatures.length > 1 && (
          <div className="flex space-x-2 pt-4">
            {allFeatures.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setIsVisible(true);
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex 
                    ? 'bg-primary-400' 
                    : 'bg-neutral-600 hover:bg-neutral-500'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}