'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Inline the component instead of importing
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, Grid } from 'lucide-react';
import ArtworkCard from '@/components/gallery/ArtworkCard';
import { Button } from '@/components/ui/Button';
import MediaDisplay from '@/components/ui/MediaDisplay';
import { 
  getCurrentWeeklyFeatures,
  getPreviousWeeklyFeatures
} from '@/lib/mock-data';
import type { Artwork } from '@/types';

type SectionType = 'arts' | 'memes' | 'gifs';

function FeaturesContent() {
  const [activeSection, setActiveSection] = useState<SectionType>('arts');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);

  // Get current weekly features using the cycling system
  const currentFeatures = getCurrentWeeklyFeatures();
  const previousFeatures = getPreviousWeeklyFeatures();

  // Filter current features by content type
  const weeklyArts = currentFeatures.filter(artwork => artwork.contentType === 'artwork');
  const weeklyMemes = currentFeatures.filter(artwork => artwork.contentType === 'meme');
  const weeklyGifs = currentFeatures.filter(artwork => artwork.contentType === 'gif');

  const getCurrentArtworks = () => {
    switch (activeSection) {
      case 'arts':
        return weeklyArts;
      case 'memes':
        return weeklyMemes;
      case 'gifs':
        return weeklyGifs;
      default:
        return weeklyArts;
    }
  };

  const currentArtworks = getCurrentArtworks();

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'arts':
        return 'Featured Artworks';
      case 'memes':
        return 'Featured Memes';
      case 'gifs':
        return 'Featured GIFs';
      default:
        return 'Featured Artworks';
    }
  };

  const getSectionCount = () => {
    switch (activeSection) {
      case 'arts':
        return weeklyArts.length;
      case 'memes':
        return weeklyMemes.length;
      case 'gifs':
        return weeklyGifs.length;
      default:
        return 0;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-primary-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">
                w e e k l y  f e a t u r e s
              </h1>
            </div>
            <p className="text-neutral-300 text-lg mb-6 max-w-2xl mx-auto">
              current week&apos;s handpicked selections from the rialo community
            </p>
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 mb-6 max-w-3xl mx-auto">
              <p className="text-sm text-neutral-400">
                <span className="text-primary-400 font-medium">Cycling System:</span> When new artworks are featured, 
                current features automatically move to the <a href="/gallery" className="text-primary-400 underline hover:no-underline">main gallery</a> as "Recent Artworks."
                <br />
                <span className="text-primary-400 font-medium">Previous Features:</span> {previousFeatures.length} artworks have been rotated to Recent Artworks.
              </p>
            </div>
            <div className="flex items-center justify-center text-neutral-400 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Current rotation: October 7, 2025</span>
            </div>
          </motion.div>
        </div>

        {/* Section Navigation */}
        <div className="mb-8">
          <div className="flex justify-center">
            <div className="bg-neutral-800 rounded-lg p-1 flex gap-1">
              <button
                onClick={() => setActiveSection('arts')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeSection === 'arts'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                Arts ({weeklyArts.length})
              </button>
              <button
                onClick={() => setActiveSection('memes')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeSection === 'memes'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                Memes ({weeklyMemes.length})
              </button>
              <button
                onClick={() => setActiveSection('gifs')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeSection === 'gifs'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-700'
                }`}
              >
                GIFs ({weeklyGifs.length})
              </button>
            </div>
          </div>
        </div>

        {/* Section Header */}
        <motion.div
          key={`header-${activeSection}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-light text-white mb-2">
                {getSectionTitle()}
              </h2>
              <p className="text-neutral-400">
                {getSectionCount()} featured pieces this week
              </p>
            </div>
            <div className="flex items-center text-neutral-400">
              <Grid className="h-5 w-5 mr-2" />
              <span className="text-sm">Gallery View</span>
            </div>
          </div>
        </motion.div>

        {/* Gallery Grid */}
        {currentArtworks.length > 0 ? (
          <motion.div
            key={`gallery-${activeSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentArtworks.map((artwork, index) => (
              <motion.div
                key={`${activeSection}-${artwork._id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ArtworkCard
                  artwork={artwork}
                  onViewLarge={setSelectedArtwork}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={`empty-${activeSection}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="text-neutral-500 mb-4">
              <Grid className="h-16 w-16 mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-xl font-medium text-neutral-300 mb-2">
              No {activeSection} featured this week
            </h3>
            <p className="text-neutral-400 mb-6">
              Check back next week for new featured {activeSection}!
            </p>
            <Button 
              variant="outline" 
              onClick={() => setActiveSection('arts')}
              className="text-neutral-300 border-neutral-600 hover:text-white hover:border-neutral-400"
            >
              View Featured Arts Instead
            </Button>
          </motion.div>
        )}

        {/* Featured Badge */}
        {currentArtworks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-neutral-800 rounded-full px-6 py-3">
                <Star className="h-4 w-4 text-primary-400 mr-2" />
                <span className="text-neutral-300 text-sm">
                  Featuring {getSectionCount()} handpicked {activeSection} from the community
                </span>
              </div>
            </div>
            
            {/* Cycling System Info */}
            <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 max-w-4xl mx-auto">
              <h3 className="text-lg font-medium text-white mb-4">How the Cycling System Works</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="text-primary-400 font-medium mb-2">Current Features ({currentFeatures.length})</h4>
                  <p className="text-neutral-300 mb-2">
                    These are the artworks currently in the weekly spotlight, displayed on this page and the homepage.
                  </p>
                  <p className="text-neutral-400 text-xs">
                    Featured since: October 7, 2025
                  </p>
                </div>
                <div>
                  <h4 className="text-primary-400 font-medium mb-2">Previous Features ({previousFeatures.length})</h4>
                  <p className="text-neutral-300 mb-2">
                    Former weekly features that have rotated to the <a href="/gallery" className="text-primary-400 underline hover:no-underline">main gallery</a> as "Recent Artworks."
                  </p>
                  <p className="text-neutral-400 text-xs">
                    Available in Recent Artworks section
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      {selectedArtwork && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="max-w-4xl max-h-full">
            <div onClick={(e) => e.stopPropagation()}>
              <MediaDisplay
                src={selectedArtwork.imageUrl}
                alt={selectedArtwork.title}
                fill={false}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neutral-900">
        <div className="container py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary-400" />
              <p className="text-neutral-300">Loading weekly features...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <FeaturesContent />
    </Suspense>
  );
}