import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // <-- Add this import

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieRes, similarRes, reviewsRes, imagesRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/images`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }),
        ]);
        setMovie(movieRes.data);
        setSimilar(similarRes.data.results.slice(0, 8));
        setReviews(reviewsRes.data.results);
        setImages(imagesRes.data.backdrops.concat(imagesRes.data.posters).slice(0, 8)); // Limit to 8 images
        setLoading(false);
        setImagesLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details');
        setLoading(false);
        setImagesLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-2xl animate-pulse">Loading...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-red-400 text-2xl">{error}</div>
      </div>
    );
  }
  if (!movie) return null;

  return (
    <div className="flex flex-col items-center px-2 sm:px-4 md:px-6 pt-24 pb-12 min-h-screen bg-gray-900 font-['Inter',sans-serif]">
      <Navbar /> {/* <-- Add this line at the top */}
      <div className="w-full max-w-6xl mx-auto mb-6 px-2">
        <button
          onClick={() => navigate('/')}
          className="text-white/80 hover:text-white flex items-center gap-2 transition-colors duration-200"
          aria-label="Back to home"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-black/30 rounded-3xl shadow-2xl p-6 mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={`${movie.title} poster`}
            className="w-full md:w-80 rounded-lg shadow-lg object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{movie.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-400">★ {movie.vote_average?.toFixed(1)}</span>
              <span className="text-gray-300 text-sm">({movie.vote_count} votes)</span>
            </div>
            <p className="text-white/90 mb-4">{movie.overview}</p>
            <div className="text-white/80 mb-2">
              <span className="font-semibold">Release Date:</span> {movie.release_date}
            </div>
            <div className="text-white/80 mb-2">
              <span className="font-semibold">Genres:</span>{' '}
              {movie.genres?.map((g) => g.name).join(', ') || 'N/A'}
            </div>
            <div className="text-white/80">
              <span className="font-semibold">Runtime:</span>{' '}
              {movie.runtime ? `${movie.runtime} min` : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto bg-black/40 rounded-3xl p-6 mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">Movie Images</h2>
        {imagesLoading ? (
          <div className="text-white">Loading images...</div>
        ) : images.length === 0 ? (
          <div className="text-gray-300">No images available.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt={`${movie.title} image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        )}
      </div>

      {/* Similar Movies Section */}
      <div className="w-full max-w-6xl mx-auto bg-black/40 rounded-3xl p-6 mb-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">Similar Movies</h2>
        {similar.length === 0 ? (
          <div className="text-gray-300">No similar movies found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {similar.map((sim) => (
              <Link to={`/movie/${sim.id}`} key={sim.id}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
                  <img
                    src={
                      sim.poster_path
                        ? `https://image.tmdb.org/t/p/w300${sim.poster_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Poster'
                    }
                    alt={`${sim.title} poster`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3">
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
      <div className="w-full max-w-6xl mx-auto bg-black/40 rounded-3xl p-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-white mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <div className="text-gray-300">No reviews found.</div>
        ) : (
          <ul className="space-y-6">
            {reviews.map((review) => (
              <li key={review.id} className="border-b border-white/10 pb-4">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-white">{review.author}</span>
                  <span className="ml-2 text-xs text-gray-400">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-white/90">
                  {expandedReview === review.id
                    ? review.content
                    : truncateText(review.content, 200)}
                </p>
                {review.content.length > 200 && (
                  <button
                    onClick={() =>
                      setExpandedReview(expandedReview === review.id ? null : review.id)
                    }
                    className="text-amber-400 hover:text-amber-300 text-sm mt-2"
                  >
                    {expandedReview === review.id ? 'Show Less' : 'Read More'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;