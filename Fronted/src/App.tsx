import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Footer from "./components/Footer";
import { PopupProvider } from "./context/PopupContext"; // 🌟 universal popup system
import { Toaster } from "react-hot-toast"; // optional for stylish success/error toast

/**
 * Main App
 * - Handles navigation + popup context + dark mode
 * - Includes smooth transitions and toasts
 */
const App: React.FC = () => {
  return (
    <PopupProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* 🔝 Navbar */}
        <Navbar />

        {/* 🌍 Page Container */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* 🔻 Footer */}
        <Footer />

        {/* 🌈 Global Popups / Toasts */}
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      </div>
    </PopupProvider>
  );
};

export default App;