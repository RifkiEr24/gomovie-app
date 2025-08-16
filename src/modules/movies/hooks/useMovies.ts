import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movieService";
import { MovieCategory, MovieResponse } from "../types/movie";

export const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["movies", category, page],
    queryFn: () => fetchMovies(category, page),
    staleTime: 5 * 60 * 1000, 
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
