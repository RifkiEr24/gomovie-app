"use client";

import { useEffect, useState, useCallback } from "react";
import { useMoviesByCategory } from "@/modules/movies/hooks/useMovies";
import MovieItem from "@/modules/movies/components/MovieItem";
import { Movie, MovieCategory } from "@/modules/movies/types/movie";
import { notFound } from "next/navigation";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Skeleton } from "@/common/components/ui/skeleton";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const { data, isLoading, isError, error } = useMoviesByCategory(validCategory, page);
  
  const hasNextPage = page < totalPages;
  
  const loadMore = useCallback(() => {
    if (!isLoading && hasNextPage) {
      setPage(prevPage => prevPage + 1);
    }
  }, [isLoading, hasNextPage]);
  
  const [infiniteRef] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: Boolean(error),
    rootMargin: '0px 0px 400px 0px'
  });
  
  useEffect(() => {
    if (data) {
 
      if (!showSkeleton) {
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        setTotalPages(data.total_pages);
      }
    }
  }, [data, page, showSkeleton]);
  
  useEffect(() => {
    setPage(1);
    setMovies([]);
    setShowSkeleton(true);
  }, [validCategory]);
  
  useEffect(() => {
    if (!isValidCategory) {
      notFound();
    }
  }, [isValidCategory]);
  
  useEffect(() => {
    if (!isLoading && page === 1) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, page]);

  if ((isLoading || showSkeleton) && page === 1) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{categoryInfo[validCategory].title}</h1>
          <p className="text-gray-500 mt-2">{categoryInfo[validCategory].description}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array(10).fill(0).map((_, index) => (
            <div key={index} className="flex flex-col">
              <Skeleton className="aspect-[2/3] w-full h-auto" />
              <Skeleton className="h-6 mt-3 w-3/4" />
              <Skeleton className="h-4 mt-2 w-1/3" />
              <Skeleton className="h-4 mt-2 w-full" />
            </div>
          ))}
        </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: Movie) => (
          <MovieItem 
            key={movie.id} 
            movie={movie}
            isInWatchlist={false}
          />
        ))}
      </div>
      
      {/* Loading indicator for infinite scrolling */}
      {hasNextPage && (
        <div 
          ref={infiniteRef} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4"
        >
          {(isLoading || showSkeleton) && Array(5).fill(0).map((_, index) => (
            <div key={`loading-${index}`} className="flex flex-col">
              <Skeleton className="aspect-[2/3] w-full h-auto" />
              <Skeleton className="h-6 mt-3 w-3/4" />
              <Skeleton className="h-4 mt-2 w-1/3" />
              <Skeleton className="h-4 mt-2 w-full" />
            </div>
          ))}
        </div>
      )}
      
      {!hasNextPage && movies.length > 0 && (
        <div className="text-center py-8 text-gray-500">
          You&apos;ve reached the end of the list
        </div>
      )}
    </div>
  );
}
