"use client";

import { useState } from "react";
import MovieItem from "./MovieItem";
import { MovieCategory, Movie } from "../types/movie";
import { useMoviesByCategory } from "../hooks/useMovies";
import Link from "next/link";

interface MoviesListProps {
  category: MovieCategory;
  title: string;
  description: string;
  limit?: number;
  showSeeMore?: boolean;
}

const MoviesList = ({
  category,
  title,
  description,
  limit = 8,
  showSeeMore = true
}: MoviesListProps) => {
  const [page] = useState(1);
  const { data, isLoading, isError, error } = useMoviesByCategory(category, page);

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
          Error loading movies: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.results.slice(0, limit).map((movie: Movie) => (
          <MovieItem 
            key={movie.id} 
            movie={movie} 
            isInWatchlist={false} // We don't know if it's in the watchlist, so default to false
          />
        ))}
      </div>

      {showSeeMore && (
        <div className="flex justify-end mt-4">
          <Link 
            href={`/movies/${category}`}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            See more
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MoviesList;
