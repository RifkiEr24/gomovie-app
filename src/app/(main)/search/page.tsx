import MovieListContainer from "@/modules/movies/components/MovieListContainer";

export default function SearchPage() {
  return (
    <MovieListContainer 
      type="search" 
      emptyMessage="No movies found matching your search"
      emptyDescription="Try different keywords or check your spelling"
      endMessage="You've reached the end of the search results"
    />
  );
}
