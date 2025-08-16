"use client";

import { useState } from "react";
import { useTopRatedMovies } from "../hooks/useMovies";
import MovieItem from "./MovieItem";
import { Button } from "@/common/components/ui/button";

const MoviesList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useTopRatedMovies(page);

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
          <h1 className="text-2xl font-bold">Top Rated Movies</h1>
          <p className="text-gray-500">
            Discover the highest rated movies of all time
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {data?.results.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
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
          Page {page} of {data?.total_pages}
        </span>
        <Button
          variant="outline"
          onClick={() =>
            setPage((prev) =>
              prev < (data?.total_pages || 1) ? prev + 1 : prev
            )
          }
          disabled={page >= (data?.total_pages || 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MoviesList;
