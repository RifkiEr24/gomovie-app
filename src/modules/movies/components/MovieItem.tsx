"use client";

import { Movie } from "../types/movie";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MovieItemProps {
  movie: Movie;
  className?: string;
}

const MovieItem = ({ movie, className }: MovieItemProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-image.jpg"; 

  return (
    <div className={cn("flex flex-col rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow", className)}>
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-gray-500">{movie.release_date?.split("-")[0]}</p>
        <div className="mt-2 flex items-center gap-1">
          <span className="text-amber-500">★</span>
          <span>{movie.vote_average?.toFixed(1)}</span>
        </div>
        <p className="mt-2 text-sm line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieItem;
