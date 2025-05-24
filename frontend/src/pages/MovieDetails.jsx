import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
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

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        setSimilar(res.data.results);
        setSimilarLoading(false);
      } catch (err) {
        setSimilar([]);
        setSimilarLoading(false);
      }
    };
    fetchSimilar();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
          {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }
        );
        setReviews(res.data.results);
        setReviewsLoading(false);
      } catch (err) {
        setReviews([]);
        setReviewsLoading(false);
      }
    };
    fetchReviews();
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
      <div className="text-white mb-8">Release Date: {movie.release_date}</div>

      {/* Similar Movies Section */}
      <div className="w-full max-w-4xl bg-black/40 rounded-lg p-6 mt-6 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Similar Movies</h2>
        {similarLoading ? (
          <div className="text-white">Loading similar movies...</div>
        ) : similar.length === 0 ? (
          <div className="text-gray-300">No similar movies found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similar.slice(0, 8).map((sim) => (
              <Link to={`/movie/${sim.id}`} key={sim.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition">
                  <img
                    src={sim.poster_path ? `https://image.tmdb.org/t/p/w300${sim.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={sim.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-2">
                    <h3 className="text-white text-sm font-semibold truncate">{sim.title}</h3>
                    <div className="text-yellow-400 text-xs">★ {sim.vote_average?.toFixed(1)}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Reviews Section */}
      <div className="w-full max-w-2xl bg-black/40 rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
        {reviewsLoading ? (
          <div className="text-white">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-gray-300">No reviews found.</div>
        ) : (
          <ul className="space-y-6">
            {reviews.map((review) => (
              <li key={review.id} className="border-b border-white/10 pb-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-white">{review.author}</span>
                  <span className="ml-2 text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-white/90">{review.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
