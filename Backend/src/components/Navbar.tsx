import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // ✅ for hamburger icons

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    sessionStorage.setItem("justLoggedOut", "true");
    navigate("/login", {replace: true,
      state:{ fromLogout:true } });
  };

  return (
    <nav className="bg-white/40 backdrop-blur-lg border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* 🌟 Logo */}
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
        >
          EventFinder
        </Link>

        {/* 🍔 Mobile Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* 🌈 Menu Items */}
        <div
          className={`flex-col md:flex-row md:flex items-center gap-6 absolute md:static left-0 top-16 w-full md:w-auto bg-white/90 md:bg-transparent backdrop-blur-lg md:backdrop-blur-0 border-b md:border-none p-4 md:p-0 transition-all duration-300 ease-in-out ${
            menuOpen
              ? "flex opacity-100 translate-y-0"
              : "hidden md:flex opacity-0 md:opacity-100 -translate-y-5 md:translate-y-0"
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Home
          </Link>
          <Link
            to="/create"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            Create Event
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-gray-700 hover:text-indigo-600 font-medium transition"
          >
            About
          </Link>

          {/* 🔐 Auth Section */}
          {user ? (
            <div className="flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0">
              <span className="text-gray-800 font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-1.5 rounded-lg shadow hover:scale-105 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-3 mt-2 md:mt-0">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}