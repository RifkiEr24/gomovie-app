import { create } from 'zustand';
import { Movie } from '@/modules/movies/types/movie';
import { fetchWatchlist, updateWatchlist } from '../services/watchlistService';

interface WatchlistState {
  movies: Movie[];
  watchlistIds: Set<number>; // For efficient lookup
  isLoading: boolean;
  error: Error | null;
  fetchWatchlist: () => Promise<void>;
  addToWatchlist: (movieId: number) => Promise<void>;
  removeFromWatchlist: (movieId: number) => Promise<void>;
  isInWatchlist: (movieId: number) => boolean;
}

export const useWatchlistStore = create<WatchlistState>((set, get) => ({
  movies: [],
  watchlistIds: new Set<number>(),
  isLoading: false,
  error: null,
  
  fetchWatchlist: async () => {
    set({ isLoading: true });
    try {
      const response = await fetchWatchlist();
      const watchlistIds = new Set(response.results.map(movie => movie.id));
      set({ 
        movies: response.results,
        watchlistIds,
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error : new Error('Failed to fetch watchlist') 
      });
    }
  },
  
  addToWatchlist: async (movieId: number) => {
    try {
      await updateWatchlist({ movieId, watchlist: true });
      set(state => ({
        watchlistIds: new Set(state.watchlistIds).add(movieId)
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to add to watchlist')
      });
      throw error;
    }
  },
  
  removeFromWatchlist: async (movieId: number) => {
    try {
      await updateWatchlist({ movieId, watchlist: false });
      set(state => {
        const newIds = new Set(state.watchlistIds);
        newIds.delete(movieId);
        return { watchlistIds: newIds };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to remove from watchlist') 
      });
      throw error;
    }
  },
  
  isInWatchlist: (movieId: number) => {
    return get().watchlistIds.has(movieId);
  }
}));
