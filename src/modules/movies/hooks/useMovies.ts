import { useQuery } from "@tanstack/react-query";
import { fetchTopRatedMovies } from "../services/movieService";
import { MovieResponse } from "../types/movie";

export const useTopRatedMovies = (page: number = 1) => {
  return useQuery<MovieResponse, Error>({
    queryKey: ["topRatedMovies", page],
    queryFn: () => fetchTopRatedMovies(page),
    staleTime: 5 * 60 * 1000, 
  });
};
