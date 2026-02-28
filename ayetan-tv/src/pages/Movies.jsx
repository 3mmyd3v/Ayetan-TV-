import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

const Movies = () => {
  const movies = [
    {
      id: 1,
      title: 'Action Movie 1',
      thumbnail: 'https://via.placeholder.com/200x300',
      rating: '8.5',
      views: '2.1M',
    },
    {
      id: 2,
      title: 'Drama Movie 2',
      thumbnail: 'https://via.placeholder.com/200x300',
      rating: '7.8',
      views: '1.8M',
    },
    {
      id: 3,
      title: 'Comedy Movie 3',
      thumbnail: 'https://via.placeholder.com/200x300',
      rating: '7.2',
      views: '1.5M',
    },
    {
      id: 4,
      title: 'Thriller Movie 4',
      thumbnail: 'https://via.placeholder.com/200x300',
      rating: '8.9',
      views: '2.5M',
    },
    {
      id: 5,
      title: 'Fantasy Movie 5',
      thumbnail: 'https://via.placeholder.com/200x300',
      rating: '8.1',
      views: '2.0M',
    },
    {
      id: 6,
      title: 'Sci-Fi Movie 6',
      thumbnail: 'https://via.placeholder.com/200x300',
      rating: '8.3',
      views: '2.2M',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Movies</h1>

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
                  ⭐ {movie.rating}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm">{movie.views} views</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
