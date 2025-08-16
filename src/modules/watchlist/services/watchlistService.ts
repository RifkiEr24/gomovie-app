import apiClient from "@/lib/axios";
import { WatchlistParams, WatchlistResponse } from "../types/watchlist";

const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_ACCOUNT_ID = "9675325";

export const fetchWatchlist = async (
  params?: Partial<WatchlistParams>
): Promise<WatchlistResponse> => {
  const accountId = params?.accountId || DEFAULT_ACCOUNT_ID;
  const page = params?.page || 1;
  
  const response = await apiClient.get<WatchlistResponse>(
    `${BASE_URL}/account/${accountId}/watchlist/movies?page=${page}`
  );
  
  return response.data;
};

interface AddToWatchlistParams {
  accountId?: string | number;
  movieId: number;
  watchlist: boolean; 
}

export const updateWatchlist = async ({
  accountId = DEFAULT_ACCOUNT_ID,
  movieId,
  watchlist
}: AddToWatchlistParams): Promise<{ success: boolean }> => {
  const response = await apiClient.post(
    `${BASE_URL}/account/${accountId}/watchlist`,
    {
      media_type: "movie",
      media_id: movieId,
      watchlist
    }
  );
  
  return response.data;
};
