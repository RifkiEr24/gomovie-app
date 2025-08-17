import MovieDetailContent from "@/modules/movies/components/MovieDetailContent";

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { id } = params;
  
  return <MovieDetailContent id={id} />;
}
