import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPopularSeries } from '../services/tmdbApi';
import './pages.css';

const Series = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSeries = async () => {
      try {
        setLoading(true);
        const data = await fetchPopularSeries();
        setSeries(data);
        setError(null);
      } catch (err) {
        console.error('Error loading series:', err);
        setError('Failed to load series. Please try again later.');
        setSeries([]);
      } finally {
        setLoading(false);
      }
    };

    loadSeries();
  }, []);

  const filteredSeries =
    selectedGenre === 'all'
      ? series
      : series.filter(s => s.genre === selectedGenre);

  return (
    <div className="min-h-screen text-white pt-20 px-6" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1550745165-9491bb59b1bb?w=1200&h=800&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      <div className="absolute inset-0 bg-black/70" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}></div>
      <div style={{position: 'relative', zIndex: 1}}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Series</h1>

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre('all')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'all'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedGenre('action')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'action'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Action
          </button>
          <button
            onClick={() => setSelectedGenre('drama')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'drama'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Drama
          </button>
          <button
            onClick={() => setSelectedGenre('comedy')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'comedy'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Comedy
          </button>
          <button
            onClick={() => setSelectedGenre('mystery')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'mystery'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Mystery
          </button>
          <button
            onClick={() => setSelectedGenre('scifi')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'scifi'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Sci-Fi
          </button>
          <button
            onClick={() => setSelectedGenre('fantasy')}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGenre === 'fantasy'
                ? 'bg-red-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            Fantasy
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl text-gray-400">Loading series...</div>
          </div>
        ) : error ? (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : series.length === 0 ? (
          <div className="text-center text-gray-400">No series found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map(s => (
              <Link
                key={s.id}
                to={`/watch/${s.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={s.thumbnail}
                    alt={s.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-red-600 px-3 py-1 rounded text-sm font-semibold">
                    {s.seasons} seasons
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{s.views} popularity</p>
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

export default Series;
