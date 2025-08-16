"use client";

import { useState } from "react";
import { Movie } from "../types/movie";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/common/components/ui/button";
import { useWatchlistMutation } from "@/modules/watchlist/hooks/useWatchlist";
import { toast } from "sonner";

// Bookmark icons
interface IconProps {
  className?: string;
}

const BookmarkIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const BookmarkFilledIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

interface MovieItemProps {
  movie: Movie;
  className?: string;
  isInWatchlist?: boolean;
}

const MovieItem = ({
  movie,
  className,
  isInWatchlist = false,
}: MovieItemProps) => {
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const { mutate: updateWatchlist, isPending } = useWatchlistMutation();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-image.jpg";

  const handleWatchlistToggle = () => {
    updateWatchlist(
      {
        movieId: movie.id,
        watchlist: !inWatchlist,
      },
      {
        onSuccess: () => {
          setInWatchlist(!inWatchlist);
          toast.success(
            !inWatchlist
              ? `${movie.title} added to watchlist`
              : `${movie.title} removed from watchlist`
          );
        },
        onError: () => {
          toast.error("Failed to update watchlist. Please try again.");
        },
      }
    );
  };

  return (
    <div className={cn("flex flex-col overflow-hidden relative", className)}>
      <div className=" w-full">
        <div className="relative aspect-[2/3] group overflow-hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        <div className="absolute w-full h-full flex items-center justify-center bg-black/50 p-4 rounded-xl bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <p className="text-sm text-gray-300 ">{movie.overview}</p>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
        </div>
        </div>

        <Button
          onClick={handleWatchlistToggle}
          disabled={isPending}
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5"
        >
          {inWatchlist ? (
            <BookmarkFilledIcon className="h-5 w-5" />
          ) : (
            <BookmarkIcon className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="p-4 flex-1 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
          <p className="text-sm ">{movie.release_date?.split("-")[0]}</p>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <span className="text-amber-500">★</span>
          <span>{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
