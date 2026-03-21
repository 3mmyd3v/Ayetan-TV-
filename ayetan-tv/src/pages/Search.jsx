import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchContent } from '../services/tmdbApi';
import './pages.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const data = await searchContent(searchQuery);
      setResults(data);
    } catch (err) {
      console.error('Error searching:', err);
      setError('Failed to search. Please try again later.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white pt-20 px-6" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1514306688772-e93a4a1b5c7f?w=1200&h=800&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      position: 'relative'
    }}>
      <div className="absolute inset-0 bg-black/70" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0}}></div>
      <div style={{position: 'relative', zIndex: 1}}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Search Videos</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos, movies, series..."
              className="flex-1 px-4 py-3 bg-gray-800 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-xl text-gray-400">Searching...</div>
          </div>
        ) : error ? (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : searched && results.length > 0 ? (
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {results.map(item => (
                <Link
                  key={item.id}
                  to={`/watch/${item.id}`}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-xs">⭐ {item.rating?.toFixed(1) || 'N/A'}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No results found</p>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Start typing to search...</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Search;
