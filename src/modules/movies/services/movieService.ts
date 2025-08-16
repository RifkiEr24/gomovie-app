import apiClient from "@/lib/axios";
import { MovieCategory, MovieResponse } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovies = async (
  category: MovieCategory, 
  page: number = 1
): Promise<MovieResponse> => {
  const response = await apiClient.get<MovieResponse>(
    `${BASE_URL}/movie/${category}?page=${page}`
  );
  return response.data;
};

export const fetchTopRatedMovies = async (page: number = 1): Promise<MovieResponse> => {
  return fetchMovies("top_rated", page);
};

export const fetchUpcomingMovies = async (page: number = 1): Promise<MovieResponse> => {
  return fetchMovies("upcoming", page);
};

export const fetchNowPlayingMovies = async (page: number = 1): Promise<MovieResponse> => {
  return fetchMovies("now_playing", page);
};

export const fetchPopularMovies = async (page: number = 1): Promise<MovieResponse> => {
  return fetchMovies("popular", page);
};
