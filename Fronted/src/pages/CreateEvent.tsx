import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  // 🔐 Redirect if not logged in (✅ fixed double-toast issue)
  useEffect(() => {
    if (!authLoading) {
      const justLoggedOut = sessionStorage.getItem("justLoggedOut");

      if (!user && !justLoggedOut) {
        toast.info("⚠ Please login first to create an event!");
        navigate("/login");
      }

      // remove the flag after using once
      sessionStorage.removeItem("justLoggedOut");
    }
  }, [user, authLoading, navigate]);

  // 🕒 Wait till auth state resolves
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600 dark:text-gray-300">
        Checking authentication...
      </div>
    );
  }

  // ⛔ Stop rendering for guests
  if (!user) return null;

  // --------------------------------------------
  // 🎯 Form States
  // --------------------------------------------
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [date, setDate] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(50);
  const [category, setCategory] = useState("Tech");
  const [loading, setLoading] = useState(false);

  // --------------------------------------------
  // 🚀 Submit Handler
  // --------------------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !location || !latitude || !longitude) {
      toast.warning("⚠ Please fill all required fields!");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        city: location.split(",")[0]?.trim() || "Unknown",
        latitude: Number(latitude),
        longitude: Number(longitude),
        date: new Date(date).toISOString(),
        maxParticipants: Number(maxParticipants),
        category: category.trim(),
      };

      const res = await API.post("/events", payload);
      toast.success("🎉 Event created successfully!");
      navigate("/");
    } catch (err: any) {
      toast.error(
        `Failed to create event! ${
          err.response?.data?.message || "Check backend connection or token."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------
  // 🖥 UI
  // --------------------------------------------
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-black px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-200/30 dark:border-gray-700/40"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Create <span className="text-indigo-600">New Event</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
            required
          />

          <textarea
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />

          <input
            type="text"
            placeholder="Location (e.g., Delhi, India)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
            required
          />

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="number"
            placeholder="Max Participants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(Number(e.target.value))}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Tech">Tech</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
            <option value="Education">Education</option>
               <option value="Business">Business</option>

          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-5 py-2 rounded-xl border border-gray-300 dark:border-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all"
            >
              {loading ? "Creating..." : "Create Event 🚀"}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default CreateEvent;