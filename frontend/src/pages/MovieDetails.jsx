import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        setMovie(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-white text-2xl">Loading...</div>;
  if (error) return <div className="text-red-500 text-2xl">{error}</div>;
  if (!movie) return null;

  return (
    <div className="flex flex-col items-center px-4 pt-24 min-h-screen bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700">
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ''}
        alt={movie.title}
        className="w-64 rounded-lg shadow-lg mb-4"
      />
      <h1 className="text-3xl font-bold text-white mb-2">{movie.title}</h1>
      <p className="text-white mb-2">{movie.overview}</p>
      <div className="text-yellow-400 mb-2">★ {movie.vote_average}</div>
      <div className="text-white">Release Date: {movie.release_date}</div>
    </div>
  );
};

export default MovieDetails;
