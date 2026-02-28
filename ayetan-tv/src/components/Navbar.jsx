import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/Ayetan.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-transparent text-white px-6 md:px-10 py-4 z-50">
      <div className="flex items-center justify-between">
        {/* Logo - Visible on all screens */}
        <NavLink
          to="/"
          className="flex items-center">
          <img
            src={Logo}
            alt="Ayetan TV Logo"
            className="h-10 w-45 drop-shadow-lg hover:scale-110 transition"
          />
        </NavLink>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }>
            Home
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }>
            Search
          </NavLink>

          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }>
            Movies
          </NavLink>

          <NavLink
            to="/series"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }>
            Series
          </NavLink>

          <NavLink
            to="/upload"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }>
            Upload
          </NavLink>

          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }>
            Watchlist
          </NavLink>
        </div>

        {/* Right Section - SignUp Button or User Profile */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-10 w-10 rounded-full overflow-hidden border-2 border-red-600 hover:border-red-500 transition"
              >
                <img
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=dc2626&color=fff`}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="font-semibold text-white">{user.fullName}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/watchlist"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-700 text-white"
                  >
                    Watchlist
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/signup"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-red-600/50 hover:scale-105"
            >
              SignUp
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden ml-auto text-2xl hover:text-red-500 transition" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-4 flex flex-col gap-4 px-4 py-6 rounded-xl backdrop-blur-md bg-gradient-to-b from-gray-900/70 to-gray-950/70 border border-gray-700/30">
          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition py-2 px-3 rounded hover:bg-gray-700/40">
            Home
          </NavLink>

          <NavLink
            to="/search"
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition py-2 px-3 rounded hover:bg-gray-700/40">
            Search
          </NavLink>

          <NavLink
            to="/movies"
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition py-2 px-3 rounded hover:bg-gray-700/40">
            Movies
          </NavLink>

          <NavLink
            to="/series"
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition py-2 px-3 rounded hover:bg-gray-700/40">
            Series
          </NavLink>

          <NavLink
            to="/upload"
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition py-2 px-3 rounded hover:bg-gray-700/40">
            Upload
          </NavLink>

          <NavLink
            to="/watchlist"
            onClick={() => setOpen(false)}
            className="hover:text-red-500 transition py-2 px-3 rounded hover:bg-gray-700/40">
            Watchlist
          </NavLink>

          {isAuthenticated && user ? (
            <>
              <div className="border-t border-gray-700 pt-4">
                <p className="font-semibold text-white mb-2">{user.fullName}</p>
                <p className="text-sm text-gray-400 mb-4">{user.email}</p>
              </div>
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="hover:text-red-500">
                Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="text-red-400 hover:text-red-300 text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/signup"
              onClick={() => setOpen(false)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition px-6 py-3 rounded-full font-bold text-center shadow-lg hover:shadow-red-600/50">
              SignUp
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
