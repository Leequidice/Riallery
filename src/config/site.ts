export const siteConfig = {
  name: 'riallery',
  title: 'riallery - rialo community gallery',
  description: 'a digital gallery celebrating the creative spirit of the rialo community. minimalist presentation. thoughtful curation. art-focused experience.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  keywords: [
    'rialo',
    'gallery',
    'digital art',
    'community',
    'artwork',
    'artists',
    'exhibition',
    'creative',
    'minimalist',
  ],
  authors: [
    {
      name: 'Rialo Community',
      url: 'https://rialo.io',
    },
  ],
  creator: 'Rialo Community',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Riallery - Rialo Community Gallery',
    description: 'A digital gallery and feature hub for the Rialo community, showcasing and preserving the artworks of its members.',
    siteName: 'Riallery',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riallery - Rialo Community Gallery',
    description: 'A digital gallery and feature hub for the Rialo community, showcasing and preserving the artworks of its members.',
    creator: '@rialo', // Update with actual Twitter handle
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export const navigationLinks = [
  {
    title: 'Weekly Features',
    href: '/features',
  },
  {
    title: 'Gallery',
    href: '/gallery',
  },
  {
    title: 'Memes',
    href: '/memes',
  },
  {
    title: 'GIFs',
    href: '/gifs',
  },
  {
    title: 'About',
    href: '/about',
  },
  {
    title: 'Contact',
    href: '/contact',
  },
];

export const socialLinks = {
  twitter: 'https://x.com/RialoHQ',
  instagram: 'https://instagram.com/rialo',
  discord: 'https://discord.gg/RialoProtocol', 
  website: 'https://rialo.io',
};

export const galleryConfig = {
  defaultPageSize: 12,
  maxPageSize: 24,
  sortOptions: [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'title', label: 'By Title' },
    { value: 'artist', label: 'By Artist' },
  ],
  imageQuality: 85,
  thumbnailSize: 400,
  lightboxSize: 1200,
};

export const submissionConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  maxDescriptionLength: 1000,
  maxBioLength: 500,
  requiredFields: ['title', 'description', 'artistName', 'artistEmail', 'medium', 'style'],
};

export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
};