import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWatchlist, updateWatchlist } from "../services/watchlistService";
import { WatchlistParams, WatchlistResponse } from "../types/watchlist";

export const useWatchlist = (params?: Partial<WatchlistParams>) => {
  const { accountId, page = 1 } = params || {};
  
  return useQuery<WatchlistResponse, Error>({
    queryKey: ["watchlist", accountId, page],
    queryFn: () => fetchWatchlist({ accountId, page }),
    staleTime: 5 * 60 * 1000,
  });
};

export const useWatchlistMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateWatchlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
  });
};
