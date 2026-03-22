import express from 'express';
import axios from 'axios';

const router = express.Router();
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Error handling
const handleError = (res, error) => {
  console.error('TMDB API Error:', error.message);
  res.status(error.response?.status || 500).json({
    error: error.message,
    details: error.response?.data,
  });
};

// Get trending movies
router.get('/trending/movies', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/movie/week`, {
      params: { api_key: TMDB_API_KEY },
    });
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      thumbnail: `${IMAGE_BASE_URL}${movie.poster_path}`,
      rating: movie.vote_average,
      views: `${Math.floor(movie.popularity / 1000)}K`,
      description: movie.overview,
    }));
    res.json({ results: movies });
  } catch (error) {
    handleError(res, error);
  }
});

// Get trending series
router.get('/trending/series', async (req, res) => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/trending/tv/week`, {
      params: { api_key: TMDB_API_KEY },
    });
    const series = response.data.results.map(show => ({
      id: show.id,
      title: show.name,
      thumbnail: `${IMAGE_BASE_URL}${show.poster_path}`,
      rating: show.vote_average,
      views: `${Math.floor(show.popularity / 1000)}K`,
      description: show.overview,
    }));
    res.json({ results: series });
  } catch (error) {
    handleError(res, error);
  }
});

// Search movies
router.get('/search/movies', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page,
      },
    });
    const movies = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      thumbnail: `${IMAGE_BASE_URL}${movie.poster_path}`,
      rating: movie.vote_average,
      description: movie.overview,
    }));
    res.json({ results: movies, totalPages: response.data.total_pages });
  } catch (error) {
    handleError(res, error);
  }
});

// Search series
router.get('/search/series', async (req, res) => {
  try {
    const { query, page = 1 } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    const response = await axios.get(`${TMDB_BASE_URL}/search/tv`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page,
      },
    });
    const series = response.data.results.map(show => ({
      id: show.id,
      title: show.name,
      thumbnail: `${IMAGE_BASE_URL}${show.poster_path}`,
      rating: show.vote_average,
      description: show.overview,
    }));
    res.json({ results: series, totalPages: response.data.total_pages });
  } catch (error) {
    handleError(res, error);
  }
});

// Get movie details
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    const movie = {
      id: response.data.id,
      title: response.data.title,
      description: response.data.overview,
      rating: response.data.vote_average,
      releaseDate: response.data.release_date,
      genres: response.data.genres,
      runtime: response.data.runtime,
      thumbnail: `${IMAGE_BASE_URL}${response.data.poster_path}`,
      backdrop: `${IMAGE_BASE_URL}${response.data.backdrop_path}`,
    };
    res.json(movie);
  } catch (error) {
    handleError(res, error);
  }
});

// Get series details
router.get('/series/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${id}`, {
      params: { api_key: TMDB_API_KEY },
    });
    const series = {
      id: response.data.id,
      title: response.data.name,
      description: response.data.overview,
      rating: response.data.vote_average,
      firstAirDate: response.data.first_air_date,
      genres: response.data.genres,
      numberOfSeasons: response.data.number_of_seasons,
      thumbnail: `${IMAGE_BASE_URL}${response.data.poster_path}`,
      backdrop: `${IMAGE_BASE_URL}${response.data.backdrop_path}`,
    };
    res.json(series);
  } catch (error) {
    handleError(res, error);
  }
});

export default router;
