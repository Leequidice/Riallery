export interface Artist {
  _id: string;
  name: string;
  slug: string;
  bio?: string;
  profileImageUrl?: string;
  socialLinks?: SocialLink[];
  contactEmail?: string;
  status: 'active' | 'inactive' | 'featured';
  createdAt: string;
  updatedAt: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Artwork {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  artist: Artist;
  medium: Medium;
  style: Style;
  themes?: Theme[];
  event?: Event;
  yearCreated?: number;
  contentType?: 'artwork' | 'meme' | 'gif';
  status: 'pending' | 'approved' | 'rejected' | 'draft';
  submissionDate: string;
  publicationDate?: string;
  rejectionReason?: string;
  isFeatured: boolean;
  isWeeklyFeatured?: boolean; // New flag for weekly features
  weeklyFeatureDate?: string; // When it was featured
  moderatedBy?: User;
  createdAt: string;
  updatedAt: string;
}

export interface WeeklyFeature {
  _id: string;
  title: string;
  slug: string;
  artist: Artist;
  featuredArtworks: Artwork[];
  introduction: string;
  artistNoteQuote?: string;
  scheduledDate: string;
  publicationStatus: 'draft' | 'scheduled' | 'published' | 'archived';
  publishedAt?: string;
  archivedAt?: string;
  createdBy: User;
  updatedBy: User;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'superAdmin' | 'curator' | 'editor' | 'contributor';
  artist?: Artist;
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Medium {
  _id: string;
  name: string;
  slug: string;
}

export interface Style {
  _id: string;
  name: string;
  slug: string;
}

export interface Theme {
  _id: string;
  name: string;
  slug: string;
  isSuggested: boolean;
}

export interface Event {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
}

// Gallery Filter Types
export interface GalleryFilters {
  medium?: string[];
  style?: string[];
  themes?: string[];
  event?: string;
  artist?: string;
  yearCreated?: string[];
  contentType?: 'artwork' | 'meme' | 'gif';
  sortBy?: 'newest' | 'oldest' | 'title' | 'artist';
}

// API Response Types
export interface GalleryResponse {
  artworks: Artwork[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface SubmissionFormData {
  title: string;
  description: string;
  artistName: string;
  artistEmail: string;
  artistBio?: string;
  medium: string;
  style: string;
  themes: string[];
  yearCreated?: number;
  image: File;
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  subscribedAt: string;
  isActive: boolean;
}