import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './components/Navbar.jsx'

import Layout from "./Layout/Layout.jsx";
import Home from "./pages/Home";
import Watch from "./pages/Watch";
import Search from "./pages/Search";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Upload from "./pages/Upload";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
  
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="watch/:id" element={<Watch />} />
          <Route path="search" element={<Search />} />
          <Route path="movies" element={<Movies />} />
          <Route path="series" element={<Series />} />
          <Route path="upload" element={<Upload />} />
          <Route path="watchlist" element={<Watchlist />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
