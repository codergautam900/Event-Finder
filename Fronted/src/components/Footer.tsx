import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/50 dark:border-gray-800/70 mt-10">
      <div className="max-w-6xl mx-auto px-5 py-10 text-center md:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center">
          {/* 🧭 Left - Logo */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                EF
              </div>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                EventFinder
              </h1>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              Discover, join, and create amazing events around you — built with
              <span className="text-pink-500 font-semibold"> ❤ </span>
              by <span className="font-semibold text-indigo-600">Gautam</span>.
            </p>
          </div>

          {/* 🔗 Middle - Quick Links */}
          <div className="flex flex-wrap justify-center sm:justify-center md:justify-center gap-4 sm:gap-6 text-sm font-medium">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/about" },
              { name: "Create", to: "/create" },
              { name: "Login", to: "/login" },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-500 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* 🌐 Right - Social Links */}
          <div className="flex justify-center md:justify-end gap-5">
            <a
              href="https://github.com/codergautam900"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/codergautam900"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 transition text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition text-2xl"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* 📜 Bottom Line */}
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-500 border-t border-gray-200/40 dark:border-gray-800/40 pt-4">
          © {year} <span className="font-semibold text-indigo-600">EventFinder</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;