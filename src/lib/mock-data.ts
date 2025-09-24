import type { Artist, Artwork, WeeklyFeature, Medium, Style, Theme, Event } from '@/types';

// Mock Mediums
export const mockMediums: Medium[] = [
  { _id: '1', name: 'Digital Art', slug: 'digital-art' },
  { _id: '2', name: 'Painting', slug: 'painting' },
  { _id: '3', name: 'Photography', slug: 'photography' },
  { _id: '4', name: 'Mixed Media', slug: 'mixed-media' },
  { _id: '5', name: 'Drawing', slug: 'drawing' },
  { _id: '6', name: 'Sculpture', slug: 'sculpture' },
];

// Mock Styles
export const mockStyles: Style[] = [
  { _id: '1', name: 'Abstract', slug: 'abstract' },
  { _id: '2', name: 'Realism', slug: 'realism' },
  { _id: '3', name: 'Minimalist', slug: 'minimalist' },
  { _id: '4', name: 'Surreal', slug: 'surreal' },
  { _id: '5', name: 'Expressionist', slug: 'expressionist' },
  { _id: '6', name: 'Contemporary', slug: 'contemporary' },
];

// Mock Themes
export const mockThemes: Theme[] = [
  { _id: '1', name: 'Nature', slug: 'nature', isSuggested: false },
  { _id: '2', name: 'Identity', slug: 'identity', isSuggested: false },
  { _id: '3', name: 'Technology', slug: 'technology', isSuggested: false },
  { _id: '4', name: 'Community', slug: 'community', isSuggested: false },
  { _id: '5', name: 'Emotion', slug: 'emotion', isSuggested: false },
  { _id: '6', name: 'Urban Life', slug: 'urban-life', isSuggested: false },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    _id: '1',
    name: 'Rialo Art Week 2024',
    slug: 'rialo-art-week-2024',
    description: 'A week-long celebration of community creativity',
    startDate: '2024-03-01',
    endDate: '2024-03-07',
    isActive: true,
  },
  {
    _id: '2',
    name: 'Digital Dreams Challenge',
    slug: 'digital-dreams-challenge',
    description: 'Exploring the intersection of technology and imagination',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    isActive: false,
  },
];

// Mock Artists
export const mockArtists: Artist[] = [
  {
    _id: '1',
    name: 'Maya Chen',
    slug: 'maya-chen',
    bio: 'Digital artist exploring the intersection of technology and human emotion. Based in San Francisco, Maya creates immersive digital experiences that blur the line between reality and imagination.',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/mayachen' },
      { platform: 'Website', url: 'https://mayachen.art' },
    ],
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
  },
  {
    _id: '2',
    name: 'Alex Rivera',
    slug: 'alex-rivera',
    bio: 'Contemporary painter known for vibrant abstract compositions that capture the energy of urban life. Alex\'s work has been featured in galleries across New York and Los Angeles.',
    profileImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/alexrivera' },
      { platform: 'Twitter', url: 'https://twitter.com/alexrivera' },
    ],
    status: 'featured',
    createdAt: '2024-01-20',
    updatedAt: '2024-03-15',
  },
  {
    _id: '3',
    name: 'Zoe Kim',
    slug: 'zoe-kim',
    bio: 'Photographer and visual storyteller capturing intimate moments and human connections. Zoe\'s minimalist approach reveals the beauty in everyday interactions.',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    socialLinks: [
      { platform: 'Website', url: 'https://zoekim.photo' },
    ],
    status: 'active',
    createdAt: '2024-02-01',
    updatedAt: '2024-03-05',
  },
];

// Mock Artworks
export const mockArtworks: Artwork[] = [
  {
    _id: '1',
    title: 'Digital Harmony',
    slug: 'digital-harmony',
    description: 'An exploration of the balance between technology and nature, rendered in flowing digital brushstrokes that seem to breathe with life.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop',
    artist: mockArtists[0],
    medium: mockMediums[0],
    style: mockStyles[0],
    themes: [mockThemes[2], mockThemes[4]],
    event: mockEvents[0],
    yearCreated: 2024,
    status: 'approved',
    submissionDate: '2024-03-01',
    publicationDate: '2024-03-02',
    isFeatured: true,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-02',
  },
  {
    _id: '2',
    title: 'Urban Pulse',
    slug: 'urban-pulse',
    description: 'Vibrant abstract painting capturing the energy and rhythm of city life. Bold colors and dynamic forms create a sense of constant movement.',
    imageUrl: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&h=1200&fit=crop',
    artist: mockArtists[1],
    medium: mockMediums[1],
    style: mockStyles[0],
    themes: [mockThemes[5], mockThemes[4]],
    yearCreated: 2024,
    status: 'approved',
    submissionDate: '2024-03-05',
    publicationDate: '2024-03-06',
    isFeatured: false,
    createdAt: '2024-03-05',
    updatedAt: '2024-03-06',
  },
  {
    _id: '3',
    title: 'Quiet Moments',
    slug: 'quiet-moments',
    description: 'A series of intimate photographs capturing the subtle beauty of human connections in everyday settings.',
    imageUrl: 'https://images.unsplash.com/photo-1544967882-f9f165c20d36?w=800&h=1200&fit=crop',
    artist: mockArtists[2],
    medium: mockMediums[2],
    style: mockStyles[2],
    themes: [mockThemes[1], mockThemes[3]],
    yearCreated: 2024,
    status: 'approved',
    submissionDate: '2024-03-10',
    publicationDate: '2024-03-11',
    isFeatured: false,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-11',
  },
  {
    _id: '4',
    title: 'Metamorphosis',
    slug: 'metamorphosis',
    description: 'Digital artwork exploring themes of transformation and identity through fluid, organic forms.',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=1200&fit=crop',
    artist: mockArtists[0],
    medium: mockMediums[0],
    style: mockStyles[3],
    themes: [mockThemes[1], mockThemes[4]],
    yearCreated: 2024,
    status: 'approved',
    submissionDate: '2024-03-15',
    publicationDate: '2024-03-16',
    isFeatured: false,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-16',
  },
  {
    _id: '5',
    title: 'Geometric Dreams',
    slug: 'geometric-dreams',
    description: 'A minimalist composition using geometric forms to create a sense of balance and tranquility.',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=1200&fit=crop',
    artist: mockArtists[1],
    medium: mockMediums[1],
    style: mockStyles[2],
    themes: [mockThemes[0]],
    yearCreated: 2024,
    status: 'approved',
    submissionDate: '2024-03-20',
    publicationDate: '2024-03-21',
    isFeatured: false,
    createdAt: '2024-03-20',
    updatedAt: '2024-03-21',
  },
  {
    _id: '6',
    title: 'Connected',
    slug: 'connected',
    description: 'A photographic study of human interaction in the digital age, exploring how technology brings us together.',
    imageUrl: 'https://images.unsplash.com/photo-1551847812-c7d5ae1f6fd1?w=800&h=1200&fit=crop',
    artist: mockArtists[2],
    medium: mockMediums[2],
    style: mockStyles[5],
    themes: [mockThemes[2], mockThemes[3]],
    yearCreated: 2024,
    status: 'approved',
    submissionDate: '2024-03-25',
    publicationDate: '2024-03-26',
    isFeatured: false,
    createdAt: '2024-03-25',
    updatedAt: '2024-03-26',
  },
];

// Mock Weekly Features
export const mockWeeklyFeatures: WeeklyFeature[] = [
  {
    _id: '1',
    title: 'Artist Spotlight: Maya Chen',
    slug: 'maya-chen-spotlight',
    artist: mockArtists[0],
    featuredArtworks: [mockArtworks[0], mockArtworks[3]],
    introduction: 'This week, we\'re thrilled to spotlight Maya Chen, a visionary digital artist whose work seamlessly blends technology with human emotion. Maya\'s pieces invite viewers into immersive digital landscapes that challenge our perception of reality.',
    artistNoteQuote: 'I believe art should be a bridge between the digital and physical worlds. My work explores how technology can enhance rather than replace human connection.',
    scheduledDate: '2024-03-18',
    publicationStatus: 'published',
    publishedAt: '2024-03-18',
    createdBy: {
      _id: 'admin1',
      username: 'curator',
      email: 'curator@riallery.com',
      role: 'curator',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-03-01',
    },
    updatedBy: {
      _id: 'admin1',
      username: 'curator',
      email: 'curator@riallery.com',
      role: 'curator',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-03-01',
    },
    createdAt: '2024-03-15',
    updatedAt: '2024-03-18',
  },
  {
    _id: '2',
    title: 'Artist Spotlight: Alex Rivera',
    slug: 'alex-rivera-spotlight',
    artist: mockArtists[1],
    featuredArtworks: [mockArtworks[1], mockArtworks[4]],
    introduction: 'Alex Rivera brings the pulse of urban life to canvas with bold, abstract compositions that capture the energy of modern cities. Their work reflects the constant motion and vibrant spirit of contemporary urban experience.',
    artistNoteQuote: 'Cities are living, breathing entities with their own rhythm and energy. I try to capture that pulse and translate it into something visual and emotional.',
    scheduledDate: '2024-03-11',
    publicationStatus: 'archived',
    publishedAt: '2024-03-11',
    archivedAt: '2024-03-18',
    createdBy: {
      _id: 'admin1',
      username: 'curator',
      email: 'curator@riallery.com',
      role: 'curator',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-03-01',
    },
    updatedBy: {
      _id: 'admin1',
      username: 'curator',
      email: 'curator@riallery.com',
      role: 'curator',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-03-01',
    },
    createdAt: '2024-03-08',
    updatedAt: '2024-03-18',
  },
];

// Mock API functions for development
export function getMockArtworks(page: number = 1, limit: number = 12) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedArtworks = mockArtworks.slice(startIndex, endIndex);
  
  return {
    artworks: paginatedArtworks,
    total: mockArtworks.length,
    page,
    limit,
    hasMore: endIndex < mockArtworks.length,
  };
}

export function getMockArtworkBySlug(slug: string) {
  return mockArtworks.find(artwork => artwork.slug === slug) || null;
}

export function getMockFeatures() {
  return mockWeeklyFeatures;
}

export function getMockFeatureBySlug(slug: string) {
  return mockWeeklyFeatures.find(feature => feature.slug === slug) || null;
}

export function getMockCurrentFeature() {
  return mockWeeklyFeatures.find(feature => feature.publicationStatus === 'published') || null;
}