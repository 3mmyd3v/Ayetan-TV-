import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Series = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const series = [
    {
      id: 1,
      title: 'Action Series 1',
      thumbnail: 'https://via.placeholder.com/200x300',
      genre: 'action',
      seasons: 3,
      views: '1.8M',
    },
    {
      id: 2,
      title: 'Drama Series 2',
      thumbnail: 'https://via.placeholder.com/200x300',
      genre: 'drama',
      seasons: 5,
      views: '2.1M',
    },
    {
      id: 3,
      title: 'Comedy Series 3',
      thumbnail: 'https://via.placeholder.com/200x300',
      genre: 'comedy',
      seasons: 4,
      views: '1.5M',
    },
    {
      id: 4,
      title: 'Mystery Series 4',
      thumbnail: 'https://via.placeholder.com/200x300',
      genre: 'mystery',
      seasons: 2,
      views: '1.9M',
    },
    {
      id: 5,
      title: 'Sci-Fi Series 5',
      thumbnail: 'https://via.placeholder.com/200x300',
      genre: 'scifi',
      seasons: 3,
      views: '2.3M',
    },
    {
      id: 6,
      title: 'Fantasy Series 6',
      thumbnail: 'https://via.placeholder.com/200x300',
      genre: 'fantasy',
      seasons: 4,
      views: '2.4M',
    },
  ];

  const filteredSeries =
    selectedGenre === 'all'
      ? series
      : series.filter(s => s.genre === selectedGenre);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
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
                <p className="text-gray-400 text-sm">{s.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Series;
