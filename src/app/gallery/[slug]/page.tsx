import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getMockArtworkBySlug } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

interface ArtworkPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const artwork = getMockArtworkBySlug(params.slug);
  
  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    };
  }

  return {
    title: `${artwork.title} by ${artwork.artist.name}`,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} by ${artwork.artist.name}`,
      description: artwork.description,
      images: [artwork.imageUrl],
    },
  };
}

export default function ArtworkPage({ params }: ArtworkPageProps) {
  const artwork = getMockArtworkBySlug(params.slug);

  if (!artwork) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link href="/gallery" className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg bg-neutral-100">
              <Image
                src={artwork.imageUrl}
                alt={artwork.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            
            {artwork.isFeatured && (
              <div className="absolute top-4 left-4">
                <span className="bg-neutral-900 text-white text-sm px-3 py-1 rounded-full font-medium">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                {artwork.title}
              </h1>
              
              <div className="flex items-center text-neutral-700 mb-6">
                <User className="h-5 w-5 mr-2" />
                <Link 
                  href={`/artists/${artwork.artist.slug}`}
                  className="text-lg font-medium hover:text-neutral-900 transition-colors"
                >
                  {artwork.artist.name}
                </Link>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-lg prose-neutral max-w-none">
              <p className="text-neutral-700 leading-relaxed">
                {artwork.description}
              </p>
            </div>

            {/* Metadata */}
            <div className="space-y-6">
              {/* Medium and Style */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                  Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Medium</div>
                    <div className="font-medium text-neutral-900">{artwork.medium.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Style</div>
                    <div className="font-medium text-neutral-900">{artwork.style.name}</div>
                  </div>
                </div>
              </div>

              {/* Themes */}
              {artwork.themes && artwork.themes.length > 0 && (
                <div>
                  <div className="flex items-center text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3">
                    <Tag className="h-4 w-4 mr-1" />
                    Themes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {artwork.themes.map((theme) => (
                      <span
                        key={theme._id}
                        className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {theme.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {artwork.yearCreated && (
                  <div>
                    <div className="text-sm text-neutral-600 mb-1">Created</div>
                    <div className="font-medium text-neutral-900">{artwork.yearCreated}</div>
                  </div>
                )}
                {artwork.publicationDate && (
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-neutral-500" />
                    <div>
                      <div className="text-sm text-neutral-600 mb-1">Published</div>
                      <div className="font-medium text-neutral-900">
                        {formatDate(artwork.publicationDate)}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Event */}
              {artwork.event && (
                <div className="p-4 bg-neutral-50 rounded-lg">
                  <div className="text-sm font-semibold text-neutral-900 mb-2">
                    Part of: {artwork.event.name}
                  </div>
                  {artwork.event.description && (
                    <div className="text-sm text-neutral-600">
                      {artwork.event.description}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200">
              <Button className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share Artwork
              </Button>
              <Link href={`/gallery?artist=${artwork.artist.slug}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View More by Artist
                </Button>
              </Link>
            </div>

            {/* Artist Bio Preview */}
            {artwork.artist.bio && (
              <div className="pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                  About {artwork.artist.name}
                </h3>
                <p className="text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                  {artwork.artist.bio}
                </p>
                <Link
                  href={`/artists/${artwork.artist.slug}`}
                  className="inline-flex items-center text-neutral-900 hover:underline font-medium"
                >
                  View full profile →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}