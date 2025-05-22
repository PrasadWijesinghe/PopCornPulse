import React from 'react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return (
    <motion.div
      className="w-64 bg-gray-800 rounded-lg overflow-hidden shadow-lg m-4"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-96 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold truncate">{movie.title}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-3">{movie.overview}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-yellow-400 text-sm">★ {movie.vote_average.toFixed(1)}</span>
          <span className="text-gray-400 text-sm">{new Date(movie.release_date).getFullYear()}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;