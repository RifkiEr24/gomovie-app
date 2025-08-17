import MovieDetailContent from "@/modules/movies/components/MovieDetailContent";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <MovieDetailContent id={id} />;
}
