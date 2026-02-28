import { useParams } from "react-router-dom";

function Watch() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          <div className="bg-black h-96 flex items-center justify-center">
            <span className="text-4xl">▶️ Video Player</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Video Title - ID: {id}</h1>
        <p className="text-gray-400 mb-6">1.2M views • 2 days ago</p>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-gray-300 leading-relaxed">
            This is a sample video description. Your video content and details will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Watch;
