'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { GalleryFilters, Medium, Style, Theme, Event, Artist } from '@/types';
import { galleryConfig } from '@/config/site';

interface FiltersProps {
  filters: GalleryFilters;
  onFiltersChange: (filters: GalleryFilters) => void;
  mediums: Medium[];
  styles: Style[];
  themes: Theme[];
  events: Event[];
  artists: Artist[];
  isLoading?: boolean;
}

export default function Filters({
  filters,
  onFiltersChange,
  mediums,
  styles,
  themes,
  events,
  artists,
  isLoading = false
}: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    medium: false,
    style: false,
    themes: false,
    artist: false,
    event: false,
    year: false,
  });

  const currentYear = new Date().getFullYear();
  const availableYears = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (key: keyof GalleryFilters, value: string | string[] | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleArrayFilterToggle = (key: 'medium' | 'style' | 'themes', value: string) => {
    const currentValues = (filters[key] as string[]) || [];
    
    let newValues;
    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }
    
    handleFilterChange(key, newValues.length > 0 ? newValues : undefined);
  };

  const handleYearFilterToggle = (year: number) => {
    const currentValues = filters.yearCreated || [];
    const stringValue = String(year);
    
    let newValues;
    if (currentValues.includes(stringValue)) {
      newValues = currentValues.filter(v => v !== stringValue);
    } else {
      newValues = [...currentValues, stringValue];
    }
    
    handleFilterChange('yearCreated', newValues.length > 0 ? newValues : undefined);
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(key => {
    const value = filters[key as keyof GalleryFilters];
    return value !== undefined && value !== null && 
           (Array.isArray(value) ? value.length > 0 : true);
  });

  const getActiveFilterCount = () => {
    let count = 0;
    (Object.keys(filters) as Array<keyof GalleryFilters>).forEach(key => {
      const value = filters[key];
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          count += value.length;
        } else {
          count += 1;
        }
      }
    });
    return count;
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-lg">
      {/* Filter Header */}
      <div className="p-4 border-b border-neutral-200">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 text-neutral-900 hover:text-neutral-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="font-medium">Filters</span>
            {hasActiveFilters && (
              <span className="bg-neutral-900 text-white text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-neutral-600 hover:text-neutral-900"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-6">
              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy || 'newest'}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value as GalleryFilters['sortBy'])}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                  disabled={isLoading}
                >
                  {galleryConfig.sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Medium */}
              <div>
                <button
                  onClick={() => toggleSection('medium')}
                  className="flex items-center justify-between w-full text-sm font-medium text-neutral-900 mb-2"
                >
                  <span>Medium</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.medium ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSections.medium && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {mediums.map(medium => (
                        <label key={medium._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.medium?.includes(medium.slug) || false}
                            onChange={() => handleArrayFilterToggle('medium', medium.slug)}
                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                            disabled={isLoading}
                          />
                          <span className="text-sm text-neutral-700">{medium.name}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Style */}
              <div>
                <button
                  onClick={() => toggleSection('style')}
                  className="flex items-center justify-between w-full text-sm font-medium text-neutral-900 mb-2"
                >
                  <span>Style</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.style ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSections.style && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {styles.map(style => (
                        <label key={style._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.style?.includes(style.slug) || false}
                            onChange={() => handleArrayFilterToggle('style', style.slug)}
                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                            disabled={isLoading}
                          />
                          <span className="text-sm text-neutral-700">{style.name}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Themes */}
              <div>
                <button
                  onClick={() => toggleSection('themes')}
                  className="flex items-center justify-between w-full text-sm font-medium text-neutral-900 mb-2"
                >
                  <span>Themes</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.themes ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSections.themes && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {themes.map(theme => (
                        <label key={theme._id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.themes?.includes(theme.slug) || false}
                            onChange={() => handleArrayFilterToggle('themes', theme.slug)}
                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                            disabled={isLoading}
                          />
                          <span className="text-sm text-neutral-700">{theme.name}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Artist */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Artist
                </label>
                <select
                  value={filters.artist || ''}
                  onChange={(e) => handleFilterChange('artist', e.target.value || undefined)}
                  className="w-full p-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                  disabled={isLoading}
                >
                  <option value="">All artists</option>
                  {artists.map(artist => (
                    <option key={artist._id} value={artist.slug}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Event */}
              {events.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">
                    Event
                  </label>
                  <select
                    value={filters.event || ''}
                    onChange={(e) => handleFilterChange('event', e.target.value || undefined)}
                    className="w-full p-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:border-transparent"
                    disabled={isLoading}
                  >
                    <option value="">All events</option>
                    {events.map(event => (
                      <option key={event._id} value={event.slug}>
                        {event.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Year */}
              <div>
                <button
                  onClick={() => toggleSection('year')}
                  className="flex items-center justify-between w-full text-sm font-medium text-neutral-900 mb-2"
                >
                  <span>Year Created</span>
                  <ChevronDown 
                    className={`h-4 w-4 transition-transform ${
                      expandedSections.year ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                <AnimatePresence>
                  {expandedSections.year && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2"
                    >
                      {availableYears.map(year => (
                        <label key={year} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.yearCreated?.includes(String(year)) || false}
                            onChange={() => handleYearFilterToggle(year)}
                            className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400"
                            disabled={isLoading}
                          />
                          <span className="text-sm text-neutral-700">{year}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}