// TMDB API Configuration
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // You'll need to add this to your .env file
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Helper function to build URLs
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  
  return url.toString();
};

// Fetch trending movies
export const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(buildUrl('/trending/movie/week'));
    if (!response.ok) throw new Error('Failed to fetch trending movies');
    const data = await response.json();
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      thumbnail: `${IMAGE_BASE_URL}${movie.poster_path}`,
      rating: movie.vote_average,
      views: `${Math.floor(movie.popularity / 1000)}K`,
      description: movie.overview,
    }));
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Fetch popular movies
export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await fetch(buildUrl('/movie/popular', { page }));
    if (!response.ok) throw new Error('Failed to fetch popular movies');
    const data = await response.json();
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      thumbnail: `${IMAGE_BASE_URL}${movie.poster_path}`,
      rating: movie.vote_average,
      views: `${Math.floor(movie.popularity / 1000)}K`,
      description: movie.overview,
    }));
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch TV series
export const fetchPopularSeries = async (page = 1) => {
  try {
    const response = await fetch(buildUrl('/tv/popular', { page }));
    if (!response.ok) throw new Error('Failed to fetch popular series');
    const data = await response.json();
    return data.results.map(series => ({
      id: series.id,
      title: series.name,
      thumbnail: `${IMAGE_BASE_URL}${series.poster_path}`,
      seasons: series.number_of_seasons,
      views: `${Math.floor(series.popularity / 1000)}K`,
      description: series.overview,
    }));
  } catch (error) {
    console.error('Error fetching popular series:', error);
    return [];
  }
};

// Search movies and TV series
export const searchContent = async (query) => {
  try {
    const response = await fetch(buildUrl('/search/multi', { query }));
    if (!response.ok) throw new Error('Failed to search content');
    const data = await response.json();
    return data.results
      .filter(item => item.media_type !== 'person' && (item.poster_path || item.backdrop_path))
      .map(item => ({
        id: item.id,
        title: item.media_type === 'movie' ? item.title : item.name,
        thumbnail: `${IMAGE_BASE_URL}${item.poster_path || item.backdrop_path}`,
        type: item.media_type,
        rating: item.vote_average,
        views: `${Math.floor(item.popularity / 1000)}K`,
        description: item.overview,
      }));
  } catch (error) {
    console.error('Error searching content:', error);
    return [];
  }
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await fetch(buildUrl(`/movie/${movieId}`));
    if (!response.ok) throw new Error('Failed to fetch movie details');
    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      poster: `${IMAGE_BASE_URL}${data.poster_path}`,
      backdrop: `${IMAGE_BASE_URL}${data.backdrop_path}`,
      rating: data.vote_average,
      releaseDate: data.release_date,
      runtime: data.runtime,
      genres: data.genres.map(g => g.name),
      description: data.overview,
      popularity: Math.floor(data.popularity),
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Fetch TV series details
export const fetchSeriesDetails = async (seriesId) => {
  try {
    const response = await fetch(buildUrl(`/tv/${seriesId}`));
    if (!response.ok) throw new Error('Failed to fetch series details');
    const data = await response.json();
    return {
      id: data.id,
      title: data.name,
      poster: `${IMAGE_BASE_URL}${data.poster_path}`,
      backdrop: `${IMAGE_BASE_URL}${data.backdrop_path}`,
      rating: data.vote_average,
      firstAir: data.first_air_date,
      seasons: data.number_of_seasons,
      episodes: data.number_of_episodes,
      genres: data.genres.map(g => g.name),
      description: data.overview,
      popularity: Math.floor(data.popularity),
    };
  } catch (error) {
    console.error('Error fetching series details:', error);
    return null;
  }
};

export { IMAGE_BASE_URL };
