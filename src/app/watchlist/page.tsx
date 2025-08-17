import MovieListContainer from "@/modules/movies/components/MovieListContainer";

export default function WatchlistPage() {
  return (
    <MovieListContainer 
      type="watchlist" 
      emptyMessage="Your watchlist is empty"
      emptyDescription="Add movies to your watchlist to see them here"
      isInWatchlist={true}
    />
  );
}
