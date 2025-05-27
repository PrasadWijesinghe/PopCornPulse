"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  
  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const data = await searchMovies(search.trim());
      if (data.results && data.results.length > 0) {
        setMovies(data.results);
        setError(null);
      } else {
        setMovies([]);
        setError("No movies found for this search.");
      }
    } catch (err) {
      setError("Failed to search for movies.");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="w-full flex flex-col items-center px-4 pt-24 bg-zinc-900"
      >
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="text-2xl md:text-5xl font-bold dark:text-zinc-500 text-center mb-8 mt-2">
          Popular Movies
        </div>
        {loading && <div className="text-white text-2xl">Loading...</div>}
        {error && <div className="text-red-500 text-2xl">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default Home;