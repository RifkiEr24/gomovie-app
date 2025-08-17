"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  useMovieDetails,
  useMovieImages,
  useMovieReviews,
  useSimilarMovies,
} from "../hooks/useMovies";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlistStore";
import { Skeleton } from "@/common/components/ui/skeleton";
import { ImagesModal } from "./MovieDetail/ImagesModal";
import { MovieImages } from "./MovieDetail/MovieImages";
import { MovieInformation } from "./MovieDetail/MovieInformation";
import { MovieReviews } from "./MovieDetail/MovieReviews";
import MoviesList from "./MoviesList";
import { formatCurrency, formatReleaseDate, formatRuntime } from "../util";

// Main component
interface MovieDetailContentProps {
  id: string;
  isInWatchlist?: boolean;
}

export default function MovieDetailContent({
  id,
  isInWatchlist: propIsInWatchlist = false,
}: MovieDetailContentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPending, setIsPending] = useState(false);
  
  const { data: movie, isLoading, isError, error } = useMovieDetails(id);
  const { data: images, isLoading: isImagesLoading } = useMovieImages(id);
  const { data: reviews, isLoading: isReviewsLoading } = useMovieReviews(id);
  const { data: similarMovies, isLoading: isSimilarMoviesLoading } = useSimilarMovies(id);
  
  const { 
    isInWatchlist, 
    addToWatchlist, 
    removeFromWatchlist 
  } = useWatchlistStore();
  
  const inWatchlist = movie ? isInWatchlist(movie.id) : propIsInWatchlist;
  
  const handleWatchlistToggle = async () => {
    if (!movie) return;
    
    setIsPending(true);
    try {
      if (inWatchlist) {
        await removeFromWatchlist(movie.id);
        toast.success(`${movie.title} removed from watchlist`);
      } else {
        await addToWatchlist(movie.id);
        toast.success(`${movie.title} added to watchlist`);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update watchlist. Please try again.");
    } finally {
      setIsPending(false);
    }
  };


  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Skeleton className="aspect-[2/3] w-full h-auto rounded-xl" />
          </div>
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-28 w-full" />
            <div className="flex space-x-4">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Error loading movie details: {error.message}
        </div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-12">Movie not found</div>;
  }

  return (
    <div className="relative pb-12">
      {/* Movie Information Section */}
      <MovieInformation
        movie={movie}
        inWatchlist={inWatchlist}
        isPending={isPending}
        onWatchlistToggle={handleWatchlistToggle}
        formatReleaseDate={formatReleaseDate}
        formatRuntime={formatRuntime}
        formatCurrency={formatCurrency}
      />

      <div className="container mx-auto px-4">
        {/* Movie Images Gallery */}
        <MovieImages
          images={images?.backdrops}
          isLoading={isImagesLoading}
          movieTitle={movie.title}
          onImageClick={handleImageClick}
        />

        {/* Images Modal */}
        {images?.backdrops && (
          <ImagesModal
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            images={images.backdrops}
            movieTitle={movie.title}
            initialIndex={selectedImageIndex}
          />
        )}

        {reviews?.results && (
          <MovieReviews
            reviews={reviews.results}
            isLoading={isReviewsLoading}
          />
        )}
        
        {/* Similar Movies Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
          {similarMovies?.results && similarMovies.results.length > 0 ? (
            <MoviesList
              title=""
              description=""
              movies={similarMovies.results}
              isLoading={isSimilarMoviesLoading}
              showSeeMore={false}
              limit={10}
            />
          ) : isSimilarMoviesLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No similar movies found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
