import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularMovies } from '../services/tmdbApi';
import './pages.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularMovies();
        setMovies(data);
        setError(null);
      } catch (err) {
        console.error('Error loading movies:', err);
        setError('Failed to load movies. Please try again later.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen text-white pt-20 px-6" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      <div className="absolute inset-0 bg-black/70" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}></div>
      <div style={{position: 'relative', zIndex: 1}}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl text-gray-400">Loading movies...</div>
          </div>
        ) : error ? (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center text-gray-400">No movies found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map(movie => (
              <Link
                key={movie.id}
                to={`/watch/${movie.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={movie.thumbnail}
                    alt={movie.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                    ⭐ {movie.rating.toFixed(1)}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{movie.views} popularity</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Movies;
