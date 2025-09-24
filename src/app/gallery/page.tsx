'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import GalleryContent from './gallery-content';

function GalleryLoading() {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-neutral-400" />
            <p className="text-neutral-600">Loading gallery...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<GalleryLoading />}>
      <GalleryContent />
    </Suspense>
  );
}