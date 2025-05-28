"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import FooterNav from "../components/FooterNav";
import { getPopularMovies, getTopratedMovies, getUpcomingMovies, searchMovies } from "../services/api";

function Hero() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [moviesarys, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [popularData, topRatedData, upcomingData] = await Promise.all([
          getPopularMovies(1), // Fetch only the first page
          getTopratedMovies(1),
          getUpcomingMovies(1),
        ]);

        setPopularMovies(popularData.results.slice(0, 5)); // Limit to 5 movies
        setTopRatedMovies(topRatedData.results.slice(0, 5));
        setUpcomingMovies(upcomingData.results.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
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
      setError("Failed to search for movies. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="w-full flex flex-col items-center px-4 pt-24 pb-16 bg-gradient-to-b from-zinc-900 to-zinc-800 min-h-screen"
      >
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={handleSearch}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white text-lg mt-4">Loading movies...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 text-lg rounded-lg p-4 max-w-lg text-center">
            {error}
          </div>
        )}

        {/* Search Results Section */}
        {moviesarys.length > 0 && (
          <div className="w-full max-w-7xl mt-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
              Search Results
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {moviesarys.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="relative group"
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Movies Section */}
        <div className="w-full max-w-7xl mt-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            Popular Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMovies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <Link
              to="/popular"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md"
              aria-label="See more popular movies"
            >
              See More
            </Link>
          </div>
        </div>

        {/* Top Rated Movies Section */}
        <div className="w-full max-w-7xl mt-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            Top Rated Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {topRatedMovies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <Link
              to="/toprated"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md"
              aria-label="See more top rated movies"
            >
              See More
            </Link>
          </div>
        </div>

        {/* Upcoming Movies Section */}
        <div className="w-full max-w-7xl mt-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-8">
            Upcoming Movies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {upcomingMovies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-8">
            <Link
              to="/upcoming"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-500 transition-all duration-300 shadow-md"
              aria-label="See more upcoming movies"
            >
              See More
            </Link>
          </div>
        </div>
      </motion.div>
      <FooterNav />
    </>
  );
}

export default Hero;