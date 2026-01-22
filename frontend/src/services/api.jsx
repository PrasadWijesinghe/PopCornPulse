import axios from 'axios';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

// Validate environment variables
if (!API_KEY || !BEARER_TOKEN) {
  throw new Error('Missing TMDb API key or bearer token in environment variables');
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
});

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/popular', {
      params: {
        language: 'en-US',
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getTopratedMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/top_rated', {
      params: {
        language: 'en-US',
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await api.get('/movie/upcoming', {
      params: {
        language: 'en-US',
        page,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Upcoming movies:', error);
    throw error;
  }
};

export const findByExternalId = async (externalId, externalSource = "imdb_id") => {
  try {
    const response = await api.get(`/find/${externalId}`, {
      params: {
        external_source: externalSource,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error finding by external ID:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get('/search/movie', {
      params: {
        language: 'en-US',
        query,
        include_adult: false,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const useMovieDetails = (id) => {
  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setVideos(videosRes.data.results); // Save videos
        setProviders(providersRes.data.results); // Save watch providers
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

  return { movie, similar, reviews, images, videos, providers, loading, imagesLoading, error };
};