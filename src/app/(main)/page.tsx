"use client";

import MoviesList from "@/modules/movies/components/MoviesList";

function Home() {
  return (
    <div className="space-y-16 py-8">
      <MoviesList 
        category="top_rated"
        title="Top Rated Movies"
        description="Discover the highest rated movies of all time"
      />
      
      <MoviesList 
        category="upcoming"
        title="Upcoming Movies"
        description="The latest movies coming soon to theaters"
      />
      
      <MoviesList 
        category="now_playing"
        title="Now Playing"
        description="Movies currently in theaters"
      />
      
      <MoviesList 
        category="popular"
        title="Popular Movies"
        description="Trending movies loved by audiences"
      />
    </div>
  );
}

export default Home;
