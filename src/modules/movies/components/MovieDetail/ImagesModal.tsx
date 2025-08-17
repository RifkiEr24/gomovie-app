"use client";

import { XIcon } from "lucide-react";
import Image from "next/image";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/common/components/ui/carousel";

interface MovieImage {
  file_path: string;
  aspect_ratio: number;
  height: number;
  width: number;
  vote_average: number;
  vote_count: number;
  iso_639_1: string | null;
}

interface ImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: MovieImage[];
  movieTitle: string;
  initialIndex: number;
}

export const ImagesModal = ({
  isOpen,
  onClose,
  images,
  movieTitle,
  initialIndex = 0
}: ImagesModalProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <button 
          className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white"
          onClick={onClose}
        >
          <XIcon className="w-6 h-6" />
        </button>
        
        <div className="w-full h-full max-w-7xl mx-auto flex items-center">
          <Carousel className="w-full" opts={{ startIndex: initialIndex }}>
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <div className="flex items-center justify-center h-[80vh] w-full">
                    <div 
                      className="relative mx-auto h-auto"
                      style={{ 
                        width: 'auto',
                        height: '100%',
                        maxHeight: '80vh',
                        aspectRatio: `${image.aspect_ratio}`
                      }}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                        alt={`${movieTitle} backdrop ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                        priority
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 z-20" />
            <CarouselNext className="right-2 z-20" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
