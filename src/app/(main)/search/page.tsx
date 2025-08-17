import MovieListContainer from "@/modules/movies/components/MovieListContainer";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[] }>;
}) {
  const { query } = await searchParams;

  const q = Array.isArray(query) ? query.join(" ") : (query ?? "");

  return (
    <MovieListContainer
      type="search"
      searchQuery={q}
      emptyMessage="No movies found matching your search"
      emptyDescription="Try different keywords or check your spelling"
      endMessage="You've reached the end of the search results"
    />
  );
}
