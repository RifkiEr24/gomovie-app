import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails, fetchMovieImages, fetchMovies, fetchReviewMovies, fetchSimilarMovies, searchMovies } from "../services/movieService";
import { MovieCategory, MovieDetails, MovieResponse, MovieReviewsResponse } from "../types/movie";

export const useMoviesByCategory = (category: MovieCategory | undefined, page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["movies", category, page],
    queryFn: () => {
      if (!category) {
        return Promise.resolve({ page: 0, results: [], total_pages: 0, total_results: 0 });
      }
      return fetchMovies(category, page);
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!category
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["search", query, page],
    queryFn: () => searchMovies(query, page),
    staleTime: 5 * 60 * 1000,
    enabled: query.trim().length > 0, 
  });
};

export const useTopRatedMovies = (page: number = 1) => {
  return useMoviesByCategory("top_rated", page);
};

export const useUpcomingMovies = (page: number = 1) => {
  return useMoviesByCategory("upcoming", page);
};

export const useNowPlayingMovies = (page: number = 1) => {
  return useMoviesByCategory("now_playing", page);
};

export const usePopularMovies = (page: number = 1) => {
  return useMoviesByCategory("popular", page);
};

export const useMovieDetails = (movieId: string | number) => {
  return useQuery<MovieDetails, Error>({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    staleTime: 5 * 60 * 1000, 
    enabled: Boolean(movieId),
  });
};

export const useMovieImages = (movieId: string | number) => {
  return useQuery({
    queryKey: ["movie-images", movieId],
    queryFn: () => fetchMovieImages(movieId),
    staleTime: 5 * 60 * 1000, 
    enabled: Boolean(movieId),
  });
};

export const useMovieReviews = (movieId: string | number) => {
  return useQuery<MovieReviewsResponse, Error>({
    queryKey: ["movie-reviews", movieId],
    queryFn: () => fetchReviewMovies(movieId),
    staleTime: 5 * 60 * 1000, 
    enabled: Boolean(movieId),
  });
};

export const useSimilarMovies = (movieId: string | number, page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["similar-movies", movieId, page],
    queryFn: () => fetchSimilarMovies(movieId, page),
    staleTime: 5 * 60 * 1000, 
    enabled: Boolean(movieId),
  });
};