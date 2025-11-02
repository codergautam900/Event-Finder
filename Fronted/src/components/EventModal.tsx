import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Event } from "../types/Event";

const EventModal: React.FC<{
  event: Event | null;
  onClose: () => void;
  onJoin?: (id: string) => void;
}> = ({ event, onClose, onJoin }) => {
  if (!event) return null;

  // 🧭 Safe location formatting
  const locationText =
    typeof event.location === "object"
      ? `${event.city || "Unknown City"} (${event.location.coordinates?.[1]?.toFixed(
          2
        )}, ${event.location.coordinates?.[0]?.toFixed(2)})`
      : event.location || event.city || "Unknown";

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white/95 dark:bg-gray-900/90 rounded-2xl p-5 sm:p-7 md:p-8 max-w-md sm:max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-700 overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.8, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ❌ Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-xl sm:text-2xl"
            >
              ✖
            </button>

            {/* 🖼 Banner */}
            {event.banner && (
              <img
                src={event.banner}
                alt={event.title}
                className="rounded-xl mb-4 w-full h-40 sm:h-48 md:h-52 object-cover shadow-md"
              />
            )}

            {/* 🏷 Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center sm:text-left">
              {event.title}
            </h2>

            {/* 📅 Date + 📍 Location */}
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 text-center sm:text-left">
              📍 {locationText} • {new Date(event.date).toLocaleString()}
            </p>

            {/* 📝 Description */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-justify">
              {event.description}
            </p>

            {/* 👥 Participants + 🔘 Join */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
                👥 {event.currentParticipants}/{event.maxParticipants} joined
              </div>

              {onJoin && (
                <button
                  onClick={() => onJoin(event._id || event.id)}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-transform hover:scale-105 text-center"
                >
                  Join Now
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventModal;