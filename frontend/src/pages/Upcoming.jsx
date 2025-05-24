import React, { useEffect, useState } from "react";
import { getUpcomingMovies } from "../services/api";
import MovieCard from "../components/MovieCard";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = () => {
    // Optionally implement search logic here
    // setMovies(movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase())));
  };

  return (
    <>
      <Navbar />
      <div className="w-full flex flex-col items-center px-4 pt-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 min-h-screen">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="text-2xl md:text-5xl font-bold dark:text-black text-center mb-8 mt-2">
          Upcoming Movies
        </div>
        {loading && <div className="text-white text-2xl">Loading...</div>}
        {error && <div className="text-red-500 text-2xl">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Upcoming;
