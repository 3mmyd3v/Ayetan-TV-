import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Mock search results
    if (searchQuery.trim()) {
      setResults([
        {
          id: 1,
          title: `Result for "${searchQuery}" 1`,
          thumbnail: 'https://via.placeholder.com/200x120',
          views: '1.2M',
        },
        {
          id: 2,
          title: `Result for "${searchQuery}" 2`,
          thumbnail: 'https://via.placeholder.com/200x120',
          views: '856K',
        },
        {
          id: 3,
          title: `Result for "${searchQuery}" 3`,
          thumbnail: 'https://via.placeholder.com/200x120',
          views: '2.3M',
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
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

        {results.length > 0 && (
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
                    <p className="text-gray-400 text-xs">{item.views} views</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {searchQuery && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No results found</p>
          </div>
        )}

        {!searchQuery && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Start typing to search...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
