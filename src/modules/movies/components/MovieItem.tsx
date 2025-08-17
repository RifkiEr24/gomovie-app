"use client";

import { useState } from "react";
import { Movie } from "../types/movie";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/common/components/ui/button";
import { useWatchlistStore } from "@/modules/watchlist/stores/watchlistStore";
import { toast } from "sonner";
import Link from "next/link";
import { Bookmark, BookmarkCheck, StarIcon } from "lucide-react";

interface MovieItemProps {
  movie: Movie;
  className?: string;
  isInWatchlist?: boolean;
}

const MovieItem = ({
  movie,
  className,
  isInWatchlist: initialIsInWatchlist = false,
}: MovieItemProps) => {
  const { 
    isInWatchlist, 
    addToWatchlist, 
    removeFromWatchlist 
  } = useWatchlistStore();
  
  const [isPending, setIsPending] = useState(false);
  
  const inWatchlist = isInWatchlist(movie.id) || initialIsInWatchlist;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-image.jpg";

  const handleWatchlistToggle = async () => {
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

  return (
    <div className={cn("flex flex-col overflow-hidden relative group", className)}>
      <Link 
        href={`/movies/detail/${movie.id}`} 
        className="absolute inset-0 z-10 focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-50"
      >
        <span className="sr-only">View details for {movie.title}</span>
      </Link>
      
      <div className="w-full">
        <div className="relative aspect-[2/3] group overflow-hidden">
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        <div className="absolute w-full h-full flex items-center justify-center bg-black/50 p-4 rounded-xl bottom-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500">
            <p className="text-sm text-gray-300 ">{movie.overview}</p>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
        </div>
        </div>

        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleWatchlistToggle();
          }}
          disabled={isPending}
          size="icon"
          variant="ghost"
          aria-label={inWatchlist ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
          className="absolute top-2 right-2 bg-black/40 hover:bg-black/60 focus:bg-black/60 text-white rounded-full p-1.5 z-20 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          {inWatchlist ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </Button>
      </div>
      <div className="p-4 flex-1 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
          <p className="text-sm ">{movie.release_date?.split("-")[0]}</p>
        </div>

        <div className="mt-2 flex items-center gap-1">
          <StarIcon className="text-amber-500 fill-amber-500" size={15} />
          <span>{movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
