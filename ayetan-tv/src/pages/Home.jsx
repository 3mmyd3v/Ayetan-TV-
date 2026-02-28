import React from "react";
import "./pages.css";
import { NavLink } from "react-router-dom";
export default function Home() {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center flex items-center justify-center contained pt-20"
      style={{
      
      }}>
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
        <NavLink
        
        to={"/movies"}

        >
           <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transition duration-300 px-8 py-4 rounded-full text-lg md:text-xl font-bold shadow-xl hover:shadow-orange-500/50 hover:scale-110 transform">
          Start Watching Now
        </button>
        </NavLink>

       
      </div>
    </div>
  );
}
