"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Navbar from '../components/Navbar';
import FooterNav from '../components/FooterNav';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [providers, setProviders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [expandedReview, setExpandedReview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieRes, similarRes, reviewsRes, imagesRes, videosRes, providersRes] = await Promise.all([
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
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
            headers: {
              accept: 'application/json',
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
            },
          }),
        ]);
        setMovie(movieRes.data);
        setSimilar(similarRes.data.results.slice(0, 8));
        setReviews(reviewsRes.data.results);
        setImages(imagesRes.data.backdrops.concat(imagesRes.data.posters).slice(0, 8));
        setVideos(videosRes.data.results);
        setProviders(providersRes.data);
        setLoading(false);
        setImagesLoading(false);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg mt-4">Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="bg-red-500/20 border border-red-500 text-red-400 text-lg rounded-lg p-4 max-w-lg text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full flex flex-col items-center px-4 pt-24 pb-16 bg-gradient-to-b from-zinc-900 to-zinc-800 min-h-screen font-['Inter',sans-serif]"
      >
        <div className="w-full max-w-7xl mx-auto mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="text-white/90 hover:text-blue-400 flex items-center gap-2 transition-colors duration-300"
            aria-label="Back to home"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </motion.button>
        </div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-7xl mx-auto bg-black/40 rounded-3xl shadow-2xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8">
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              alt={`${movie.title} poster`}
              className="w-full md:w-96 rounded-lg shadow-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                {movie.title}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-yellow-400 text-lg font-semibold">★ {movie.vote_average?.toFixed(1)}</span>
                <span className="text-gray-300 text-sm">({movie.vote_count} votes)</span>
              </div>
              <p className="text-white/90 text-base mb-6 leading-relaxed">{movie.overview}</p>
              <div className="text-white/80 mb-3">
                <span className="font-semibold">Release Date:</span> {movie.release_date || 'N/A'}
              </div>
              <div className="text-white/80 mb-3">
                <span className="font-semibold">Genres:</span>{' '}
                {movie.genres?.map((g) => g.name).join(', ') || 'N/A'}
              </div>
              <div className="text-white/80">
                <span className="font-semibold">Runtime:</span>{' '}
                {movie.runtime ? `${movie.runtime} min` : 'N/A'}
              </div>
            </div>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-7xl mx-auto bg-black/40 rounded-3xl p-6 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">
            Movie Images
          </h2>
          {imagesLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-base mt-3">Loading images...</p>
            </div>
          ) : images.length === 0 ? (
            <div className="text-gray-300 text-base">No images available.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {images.map((img, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                  alt={`${movie.title} image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-lg transition-transform duration-300"
                />
              ))}
            </div>
          )}
        </motion.div>

    
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full max-w-7xl mx-auto bg-black/40 rounded-3xl p-6 mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">
            Similar Movies
          </h2>
          {similar.length === 0 ? (
            <div className="text-gray-300 text-base">No similar movies found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {similar.map((sim) => (
                <Link to={`/movie/${sim.id}`} key={sim.id}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300"
                  >
                    <img
                      src={
                        sim.poster_path
                          ? `https://image.tmdb.org/t/p/w300${sim.poster_path}`
                          : 'https://via.placeholder.com/300x450?text=No+Poster'
                      }
                      alt={`${sim.title} poster`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white text-sm font-semibold truncate">{sim.title}</h3>
                      <div className="text-yellow-400 text-xs">★ {sim.vote_average?.toFixed(1)}</div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="w-full max-w-7xl mx-auto bg-black/40 rounded-3xl p-6"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">
            Reviews
          </h2>
          {reviews.length === 0 ? (
            <div className="text-gray-300 text-base">No reviews found.</div>
          ) : (
            <ul className="space-y-6">
              {reviews.map((review) => (
                <li key={review.id} className="border-b border-white/10 pb-6">
                  <div className="flex items-center mb-3">
                    <span className="font-semibold text-white text-lg">{review.author}</span>
                    <span className="ml-3 text-sm text-gray-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-white/90 text-base leading-relaxed">
                    {expandedReview === review.id
                      ? review.content
                      : truncateText(review.content, 200)}
                  </p>
                  {review.content.length > 200 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() =>
                        setExpandedReview(expandedReview === review.id ? null : review.id)
                      }
                      className="text-blue-400 hover:text-blue-300 text-sm mt-3 font-medium"
                    >
                      {expandedReview === review.id ? 'Show Less' : 'Read More'}
                    </motion.button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Video Section */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6, duration: 0.8 }}
  className="w-full max-w-7xl mx-auto bg-black/40 rounded-3xl p-6 mb-12"
>
  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">
    Trailers & Videos
  </h2>
  {videos.length === 0 ? (
    <div className="text-gray-300 text-base">No videos available.</div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {videos
        .filter((video) => video.site === "YouTube")
        .slice(0, 2) // Limit to 2 videos
        .map((video) => (
          <div key={video.id} className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${video.key}`}
              title={video.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        ))}
    </div>
  )}
</motion.div>

{/* Watch Providers Section */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 0.8 }}
  className="w-full max-w-7xl mx-auto bg-black/40 rounded-3xl p-6 mb-12"
>
  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-6">
    Where to Watch
  </h2>
  {providers.US ? (
    <div className="flex flex-wrap gap-4">
      {providers.US.flatrate?.map((provider) => (
        <div key={provider.provider_id} className="flex flex-col items-center">
          <img
            src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
            alt={provider.provider_name}
            className="w-16 h-16 rounded-full shadow-lg"
          />
          <span className="text-white text-sm mt-2">{provider.provider_name}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-gray-300 text-base">No watch providers available.</div>
  )}
</motion.div>
      </motion.div>
      <FooterNav />
    </>
  );
};

export default MovieDetails;