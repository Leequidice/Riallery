import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import MediaDisplay from '@/components/ui/MediaDisplay';
import { getMockArtworkBySlug } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import type { Metadata } from 'next';

interface ArtworkPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArtworkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getMockArtworkBySlug(slug);
  
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

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getMockArtworkBySlug(slug);

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
          {/* Media */}
          <div className="relative">
            <div className="relative rounded-lg shadow-lg bg-neutral-100 overflow-hidden" style={{ height: 'min(80vh, 800px)' }}>
              <MediaDisplay
                src={artwork.imageUrl}
                alt={artwork.title}
                fill={true}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
                priority
                controls={true}
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

            {/* Metadata */}
            <div className="space-y-6">
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


          </div>
        </div>
      </div>
    </div>
  );
}