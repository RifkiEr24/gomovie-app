"use client";

import { Button } from "@/common/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MovieDetails } from "../../types/movie";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";

interface MovieInformationProps {
  movie: MovieDetails;
  inWatchlist: boolean;
  isPending: boolean;
  onWatchlistToggle: () => void;
  formatReleaseDate: (date: string) => string;
  formatRuntime: (minutes: number) => string;
  formatCurrency: (amount: number) => string;
}



export const MovieInformation = ({
  movie,
  inWatchlist,
  isPending,
  onWatchlistToggle,
  formatReleaseDate,
  formatRuntime,
  formatCurrency
}: MovieInformationProps) => {
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-image.jpg";

  return (
    <>
      {/* Backdrop image */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 right-0 h-[50vh] overflow-hidden -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-background z-10" />
          <Image 
            src={backdropUrl} 
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="container mx-auto px-4 pt-8">
        <Link href="/movies/popular" className="inline-flex items-center text-sm mb-8 hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to movies
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {/* Movie poster */}
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-lg">
              <Image 
                src={posterUrl} 
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
          
          {/* Movie details */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-lg mt-2 text-gray-400 italic">&ldquo;{movie.tagline}&rdquo;</p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres.map((genre) => (
                  <span 
                    key={genre.id} 
                    className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-200"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              {movie.release_date && (
                <div>
                  <p className="text-gray-400">Release Date</p>
                  <p>{formatReleaseDate(movie.release_date)}</p>
                </div>
              )}
              
              {movie.runtime > 0 && (
                <div>
                  <p className="text-gray-400">Runtime</p>
                  <p>{formatRuntime(movie.runtime)}</p>
                </div>
              )}
              
              <div>
                <p className="text-gray-400">Rating</p>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">★</span>
                  <span>{movie.vote_average?.toFixed(1)}/10</span>
                  <span className="text-gray-400">({movie.vote_count})</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={onWatchlistToggle}
                disabled={isPending}
                className="flex items-center gap-2"
              >
                {inWatchlist ? (
                  <>
                    <BookmarkCheck className="h-5 w-5" />
                    Remove from Watchlist
                  </>
                ) : (
                  <>
                    <Bookmark className="h-5 w-5" />
                    Add to Watchlist
                  </>
                )}
              </Button>
              
              {movie.homepage && (
                <Button variant="outline" asChild>
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    Visit Official Site
                  </a>
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {movie.budget > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm">Budget</h3>
                  <p>{formatCurrency(movie.budget)}</p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm">Revenue</h3>
                  <p>{formatCurrency(movie.revenue)}</p>
                </div>
              )}
              
              {movie.production_companies.length > 0 && (
                <div className="sm:col-span-2">
                  <h3 className="text-gray-400 text-sm mb-2">Production</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.production_companies.map((company) => (
                      <div key={company.id} className="flex items-center gap-2">
                        {company.logo_path && (
                          <div className="relative h-6 w-12">
                            <Image 
                              src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} 
                              alt={company.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="text-sm">{company.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
