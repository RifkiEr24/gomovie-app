import { MovieResponse } from "@/modules/movies/types/movie";

export type WatchlistResponse = MovieResponse

export interface WatchlistParams {
  accountId: string | number;
  page?: number;
}
