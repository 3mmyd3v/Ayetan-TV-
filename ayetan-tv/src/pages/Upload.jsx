import React, { useState } from 'react';
import './pages.css';

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Uploading:', formData);
    // Handle upload logic here
    setFormData({ title: '', description: '', file: null });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Upload Video</h1>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Video Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter video title"
              className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter video description"
              rows="4"
              className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Select Video File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="video/*"
              className="w-full px-4 py-2 bg-gray-700 rounded text-white focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded font-semibold"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default Upload;
