import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getMockCurrentFeature, getMockArtworks } from '@/lib/mock-data';

export default function Home() {
  const currentFeature = getMockCurrentFeature();
  const recentArtworks = getMockArtworks(1, 8).artworks;

  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      <section className="bg-primary-400 text-neutral-900">
        <div className="container py-3">
          <div className="text-center">
            <span className="text-sm font-medium" style={{color: '#e8e3d5'}}>
              Riallery Community Gallery - Celebrating Creative Expression
            </span>
            <Link href="/about" className="ml-4 text-sm underline hover:no-underline" style={{color: '#e8e3d5'}}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="bg-neutral-900 text-white min-h-screen flex items-center relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-primary-400/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="container py-16 lg:py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-teal-300 mb-12 leading-tight">
              Discover. Create.{' '}
              <span className="font-bold">Riallery</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-12 max-w-3xl leading-relaxed" style={{color: '#e8e3d5'}}>
              A curated digital gallery celebrating the creative spirit of the Rialo community.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-16">
              <Link href="/gallery">
                <Button size="lg" className="bg-primary-400 text-neutral-900 hover:bg-primary-300 font-medium px-8 py-4 text-lg">
                  EXPLORE GALLERY
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-12 pt-12 border-t border-neutral-700">
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#e8e3d5'}}>200+</div>
                <div style={{color: '#e8e3d5'}}>Artworks</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#e8e3d5'}}>50+</div>
                <div style={{color: '#e8e3d5'}}>Artists</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2" style={{color: '#e8e3d5'}}>12</div>
                <div style={{color: '#e8e3d5'}}>Features</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Feature Section */}
      {currentFeature && (
        <section className="bg-neutral-800 py-16 lg:py-20">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-teal-300 mb-4">
                  This Week&apos;s Feature
                </h2>
                <p className="text-lg max-w-2xl mx-auto" style={{color: '#e8e3d5'}}>
                  Celebrating exceptional artists from our community
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Featured Artwork */}
                <div className="relative">
                  <div className="aspect-[4/5] relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={currentFeature.featuredArtworks[0].imageUrl}
                      alt={currentFeature.featuredArtworks[0].title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Feature Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{color: '#e8e3d5'}}>
                      {currentFeature.artist.name}
                    </h3>
                    <p className="leading-relaxed" style={{color: '#e8e3d5'}}>
                      {currentFeature.introduction}
                    </p>
                  </div>

                  {currentFeature.artistNoteQuote && (
                    <blockquote className="border-l-4 border-neutral-300 pl-6 italic" style={{color: '#e8e3d5'}}>
                      &quot;{currentFeature.artistNoteQuote}&quot;
                    </blockquote>
                  )}

                  <div className="flex items-center space-x-4">
                    <Link href={`/features/${currentFeature.slug}`}>
                      <Button>
                        View Full Feature
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/gallery?artist=${currentFeature.artist.slug}`}>
                      <Button variant="ghost">
                        <Eye className="mr-2 h-4 w-4" />
                        View All Works
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Artworks Preview */}
      <section className="bg-neutral-900 py-16 lg:py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-300 mb-4">
                Recent Artworks
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{color: '#e8e3d5'}}>
                Latest additions to our growing collection
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
              {recentArtworks.slice(0, 8).map((artwork) => (
                <Link
                  key={artwork._id}
                  href={`/gallery/${artwork.slug}`}
                  className="group block"
                >
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-sm font-medium truncate" style={{color: '#e8e3d5'}}>
                        {artwork.title}
                      </div>
                      <div className="text-xs truncate" style={{color: '#e8e3d5'}}>
                        {artwork.artist.name}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link href="/gallery">
                <Button size="lg" style={{color: '#e8e3d5'}}>
                  View Full Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="bg-neutral-900 text-white py-16 lg:py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide text-teal-300">
              j o i n   t h e   c o m m u n i t y
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed" style={{color: '#e8e3d5'}}>
              submit your artwork to be considered for the gallery or featured in our weekly spotlight. 
              <br />
              <span className="text-primary-400 font-medium">real artists. real community. real impact.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-0 hover:opacity-90" style={{backgroundColor: '#e8e3d5', color: '#000000'}}>
                  Submit Your Art
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto hover:bg-white/10" style={{color: '#e8e3d5'}}>
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}