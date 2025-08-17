import apiClient from "@/lib/axios";
import { MovieCategory, MovieDetails, MovieImages, MovieResponse, MovieReviewsResponse } from "../types/movie";

export const fetchMovies = async (
  category: MovieCategory, 
  page: number = 1
): Promise<MovieResponse> => {
  const response = await apiClient.get<MovieResponse>(
    `/movie/${category}?page=${page}`
  );
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await apiClient.get<MovieResponse>(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
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

export const fetchSimilarMovies = async (movieId: string | number, page: number = 1): Promise<MovieResponse> => {
   try {
        const response = await apiClient.get(`/movie/${movieId}/similar?page=${page}`);
        return response.data;
   } catch (error) {
       console.error("Error fetching similar movies:", error);
       throw error;
   }
};

export const fetchMovieDetails = async (movieId: string | number): Promise<MovieDetails> => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieImages = async (movieId: string | number): Promise<MovieImages> => {
  try {
    const response = await apiClient.get<MovieImages>(
      `/movie/${movieId}/images`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    throw error;
  }
};

export const fetchReviewMovies = async (movieId: string | number): Promise<MovieReviewsResponse> => {
  try {
    const response = await apiClient.get(
      `/movie/${movieId}/reviews`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};
