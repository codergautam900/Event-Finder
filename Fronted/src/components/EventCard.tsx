import React from "react";
import { Link } from "react-router-dom";
import type { Event } from "../types/Event";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <Link
      to={`/event/${event._id || event.id}`}
      className="group block transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <article
        className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700
        bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm shadow-lg transition-all duration-500
        flex flex-col"
      >
        {/* 🖼 Banner / Image */}
        <div className="relative overflow-hidden rounded-t-2xl">
          {event.banner ? (
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-44 sm:h-52 md:h-56 lg:h-60 object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-44 sm:h-52 md:h-56 lg:h-60 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-lg font-semibold text-center px-2">
              {event.title.split(" ").slice(0, 2).join(" ")}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* 📄 Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-indigo-500 transition-colors duration-300 line-clamp-1">
            {event.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 mb-3 gap-1">
            <span className="flex items-center gap-1 truncate">
              📍{" "}
              {typeof event.location === "object"
                ? `${event.city || "Unknown City"} (${event.location.coordinates?.[1]?.toFixed(
                    2
                  )}, ${event.location.coordinates?.[0]?.toFixed(2)})`
                : event.location || event.city || "Unknown"}
            </span>
            <span>📅 {new Date(event.date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              👥 {event.currentParticipants}/{event.maxParticipants} joined
            </div>
            <span className="text-[11px] sm:text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-medium">
              View →
            </span>
          </div>
        </div>

        {/* ✨ Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 blur-xl rounded-2xl"></div>
      </article>
    </Link>
  );
};

export default EventCard;