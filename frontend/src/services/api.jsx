import axios from 'axios';

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