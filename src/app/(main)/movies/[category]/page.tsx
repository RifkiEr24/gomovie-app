import { notFound } from "next/navigation";
import MovieListContainer from "@/modules/movies/components/MovieListContainer";
import type { MovieCategory } from "@/modules/movies/types/movie";

const validCategories = ["top_rated", "upcoming", "now_playing", "popular"] as const;
type ValidCategory = typeof validCategories[number];

function isValidCategory(v: string): v is ValidCategory {
  return (validCategories as readonly string[]).includes(v);
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  return (
    <MovieListContainer
      type="category"
      category={category as MovieCategory}
      endMessage="You've reached the end of the list"
    />
  );
}
