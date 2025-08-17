"use client";

import { useEffect, useState, useCallback, ReactNode } from "react";
import { Movie, MovieCategory } from "@/modules/movies/types/movie";
import MovieItem from "@/modules/movies/components/MovieItem";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Skeleton } from "@/common/components/ui/skeleton";
import { useMoviesByCategory } from "@/modules/movies/hooks/useMovies";
import { useSearchMovies } from "@/modules/movies/hooks/useMovies";
import { useWatchlist } from "@/modules/watchlist/hooks/useWatchlist";
import { useSearchParams } from "next/navigation";

interface MovieListContainerProps {
  type: "category" | "search" | "watchlist";
  category?: MovieCategory;
  title?: string;
  description?: string;
  emptyMessage?: string;
  emptyDescription?: string;
  endMessage?: string;
  isInWatchlist?: boolean;
  children?: ReactNode;
}

export default function MovieListContainer({
  type,
  category = "popular",
  title: customTitle,
  description: customDescription,
  emptyMessage = "No movies found",
  emptyDescription = "Try checking other categories",
  endMessage = "You've reached the end of the list",
  isInWatchlist = false,
  children
}: MovieListContainerProps) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [showSkeleton, setShowSkeleton] = useState(true);
  
  const searchParams = useSearchParams();
  const searchQuery = type === "search" ? (searchParams.get("query") || "") : "";
  
  const categoryData = useMoviesByCategory(category, page);
  const searchData = useSearchMovies(searchQuery, page);
  const watchlistData = useWatchlist({ page });
  
  let data, isLoading, isError, error;
  
  if (type === "category") {
    data = categoryData.data;
    isLoading = categoryData.isLoading;
    isError = categoryData.isError;
    error = categoryData.error;
  } else if (type === "search") {
    data = searchData.data;
    isLoading = searchData.isLoading;
    isError = searchData.isError;
    error = searchData.error;
  } else {
    data = watchlistData.data;
    isLoading = watchlistData.isLoading;
    isError = watchlistData.isError;
    error = watchlistData.error;
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
  
  let title = customTitle || "";
  let description = customDescription || "";
  
  if (!customTitle) {
    if (type === "category" && category) {
      title = categoryInfo[category].title;
      description = categoryInfo[category].description;
    } else if (type === "search") {
      title = "Search Results";
      description = searchQuery 
        ? `Found ${data?.total_results || 0} movies matching "${searchQuery}"` 
        : "Enter a search term to find movies";
    } else if (type === "watchlist") {
      title = "Your Watchlist";
      description = "Movies you've saved to watch later";
    }
  }
  
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
  }, [type, category, searchQuery]);
  
  useEffect(() => {
    if (!isLoading && page === 1) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, page]);
  
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
  
  if ((isLoading || showSkeleton) && page === 1) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-500 mt-2">{description}</p>
        </div>
        
        {children}
        
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
          Error loading content: {error?.message}
        </div>
      </div>
    );
  }

  if (movies.length === 0 && !isLoading && !showSkeleton) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold">{emptyMessage}</h2>
        <p className="text-gray-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-500 mt-2">{description}</p>
      </div>

      {children}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie: Movie) => (
          <MovieItem 
            key={movie.id} 
            movie={movie}
            isInWatchlist={isInWatchlist}
          />
        ))}
      </div>
      
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
          {endMessage}
        </div>
      )}
    </div>
  );
}
