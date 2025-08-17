import { notFound } from "next/navigation";
import MovieListContainer from "@/modules/movies/components/MovieListContainer";
import { MovieCategory } from "@/modules/movies/types/movie";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  const validCategories = ["top_rated", "upcoming", "now_playing", "popular"];
  if (!validCategories.includes(category)) {
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
