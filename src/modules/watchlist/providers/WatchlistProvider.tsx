"use client";

import { useEffect } from 'react';
import { useWatchlistStore } from '@/modules/watchlist/stores/watchlistStore';

interface WatchlistProviderProps {
  children: React.ReactNode;
}

export default function WatchlistProvider({ children }: WatchlistProviderProps) {
  const { fetchWatchlist } = useWatchlistStore();

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return <>{children}</>;
}
