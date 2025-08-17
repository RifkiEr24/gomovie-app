"use client";

import { useState } from "react";
import MovieItem from "./MovieItem";
import { MovieCategory, Movie } from "../types/movie";
import { useMoviesByCategory } from "../hooks/useMovies";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/common/components/ui/carousel";
import { ChevronRight } from "lucide-react";
import { Button } from "@/common/components/ui/button";

interface MoviesListProps {
  category?: MovieCategory;
  title: string;
  description: string;
  limit?: number;
  showSeeMore?: boolean;
  movies?: Movie[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error;
}

const MoviesList = ({
  category,
  title,
  description,
  limit = 10,
  showSeeMore = true,
  movies: propMovies,
  isLoading: propIsLoading,
  isError: propIsError,
  error: propError,
}: MoviesListProps) => {
  const [page] = useState(1);
  const { data, isLoading: queryIsLoading, isError: queryIsError, error: queryError } = useMoviesByCategory(
    category, 
    page
  );
  
  const movies = propMovies || data?.results;
  const isLoading = propIsLoading !== undefined ? propIsLoading : queryIsLoading;
  const isError = propIsError !== undefined ? propIsError : queryIsError;
  const error = propError || queryError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">
          Error loading movies: {error?.message || "Unknown error"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(title || description) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h1 className="text-2xl font-bold">{title}</h1>}
            {description && <p className="text-gray-300">{description}</p>}
          </div>
        </div>
      )}
      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {movies?.slice(0, limit).map((movie: Movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-4"
              >
                <MovieItem movie={movie} isInWatchlist={false} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 border-0 shadow-md"
            variant="default"
          />
          <CarouselNext
            className="right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 border-0 shadow-md"
            variant="default"
          />
        </Carousel>
      </div>

      {showSeeMore && (
        <div className="flex justify-end mt-4">
          <Link
            href={`/movies/${category}`}
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            <Button>
              See all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
