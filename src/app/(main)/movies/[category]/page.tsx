"use client";

import { useEffect, useState } from "react";
import { useMoviesByCategory } from "@/modules/movies/hooks/useMovies";
import MovieItem from "@/modules/movies/components/MovieItem";
import { Button } from "@/common/components/ui/button";
import { Movie, MovieCategory } from "@/modules/movies/types/movie";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Define mapping for titles and descriptions
const categoryInfo = {
  "top_rated": {
    title: "Top Rated Movies",
    description: "Discover the highest rated movies of all time"
  },
  "upcoming": {
    title: "Upcoming Movies",
    description: "The latest movies coming soon to theaters"
  },
  "now_playing": {
    title: "Now Playing",
    description: "Movies currently in theaters"
  },
  "popular": {
    title: "Popular Movies",
    description: "Trending movies loved by audiences"
  }
};

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  const validCategories = ["top_rated", "upcoming", "now_playing", "popular"];
  const isValidCategory = validCategories.includes(category);

  const validCategory = isValidCategory ? (category as MovieCategory) : "top_rated"; 
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useMoviesByCategory(validCategory, page);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  
  useEffect(() => {
    if (!isValidCategory) {
      notFound();
    }
  }, [isValidCategory]);

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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{categoryInfo[validCategory].title}</h1>
        <p className="text-gray-500 mt-2">{categoryInfo[validCategory].description}</p>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.results.map((movie: Movie) => (
          <MovieItem 
            key={movie.id} 
            movie={movie}
            isInWatchlist={false}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-8 py-4">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="font-medium">
          Page {page} of {data?.total_pages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => (prev < (data?.total_pages || 1) ? prev + 1 : prev))}
          disabled={page >= (data?.total_pages || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
