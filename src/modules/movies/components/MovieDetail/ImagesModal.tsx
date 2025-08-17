"use client";

import { useEffect, useRef, useCallback } from "react";
import { X as XIcon } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
  initialIndex?: number;
}

export const ImagesModal = ({
  isOpen,
  onClose,
  images,
  movieTitle,
  initialIndex = 0,
}: ImagesModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on ESC
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Lock body scroll & bind ESC when open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  // Focus trap (simple: send focus to close button on open)
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const btn = dialogRef.current.querySelector<HTMLButtonElement>("[data-close]");
      btn?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (!images || images.length === 0) {
    return (
      <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
        <div className="rounded-lg bg-background p-6 text-center shadow-xl">
          <p className="text-sm text-muted-foreground">No images available.</p>
          <button
            onClick={onClose}
            className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`${movieTitle} images`}
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content wrapper */}
      <div className="
        pointer-events-none absolute inset-0
        flex items-center justify-center
        p-0 sm:p-3 md:p-6
      ">
        {/* Frame */}
        <div
          className="
            pointer-events-auto relative w-full
            h-[100dvh] sm:h-[92dvh] md:h-[86dvh] lg:h-[84dvh]
            max-w-none sm:max-w-4xl lg:max-w-6xl
          "
        >
          {/* Close button */}
          <button
            data-close
            onClick={onClose}
            className="
              absolute right-3 top-3 z-20
              inline-flex items-center justify-center
              rounded-full bg-black/60 text-white
              backdrop-blur-sm
              focus:outline-none focus:ring-2 focus:ring-primary/70
              transition
              h-10 w-10 sm:h-10 sm:w-10 md:h-11 md:w-11
            "
          >
            <XIcon className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">Close</span>
          </button>

          {/* Carousel */}
          <div className="relative flex h-full w-full items-center justify-center">
            <Carousel className="h-full w-full" opts={{ startIndex: initialIndex }}>
              <CarouselContent className="h-full">
                {images.map((image, index) => (
                  <CarouselItem
                    key={`${image.file_path}-${index}`}
                    className="flex h-full items-center justify-center"
                  >
                    <div
                      className="
                        relative mx-auto
                        h-[88dvh] sm:h-[86dvh] md:h-[80dvh]
                        w-full
                      "
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                        alt={`${movieTitle} image ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 90vw,
                          80vw
                        "
                        priority={index === initialIndex}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious
                className="
                  left-2 sm:left-3 md:left-4
                  h-10 w-10 sm:h-10 sm:w-10 md:h-11 md:w-11
                  bg-black/60 text-white backdrop-blur-sm hover:bg-black/70
                  border-0
                "
              />
              <CarouselNext
                className="
                  right-2 sm:right-3 md:right-4
                  h-10 w-10 sm:h-10 sm:w-10 md:h-11 md:w-11
                  bg-black/60 text-white backdrop-blur-sm hover:bg-black/70
                  border-0
                "
              />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};
