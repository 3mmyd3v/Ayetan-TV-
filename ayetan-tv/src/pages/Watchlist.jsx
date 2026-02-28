import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pages.css";

const Watchlist = () => {
  const [watchlistItems, setWatchlistItems] = useState([
    {
      id: 1,
      title: "Sample Video 1",
      thumbnail: "https://via.placeholder.com/200x120",
      duration: "12:34",
      views: "1.2M",
    },
    {
      id: 2,
      title: "Sample Video 2",
      thumbnail: "https://via.placeholder.com/200x120",
      duration: "8:45",
      views: "856K",
    },
    {
      id: 3,
      title: "Sample Video 3",
      thumbnail: "https://via.placeholder.com/200x120",
      duration: "15:20",
      views: "2.3M",
    },
  ]);

  const removeFromWatchlist = (id) => {
    setWatchlistItems(watchlistItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>

        {watchlistItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">
              Your watchlist is empty
            </p>
            <Link
              to="/"
              className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded font-semibold inline-block">
              Browse Videos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
                <div className="relative">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-32 object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-xs rounded">
                    {item.duration}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {item.views} views
                  </p>

                  <div className="flex gap-2">
                    <Link
                      to={`/watch/${item.id}`}
                      className="flex-1 bg-red-600 hover:bg-red-700 transition py-2 rounded text-center font-semibold text-sm">
                      Watch
                    </Link>
                    <button
                      onClick={() => removeFromWatchlist(item.id)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 transition py-2 rounded text-center font-semibold text-sm">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
