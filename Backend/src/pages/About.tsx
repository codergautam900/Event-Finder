import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaCode, FaSun, FaCloudMoon } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <section className="relative py-16 px-4 sm:px-8 bg-gradient-to-b from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-black min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200/40 dark:border-gray-700/50"
      >
        {/* 🌟 Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            About <span className="text-indigo-600">EventFinder</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Discover. Join. Create. All in one place.
          </p>
        </div>

        {/* ✨ Content Section */}
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            <strong>EventFinder</strong> is a modern, frontend-only demo app built
            with <span className="text-indigo-600 font-medium">React</span>,{" "}
            <span className="text-sky-500 font-medium">TypeScript</span>, and{" "}
            <span className="text-pink-500 font-medium">TailwindCSS</span>.
            It showcases how you can design elegant, responsive interfaces with
            dynamic routing, mock authentication, and localStorage-powered data
            flow — all without a backend.
          </p>

          <p>
            This project includes essential UI components such as login/signup
            pages, event CRUD cards, modals, and a fully working dark mode
            switch. Everything has been crafted with production-level attention
            to responsiveness and UX.
          </p>

          <p>
            The goal of this project is to serve as a{" "}
            <strong>starter template</strong> for full-stack apps — allowing you
            to plug in real APIs or databases later while keeping a polished UI
            foundation.
          </p>
        </div>

        {/* 💻 Tech Icons Section */}
        <div className="flex items-center justify-center gap-8 mt-8 text-3xl text-gray-500 dark:text-gray-400">
          <FaReact className="hover:text-sky-500 transition-transform transform hover:scale-110" />
          <FaCode className="hover:text-indigo-500 transition-transform transform hover:scale-110" />
          <FaSun className="hover:text-yellow-400 transition-transform transform hover:scale-110" />
          <FaCloudMoon className="hover:text-purple-400 transition-transform transform hover:scale-110" />
        </div>

        {/* ❤ Footer Note */}
        <div className="text-center mt-10 text-sm text-gray-500 dark:text-gray-500">
          Built with ❤ by{" "}
          <span className="text-indigo-600 font-semibold">Gautam</span>
        </div>
      </motion.div>
    </section>
  );
};

export default About;