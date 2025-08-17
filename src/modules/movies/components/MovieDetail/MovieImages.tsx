"use client";

import { Skeleton } from "@/common/components/ui/skeleton";
import Image from "next/image";

interface MovieImage {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
  iso_639_1: string | null;
}

interface MovieImagesProps {
  images: MovieImage[] | undefined;
  isLoading: boolean;
  movieTitle: string;
  onImageClick: (index: number) => void;
}

export const MovieImages = ({
  images,
  isLoading,
  movieTitle,
  onImageClick
}: MovieImagesProps) => {
  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Images</h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-video rounded-md" />
          ))}
        </div>
      ) : images && images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.slice(0, 7).map((image, index) => (
            <div 
              key={index} 
              className="relative rounded-md overflow-hidden shadow-md aspect-video cursor-pointer"
              onClick={() => onImageClick(index)}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                alt={`${movieTitle} backdrop ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
          
          {images.length > 7 && (
            <div 
              className="relative rounded-md overflow-hidden shadow-md aspect-video cursor-pointer"
              onClick={() => onImageClick(7)}
            >
              <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center text-white font-bold text-xl">
                +{images.length - 7}
              </div>
              <Image
                src={`https://image.tmdb.org/t/p/w780${images[7].file_path}`}
                alt={`${movieTitle} backdrop 8`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">No backdrop images available.</p>
      )}
    </div>
  );
};
