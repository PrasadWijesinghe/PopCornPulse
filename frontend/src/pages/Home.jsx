"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { getPopularMovies } from "../services/api";

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

  // Optionally, implement search logic here
  const handleSearch = () => {
    // You can implement search API call here if needed
    // For now, just filter locally as an example:
    // setMovies(movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase())));
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
        className="w-full flex flex-col items-center px-4 pt-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700"
      >
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          onSearch={handleSearch}
        />
        <div className="text-2xl md:text-5xl font-bold dark:text-black text-center mb-8 mt-4">
          {/* Optional: Add a heading here */}
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