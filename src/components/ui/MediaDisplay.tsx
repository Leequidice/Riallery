'use client';

import Image from 'next/image';
import { useState } from 'react';
import { isVideoFile, isGifFile } from '@/lib/utils';

interface MediaDisplayProps {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
  onLoad?: () => void;
  priority?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
}

export default function MediaDisplay({
  src,
  alt,
  fill = true,
  sizes,
  className = '',
  onLoad,
  priority = false,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  width,
  height,
}: MediaDisplayProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  if (isVideoFile(src)) {
    return (
      <video
        src={src}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        playsInline
        preload="metadata"
        width={width}
        height={height}
        className={`${fill ? 'absolute inset-0 w-full h-full object-contain' : 'max-w-full h-auto'} ${className} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        onLoadedData={handleLoad}
        onError={() => {
          console.error('Error loading video:', src);
          setIsLoaded(true);
        }}
      />
    );
  }

  // For GIFs and regular images, use Next.js Image component
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width || 800 : undefined}
      height={!fill ? height || 600 : undefined}
      sizes={sizes}
      className={`${fill ? '' : 'max-w-full h-auto'} ${className} ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      onLoad={handleLoad}
      priority={priority}
      unoptimized={isGifFile(src)} // Don't optimize GIFs to preserve animation
    />
  );
}