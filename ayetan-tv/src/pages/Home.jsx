import React, { useState, useEffect } from "react";
import "./pages.css";
import { NavLink, Link } from "react-router-dom";
import { fetchTrendingMovies } from "../services/tmdbApi";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrendingMovies();
        setTrendingMovies(data.slice(0, 6));
      } catch (err) {
        console.error('Error loading trending movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  const featuredMovie = trendingMovies[0];

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-screen w-full bg-cover bg-center flex items-center justify-center contained pt-20"
        style={{}}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-2xl">
          {/* Logo */}
        
          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-light mb-2">Welcome to</h1>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-red-400 via-white to-red-400 bg-clip-text text-transparent">
            Ayetan TV
          </h1>

          {/* Description */}
          <p className="text-xs md:text-sm lg:text-base mb-8 text-gray-300 leading-relaxed max-w-xl mx-auto">
            Experience unlimited entertainment with our vast collection of movies, series, and exclusive content. Stream your favorite shows anytime, anywhere.
          </p>

          {/* CTA Button */}
          <NavLink to={"/movies"}>
            <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition duration-300 px-8 py-4 rounded-full text-lg md:text-xl font-bold shadow-xl hover:shadow-orange-500/50 hover:scale-110 transform">
              Start Watching Now
            </button>
          </NavLink>
        </div>
      </div>

      {/* Trending Section */}
      {!loading && trendingMovies.length > 0 && (
        <div className="bg-gray-900 text-white px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Trending Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingMovies.map(movie => (
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
          </div>
        </div>
      )}    </div>
  );
}