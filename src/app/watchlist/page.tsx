"use client";

import { useWatchlist } from "@/modules/watchlist/hooks/useWatchlist";
import MovieItem from "@/modules/movies/components/MovieItem";
import { Button } from "@/common/components/ui/button";
import { useState } from "react";
import { Movie } from "@/modules/movies/types/movie";

export default function WatchlistPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useWatchlist({ page });

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
          Error loading watchlist: {error.message}
        </div>
      </div>
    );
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <h2 className="text-xl font-semibold">Your watchlist is empty</h2>
        <p className="text-gray-500">Add movies to your watchlist to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Your Watchlist</h1>
          <p className="text-gray-500">Movies you&apos;ve saved to watch later</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.results.map((movie: Movie) => (
          <MovieItem key={movie.id} movie={movie} isInWatchlist={true} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          Page {page} of {data.total_pages}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            setPage((prev) =>
              prev < (data.total_pages || 1) ? prev + 1 : prev
            )
          }
          disabled={page >= (data.total_pages || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
