import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { 
  Artist, 
  Artwork, 
  WeeklyFeature, 
  Medium, 
  Style, 
  Theme, 
  Event,
  GalleryFilters,
  GalleryResponse 
} from '@/types';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-09-24',
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

// API Functions

// Artworks
export async function getApprovedArtworks(
  page: number = 1,
  limit: number = 12,
  filters?: GalleryFilters
): Promise<GalleryResponse> {
  let query = `*[_type == "artwork" && status == "approved"]`;
  
  // Add filters
  const filterConditions: string[] = [];
  
  if (filters?.medium && filters.medium.length > 0) {
    filterConditions.push(`medium->slug in $mediumSlugs`);
  }
  
  if (filters?.style && filters.style.length > 0) {
    filterConditions.push(`style->slug in $styleSlugs`);
  }
  
  if (filters?.themes && filters.themes.length > 0) {
    filterConditions.push(`count((themes[]->slug)[@ in $themeSlugs]) > 0`);
  }
  
  if (filters?.artist) {
    filterConditions.push(`artist->slug == $artistSlug`);
  }
  
  if (filters?.event) {
    filterConditions.push(`event->slug == $eventSlug`);
  }
  
  if (filters?.yearCreated && filters.yearCreated.length > 0) {
    filterConditions.push(`yearCreated in $yearCreated`);
  }
  
  if (filterConditions.length > 0) {
    query += ` && (${filterConditions.join(' && ')})`;
  }
  
  // Add sorting
  const sortBy = filters?.sortBy || 'newest';
  switch (sortBy) {
    case 'oldest':
      query += ` | order(publicationDate asc)`;
      break;
    case 'title':
      query += ` | order(title asc)`;
      break;
    case 'artist':
      query += ` | order(artist->name asc)`;
      break;
    default: // newest
      query += ` | order(publicationDate desc)`;
      break;
  }
  
  const offset = (page - 1) * limit;
  const countQuery = query.split('|')[0]; // Remove sorting for count
  
  const [artworks, total] = await Promise.all([
    client.fetch(
      `${query} [${offset}...${offset + limit}] {
        _id,
        title,
        slug,
        description,
        imageUrl,
        yearCreated,
        publicationDate,
        isFeatured,
        artist->{
          _id,
          name,
          slug,
          bio
        },
        medium->{
          _id,
          name,
          slug
        },
        style->{
          _id,
          name,
          slug
        },
        themes[]->{
          _id,
          name,
          slug
        },
        event->{
          _id,
          name,
          slug
        }
      }`,
      {
        mediumSlugs: filters?.medium || [],
        styleSlugs: filters?.style || [],
        themeSlugs: filters?.themes || [],
        artistSlug: filters?.artist,
        eventSlug: filters?.event,
        yearCreated: filters?.yearCreated || [],
      }
    ),
    client.fetch(`count(${countQuery})`, {
      mediumSlugs: filters?.medium || [],
      styleSlugs: filters?.style || [],
      themeSlugs: filters?.themes || [],
      artistSlug: filters?.artist,
      eventSlug: filters?.event,
      yearCreated: filters?.yearCreated || [],
    }),
  ]);
  
  return {
    artworks,
    total,
    page,
    limit,
    hasMore: offset + limit < total,
  };
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  return client.fetch(
    `*[_type == "artwork" && slug.current == $slug && status == "approved"][0] {
      _id,
      title,
      slug,
      description,
      imageUrl,
      yearCreated,
      publicationDate,
      isFeatured,
      artist->{
        _id,
        name,
        slug,
        bio,
        profileImageUrl,
        socialLinks
      },
      medium->{
        _id,
        name,
        slug
      },
      style->{
        _id,
        name,
        slug
      },
      themes[]->{
        _id,
        name,
        slug
      },
      event->{
        _id,
        name,
        slug,
        description
      }
    }`,
    { slug }
  );
}

// Weekly Features
export async function getPublishedFeatures(): Promise<WeeklyFeature[]> {
  return client.fetch(
    `*[_type == "weeklyFeature" && publicationStatus == "published"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      introduction,
      artistNoteQuote,
      publishedAt,
      artist->{
        _id,
        name,
        slug,
        bio,
        profileImageUrl
      },
      featuredArtworks[]->{
        _id,
        title,
        slug,
        imageUrl,
        description
      }
    }`
  );
}

export async function getFeatureBySlug(slug: string): Promise<WeeklyFeature | null> {
  return client.fetch(
    `*[_type == "weeklyFeature" && slug.current == $slug && publicationStatus == "published"][0] {
      _id,
      title,
      slug,
      introduction,
      artistNoteQuote,
      publishedAt,
      artist->{
        _id,
        name,
        slug,
        bio,
        profileImageUrl,
        socialLinks
      },
      featuredArtworks[]->{
        _id,
        title,
        slug,
        imageUrl,
        description,
        yearCreated,
        medium->{
          name
        },
        style->{
          name
        }
      }
    }`,
    { slug }
  );
}

export async function getCurrentFeature(): Promise<WeeklyFeature | null> {
  return client.fetch(
    `*[_type == "weeklyFeature" && publicationStatus == "published"] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      introduction,
      artistNoteQuote,
      publishedAt,
      artist->{
        _id,
        name,
        slug,
        bio,
        profileImageUrl
      },
      featuredArtworks[]->{
        _id,
        title,
        slug,
        imageUrl,
        description
      }
    }`
  );
}

// Artists
export async function getArtists(): Promise<Artist[]> {
  return client.fetch(
    `*[_type == "artist" && status == "active"] | order(name asc) {
      _id,
      name,
      slug,
      bio,
      profileImageUrl,
      socialLinks,
      "artworkCount": count(*[_type == "artwork" && artist._ref == ^._id && status == "approved"])
    }`
  );
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  return client.fetch(
    `*[_type == "artist" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      bio,
      profileImageUrl,
      socialLinks,
      contactEmail,
      status
    }`,
    { slug }
  );
}

// Taxonomies
export async function getMediums(): Promise<Medium[]> {
  return client.fetch(
    `*[_type == "medium"] | order(name asc) {
      _id,
      name,
      slug
    }`
  );
}

export async function getStyles(): Promise<Style[]> {
  return client.fetch(
    `*[_type == "style"] | order(name asc) {
      _id,
      name,
      slug
    }`
  );
}

export async function getThemes(): Promise<Theme[]> {
  return client.fetch(
    `*[_type == "theme" && !isSuggested] | order(name asc) {
      _id,
      name,
      slug,
      isSuggested
    }`
  );
}

export async function getEvents(): Promise<Event[]> {
  return client.fetch(
    `*[_type == "event" && isActive == true] | order(startDate desc) {
      _id,
      name,
      slug,
      description,
      startDate,
      endDate,
      isActive
    }`
  );
}

// Submission
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export async function submitArtwork(_data: any) {
  // This would be implemented with proper file upload handling
  // For now, return a mock response
  return {
    success: true,
    message: 'Artwork submitted successfully and is pending review.',
  };
}

// Newsletter
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function subscribeToNewsletter(_email: string) {
  // This would integrate with your email service
  return {
    success: true,
    message: 'Successfully subscribed to newsletter.',
  };
}