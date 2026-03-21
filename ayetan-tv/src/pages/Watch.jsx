import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails, fetchSeriesDetails } from "../services/tmdbApi";

function Watch() {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to fetch as movie first, then as series
        let data = await fetchMovieDetails(id);
        if (!data) {
          data = await fetchSeriesDetails(id);
        }
        
        if (!data) {
          setError('Content not found');
        } else {
          setContent(data);
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 px-6 flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900 text-red-100 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-400">Content not found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="bg-black h-96 flex items-center justify-center relative">
            {content.backdrop && (
              <img
                src={content.backdrop}
                alt={content.title}
                className="w-full h-full object-cover"
              />
            )}
            <span className="absolute text-4xl">▶️ Video Player</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        
        <div className="flex gap-4 mb-6 text-sm text-gray-400">
          <span>⭐ {content.rating?.toFixed(1) || 'N/A'}</span>
          {content.runtime && <span>⏱️ {content.runtime} min</span>}
          {content.seasons && <span>📺 {content.seasons} seasons</span>}
          {content.releaseDate && <span>📅 {content.releaseDate}</span>}
          {content.firstAir && <span>📅 {content.firstAir}</span>}
        </div>

        {content.genres && content.genres.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {content.genres.map(genre => (
              <span key={genre} className="bg-red-600 px-3 py-1 rounded text-sm">
                {genre}
              </span>
            ))}
          </div>
        )}

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-300 leading-relaxed">
            {content.description || 'No description available'}
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default Watch;
