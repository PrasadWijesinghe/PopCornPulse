"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import FooterNav from "../components/FooterNav";
import { getPopularMovies, searchMovies } from "../services/api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

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

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            i === page
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-800 text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
          aria-label={`Go to page ${i}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center gap-3">
        <button
          onClick={() => handlePageClick(1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            page === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
          aria-label="Go to first page"
        >
          First
        </button>
        <button
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            page === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
          aria-label="Go to previous page"
        >
          «
        </button>
        {pages}
        <button
          onClick={() => handlePageClick(page + 1)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            page === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
          aria-label="Go to next page"
        >
          »
        </button>
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={page === totalPages}
          className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            page === totalPages
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-gray-200 hover:bg-blue-500 hover:text-white"
          }`}
          aria-label="Go to last page"
        >
          Last
        </button>
      </div>
    );
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
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-10 mt-6 tracking-tight">
          Popular Movies
        </h1>
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
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center mt-12">
          {renderPagination()}
        </div>
      </motion.div>
      <FooterNav />
    </>
  );
}

export default Home;