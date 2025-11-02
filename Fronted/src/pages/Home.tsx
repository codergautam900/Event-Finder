import React, { useEffect, useState, useRef } from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import { getAllEvents } from "../api/eventApi";
import type { Event } from "../types/Event";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const navigate = useNavigate();

  const hasRedirected = useRef(false);

  // 🔐 Redirect guests
  useEffect(() => {
    if (!token && !hasRedirected.current) {
      hasRedirected.current = true;
      toast.warning("Please login to continue", { autoClose: 2000 });
      navigate("/login");
    }
  }, [token, navigate]);

  // 📦 Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getAllEvents();
        setEvents(data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        toast.error("Unable to load events");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchEvents();
  }, [token]);

  // 🔍 Filter events
  const filtered = events.filter((ev) => {
    const q = query.toLowerCase();
    return (
      (category === "All" || ev.category === category) &&
      (ev.title.toLowerCase().includes(q) ||
        ev.city?.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-10 pb-16 transition-colors duration-300">
      {/* 🔍 Search + Filter */}
      <section className="rounded-2xl p-6 sm:p-8 mb-10 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 shadow-lg border border-gray-200/30 dark:border-gray-700/50">
        <div className="max-w-5xl mx-auto text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-white">
            Discover Amazing Events 🎉
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-2">
            Find events near you — or create your own adventure!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="🔍 Search events or city..."
              className="flex-1 min-w-[200px] border rounded-xl px-4 py-2.5 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 shadow-sm"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full sm:w-auto border rounded-xl px-4 py-2.5 bg-white/80 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-pink-500 shadow-sm"
            >
              <option>All</option>
              <option>Tech</option>
              <option>Music</option>
              <option>Business</option>
              <option>Sports</option>
              <option>Education</option>
            </select>
          </div>
        </div>
      </section>

      {/* 🎭 Events */}
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 mt-20 animate-pulse text-lg">
          Loading events...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400 mt-20 text-lg">
          No events found 😢
        </div>
      ) : (
        <section
          className="grid gap-6 sm:gap-8 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((ev) => (
            <div
              key={ev._id || ev.id}
              onClick={() => setSelected(ev)}
              className="cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              <EventCard event={ev} />
            </div>
          ))}
        </section>
      )}

      {/* 🪄 Event Modal */}
      {selected && (
        <EventModal
          event={selected}
          onClose={() => setSelected(null)}
          onJoin={() => toast.success("Joined event successfully! 🎊")}
        />
      )}
    </div>
  );
};

export default Home;